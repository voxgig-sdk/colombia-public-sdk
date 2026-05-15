package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/colombia-public-sdk"
	"github.com/voxgig-sdk/colombia-public-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestAirportEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Airport(nil)
		if ent == nil {
			t.Fatal("expected non-nil AirportEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := airportBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "airport." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set COLOMBIAPUBLIC_TEST_AIRPORT_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		airportRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.airport", setup.data)))
		var airportRef01Data map[string]any
		if len(airportRef01DataRaw) > 0 {
			airportRef01Data = core.ToMapAny(airportRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = airportRef01Data

		// LIST
		airportRef01Ent := client.Airport(nil)
		airportRef01Match := map[string]any{}

		airportRef01ListResult, err := airportRef01Ent.List(airportRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, airportRef01ListOk := airportRef01ListResult.([]any)
		if !airportRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", airportRef01ListResult)
		}

		// LOAD
		airportRef01MatchDt0 := map[string]any{
			"id": airportRef01Data["id"],
		}
		airportRef01DataDt0Loaded, err := airportRef01Ent.Load(airportRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		airportRef01DataDt0LoadResult := core.ToMapAny(airportRef01DataDt0Loaded)
		if airportRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if airportRef01DataDt0LoadResult["id"] != airportRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func airportBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "airport", "AirportTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read airport test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse airport test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"airport01", "airport02", "airport03"},
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
	entidEnvRaw := os.Getenv("COLOMBIAPUBLIC_TEST_AIRPORT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COLOMBIAPUBLIC_TEST_AIRPORT_ENTID": idmap,
		"COLOMBIAPUBLIC_TEST_LIVE":      "FALSE",
		"COLOMBIAPUBLIC_TEST_EXPLAIN":   "FALSE",
		"COLOMBIAPUBLIC_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["COLOMBIAPUBLIC_TEST_AIRPORT_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["COLOMBIAPUBLIC_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["COLOMBIAPUBLIC_APIKEY"],
			},
			extra,
		})
		client = sdk.NewColombiaPublicSDK(core.ToMapAny(mergedOpts))
	}

	live := env["COLOMBIAPUBLIC_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["COLOMBIAPUBLIC_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
