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

func TestRegionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Region(nil)
		if ent == nil {
			t.Fatal("expected non-nil RegionEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := regionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "region." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set COLOMBIAPUBLIC_TEST_REGION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		regionRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.region", setup.data)))
		var regionRef01Data map[string]any
		if len(regionRef01DataRaw) > 0 {
			regionRef01Data = core.ToMapAny(regionRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = regionRef01Data

		// LIST
		regionRef01Ent := client.Region(nil)
		regionRef01Match := map[string]any{}

		regionRef01ListResult, err := regionRef01Ent.List(regionRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, regionRef01ListOk := regionRef01ListResult.([]any)
		if !regionRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", regionRef01ListResult)
		}

		// LOAD
		regionRef01MatchDt0 := map[string]any{
			"id": regionRef01Data["id"],
		}
		regionRef01DataDt0Loaded, err := regionRef01Ent.Load(regionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		regionRef01DataDt0LoadResult := core.ToMapAny(regionRef01DataDt0Loaded)
		if regionRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if regionRef01DataDt0LoadResult["id"] != regionRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func regionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "region", "RegionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read region test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse region test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"region01", "region02", "region03"},
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
	entidEnvRaw := os.Getenv("COLOMBIAPUBLIC_TEST_REGION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COLOMBIAPUBLIC_TEST_REGION_ENTID": idmap,
		"COLOMBIAPUBLIC_TEST_LIVE":      "FALSE",
		"COLOMBIAPUBLIC_TEST_EXPLAIN":   "FALSE",
		"COLOMBIAPUBLIC_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["COLOMBIAPUBLIC_TEST_REGION_ENTID"])
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
