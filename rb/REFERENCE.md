# ColombiaPublic Ruby SDK Reference

Complete API reference for the ColombiaPublic Ruby SDK.


## ColombiaPublicSDK

### Constructor

```ruby
require_relative 'ColombiaPublic_sdk'

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
airport = client.Airport
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city_id` | `Integer` | No |  |
| `code` | `String` | No |  |
| `department_id` | `Integer` | No |  |
| `id` | `Integer` | No |  |
| `latitude` | `Float` | No |  |
| `longitude` | `Float` | No |  |
| `name` | `String` | No |  |
| `type` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Airport.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Airport.load({ "id" => "airport_id" })
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
category_natural_area = client.CategoryNaturalArea
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `String` | No |  |
| `id` | `Integer` | No |  |
| `name` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.CategoryNaturalArea.list
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
constitution_article = client.ConstitutionArticle
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `article_number` | `Integer` | No |  |
| `chapter` | `String` | No |  |
| `description` | `String` | No |  |
| `id` | `Integer` | No |  |
| `title` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.ConstitutionArticle.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.ConstitutionArticle.load({ "id" => "constitution_article_id" })
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
country = client.Country
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capital` | `String` | No |  |
| `currency` | `String` | No |  |
| `flag` | `String` | No |  |
| `id` | `Integer` | No |  |
| `language` | `Array` | No |  |
| `name` | `String` | No |  |
| `population` | `Integer` | No |  |
| `surface` | `Float` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Country.list
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
department = client.Department
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city_capital` | `String` | No |  |
| `description` | `String` | No |  |
| `id` | `Integer` | No |  |
| `municipality` | `Integer` | No |  |
| `name` | `String` | No |  |
| `population` | `Integer` | No |  |
| `region_id` | `Integer` | No |  |
| `surface` | `Float` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Department.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Department.load({ "id" => "department_id" })
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
holiday = client.Holiday
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `String` | No |  |
| `description` | `String` | No |  |
| `id` | `Integer` | No |  |
| `name` | `String` | No |  |
| `type` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Holiday.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Holiday.load({ "id" => "holiday_id" })
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
invasive_specie = client.InvasiveSpecie
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `Integer` | No |  |
| `impact` | `String` | No |  |
| `manage` | `String` | No |  |
| `name` | `String` | No |  |
| `scientific_name` | `String` | No |  |
| `url_image` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.InvasiveSpecie.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.InvasiveSpecie.load({ "id" => "invasive_specie_id" })
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
map = client.Map
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `department_id` | `Integer` | No |  |
| `description` | `String` | No |  |
| `id` | `Integer` | No |  |
| `name` | `String` | No |  |
| `url_image` | `Array` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Map.list
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
native_community = client.NativeCommunity
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `department_id` | `Integer` | No |  |
| `description` | `String` | No |  |
| `id` | `Integer` | No |  |
| `name` | `String` | No |  |
| `population` | `Integer` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.NativeCommunity.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.NativeCommunity.load({ "id" => "native_community_id" })
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
natural_area = client.NaturalArea
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `area_group_id` | `Integer` | No |  |
| `category_natural_area_id` | `Integer` | No |  |
| `department_id` | `Integer` | No |  |
| `description` | `String` | No |  |
| `id` | `Integer` | No |  |
| `land_area` | `Float` | No |  |
| `maritime_area` | `Float` | No |  |
| `name` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.NaturalArea.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.NaturalArea.load({ "id" => "natural_area_id" })
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
president = client.President
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `String` | No |  |
| `end_period_date` | `String` | No |  |
| `id` | `Integer` | No |  |
| `image` | `String` | No |  |
| `name` | `String` | No |  |
| `political_party` | `String` | No |  |
| `start_period_date` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.President.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.President.load({ "id" => "president_id" })
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
radio = client.Radio
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `band` | `String` | No |  |
| `frequency` | `String` | No |  |
| `id` | `Integer` | No |  |
| `name` | `String` | No |  |
| `url` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Radio.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Radio.load({ "id" => "radio_id" })
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
region = client.Region
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `department` | `Array` | No |  |
| `description` | `String` | No |  |
| `id` | `Integer` | No |  |
| `name` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Region.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Region.load({ "id" => "region_id" })
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
touristic_attraction = client.TouristicAttraction
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `String` | No |  |
| `description` | `String` | No |  |
| `id` | `Integer` | No |  |
| `image` | `Array` | No |  |
| `latitude` | `Float` | No |  |
| `longitude` | `Float` | No |  |
| `name` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.TouristicAttraction.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.TouristicAttraction.load({ "id" => "touristic_attraction_id" })
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
typical_dish = client.TypicalDish
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `department_id` | `Integer` | No |  |
| `description` | `String` | No |  |
| `id` | `Integer` | No |  |
| `ingredient` | `Array` | No |  |
| `name` | `String` | No |  |
| `url_image` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.TypicalDish.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.TypicalDish.load({ "id" => "typical_dish_id" })
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

