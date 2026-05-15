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

func TestPresidentEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.President(nil)
		if ent == nil {
			t.Fatal("expected non-nil PresidentEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := presidentBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "president." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set COLOMBIAPUBLIC_TEST_PRESIDENT_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		presidentRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.president", setup.data)))
		var presidentRef01Data map[string]any
		if len(presidentRef01DataRaw) > 0 {
			presidentRef01Data = core.ToMapAny(presidentRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = presidentRef01Data

		// LIST
		presidentRef01Ent := client.President(nil)
		presidentRef01Match := map[string]any{}

		presidentRef01ListResult, err := presidentRef01Ent.List(presidentRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, presidentRef01ListOk := presidentRef01ListResult.([]any)
		if !presidentRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", presidentRef01ListResult)
		}

		// LOAD
		presidentRef01MatchDt0 := map[string]any{
			"id": presidentRef01Data["id"],
		}
		presidentRef01DataDt0Loaded, err := presidentRef01Ent.Load(presidentRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		presidentRef01DataDt0LoadResult := core.ToMapAny(presidentRef01DataDt0Loaded)
		if presidentRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if presidentRef01DataDt0LoadResult["id"] != presidentRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func presidentBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "president", "PresidentTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read president test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse president test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"president01", "president02", "president03"},
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
	entidEnvRaw := os.Getenv("COLOMBIAPUBLIC_TEST_PRESIDENT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COLOMBIAPUBLIC_TEST_PRESIDENT_ENTID": idmap,
		"COLOMBIAPUBLIC_TEST_LIVE":      "FALSE",
		"COLOMBIAPUBLIC_TEST_EXPLAIN":   "FALSE",
		"COLOMBIAPUBLIC_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["COLOMBIAPUBLIC_TEST_PRESIDENT_ENTID"])
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
