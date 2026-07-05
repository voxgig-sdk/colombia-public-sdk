# ColombiaPublic SDK

require_relative 'utility/struct/voxgig_struct'
require_relative 'core/utility_type'
require_relative 'core/spec'
require_relative 'core/helpers'

# Load utility registration
require_relative 'utility/register'

# Load config and features
require_relative 'config'
require_relative 'feature/base_feature'
require_relative 'features'

# Load typed models (Struct value objects).
require_relative 'ColombiaPublic_types'


class ColombiaPublicSDK
  attr_accessor :mode, :features, :options

  def initialize(options = {})
    @mode = "live"
    @features = []
    @options = nil

    utility = ColombiaPublicUtility.new
    @_utility = utility

    config = ColombiaPublicConfig.make_config

    @_rootctx = utility.make_context.call({
      "client" => self,
      "utility" => utility,
      "config" => config,
      "options" => options || {},
      "shared" => {},
    }, nil)

    @options = utility.make_options.call(@_rootctx)

    if VoxgigStruct.getpath(@options, "feature.test.active") == true
      @mode = "test"
    end

    @_rootctx.options = @options

    # Add features from config.
    feature_opts = ColombiaPublicHelpers.to_map(VoxgigStruct.getprop(@options, "feature"))
    if feature_opts
      items = VoxgigStruct.items(feature_opts)
      if items
        items.each do |item|
          fname = item[0]
          fopts = ColombiaPublicHelpers.to_map(item[1])
          if fopts && fopts["active"] == true
            utility.feature_add.call(@_rootctx, ColombiaPublicFeatures.make_feature(fname))
          end
        end
      end
    end

    # Add extension features.
    extend_val = VoxgigStruct.getprop(@options, "extend")
    if extend_val.is_a?(Array)
      extend_val.each do |f|
        if f.respond_to?(:get_name)
          utility.feature_add.call(@_rootctx, f)
        end
      end
    end

    # Initialize features.
    @features.each do |f|
      utility.feature_init.call(@_rootctx, f)
    end

    utility.feature_hook.call(@_rootctx, "PostConstruct")
  end

  def options_map
    out = VoxgigStruct.clone(@options)
    out.is_a?(Hash) ? out : {}
  end

  def get_utility
    ColombiaPublicUtility.copy(@_utility)
  end

  def get_root_ctx
    @_rootctx
  end

  def prepare(fetchargs = {})
    utility = @_utility
    fetchargs ||= {}

    ctrl = ColombiaPublicHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "prepare",
      "ctrl" => ctrl,
    }, @_rootctx)

    opts = @options
    path = VoxgigStruct.getprop(fetchargs, "path") || ""
    path = "" unless path.is_a?(String)
    method_val = VoxgigStruct.getprop(fetchargs, "method") || "GET"
    method_val = "GET" unless method_val.is_a?(String)
    params = ColombiaPublicHelpers.to_map(VoxgigStruct.getprop(fetchargs, "params")) || {}
    query = ColombiaPublicHelpers.to_map(VoxgigStruct.getprop(fetchargs, "query")) || {}
    headers = utility.prepare_headers.call(ctx)

    base = VoxgigStruct.getprop(opts, "base") || ""
    base = "" unless base.is_a?(String)
    prefix = VoxgigStruct.getprop(opts, "prefix") || ""
    prefix = "" unless prefix.is_a?(String)
    suffix = VoxgigStruct.getprop(opts, "suffix") || ""
    suffix = "" unless suffix.is_a?(String)

    ctx.spec = ColombiaPublicSpec.new({
      "base" => base, "prefix" => prefix, "suffix" => suffix,
      "path" => path, "method" => method_val,
      "params" => params, "query" => query, "headers" => headers,
      "body" => VoxgigStruct.getprop(fetchargs, "body"),
      "step" => "start",
    })

    # Merge user-provided headers.
    uh = VoxgigStruct.getprop(fetchargs, "headers")
    if uh.is_a?(Hash)
      uh.each { |k, v| ctx.spec.headers[k] = v }
    end

    _, err = utility.prepare_auth.call(ctx)
    raise err if err

    # make_fetch_def returns a (fetchdef, err) tuple; destructure it and
    # return just the fetchdef Hash (raising on error) so callers — including
    # direct(), which indexes fetchdef["url"] — receive a Hash, mirroring the
    # ts/py prepare().
    fetchdef, fd_err = utility.make_fetch_def.call(ctx)
    raise fd_err if fd_err

    fetchdef
  end

  def direct(fetchargs = {})
    utility = @_utility

    # direct() is the raw-HTTP escape hatch: it always returns a result hash
    # ({ "ok" => ..., ... }) and never raises. prepare() raises on error, so
    # trap that and surface it in the hash.
    begin
      fetchdef = prepare(fetchargs)
    rescue ColombiaPublicError => err
      return { "ok" => false, "err" => err }
    end

    fetchargs ||= {}
    ctrl = ColombiaPublicHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "direct",
      "ctrl" => ctrl,
    }, @_rootctx)

    url = fetchdef["url"] || ""
    fetched, fetch_err = utility.fetcher.call(ctx, url, fetchdef)

    return { "ok" => false, "err" => fetch_err } if fetch_err

    if fetched.nil?
      return {
        "ok" => false,
        "err" => ctx.make_error("direct_no_response", "response: undefined"),
      }
    end

    if fetched.is_a?(Hash)
      status = ColombiaPublicHelpers.to_int(VoxgigStruct.getprop(fetched, "status"))
      headers = VoxgigStruct.getprop(fetched, "headers") || {}

      # No-body responses (204, 304) and explicit zero content-length must
      # skip JSON parsing — calling json() on an empty body errors.
      content_length = headers.is_a?(Hash) ? headers["content-length"] : nil
      no_body = status == 204 || status == 304 || content_length.to_s == "0"

      json_data = nil
      unless no_body
        jf = VoxgigStruct.getprop(fetched, "json")
        if jf.is_a?(Proc)
          begin
            json_data = jf.call
          rescue StandardError
            # Non-JSON body — leave data nil, keep status/headers.
            json_data = nil
          end
        end
      end

      return {
        "ok" => status >= 200 && status < 300,
        "status" => status,
        "headers" => headers,
        "data" => json_data,
      }
    end

    return {
      "ok" => false,
      "err" => ctx.make_error("direct_invalid", "invalid response type"),
    }
  end


  # Canonical facade: client.Airport.list / client.Airport.load({ "id" => ... })
  def Airport(data = nil)
    require_relative 'entity/airport_entity'
    AirportEntity.new(self, data)
  end


  # Canonical facade: client.CategoryNaturalArea.list / client.CategoryNaturalArea.load({ "id" => ... })
  def CategoryNaturalArea(data = nil)
    require_relative 'entity/category_natural_area_entity'
    CategoryNaturalAreaEntity.new(self, data)
  end


  # Canonical facade: client.ConstitutionArticle.list / client.ConstitutionArticle.load({ "id" => ... })
  def ConstitutionArticle(data = nil)
    require_relative 'entity/constitution_article_entity'
    ConstitutionArticleEntity.new(self, data)
  end


  # Canonical facade: client.Country.list / client.Country.load({ "id" => ... })
  def Country(data = nil)
    require_relative 'entity/country_entity'
    CountryEntity.new(self, data)
  end


  # Canonical facade: client.Department.list / client.Department.load({ "id" => ... })
  def Department(data = nil)
    require_relative 'entity/department_entity'
    DepartmentEntity.new(self, data)
  end


  # Canonical facade: client.Holiday.list / client.Holiday.load({ "id" => ... })
  def Holiday(data = nil)
    require_relative 'entity/holiday_entity'
    HolidayEntity.new(self, data)
  end


  # Canonical facade: client.InvasiveSpecie.list / client.InvasiveSpecie.load({ "id" => ... })
  def InvasiveSpecie(data = nil)
    require_relative 'entity/invasive_specie_entity'
    InvasiveSpecieEntity.new(self, data)
  end


  # Canonical facade: client.Map.list / client.Map.load({ "id" => ... })
  def Map(data = nil)
    require_relative 'entity/map_entity'
    MapEntity.new(self, data)
  end


  # Canonical facade: client.NativeCommunity.list / client.NativeCommunity.load({ "id" => ... })
  def NativeCommunity(data = nil)
    require_relative 'entity/native_community_entity'
    NativeCommunityEntity.new(self, data)
  end


  # Canonical facade: client.NaturalArea.list / client.NaturalArea.load({ "id" => ... })
  def NaturalArea(data = nil)
    require_relative 'entity/natural_area_entity'
    NaturalAreaEntity.new(self, data)
  end


  # Canonical facade: client.President.list / client.President.load({ "id" => ... })
  def President(data = nil)
    require_relative 'entity/president_entity'
    PresidentEntity.new(self, data)
  end


  # Canonical facade: client.Radio.list / client.Radio.load({ "id" => ... })
  def Radio(data = nil)
    require_relative 'entity/radio_entity'
    RadioEntity.new(self, data)
  end


  # Canonical facade: client.Region.list / client.Region.load({ "id" => ... })
  def Region(data = nil)
    require_relative 'entity/region_entity'
    RegionEntity.new(self, data)
  end


  # Canonical facade: client.TouristicAttraction.list / client.TouristicAttraction.load({ "id" => ... })
  def TouristicAttraction(data = nil)
    require_relative 'entity/touristic_attraction_entity'
    TouristicAttractionEntity.new(self, data)
  end


  # Canonical facade: client.TypicalDish.list / client.TypicalDish.load({ "id" => ... })
  def TypicalDish(data = nil)
    require_relative 'entity/typical_dish_entity'
    TypicalDishEntity.new(self, data)
  end



  def self.test(testopts = nil, sdkopts = nil)
    sdkopts = sdkopts || {}
    sdkopts = VoxgigStruct.clone(sdkopts)
    sdkopts = {} unless sdkopts.is_a?(Hash)

    testopts = testopts || {}
    testopts = VoxgigStruct.clone(testopts)
    testopts = {} unless testopts.is_a?(Hash)
    testopts["active"] = true

    VoxgigStruct.setpath(sdkopts, "feature.test", testopts)

    sdk = ColombiaPublicSDK.new(sdkopts)
    sdk.mode = "test"
    sdk
  end
end
