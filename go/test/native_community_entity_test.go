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

func TestNativeCommunityEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.NativeCommunity(nil)
		if ent == nil {
			t.Fatal("expected non-nil NativeCommunityEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := native_communityBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "native_community." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set COLOMBIAPUBLIC_TEST_NATIVE_COMMUNITY_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		nativeCommunityRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.native_community", setup.data)))
		var nativeCommunityRef01Data map[string]any
		if len(nativeCommunityRef01DataRaw) > 0 {
			nativeCommunityRef01Data = core.ToMapAny(nativeCommunityRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = nativeCommunityRef01Data

		// LIST
		nativeCommunityRef01Ent := client.NativeCommunity(nil)
		nativeCommunityRef01Match := map[string]any{}

		nativeCommunityRef01ListResult, err := nativeCommunityRef01Ent.List(nativeCommunityRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, nativeCommunityRef01ListOk := nativeCommunityRef01ListResult.([]any)
		if !nativeCommunityRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", nativeCommunityRef01ListResult)
		}

		// LOAD
		nativeCommunityRef01MatchDt0 := map[string]any{
			"id": nativeCommunityRef01Data["id"],
		}
		nativeCommunityRef01DataDt0Loaded, err := nativeCommunityRef01Ent.Load(nativeCommunityRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		nativeCommunityRef01DataDt0LoadResult := core.ToMapAny(nativeCommunityRef01DataDt0Loaded)
		if nativeCommunityRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if nativeCommunityRef01DataDt0LoadResult["id"] != nativeCommunityRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func native_communityBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "native_community", "NativeCommunityTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read native_community test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse native_community test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"native_community01", "native_community02", "native_community03"},
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
	entidEnvRaw := os.Getenv("COLOMBIAPUBLIC_TEST_NATIVE_COMMUNITY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COLOMBIAPUBLIC_TEST_NATIVE_COMMUNITY_ENTID": idmap,
		"COLOMBIAPUBLIC_TEST_LIVE":      "FALSE",
		"COLOMBIAPUBLIC_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["COLOMBIAPUBLIC_TEST_NATIVE_COMMUNITY_ENTID"])
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
