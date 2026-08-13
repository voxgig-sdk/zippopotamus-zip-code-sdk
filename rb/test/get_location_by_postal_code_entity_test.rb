# GetLocationByPostalCode entity test

require "minitest/autorun"
require "json"
require_relative "../ZippopotamusZipCode_sdk"
require_relative "runner"

class GetLocationByPostalCodeEntityTest < Minitest::Test
  def test_create_instance
    testsdk = ZippopotamusZipCodeSDK.test(nil, nil)
    ent = testsdk.GetLocationByPostalCode(nil)
    assert !ent.nil?
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "get_location_by_postal_code" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = ZippopotamusZipCodeSDK.test(seed, nil)
    seen = base.GetLocationByPostalCode(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = ZippopotamusZipCodeConfig.make_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = ZippopotamusZipCodeSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.GetLocationByPostalCode(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  def test_basic_flow
    setup = get_location_by_postal_code_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "get_location_by_postal_code." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set ZIPPOPOTAMUS_ZIP_CODE_TEST_GET_LOCATION_BY_POSTAL_CODE_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    get_location_by_postal_code_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.get_location_by_postal_code")))
    get_location_by_postal_code_ref01_data = nil
    if get_location_by_postal_code_ref01_data_raw.length > 0
      get_location_by_postal_code_ref01_data = Helpers.to_map(get_location_by_postal_code_ref01_data_raw[0][1])
    end

    # LIST
    get_location_by_postal_code_ref01_ent = client.GetLocationByPostalCode(nil)
    get_location_by_postal_code_ref01_match = {
      "country" => setup[:idmap]["country01"],
      "postal_code" => setup[:idmap]["postal_code01"],
    }

    get_location_by_postal_code_ref01_list_result = get_location_by_postal_code_ref01_ent.list(get_location_by_postal_code_ref01_match, nil)
    assert get_location_by_postal_code_ref01_list_result.is_a?(Array)

  end
end

def get_location_by_postal_code_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "get_location_by_postal_code", "GetLocationByPostalCodeTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ZippopotamusZipCodeSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["get_location_by_postal_code01", "get_location_by_postal_code02", "get_location_by_postal_code03", "country01", "postal_code01"],
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
  entid_env_raw = ENV["ZIPPOPOTAMUS_ZIP_CODE_TEST_GET_LOCATION_BY_POSTAL_CODE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "ZIPPOPOTAMUS_ZIP_CODE_TEST_GET_LOCATION_BY_POSTAL_CODE_ENTID" => idmap,
    "ZIPPOPOTAMUS_ZIP_CODE_TEST_LIVE" => "FALSE",
    "ZIPPOPOTAMUS_ZIP_CODE_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["ZIPPOPOTAMUS_ZIP_CODE_TEST_GET_LOCATION_BY_POSTAL_CODE_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["ZIPPOPOTAMUS_ZIP_CODE_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = ZippopotamusZipCodeSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["ZIPPOPOTAMUS_ZIP_CODE_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["ZIPPOPOTAMUS_ZIP_CODE_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
