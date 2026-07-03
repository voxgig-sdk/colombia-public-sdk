<?php
declare(strict_types=1);

// Radio entity test

require_once __DIR__ . '/../colombiapublic_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class RadioEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = ColombiaPublicSDK::test(null, null);
        $ent = $testsdk->Radio(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = radio_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "radio." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set COLOMBIAPUBLIC_TEST_RADIO_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $radio_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.radio")));
        $radio_ref01_data = null;
        if (count($radio_ref01_data_raw) > 0) {
            $radio_ref01_data = Helpers::to_map($radio_ref01_data_raw[0][1]);
        }

        // LIST
        $radio_ref01_ent = $client->Radio(null);
        $radio_ref01_match = [];

        [$radio_ref01_list_result, $err] = $radio_ref01_ent->list($radio_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($radio_ref01_list_result);

        // LOAD
        $radio_ref01_match_dt0 = [
            "id" => $radio_ref01_data["id"],
        ];
        [$radio_ref01_data_dt0_loaded, $err] = $radio_ref01_ent->load($radio_ref01_match_dt0, null);
        $this->assertNull($err);
        $radio_ref01_data_dt0_load_result = Helpers::to_map($radio_ref01_data_dt0_loaded);
        $this->assertNotNull($radio_ref01_data_dt0_load_result);
        $this->assertEquals($radio_ref01_data_dt0_load_result["id"], $radio_ref01_data["id"]);

    }
}

function radio_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/radio/RadioTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = ColombiaPublicSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["radio01", "radio02", "radio03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("COLOMBIAPUBLIC_TEST_RADIO_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "COLOMBIAPUBLIC_TEST_RADIO_ENTID" => $idmap,
        "COLOMBIAPUBLIC_TEST_LIVE" => "FALSE",
        "COLOMBIAPUBLIC_TEST_EXPLAIN" => "FALSE",
        "COLOMBIAPUBLIC_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["COLOMBIAPUBLIC_TEST_RADIO_ENTID"]);
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
