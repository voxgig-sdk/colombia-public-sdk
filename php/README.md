# ColombiaPublic PHP SDK



The PHP SDK for the ColombiaPublic API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Airport()` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/colombia-public-sdk/releases](https://github.com/voxgig-sdk/colombia-public-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'colombiapublic_sdk.php';

$client = new ColombiaPublicSDK();
```

### 2. List airport records

```php
try {
    // list() returns an array of Airport records — iterate directly.
    $airports = $client->Airport()->list();
    foreach ($airports as $item) {
        echo $item["id"] . " " . $item["city_id"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load an airport

```php
try {
    // load() returns the bare Airport record (throws on error).
    $airport = $client->Airport()->load(["id" => "example_id"]);
    print_r($airport);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $airports = $client->Airport()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = ColombiaPublicSDK::test([
    "entity" => ["airport" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the bare mock record (throws on error).
$airport = $client->Airport()->list();
print_r($airport);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new ColombiaPublicSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
COLOMBIA_PUBLIC_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### ColombiaPublicSDK

```php
require_once 'colombiapublic_sdk.php';
$client = new ColombiaPublicSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = ColombiaPublicSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### ColombiaPublicSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Airport` | `($data): AirportEntity` | Create an Airport entity instance. |
| `CategoryNaturalArea` | `($data): CategoryNaturalAreaEntity` | Create a CategoryNaturalArea entity instance. |
| `ConstitutionArticle` | `($data): ConstitutionArticleEntity` | Create a ConstitutionArticle entity instance. |
| `Country` | `($data): CountryEntity` | Create a Country entity instance. |
| `Department` | `($data): DepartmentEntity` | Create a Department entity instance. |
| `Holiday` | `($data): HolidayEntity` | Create a Holiday entity instance. |
| `InvasiveSpecie` | `($data): InvasiveSpecieEntity` | Create an InvasiveSpecie entity instance. |
| `Map` | `($data): MapEntity` | Create a Map entity instance. |
| `NativeCommunity` | `($data): NativeCommunityEntity` | Create a NativeCommunity entity instance. |
| `NaturalArea` | `($data): NaturalAreaEntity` | Create a NaturalArea entity instance. |
| `President` | `($data): PresidentEntity` | Create a President entity instance. |
| `Radio` | `($data): RadioEntity` | Create a Radio entity instance. |
| `Region` | `($data): RegionEntity` | Create a Region entity instance. |
| `TouristicAttraction` | `($data): TouristicAttractionEntity` | Create a TouristicAttraction entity instance. |
| `TypicalDish` | `($data): TypicalDishEntity` | Create a TypicalDish entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### Airport

| Field | Description |
| --- | --- |
| `city_id` |  |
| `code` |  |
| `department_id` |  |
| `id` |  |
| `latitude` |  |
| `longitude` |  |
| `name` |  |
| `type` |  |

Operations: List, Load.

API path: `/Airport`

#### CategoryNaturalArea

| Field | Description |
| --- | --- |
| `description` |  |
| `id` |  |
| `name` |  |

Operations: List.

API path: `/CategoryNaturalArea`

#### ConstitutionArticle

| Field | Description |
| --- | --- |
| `article_number` |  |
| `chapter` |  |
| `description` |  |
| `id` |  |
| `title` |  |

Operations: List, Load.

API path: `/ConstitutionArticle`

#### Country

| Field | Description |
| --- | --- |
| `capital` |  |
| `currency` |  |
| `flag` |  |
| `id` |  |
| `language` |  |
| `name` |  |
| `population` |  |
| `surface` |  |

Operations: List.

API path: `/Country/Colombia`

#### Department

| Field | Description |
| --- | --- |
| `city_capital` |  |
| `description` |  |
| `id` |  |
| `municipality` |  |
| `name` |  |
| `population` |  |
| `region_id` |  |
| `surface` |  |

Operations: List, Load.

API path: `/Department`

#### Holiday

| Field | Description |
| --- | --- |
| `date` |  |
| `description` |  |
| `id` |  |
| `name` |  |
| `type` |  |

Operations: List, Load.

API path: `/Holiday`

#### InvasiveSpecie

| Field | Description |
| --- | --- |
| `id` |  |
| `impact` |  |
| `manage` |  |
| `name` |  |
| `scientific_name` |  |
| `url_image` |  |

Operations: List, Load.

API path: `/InvasiveSpecie`

#### Map

| Field | Description |
| --- | --- |
| `department_id` |  |
| `description` |  |
| `id` |  |
| `name` |  |
| `url_image` |  |

Operations: List.

API path: `/Map`

#### NativeCommunity

| Field | Description |
| --- | --- |
| `department_id` |  |
| `description` |  |
| `id` |  |
| `name` |  |
| `population` |  |

Operations: List, Load.

API path: `/NativeCommunity`

#### NaturalArea

| Field | Description |
| --- | --- |
| `area_group_id` |  |
| `category_natural_area_id` |  |
| `department_id` |  |
| `description` |  |
| `id` |  |
| `land_area` |  |
| `maritime_area` |  |
| `name` |  |

Operations: List, Load.

API path: `/NaturalArea`

#### President

| Field | Description |
| --- | --- |
| `description` |  |
| `end_period_date` |  |
| `id` |  |
| `image` |  |
| `name` |  |
| `political_party` |  |
| `start_period_date` |  |

Operations: List, Load.

API path: `/President`

#### Radio

| Field | Description |
| --- | --- |
| `band` |  |
| `frequency` |  |
| `id` |  |
| `name` |  |
| `url` |  |

Operations: List, Load.

API path: `/Radio`

#### Region

| Field | Description |
| --- | --- |
| `department` |  |
| `description` |  |
| `id` |  |
| `name` |  |

Operations: List, Load.

API path: `/Region`

#### TouristicAttraction

| Field | Description |
| --- | --- |
| `city` |  |
| `description` |  |
| `id` |  |
| `image` |  |
| `latitude` |  |
| `longitude` |  |
| `name` |  |

Operations: List, Load.

API path: `/TouristicAttraction`

#### TypicalDish

| Field | Description |
| --- | --- |
| `department_id` |  |
| `description` |  |
| `id` |  |
| `ingredient` |  |
| `name` |  |
| `url_image` |  |

Operations: List, Load.

API path: `/TypicalDish`



## Entities


### Airport

Create an instance: `$airport = $client->Airport();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city_id` | `int` |  |
| `code` | `string` |  |
| `department_id` | `int` |  |
| `id` | `int` |  |
| `latitude` | `float` |  |
| `longitude` | `float` |  |
| `name` | `string` |  |
| `type` | `string` |  |

#### Example: Load

```php
// load() returns the bare Airport record (throws on error).
$airport = $client->Airport()->load(["id" => "airport_id"]);
```

#### Example: List

```php
// list() returns an array of Airport records (throws on error).
$airports = $client->Airport()->list();
```


### CategoryNaturalArea

Create an instance: `$category_natural_area = $client->CategoryNaturalArea();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |

#### Example: List

```php
// list() returns an array of CategoryNaturalArea records (throws on error).
$category_natural_areas = $client->CategoryNaturalArea()->list();
```


### ConstitutionArticle

Create an instance: `$constitution_article = $client->ConstitutionArticle();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `article_number` | `int` |  |
| `chapter` | `string` |  |
| `description` | `string` |  |
| `id` | `int` |  |
| `title` | `string` |  |

#### Example: Load

```php
// load() returns the bare ConstitutionArticle record (throws on error).
$constitution_article = $client->ConstitutionArticle()->load(["id" => "constitution_article_id"]);
```

#### Example: List

```php
// list() returns an array of ConstitutionArticle records (throws on error).
$constitution_articles = $client->ConstitutionArticle()->list();
```


### Country

Create an instance: `$country = $client->Country();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capital` | `string` |  |
| `currency` | `string` |  |
| `flag` | `string` |  |
| `id` | `int` |  |
| `language` | `array` |  |
| `name` | `string` |  |
| `population` | `int` |  |
| `surface` | `float` |  |

#### Example: List

```php
// list() returns an array of Country records (throws on error).
$countrys = $client->Country()->list();
```


### Department

Create an instance: `$department = $client->Department();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city_capital` | `string` |  |
| `description` | `string` |  |
| `id` | `int` |  |
| `municipality` | `int` |  |
| `name` | `string` |  |
| `population` | `int` |  |
| `region_id` | `int` |  |
| `surface` | `float` |  |

#### Example: Load

```php
// load() returns the bare Department record (throws on error).
$department = $client->Department()->load(["id" => "department_id"]);
```

#### Example: List

```php
// list() returns an array of Department records (throws on error).
$departments = $client->Department()->list();
```


### Holiday

Create an instance: `$holiday = $client->Holiday();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | `string` |  |
| `description` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `type` | `string` |  |

#### Example: Load

```php
// load() returns the bare Holiday record (throws on error).
$holiday = $client->Holiday()->load(["id" => "holiday_id"]);
```

#### Example: List

```php
// list() returns an array of Holiday records (throws on error).
$holidays = $client->Holiday()->list();
```


### InvasiveSpecie

Create an instance: `$invasive_specie = $client->InvasiveSpecie();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `int` |  |
| `impact` | `string` |  |
| `manage` | `string` |  |
| `name` | `string` |  |
| `scientific_name` | `string` |  |
| `url_image` | `string` |  |

#### Example: Load

```php
// load() returns the bare InvasiveSpecie record (throws on error).
$invasive_specie = $client->InvasiveSpecie()->load(["id" => "invasive_specie_id"]);
```

#### Example: List

```php
// list() returns an array of InvasiveSpecie records (throws on error).
$invasive_species = $client->InvasiveSpecie()->list();
```


### Map

Create an instance: `$map = $client->Map();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `department_id` | `int` |  |
| `description` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `url_image` | `array` |  |

#### Example: List

```php
// list() returns an array of Map records (throws on error).
$maps = $client->Map()->list();
```


### NativeCommunity

Create an instance: `$native_community = $client->NativeCommunity();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `department_id` | `int` |  |
| `description` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `population` | `int` |  |

#### Example: Load

```php
// load() returns the bare NativeCommunity record (throws on error).
$native_community = $client->NativeCommunity()->load(["id" => "native_community_id"]);
```

#### Example: List

```php
// list() returns an array of NativeCommunity records (throws on error).
$native_communitys = $client->NativeCommunity()->list();
```


### NaturalArea

Create an instance: `$natural_area = $client->NaturalArea();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `area_group_id` | `int` |  |
| `category_natural_area_id` | `int` |  |
| `department_id` | `int` |  |
| `description` | `string` |  |
| `id` | `int` |  |
| `land_area` | `float` |  |
| `maritime_area` | `float` |  |
| `name` | `string` |  |

#### Example: Load

```php
// load() returns the bare NaturalArea record (throws on error).
$natural_area = $client->NaturalArea()->load(["id" => "natural_area_id"]);
```

#### Example: List

```php
// list() returns an array of NaturalArea records (throws on error).
$natural_areas = $client->NaturalArea()->list();
```


### President

Create an instance: `$president = $client->President();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `end_period_date` | `string` |  |
| `id` | `int` |  |
| `image` | `string` |  |
| `name` | `string` |  |
| `political_party` | `string` |  |
| `start_period_date` | `string` |  |

#### Example: Load

```php
// load() returns the bare President record (throws on error).
$president = $client->President()->load(["id" => "president_id"]);
```

#### Example: List

```php
// list() returns an array of President records (throws on error).
$presidents = $client->President()->list();
```


### Radio

Create an instance: `$radio = $client->Radio();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `band` | `string` |  |
| `frequency` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```php
// load() returns the bare Radio record (throws on error).
$radio = $client->Radio()->load(["id" => "radio_id"]);
```

#### Example: List

```php
// list() returns an array of Radio records (throws on error).
$radios = $client->Radio()->list();
```


### Region

Create an instance: `$region = $client->Region();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `department` | `array` |  |
| `description` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |

#### Example: Load

```php
// load() returns the bare Region record (throws on error).
$region = $client->Region()->load(["id" => "region_id"]);
```

#### Example: List

```php
// list() returns an array of Region records (throws on error).
$regions = $client->Region()->list();
```


### TouristicAttraction

Create an instance: `$touristic_attraction = $client->TouristicAttraction();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `string` |  |
| `description` | `string` |  |
| `id` | `int` |  |
| `image` | `array` |  |
| `latitude` | `float` |  |
| `longitude` | `float` |  |
| `name` | `string` |  |

#### Example: Load

```php
// load() returns the bare TouristicAttraction record (throws on error).
$touristic_attraction = $client->TouristicAttraction()->load(["id" => "touristic_attraction_id"]);
```

#### Example: List

```php
// list() returns an array of TouristicAttraction records (throws on error).
$touristic_attractions = $client->TouristicAttraction()->list();
```


### TypicalDish

Create an instance: `$typical_dish = $client->TypicalDish();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `department_id` | `int` |  |
| `description` | `string` |  |
| `id` | `int` |  |
| `ingredient` | `array` |  |
| `name` | `string` |  |
| `url_image` | `string` |  |

#### Example: Load

```php
// load() returns the bare TypicalDish record (throws on error).
$typical_dish = $client->TypicalDish()->load(["id" => "typical_dish_id"]);
```

#### Example: List

```php
// list() returns an array of TypicalDish records (throws on error).
$typical_dishs = $client->TypicalDish()->list();
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── colombiapublic_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`colombiapublic_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$airport = $client->Airport();
$airport->list();

// $airport->data_get() now returns the airport data from the last list
// $airport->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
