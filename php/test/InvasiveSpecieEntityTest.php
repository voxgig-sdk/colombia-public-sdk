<?php
declare(strict_types=1);

// InvasiveSpecie entity test

require_once __DIR__ . '/../colombiapublic_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class InvasiveSpecieEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = ColombiaPublicSDK::test(null, null);
        $ent = $testsdk->InvasiveSpecie(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = invasive_specie_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "invasive_specie." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set COLOMBIAPUBLIC_TEST_INVASIVE_SPECIE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $invasive_specie_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.invasive_specie")));
        $invasive_specie_ref01_data = null;
        if (count($invasive_specie_ref01_data_raw) > 0) {
            $invasive_specie_ref01_data = Helpers::to_map($invasive_specie_ref01_data_raw[0][1]);
        }

        // LIST
        $invasive_specie_ref01_ent = $client->InvasiveSpecie(null);
        $invasive_specie_ref01_match = [];

        [$invasive_specie_ref01_list_result, $err] = $invasive_specie_ref01_ent->list($invasive_specie_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($invasive_specie_ref01_list_result);

        // LOAD
        $invasive_specie_ref01_match_dt0 = [
            "id" => $invasive_specie_ref01_data["id"],
        ];
        [$invasive_specie_ref01_data_dt0_loaded, $err] = $invasive_specie_ref01_ent->load($invasive_specie_ref01_match_dt0, null);
        $this->assertNull($err);
        $invasive_specie_ref01_data_dt0_load_result = Helpers::to_map($invasive_specie_ref01_data_dt0_loaded);
        $this->assertNotNull($invasive_specie_ref01_data_dt0_load_result);
        $this->assertEquals($invasive_specie_ref01_data_dt0_load_result["id"], $invasive_specie_ref01_data["id"]);

    }
}

function invasive_specie_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/invasive_specie/InvasiveSpecieTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = ColombiaPublicSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["invasive_specie01", "invasive_specie02", "invasive_specie03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("COLOMBIAPUBLIC_TEST_INVASIVE_SPECIE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "COLOMBIAPUBLIC_TEST_INVASIVE_SPECIE_ENTID" => $idmap,
        "COLOMBIAPUBLIC_TEST_LIVE" => "FALSE",
        "COLOMBIAPUBLIC_TEST_EXPLAIN" => "FALSE",
        "COLOMBIAPUBLIC_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["COLOMBIAPUBLIC_TEST_INVASIVE_SPECIE_ENTID"]);
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
