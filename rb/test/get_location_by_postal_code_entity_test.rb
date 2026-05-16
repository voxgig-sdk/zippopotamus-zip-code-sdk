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
      skip "live entity test uses synthetic IDs from fixture — set ZIPPOPOTAMUSZIPCODE_TEST_GET_LOCATION_BY_POSTAL_CODE_ENTID JSON to run live"
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

    get_location_by_postal_code_ref01_list_result, err = get_location_by_postal_code_ref01_ent.list(get_location_by_postal_code_ref01_match, nil)
    assert_nil err
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
  entid_env_raw = ENV["ZIPPOPOTAMUSZIPCODE_TEST_GET_LOCATION_BY_POSTAL_CODE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "ZIPPOPOTAMUSZIPCODE_TEST_GET_LOCATION_BY_POSTAL_CODE_ENTID" => idmap,
    "ZIPPOPOTAMUSZIPCODE_TEST_LIVE" => "FALSE",
    "ZIPPOPOTAMUSZIPCODE_TEST_EXPLAIN" => "FALSE",
    "ZIPPOPOTAMUSZIPCODE_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["ZIPPOPOTAMUSZIPCODE_TEST_GET_LOCATION_BY_POSTAL_CODE_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["ZIPPOPOTAMUSZIPCODE_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["ZIPPOPOTAMUSZIPCODE_APIKEY"],
      },
      extra || {},
    ])
    client = ZippopotamusZipCodeSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["ZIPPOPOTAMUSZIPCODE_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["ZIPPOPOTAMUSZIPCODE_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
