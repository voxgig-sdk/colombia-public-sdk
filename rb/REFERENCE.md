# ColombiaPublic Ruby SDK Reference

Complete API reference for the ColombiaPublic Ruby SDK.


## ColombiaPublicSDK

### Constructor

```ruby
require_relative 'colombia-public_sdk'

client = ColombiaPublicSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ColombiaPublicSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = ColombiaPublicSDK.test
```


### Instance Methods

#### `Airport(data = nil)`

Create a new `Airport` entity instance. Pass `nil` for no initial data.

#### `CategoryNaturalArea(data = nil)`

Create a new `CategoryNaturalArea` entity instance. Pass `nil` for no initial data.

#### `ConstitutionArticle(data = nil)`

Create a new `ConstitutionArticle` entity instance. Pass `nil` for no initial data.

#### `Country(data = nil)`

Create a new `Country` entity instance. Pass `nil` for no initial data.

#### `Department(data = nil)`

Create a new `Department` entity instance. Pass `nil` for no initial data.

#### `Holiday(data = nil)`

Create a new `Holiday` entity instance. Pass `nil` for no initial data.

#### `InvasiveSpecie(data = nil)`

Create a new `InvasiveSpecie` entity instance. Pass `nil` for no initial data.

#### `Map(data = nil)`

Create a new `Map` entity instance. Pass `nil` for no initial data.

#### `NativeCommunity(data = nil)`

Create a new `NativeCommunity` entity instance. Pass `nil` for no initial data.

#### `NaturalArea(data = nil)`

Create a new `NaturalArea` entity instance. Pass `nil` for no initial data.

#### `President(data = nil)`

Create a new `President` entity instance. Pass `nil` for no initial data.

#### `Radio(data = nil)`

Create a new `Radio` entity instance. Pass `nil` for no initial data.

#### `Region(data = nil)`

Create a new `Region` entity instance. Pass `nil` for no initial data.

#### `TouristicAttraction(data = nil)`

Create a new `TouristicAttraction` entity instance. Pass `nil` for no initial data.

#### `TypicalDish(data = nil)`

Create a new `TypicalDish` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## AirportEntity

```ruby
airport = client.airport
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.airport.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.airport.load({ "id" => "airport_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AirportEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CategoryNaturalAreaEntity

```ruby
category_natural_area = client.category_natural_area
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.category_natural_area.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CategoryNaturalAreaEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ConstitutionArticleEntity

```ruby
constitution_article = client.constitution_article
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.constitution_article.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.constitution_article.load({ "id" => "constitution_article_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ConstitutionArticleEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CountryEntity

```ruby
country = client.country
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.country.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CountryEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DepartmentEntity

```ruby
department = client.department
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.department.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.department.load({ "id" => "department_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DepartmentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## HolidayEntity

```ruby
holiday = client.holiday
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.holiday.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.holiday.load({ "id" => "holiday_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `HolidayEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## InvasiveSpecieEntity

```ruby
invasive_specie = client.invasive_specie
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.invasive_specie.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.invasive_specie.load({ "id" => "invasive_specie_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `InvasiveSpecieEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MapEntity

```ruby
map = client.map
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.map.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MapEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## NativeCommunityEntity

```ruby
native_community = client.native_community
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.native_community.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.native_community.load({ "id" => "native_community_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `NativeCommunityEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## NaturalAreaEntity

```ruby
natural_area = client.natural_area
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.natural_area.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.natural_area.load({ "id" => "natural_area_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `NaturalAreaEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PresidentEntity

```ruby
president = client.president
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.president.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.president.load({ "id" => "president_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PresidentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RadioEntity

```ruby
radio = client.radio
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.radio.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.radio.load({ "id" => "radio_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RadioEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RegionEntity

```ruby
region = client.region
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `department` | ``$ARRAY`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.region.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.region.load({ "id" => "region_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RegionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TouristicAttractionEntity

```ruby
touristic_attraction = client.touristic_attraction
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.touristic_attraction.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.touristic_attraction.load({ "id" => "touristic_attraction_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TouristicAttractionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TypicalDishEntity

```ruby
typical_dish = client.typical_dish
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.typical_dish.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.typical_dish.load({ "id" => "typical_dish_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TypicalDishEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = ColombiaPublicSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

