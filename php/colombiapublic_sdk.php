<?php
declare(strict_types=1);

// ColombiaPublic SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

class ColombiaPublicSDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new ColombiaPublicUtility();
        $this->_utility = $utility;

        $config = ColombiaPublicConfig::make_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Add features from config.
        $feature_opts = ColombiaPublicHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $items = Struct::items($feature_opts);
            if ($items) {
                foreach ($items as $item) {
                    $fname = $item[0];
                    $fopts = ColombiaPublicHelpers::to_map($item[1]);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        ($utility->feature_add)($this->_rootctx, ColombiaPublicFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        $extend_val = Struct::getprop($this->options, "extend");
        if (is_array($extend_val)) {
            foreach ($extend_val as $f) {
                if (is_object($f) && method_exists($f, 'get_name')) {
                    ($utility->feature_add)($this->_rootctx, $f);
                }
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return ColombiaPublicUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = ColombiaPublicHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = ColombiaPublicHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = ColombiaPublicHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new ColombiaPublicSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    public function direct(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = ColombiaPublicHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = ColombiaPublicHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }


    private $_airport = null;

    // Idiomatic facade: $client->airport()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Airport() (PHP method
    // names are case-insensitive).
    public function airport($data = null)
    {
        require_once __DIR__ . '/entity/airport_entity.php';
        if ($data === null) {
            if ($this->_airport === null) {
                $this->_airport = new AirportEntity($this, null);
            }
            return $this->_airport;
        }
        return new AirportEntity($this, $data);
    }


    private $_category_natural_area = null;

    // Idiomatic facade: $client->category_natural_area()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias CategoryNaturalArea() (PHP method
    // names are case-insensitive).
    public function category_natural_area($data = null)
    {
        require_once __DIR__ . '/entity/category_natural_area_entity.php';
        if ($data === null) {
            if ($this->_category_natural_area === null) {
                $this->_category_natural_area = new CategoryNaturalAreaEntity($this, null);
            }
            return $this->_category_natural_area;
        }
        return new CategoryNaturalAreaEntity($this, $data);
    }


    private $_constitution_article = null;

    // Idiomatic facade: $client->constitution_article()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias ConstitutionArticle() (PHP method
    // names are case-insensitive).
    public function constitution_article($data = null)
    {
        require_once __DIR__ . '/entity/constitution_article_entity.php';
        if ($data === null) {
            if ($this->_constitution_article === null) {
                $this->_constitution_article = new ConstitutionArticleEntity($this, null);
            }
            return $this->_constitution_article;
        }
        return new ConstitutionArticleEntity($this, $data);
    }


    private $_country = null;

    // Idiomatic facade: $client->country()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Country() (PHP method
    // names are case-insensitive).
    public function country($data = null)
    {
        require_once __DIR__ . '/entity/country_entity.php';
        if ($data === null) {
            if ($this->_country === null) {
                $this->_country = new CountryEntity($this, null);
            }
            return $this->_country;
        }
        return new CountryEntity($this, $data);
    }


    private $_department = null;

    // Idiomatic facade: $client->department()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Department() (PHP method
    // names are case-insensitive).
    public function department($data = null)
    {
        require_once __DIR__ . '/entity/department_entity.php';
        if ($data === null) {
            if ($this->_department === null) {
                $this->_department = new DepartmentEntity($this, null);
            }
            return $this->_department;
        }
        return new DepartmentEntity($this, $data);
    }


    private $_holiday = null;

    // Idiomatic facade: $client->holiday()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Holiday() (PHP method
    // names are case-insensitive).
    public function holiday($data = null)
    {
        require_once __DIR__ . '/entity/holiday_entity.php';
        if ($data === null) {
            if ($this->_holiday === null) {
                $this->_holiday = new HolidayEntity($this, null);
            }
            return $this->_holiday;
        }
        return new HolidayEntity($this, $data);
    }


    private $_invasive_specie = null;

    // Idiomatic facade: $client->invasive_specie()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias InvasiveSpecie() (PHP method
    // names are case-insensitive).
    public function invasive_specie($data = null)
    {
        require_once __DIR__ . '/entity/invasive_specie_entity.php';
        if ($data === null) {
            if ($this->_invasive_specie === null) {
                $this->_invasive_specie = new InvasiveSpecieEntity($this, null);
            }
            return $this->_invasive_specie;
        }
        return new InvasiveSpecieEntity($this, $data);
    }


    private $_map = null;

    // Idiomatic facade: $client->map()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Map() (PHP method
    // names are case-insensitive).
    public function map($data = null)
    {
        require_once __DIR__ . '/entity/map_entity.php';
        if ($data === null) {
            if ($this->_map === null) {
                $this->_map = new MapEntity($this, null);
            }
            return $this->_map;
        }
        return new MapEntity($this, $data);
    }


    private $_native_community = null;

    // Idiomatic facade: $client->native_community()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias NativeCommunity() (PHP method
    // names are case-insensitive).
    public function native_community($data = null)
    {
        require_once __DIR__ . '/entity/native_community_entity.php';
        if ($data === null) {
            if ($this->_native_community === null) {
                $this->_native_community = new NativeCommunityEntity($this, null);
            }
            return $this->_native_community;
        }
        return new NativeCommunityEntity($this, $data);
    }


    private $_natural_area = null;

    // Idiomatic facade: $client->natural_area()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias NaturalArea() (PHP method
    // names are case-insensitive).
    public function natural_area($data = null)
    {
        require_once __DIR__ . '/entity/natural_area_entity.php';
        if ($data === null) {
            if ($this->_natural_area === null) {
                $this->_natural_area = new NaturalAreaEntity($this, null);
            }
            return $this->_natural_area;
        }
        return new NaturalAreaEntity($this, $data);
    }


    private $_president = null;

    // Idiomatic facade: $client->president()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias President() (PHP method
    // names are case-insensitive).
    public function president($data = null)
    {
        require_once __DIR__ . '/entity/president_entity.php';
        if ($data === null) {
            if ($this->_president === null) {
                $this->_president = new PresidentEntity($this, null);
            }
            return $this->_president;
        }
        return new PresidentEntity($this, $data);
    }


    private $_radio = null;

    // Idiomatic facade: $client->radio()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Radio() (PHP method
    // names are case-insensitive).
    public function radio($data = null)
    {
        require_once __DIR__ . '/entity/radio_entity.php';
        if ($data === null) {
            if ($this->_radio === null) {
                $this->_radio = new RadioEntity($this, null);
            }
            return $this->_radio;
        }
        return new RadioEntity($this, $data);
    }


    private $_region = null;

    // Idiomatic facade: $client->region()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Region() (PHP method
    // names are case-insensitive).
    public function region($data = null)
    {
        require_once __DIR__ . '/entity/region_entity.php';
        if ($data === null) {
            if ($this->_region === null) {
                $this->_region = new RegionEntity($this, null);
            }
            return $this->_region;
        }
        return new RegionEntity($this, $data);
    }


    private $_touristic_attraction = null;

    // Idiomatic facade: $client->touristic_attraction()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias TouristicAttraction() (PHP method
    // names are case-insensitive).
    public function touristic_attraction($data = null)
    {
        require_once __DIR__ . '/entity/touristic_attraction_entity.php';
        if ($data === null) {
            if ($this->_touristic_attraction === null) {
                $this->_touristic_attraction = new TouristicAttractionEntity($this, null);
            }
            return $this->_touristic_attraction;
        }
        return new TouristicAttractionEntity($this, $data);
    }


    private $_typical_dish = null;

    // Idiomatic facade: $client->typical_dish()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias TypicalDish() (PHP method
    // names are case-insensitive).
    public function typical_dish($data = null)
    {
        require_once __DIR__ . '/entity/typical_dish_entity.php';
        if ($data === null) {
            if ($this->_typical_dish === null) {
                $this->_typical_dish = new TypicalDishEntity($this, null);
            }
            return $this->_typical_dish;
        }
        return new TypicalDishEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new ColombiaPublicSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
