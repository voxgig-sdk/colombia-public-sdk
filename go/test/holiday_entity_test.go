package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/colombia-public-sdk/go"
	"github.com/voxgig-sdk/colombia-public-sdk/go/core"

	vs "github.com/voxgig-sdk/colombia-public-sdk/go/utility/struct"
)

func TestHolidayEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Holiday(nil)
		if ent == nil {
			t.Fatal("expected non-nil HolidayEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := holidayBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "holiday." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set COLOMBIAPUBLIC_TEST_HOLIDAY_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		holidayRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.holiday", setup.data)))
		var holidayRef01Data map[string]any
		if len(holidayRef01DataRaw) > 0 {
			holidayRef01Data = core.ToMapAny(holidayRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = holidayRef01Data

		// LIST
		holidayRef01Ent := client.Holiday(nil)
		holidayRef01Match := map[string]any{}

		holidayRef01ListResult, err := holidayRef01Ent.List(holidayRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, holidayRef01ListOk := holidayRef01ListResult.([]any)
		if !holidayRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", holidayRef01ListResult)
		}

		// LOAD
		holidayRef01MatchDt0 := map[string]any{
			"id": holidayRef01Data["id"],
		}
		holidayRef01DataDt0Loaded, err := holidayRef01Ent.Load(holidayRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		holidayRef01DataDt0LoadResult := core.ToMapAny(holidayRef01DataDt0Loaded)
		if holidayRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if holidayRef01DataDt0LoadResult["id"] != holidayRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func holidayBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "holiday", "HolidayTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read holiday test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse holiday test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"holiday01", "holiday02", "holiday03"},
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
	entidEnvRaw := os.Getenv("COLOMBIAPUBLIC_TEST_HOLIDAY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COLOMBIAPUBLIC_TEST_HOLIDAY_ENTID": idmap,
		"COLOMBIAPUBLIC_TEST_LIVE":      "FALSE",
		"COLOMBIAPUBLIC_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["COLOMBIAPUBLIC_TEST_HOLIDAY_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["COLOMBIAPUBLIC_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
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
