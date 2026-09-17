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
    // list() returns entity instances; data_get() reads each record.
    $airports = $client->Airport()->list();
    foreach ($airports as $record) {
        $item = $record->data_get();
        echo $item["id"] . " " . $item["cityId"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load an airport

```php
try {
    // load() returns the ENTITY — call data_get() for the Airport record (throws on error).
    $airport = $client->Airport()->load(["id" => 1]);
    print_r($airport->data_get());
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $typicaldishs = $client->TypicalDish()->list();
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
    "entity" => ["typicaldish" => ["test01" => ["id" => "test01"]]],
]);

// list() returns entity instances (throws on error);
// call data_get() for the mock record.
$typicaldish = $client->TypicalDish()->list();
print_r(array_map(fn($item) => $item->data_get(), $typicaldish));
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

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
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
| `cityId` | City ID |
| `code` | IATA code |
| `departmentId` | Department ID |
| `id` | Airport ID |
| `latitude` | Latitude coordinate |
| `longitude` | Longitude coordinate |
| `name` | Airport name |
| `type` | Airport type |

Operations: List, Load.

API path: `/Airport`

#### CategoryNaturalArea

| Field | Description |
| --- | --- |
| `description` | Category description |
| `id` | Category ID |
| `name` | Category name |

Operations: List.

API path: `/CategoryNaturalArea`

#### ConstitutionArticle

| Field | Description |
| --- | --- |
| `articleNumber` | Article number |
| `chapter` | Constitution chapter |
| `description` | Article content |
| `id` | Article ID |
| `title` | Article title |

Operations: List, Load.

API path: `/ConstitutionArticle`

#### Country

| Field | Description |
| --- | --- |
| `capital` | Capital city |
| `currency` | Currency |
| `flag` | URL to flag image |
| `id` | Country ID |
| `languages` | Official languages |
| `name` | Country name |
| `population` | Total population |
| `surface` | Surface area in square kilometers |

Operations: List.

API path: `/Country/Colombia`

#### Department

| Field | Description |
| --- | --- |
| `cityCapital` | Capital city of the department |
| `description` | Department description |
| `id` | Department ID |
| `municipalities` | Number of municipalities |
| `name` | Department name |
| `population` | Population |
| `regionId` | Region ID |
| `surface` | Surface area |

Operations: List, Load.

API path: `/Department`

#### Holiday

| Field | Description |
| --- | --- |
| `date` | Holiday date |
| `description` | Holiday description |
| `id` | Holiday ID |
| `name` | Holiday name |
| `type` | Holiday type (religious, civic, etc.) |

Operations: List, Load.

API path: `/Holiday`

#### InvasiveSpecie

| Field | Description |
| --- | --- |
| `id` | Invasive species ID |
| `impact` | Environmental impact |
| `manage` | Management strategies |
| `name` | Species name |
| `scientificName` | Scientific name |
| `urlImage` | URL to species image |

Operations: List, Load.

API path: `/InvasiveSpecie`

#### Map

| Field | Description |
| --- | --- |
| `departmentId` | Department ID |
| `description` | Map description |
| `id` | Map ID |
| `name` | Map name |
| `urlImages` | URLs to map images |

Operations: List.

API path: `/Map`

#### NativeCommunity

| Field | Description |
| --- | --- |
| `departmentId` | Department ID |
| `description` | Community description |
| `id` | Native community ID |
| `name` | Community name |
| `population` | Population |

Operations: List, Load.

API path: `/NativeCommunity`

#### NaturalArea

| Field | Description |
| --- | --- |
| `areaGroupId` | Area group ID |
| `categoryNaturalAreaId` | Category ID |
| `departmentId` | Department ID |
| `description` | Natural area description |
| `id` | Natural area ID |
| `landArea` | Land area in hectares |
| `maritimeArea` | Maritime area in hectares |
| `name` | Natural area name |

Operations: List, Load.

API path: `/NaturalArea`

#### President

| Field | Description |
| --- | --- |
| `description` | Biography and description |
| `endPeriodDate` | End date of presidency |
| `id` | President ID |
| `image` | URL to president image |
| `name` | President name |
| `politicalParty` | Political party |
| `startPeriodDate` | Start date of presidency |

Operations: List, Load.

API path: `/President`

#### Radio

| Field | Description |
| --- | --- |
| `band` | Broadcasting band (AM/FM) |
| `frequency` | Broadcasting frequency |
| `id` | Radio station ID |
| `name` | Radio station name |
| `url` | Station URL |

Operations: List, Load.

API path: `/Radio`

#### Region

| Field | Description |
| --- | --- |
| `departments` | List of departments in the region |
| `description` | Region description |
| `id` | Region ID |
| `name` | Region name |

Operations: List, Load.

API path: `/Region`

#### TouristicAttraction

| Field | Description |
| --- | --- |
| `city` | City where the attraction is located |
| `description` | Attraction description |
| `id` | Touristic attraction ID |
| `images` | List of image URLs |
| `latitude` | Latitude coordinate |
| `longitude` | Longitude coordinate |
| `name` | Attraction name |

Operations: List, Load.

API path: `/TouristicAttraction`

#### TypicalDish

| Field | Description |
| --- | --- |
| `departmentId` | Department ID |
| `description` | Dish description |
| `id` | Typical dish ID |
| `ingredients` | List of ingredients |
| `name` | Dish name |
| `urlImage` | URL to dish image |

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
| `cityId` | `int` | City ID |
| `code` | `string` | IATA code |
| `departmentId` | `int` | Department ID |
| `id` | `int` | Airport ID |
| `latitude` | `float` | Latitude coordinate |
| `longitude` | `float` | Longitude coordinate |
| `name` | `string` | Airport name |
| `type` | `string` | Airport type |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Airport record (throws on error).
$airport = $client->Airport()->load(["id" => 1]);
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
| `description` | `string` | Category description |
| `id` | `int` | Category ID |
| `name` | `string` | Category name |

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
| `articleNumber` | `int` | Article number |
| `chapter` | `string` | Constitution chapter |
| `description` | `string` | Article content |
| `id` | `int` | Article ID |
| `title` | `string` | Article title |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ConstitutionArticle record (throws on error).
$constitution_article = $client->ConstitutionArticle()->load(["id" => 1]);
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
| `capital` | `string` | Capital city |
| `currency` | `string` | Currency |
| `flag` | `string` | URL to flag image |
| `id` | `int` | Country ID |
| `languages` | `array` | Official languages |
| `name` | `string` | Country name |
| `population` | `int` | Total population |
| `surface` | `float` | Surface area in square kilometers |

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
| `cityCapital` | `string` | Capital city of the department |
| `description` | `string` | Department description |
| `id` | `int` | Department ID |
| `municipalities` | `int` | Number of municipalities |
| `name` | `string` | Department name |
| `population` | `int` | Population |
| `regionId` | `int` | Region ID |
| `surface` | `float` | Surface area |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Department record (throws on error).
$department = $client->Department()->load(["id" => 1]);
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
| `date` | `string` | Holiday date |
| `description` | `string` | Holiday description |
| `id` | `int` | Holiday ID |
| `name` | `string` | Holiday name |
| `type` | `string` | Holiday type (religious, civic, etc.) |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Holiday record (throws on error).
$holiday = $client->Holiday()->load(["id" => 1]);
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
| `id` | `int` | Invasive species ID |
| `impact` | `string` | Environmental impact |
| `manage` | `string` | Management strategies |
| `name` | `string` | Species name |
| `scientificName` | `string` | Scientific name |
| `urlImage` | `string` | URL to species image |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the InvasiveSpecie record (throws on error).
$invasive_specie = $client->InvasiveSpecie()->load(["id" => 1]);
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
| `departmentId` | `int` | Department ID |
| `description` | `string` | Map description |
| `id` | `int` | Map ID |
| `name` | `string` | Map name |
| `urlImages` | `array` | URLs to map images |

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
| `departmentId` | `int` | Department ID |
| `description` | `string` | Community description |
| `id` | `int` | Native community ID |
| `name` | `string` | Community name |
| `population` | `int` | Population |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the NativeCommunity record (throws on error).
$native_community = $client->NativeCommunity()->load(["id" => 1]);
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
| `areaGroupId` | `int` | Area group ID |
| `categoryNaturalAreaId` | `int` | Category ID |
| `departmentId` | `int` | Department ID |
| `description` | `string` | Natural area description |
| `id` | `int` | Natural area ID |
| `landArea` | `float` | Land area in hectares |
| `maritimeArea` | `float` | Maritime area in hectares |
| `name` | `string` | Natural area name |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the NaturalArea record (throws on error).
$natural_area = $client->NaturalArea()->load(["id" => 1]);
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
| `description` | `string` | Biography and description |
| `endPeriodDate` | `string` | End date of presidency |
| `id` | `int` | President ID |
| `image` | `string` | URL to president image |
| `name` | `string` | President name |
| `politicalParty` | `string` | Political party |
| `startPeriodDate` | `string` | Start date of presidency |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the President record (throws on error).
$president = $client->President()->load(["id" => 1]);
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
| `band` | `string` | Broadcasting band (AM/FM) |
| `frequency` | `string` | Broadcasting frequency |
| `id` | `int` | Radio station ID |
| `name` | `string` | Radio station name |
| `url` | `string` | Station URL |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Radio record (throws on error).
$radio = $client->Radio()->load(["id" => 1]);
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
| `departments` | `array` | List of departments in the region |
| `description` | `string` | Region description |
| `id` | `int` | Region ID |
| `name` | `string` | Region name |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Region record (throws on error).
$region = $client->Region()->load(["id" => 1]);
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
| `city` | `string` | City where the attraction is located |
| `description` | `string` | Attraction description |
| `id` | `int` | Touristic attraction ID |
| `images` | `array` | List of image URLs |
| `latitude` | `float` | Latitude coordinate |
| `longitude` | `float` | Longitude coordinate |
| `name` | `string` | Attraction name |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the TouristicAttraction record (throws on error).
$touristic_attraction = $client->TouristicAttraction()->load(["id" => 1]);
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
| `departmentId` | `int` | Department ID |
| `description` | `string` | Dish description |
| `id` | `int` | Typical dish ID |
| `ingredients` | `array` | List of ingredients |
| `name` | `string` | Dish name |
| `urlImage` | `string` | URL to dish image |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the TypicalDish record (throws on error).
$typical_dish = $client->TypicalDish()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of TypicalDish records (throws on error).
$typical_dishs = $client->TypicalDish()->list();
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Client-side rate limiting via a token bucket |
| [`retry`](#retry) | Automatic retry of transient failures with exponential backoff |
| [`test`](#test) | In-memory mock transport for testing without a live server |
| [`timeout`](#timeout) | Per-request timeout with transport abort |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Client-side rate limiting via a token bucket.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Automatic retry of transient failures with exponential backoff.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Per-request timeout with transport abort.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


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

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

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
├── schema.php                     -- Generated option + entity specs
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
$typicaldish = $client->TypicalDish();
$typicaldish->list();

// $typicaldish->data_get() now returns the typicaldish data from the last list
// $typicaldish->match_get() returns the last match criteria
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
