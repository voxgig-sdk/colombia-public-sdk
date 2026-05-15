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

func TestInvasiveSpecieEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.InvasiveSpecie(nil)
		if ent == nil {
			t.Fatal("expected non-nil InvasiveSpecieEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := invasive_specieBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "invasive_specie." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set COLOMBIAPUBLIC_TEST_INVASIVE_SPECIE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		invasiveSpecieRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.invasive_specie", setup.data)))
		var invasiveSpecieRef01Data map[string]any
		if len(invasiveSpecieRef01DataRaw) > 0 {
			invasiveSpecieRef01Data = core.ToMapAny(invasiveSpecieRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = invasiveSpecieRef01Data

		// LIST
		invasiveSpecieRef01Ent := client.InvasiveSpecie(nil)
		invasiveSpecieRef01Match := map[string]any{}

		invasiveSpecieRef01ListResult, err := invasiveSpecieRef01Ent.List(invasiveSpecieRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, invasiveSpecieRef01ListOk := invasiveSpecieRef01ListResult.([]any)
		if !invasiveSpecieRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", invasiveSpecieRef01ListResult)
		}

		// LOAD
		invasiveSpecieRef01MatchDt0 := map[string]any{
			"id": invasiveSpecieRef01Data["id"],
		}
		invasiveSpecieRef01DataDt0Loaded, err := invasiveSpecieRef01Ent.Load(invasiveSpecieRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		invasiveSpecieRef01DataDt0LoadResult := core.ToMapAny(invasiveSpecieRef01DataDt0Loaded)
		if invasiveSpecieRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if invasiveSpecieRef01DataDt0LoadResult["id"] != invasiveSpecieRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func invasive_specieBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "invasive_specie", "InvasiveSpecieTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read invasive_specie test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse invasive_specie test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"invasive_specie01", "invasive_specie02", "invasive_specie03"},
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
	entidEnvRaw := os.Getenv("COLOMBIAPUBLIC_TEST_INVASIVE_SPECIE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COLOMBIAPUBLIC_TEST_INVASIVE_SPECIE_ENTID": idmap,
		"COLOMBIAPUBLIC_TEST_LIVE":      "FALSE",
		"COLOMBIAPUBLIC_TEST_EXPLAIN":   "FALSE",
		"COLOMBIAPUBLIC_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["COLOMBIAPUBLIC_TEST_INVASIVE_SPECIE_ENTID"])
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
