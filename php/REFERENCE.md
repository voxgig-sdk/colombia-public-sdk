# ColombiaPublic PHP SDK Reference

Complete API reference for the ColombiaPublic PHP SDK.


## ColombiaPublicSDK

### Constructor

```php
require_once __DIR__ . '/colombia-public_sdk.php';

$client = new ColombiaPublicSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ColombiaPublicSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = ColombiaPublicSDK::test();
```


### Instance Methods

#### `Airport($data = null)`

Create a new `AirportEntity` instance. Pass `null` for no initial data.

#### `CategoryNaturalArea($data = null)`

Create a new `CategoryNaturalAreaEntity` instance. Pass `null` for no initial data.

#### `ConstitutionArticle($data = null)`

Create a new `ConstitutionArticleEntity` instance. Pass `null` for no initial data.

#### `Country($data = null)`

Create a new `CountryEntity` instance. Pass `null` for no initial data.

#### `Department($data = null)`

Create a new `DepartmentEntity` instance. Pass `null` for no initial data.

#### `Holiday($data = null)`

Create a new `HolidayEntity` instance. Pass `null` for no initial data.

#### `InvasiveSpecie($data = null)`

Create a new `InvasiveSpecieEntity` instance. Pass `null` for no initial data.

#### `Map($data = null)`

Create a new `MapEntity` instance. Pass `null` for no initial data.

#### `NativeCommunity($data = null)`

Create a new `NativeCommunityEntity` instance. Pass `null` for no initial data.

#### `NaturalArea($data = null)`

Create a new `NaturalAreaEntity` instance. Pass `null` for no initial data.

#### `President($data = null)`

Create a new `PresidentEntity` instance. Pass `null` for no initial data.

#### `Radio($data = null)`

Create a new `RadioEntity` instance. Pass `null` for no initial data.

#### `Region($data = null)`

Create a new `RegionEntity` instance. Pass `null` for no initial data.

#### `TouristicAttraction($data = null)`

Create a new `TouristicAttractionEntity` instance. Pass `null` for no initial data.

#### `TypicalDish($data = null)`

Create a new `TypicalDishEntity` instance. Pass `null` for no initial data.

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## AirportEntity

```php
$airport = $client->Airport();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city_id` | ``$INTEGER`` | No |  |
| `code` | ``$STRING`` | No |  |
| `department_id` | ``$INTEGER`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `latitude` | ``$NUMBER`` | No |  |
| `longitude` | ``$NUMBER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->Airport()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Airport()->load(["id" => "airport_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): AirportEntity`

Create a new `AirportEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## CategoryNaturalAreaEntity

```php
$category_natural_area = $client->CategoryNaturalArea();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->CategoryNaturalArea()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CategoryNaturalAreaEntity`

Create a new `CategoryNaturalAreaEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ConstitutionArticleEntity

```php
$constitution_article = $client->ConstitutionArticle();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `article_number` | ``$INTEGER`` | No |  |
| `chapter` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `title` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->ConstitutionArticle()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ConstitutionArticle()->load(["id" => "constitution_article_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ConstitutionArticleEntity`

Create a new `ConstitutionArticleEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## CountryEntity

```php
$country = $client->Country();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capital` | ``$STRING`` | No |  |
| `currency` | ``$STRING`` | No |  |
| `flag` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `language` | ``$ARRAY`` | No |  |
| `name` | ``$STRING`` | No |  |
| `population` | ``$INTEGER`` | No |  |
| `surface` | ``$NUMBER`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->Country()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CountryEntity`

Create a new `CountryEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## DepartmentEntity

```php
$department = $client->Department();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city_capital` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `municipality` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `population` | ``$INTEGER`` | No |  |
| `region_id` | ``$INTEGER`` | No |  |
| `surface` | ``$NUMBER`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->Department()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Department()->load(["id" => "department_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): DepartmentEntity`

Create a new `DepartmentEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## HolidayEntity

```php
$holiday = $client->Holiday();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->Holiday()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Holiday()->load(["id" => "holiday_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): HolidayEntity`

Create a new `HolidayEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## InvasiveSpecieEntity

```php
$invasive_specie = $client->InvasiveSpecie();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | ``$INTEGER`` | No |  |
| `impact` | ``$STRING`` | No |  |
| `manage` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `scientific_name` | ``$STRING`` | No |  |
| `url_image` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->InvasiveSpecie()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->InvasiveSpecie()->load(["id" => "invasive_specie_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): InvasiveSpecieEntity`

Create a new `InvasiveSpecieEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## MapEntity

```php
$map = $client->Map();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `department_id` | ``$INTEGER`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `url_image` | ``$ARRAY`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->Map()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): MapEntity`

Create a new `MapEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## NativeCommunityEntity

```php
$native_community = $client->NativeCommunity();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `department_id` | ``$INTEGER`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `population` | ``$INTEGER`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->NativeCommunity()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->NativeCommunity()->load(["id" => "native_community_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): NativeCommunityEntity`

Create a new `NativeCommunityEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## NaturalAreaEntity

```php
$natural_area = $client->NaturalArea();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `area_group_id` | ``$INTEGER`` | No |  |
| `category_natural_area_id` | ``$INTEGER`` | No |  |
| `department_id` | ``$INTEGER`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `land_area` | ``$NUMBER`` | No |  |
| `maritime_area` | ``$NUMBER`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->NaturalArea()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->NaturalArea()->load(["id" => "natural_area_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): NaturalAreaEntity`

Create a new `NaturalAreaEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PresidentEntity

```php
$president = $client->President();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `end_period_date` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `image` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `political_party` | ``$STRING`` | No |  |
| `start_period_date` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->President()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->President()->load(["id" => "president_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PresidentEntity`

Create a new `PresidentEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## RadioEntity

```php
$radio = $client->Radio();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `band` | ``$STRING`` | No |  |
| `frequency` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->Radio()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Radio()->load(["id" => "radio_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): RadioEntity`

Create a new `RadioEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## RegionEntity

```php
$region = $client->Region();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `department` | ``$ARRAY`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->Region()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Region()->load(["id" => "region_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): RegionEntity`

Create a new `RegionEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## TouristicAttractionEntity

```php
$touristic_attraction = $client->TouristicAttraction();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `image` | ``$ARRAY`` | No |  |
| `latitude` | ``$NUMBER`` | No |  |
| `longitude` | ``$NUMBER`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->TouristicAttraction()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->TouristicAttraction()->load(["id" => "touristic_attraction_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): TouristicAttractionEntity`

Create a new `TouristicAttractionEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## TypicalDishEntity

```php
$typical_dish = $client->TypicalDish();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `department_id` | ``$INTEGER`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `ingredient` | ``$ARRAY`` | No |  |
| `name` | ``$STRING`` | No |  |
| `url_image` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->TypicalDish()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->TypicalDish()->load(["id" => "typical_dish_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): TypicalDishEntity`

Create a new `TypicalDishEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new ColombiaPublicSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

