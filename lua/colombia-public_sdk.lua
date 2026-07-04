-- ColombiaPublic SDK

local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local ColombiaPublicSDK = {}
ColombiaPublicSDK.__index = ColombiaPublicSDK


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

ColombiaPublicSDK._make_feature = _make_feature


function ColombiaPublicSDK.new(options)
  local self = setmetatable({}, ColombiaPublicSDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features from config.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local feature_items = vs.items(feature_opts)
    if feature_items ~= nil then
      for _, item in ipairs(feature_items) do
        local fname = item[1]
        local fopts = helpers.to_map(item[2])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

  -- #BuildFeatures

  return self
end


function ColombiaPublicSDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function ColombiaPublicSDK:get_utility()
  return Utility.copy(self._utility)
end


function ColombiaPublicSDK:get_root_ctx()
  return self._rootctx
end


function ColombiaPublicSDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" then method = "GET" end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


function ColombiaPublicSDK:direct(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = fetch_err }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
    end

    return {
      ok = status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end



-- Idiomatic facade: client:airport():list() / client:airport():load({ id = ... })
function ColombiaPublicSDK:airport(data)
  local EntityMod = require("entity.airport_entity")
  if data == nil then
    if self._airport == nil then
      self._airport = EntityMod.new(self, nil)
    end
    return self._airport
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:airport() instead.
function ColombiaPublicSDK:Airport(data)
  local EntityMod = require("entity.airport_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:category_natural_area():list() / client:category_natural_area():load({ id = ... })
function ColombiaPublicSDK:category_natural_area(data)
  local EntityMod = require("entity.category_natural_area_entity")
  if data == nil then
    if self._category_natural_area == nil then
      self._category_natural_area = EntityMod.new(self, nil)
    end
    return self._category_natural_area
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:category_natural_area() instead.
function ColombiaPublicSDK:CategoryNaturalArea(data)
  local EntityMod = require("entity.category_natural_area_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:constitution_article():list() / client:constitution_article():load({ id = ... })
function ColombiaPublicSDK:constitution_article(data)
  local EntityMod = require("entity.constitution_article_entity")
  if data == nil then
    if self._constitution_article == nil then
      self._constitution_article = EntityMod.new(self, nil)
    end
    return self._constitution_article
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:constitution_article() instead.
function ColombiaPublicSDK:ConstitutionArticle(data)
  local EntityMod = require("entity.constitution_article_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:country():list() / client:country():load({ id = ... })
function ColombiaPublicSDK:country(data)
  local EntityMod = require("entity.country_entity")
  if data == nil then
    if self._country == nil then
      self._country = EntityMod.new(self, nil)
    end
    return self._country
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:country() instead.
function ColombiaPublicSDK:Country(data)
  local EntityMod = require("entity.country_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:department():list() / client:department():load({ id = ... })
function ColombiaPublicSDK:department(data)
  local EntityMod = require("entity.department_entity")
  if data == nil then
    if self._department == nil then
      self._department = EntityMod.new(self, nil)
    end
    return self._department
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:department() instead.
function ColombiaPublicSDK:Department(data)
  local EntityMod = require("entity.department_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:holiday():list() / client:holiday():load({ id = ... })
function ColombiaPublicSDK:holiday(data)
  local EntityMod = require("entity.holiday_entity")
  if data == nil then
    if self._holiday == nil then
      self._holiday = EntityMod.new(self, nil)
    end
    return self._holiday
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:holiday() instead.
function ColombiaPublicSDK:Holiday(data)
  local EntityMod = require("entity.holiday_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:invasive_specie():list() / client:invasive_specie():load({ id = ... })
function ColombiaPublicSDK:invasive_specie(data)
  local EntityMod = require("entity.invasive_specie_entity")
  if data == nil then
    if self._invasive_specie == nil then
      self._invasive_specie = EntityMod.new(self, nil)
    end
    return self._invasive_specie
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:invasive_specie() instead.
function ColombiaPublicSDK:InvasiveSpecie(data)
  local EntityMod = require("entity.invasive_specie_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:map():list() / client:map():load({ id = ... })
function ColombiaPublicSDK:map(data)
  local EntityMod = require("entity.map_entity")
  if data == nil then
    if self._map == nil then
      self._map = EntityMod.new(self, nil)
    end
    return self._map
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:map() instead.
function ColombiaPublicSDK:Map(data)
  local EntityMod = require("entity.map_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:native_community():list() / client:native_community():load({ id = ... })
function ColombiaPublicSDK:native_community(data)
  local EntityMod = require("entity.native_community_entity")
  if data == nil then
    if self._native_community == nil then
      self._native_community = EntityMod.new(self, nil)
    end
    return self._native_community
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:native_community() instead.
function ColombiaPublicSDK:NativeCommunity(data)
  local EntityMod = require("entity.native_community_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:natural_area():list() / client:natural_area():load({ id = ... })
function ColombiaPublicSDK:natural_area(data)
  local EntityMod = require("entity.natural_area_entity")
  if data == nil then
    if self._natural_area == nil then
      self._natural_area = EntityMod.new(self, nil)
    end
    return self._natural_area
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:natural_area() instead.
function ColombiaPublicSDK:NaturalArea(data)
  local EntityMod = require("entity.natural_area_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:president():list() / client:president():load({ id = ... })
function ColombiaPublicSDK:president(data)
  local EntityMod = require("entity.president_entity")
  if data == nil then
    if self._president == nil then
      self._president = EntityMod.new(self, nil)
    end
    return self._president
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:president() instead.
function ColombiaPublicSDK:President(data)
  local EntityMod = require("entity.president_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:radio():list() / client:radio():load({ id = ... })
function ColombiaPublicSDK:radio(data)
  local EntityMod = require("entity.radio_entity")
  if data == nil then
    if self._radio == nil then
      self._radio = EntityMod.new(self, nil)
    end
    return self._radio
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:radio() instead.
function ColombiaPublicSDK:Radio(data)
  local EntityMod = require("entity.radio_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:region():list() / client:region():load({ id = ... })
function ColombiaPublicSDK:region(data)
  local EntityMod = require("entity.region_entity")
  if data == nil then
    if self._region == nil then
      self._region = EntityMod.new(self, nil)
    end
    return self._region
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:region() instead.
function ColombiaPublicSDK:Region(data)
  local EntityMod = require("entity.region_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:touristic_attraction():list() / client:touristic_attraction():load({ id = ... })
function ColombiaPublicSDK:touristic_attraction(data)
  local EntityMod = require("entity.touristic_attraction_entity")
  if data == nil then
    if self._touristic_attraction == nil then
      self._touristic_attraction = EntityMod.new(self, nil)
    end
    return self._touristic_attraction
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:touristic_attraction() instead.
function ColombiaPublicSDK:TouristicAttraction(data)
  local EntityMod = require("entity.touristic_attraction_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:typical_dish():list() / client:typical_dish():load({ id = ... })
function ColombiaPublicSDK:typical_dish(data)
  local EntityMod = require("entity.typical_dish_entity")
  if data == nil then
    if self._typical_dish == nil then
      self._typical_dish = EntityMod.new(self, nil)
    end
    return self._typical_dish
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:typical_dish() instead.
function ColombiaPublicSDK:TypicalDish(data)
  local EntityMod = require("entity.typical_dish_entity")
  return EntityMod.new(self, data)
end




function ColombiaPublicSDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = ColombiaPublicSDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return ColombiaPublicSDK
