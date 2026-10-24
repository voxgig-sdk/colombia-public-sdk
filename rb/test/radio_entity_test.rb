# Radio entity test

require "minitest/autorun"
require "json"
require_relative "../ColombiaPublic_sdk"
require_relative "runner"

class RadioEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ColombiaPublicSDK.test(nil, nil)
    ent = testsdk.Radio(nil)
    assert !ent.nil?
  end

  def test_list_entities
    seed = {
      "entity" => {
        "radio" => {
          "l1" => { "id" => "l1" },
          "l2" => { "id" => "l2" },
        },
      },
    }
    items = ColombiaPublicSDK.test(seed, nil).Radio(nil).list(nil, nil)
    # list resolves to one entity per record; data_get reads the record.
    assert_equal 2, items.length
    items.each do |item|
      assert item.respond_to?(:data_get)
      assert item.data_get.is_a?(Hash)
    end
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "radio" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = ColombiaPublicSDK.test(seed, nil)
    seen = base.Radio(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = ColombiaPublicConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = ColombiaPublicSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.Radio(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  class FailHook < ColombiaPublicBaseFeature
    attr_reader :unexpected

    def initialize
      super()
      @name = "failhook"
      @unexpected = 0
    end

    def PreSpec(ctx)
      raise "radio hook failed"
    end

    def PreUnexpected(ctx)
      @unexpected += 1
    end
  end

  def test_stream_error
    offline = { "net" => { "offline" => true } }
    err = assert_raises(StandardError) do
      ColombiaPublicSDK.test(offline, nil).Radio(nil).stream("list", nil, nil).to_a
    end
    assert_match(/offline/, err.message)

    ColombiaPublicSDK.test(offline, nil).Radio(nil)
      .stream("list", nil, { "ctrl" => { "throw" => false } }).to_a

    cfg = ColombiaPublicConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("rbac")
      denied = ColombiaPublicSDK.test(nil, { "feature" => { "rbac" => { "active" => true, "deny" => true } } })
      err = assert_raises(StandardError) do
        denied.Radio(nil).stream("list", nil, nil).to_a
      end
      assert_equal "rbac_denied", err.code
    end
  end

  def test_stream_ctrl
    explain = {}
    ctrl = { "explain" => explain }
    ColombiaPublicSDK.test(nil, nil).Radio(nil).stream("list", nil, { "ctrl" => ctrl }).to_a
    assert_equal ["explain"], ctrl.keys
    assert_same explain, ctrl["explain"]
    refute_empty explain
  end

  def test_unexpected
    hook = FailHook.new
    client = ColombiaPublicSDK.new({ "feature" => { "test" => { "active" => true } }, "extend" => [hook] })

    err = assert_raises(StandardError) do
      client.Radio(nil).list(nil, nil)
    end
    assert_match(/hook failed/, err.message)
    assert_operator hook.unexpected, :>, 0

    fired = hook.unexpected
    assert_nil client.Radio(nil).list(nil, { "throw" => false })
    assert_operator hook.unexpected, :>, fired
  end

  def test_validate
    cfg = ColombiaPublicConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ColombiaPublicSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Radio(nil).list({ "band" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = radio_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "radio." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]
    if setup[:live]
      Runner.live_existing(setup, LIVE_STRICT, "radio") do
        client.Radio(nil).list({}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    radio_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.radio")))
    radio_ref01_data = nil
    if radio_ref01_data_raw.length > 0
      radio_ref01_data = Helpers.to_map(radio_ref01_data_raw[0][1])
    end

    # LIST
    radio_ref01_ent = client.Radio(nil)
    radio_ref01_match = {}

    radio_ref01_list_result = radio_ref01_ent.list(radio_ref01_match, nil)
    assert radio_ref01_list_result.is_a?(Array)

    # LOAD
    radio_ref01_match_dt0 = {
      "id" => radio_ref01_data["id"],
    }
    radio_ref01_data_dt0_loaded = radio_ref01_ent.load(radio_ref01_match_dt0, nil)
    radio_ref01_data_dt0_load_result = Helpers.to_map(radio_ref01_data_dt0_loaded.respond_to?(:data_get) ? radio_ref01_data_dt0_loaded.data_get : radio_ref01_data_dt0_loaded)
    assert !radio_ref01_data_dt0_load_result.nil?
    assert_equal radio_ref01_data_dt0_load_result["id"], radio_ref01_data["id"]

  end
end

def radio_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "radio", "RadioTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ColombiaPublicSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["radio01", "radio02", "radio03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COLOMBIA_PUBLIC_TEST_RADIO_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COLOMBIA_PUBLIC_TEST_RADIO_ENTID" => idmap,
    "COLOMBIA_PUBLIC_TEST_LIVE" => "FALSE",
    "COLOMBIA_PUBLIC_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["COLOMBIA_PUBLIC_TEST_RADIO_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["COLOMBIA_PUBLIC_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
      },
      extra || {},
    ])
    client = ColombiaPublicSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["COLOMBIA_PUBLIC_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["COLOMBIA_PUBLIC_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
