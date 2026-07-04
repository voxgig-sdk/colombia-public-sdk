# Department entity test

require "minitest/autorun"
require "json"
require_relative "../ColombiaPublic_sdk"
require_relative "runner"

class DepartmentEntityTest < Minitest::Test
  def test_create_instance
    testsdk = ColombiaPublicSDK.test(nil, nil)
    ent = testsdk.Department(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = department_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "department." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set COLOMBIAPUBLIC_TEST_DEPARTMENT_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    department_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.department")))
    department_ref01_data = nil
    if department_ref01_data_raw.length > 0
      department_ref01_data = Helpers.to_map(department_ref01_data_raw[0][1])
    end

    # LIST
    department_ref01_ent = client.Department(nil)
    department_ref01_match = {}

    department_ref01_list_result = department_ref01_ent.list(department_ref01_match, nil)
    assert department_ref01_list_result.is_a?(Array)

    # LOAD
    department_ref01_match_dt0 = {
      "id" => department_ref01_data["id"],
    }
    department_ref01_data_dt0_loaded = department_ref01_ent.load(department_ref01_match_dt0, nil)
    department_ref01_data_dt0_load_result = Helpers.to_map(department_ref01_data_dt0_loaded)
    assert !department_ref01_data_dt0_load_result.nil?
    assert_equal department_ref01_data_dt0_load_result["id"], department_ref01_data["id"]

  end
end

def department_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "department", "DepartmentTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ColombiaPublicSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["department01", "department02", "department03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["COLOMBIAPUBLIC_TEST_DEPARTMENT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COLOMBIAPUBLIC_TEST_DEPARTMENT_ENTID" => idmap,
    "COLOMBIAPUBLIC_TEST_LIVE" => "FALSE",
    "COLOMBIAPUBLIC_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["COLOMBIAPUBLIC_TEST_DEPARTMENT_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["COLOMBIAPUBLIC_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = ColombiaPublicSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["COLOMBIAPUBLIC_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["COLOMBIAPUBLIC_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
