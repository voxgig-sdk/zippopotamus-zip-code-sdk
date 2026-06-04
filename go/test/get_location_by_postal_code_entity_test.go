package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/zippopotamus-zip-code-sdk/go"
	"github.com/voxgig-sdk/zippopotamus-zip-code-sdk/go/core"

	vs "github.com/voxgig-sdk/zippopotamus-zip-code-sdk/go/utility/struct"
)

func TestGetLocationByPostalCodeEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.GetLocationByPostalCode(nil)
		if ent == nil {
			t.Fatal("expected non-nil GetLocationByPostalCodeEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := get_location_by_postal_codeBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "get_location_by_postal_code." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set ZIPPOPOTAMUSZIPCODE_TEST_GET_LOCATION_BY_POSTAL_CODE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		getLocationByPostalCodeRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.get_location_by_postal_code", setup.data)))
		var getLocationByPostalCodeRef01Data map[string]any
		if len(getLocationByPostalCodeRef01DataRaw) > 0 {
			getLocationByPostalCodeRef01Data = core.ToMapAny(getLocationByPostalCodeRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = getLocationByPostalCodeRef01Data

		// LIST
		getLocationByPostalCodeRef01Ent := client.GetLocationByPostalCode(nil)
		getLocationByPostalCodeRef01Match := map[string]any{
			"country": setup.idmap["country01"],
			"postal_code": setup.idmap["postal_code01"],
		}

		getLocationByPostalCodeRef01ListResult, err := getLocationByPostalCodeRef01Ent.List(getLocationByPostalCodeRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, getLocationByPostalCodeRef01ListOk := getLocationByPostalCodeRef01ListResult.([]any)
		if !getLocationByPostalCodeRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", getLocationByPostalCodeRef01ListResult)
		}

	})
}

func get_location_by_postal_codeBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "get_location_by_postal_code", "GetLocationByPostalCodeTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read get_location_by_postal_code test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse get_location_by_postal_code test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"get_location_by_postal_code01", "get_location_by_postal_code02", "get_location_by_postal_code03", "country01", "postal_code01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("ZIPPOPOTAMUSZIPCODE_TEST_GET_LOCATION_BY_POSTAL_CODE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"ZIPPOPOTAMUSZIPCODE_TEST_GET_LOCATION_BY_POSTAL_CODE_ENTID": idmap,
		"ZIPPOPOTAMUSZIPCODE_TEST_LIVE":      "FALSE",
		"ZIPPOPOTAMUSZIPCODE_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["ZIPPOPOTAMUSZIPCODE_TEST_GET_LOCATION_BY_POSTAL_CODE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["ZIPPOPOTAMUSZIPCODE_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewZippopotamusZipCodeSDK(core.ToMapAny(mergedOpts))
	}

	live := env["ZIPPOPOTAMUSZIPCODE_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["ZIPPOPOTAMUSZIPCODE_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
