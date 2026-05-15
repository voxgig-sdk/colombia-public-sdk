<?php
declare(strict_types=1);

// NaturalArea entity test

require_once __DIR__ . '/../colombiapublic_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class NaturalAreaEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = ColombiaPublicSDK::test(null, null);
        $ent = $testsdk->NaturalArea(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = natural_area_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "natural_area." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set COLOMBIAPUBLIC_TEST_NATURAL_AREA_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $natural_area_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.natural_area")));
        $natural_area_ref01_data = null;
        if (count($natural_area_ref01_data_raw) > 0) {
            $natural_area_ref01_data = Helpers::to_map($natural_area_ref01_data_raw[0][1]);
        }

        // LIST
        $natural_area_ref01_ent = $client->NaturalArea(null);
        $natural_area_ref01_match = [];

        [$natural_area_ref01_list_result, $err] = $natural_area_ref01_ent->list($natural_area_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($natural_area_ref01_list_result);

        // LOAD
        $natural_area_ref01_match_dt0 = [
            "id" => $natural_area_ref01_data["id"],
        ];
        [$natural_area_ref01_data_dt0_loaded, $err] = $natural_area_ref01_ent->load($natural_area_ref01_match_dt0, null);
        $this->assertNull($err);
        $natural_area_ref01_data_dt0_load_result = Helpers::to_map($natural_area_ref01_data_dt0_loaded);
        $this->assertNotNull($natural_area_ref01_data_dt0_load_result);
        $this->assertEquals($natural_area_ref01_data_dt0_load_result["id"], $natural_area_ref01_data["id"]);

    }
}

function natural_area_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/natural_area/NaturalAreaTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = ColombiaPublicSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["natural_area01", "natural_area02", "natural_area03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("COLOMBIAPUBLIC_TEST_NATURAL_AREA_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "COLOMBIAPUBLIC_TEST_NATURAL_AREA_ENTID" => $idmap,
        "COLOMBIAPUBLIC_TEST_LIVE" => "FALSE",
        "COLOMBIAPUBLIC_TEST_EXPLAIN" => "FALSE",
        "COLOMBIAPUBLIC_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["COLOMBIAPUBLIC_TEST_NATURAL_AREA_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["COLOMBIAPUBLIC_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["COLOMBIAPUBLIC_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new ColombiaPublicSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["COLOMBIAPUBLIC_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["COLOMBIAPUBLIC_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
