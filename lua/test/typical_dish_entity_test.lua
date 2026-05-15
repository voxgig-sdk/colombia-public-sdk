-- TypicalDish entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("colombia-public_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("TypicalDishEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:TypicalDish(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = typical_dish_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"list", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "typical_dish." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set COLOMBIAPUBLIC_TEST_TYPICAL_DISH_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local typical_dish_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.typical_dish")))
    local typical_dish_ref01_data = nil
    if #typical_dish_ref01_data_raw > 0 then
      typical_dish_ref01_data = helpers.to_map(typical_dish_ref01_data_raw[1][2])
    end

    -- LIST
    local typical_dish_ref01_ent = client:TypicalDish(nil)
    local typical_dish_ref01_match = {}

    local typical_dish_ref01_list_result, err = typical_dish_ref01_ent:list(typical_dish_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(typical_dish_ref01_list_result)

    -- LOAD
    local typical_dish_ref01_match_dt0 = {
      id = typical_dish_ref01_data["id"],
    }
    local typical_dish_ref01_data_dt0_loaded, err = typical_dish_ref01_ent:load(typical_dish_ref01_match_dt0, nil)
    assert.is_nil(err)
    local typical_dish_ref01_data_dt0_load_result = helpers.to_map(typical_dish_ref01_data_dt0_loaded)
    assert.is_not_nil(typical_dish_ref01_data_dt0_load_result)
    assert.are.equal(typical_dish_ref01_data_dt0_load_result["id"], typical_dish_ref01_data["id"])

  end)
end)

function typical_dish_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/typical_dish/TypicalDishTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read typical_dish test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "typical_dish01", "typical_dish02", "typical_dish03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("COLOMBIAPUBLIC_TEST_TYPICAL_DISH_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["COLOMBIAPUBLIC_TEST_TYPICAL_DISH_ENTID"] = idmap,
    ["COLOMBIAPUBLIC_TEST_LIVE"] = "FALSE",
    ["COLOMBIAPUBLIC_TEST_EXPLAIN"] = "FALSE",
    ["COLOMBIAPUBLIC_APIKEY"] = "NONE",
  })

  local idmap_resolved = helpers.to_map(
    env["COLOMBIAPUBLIC_TEST_TYPICAL_DISH_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["COLOMBIAPUBLIC_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      {
        apikey = env["COLOMBIAPUBLIC_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["COLOMBIAPUBLIC_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["COLOMBIAPUBLIC_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
