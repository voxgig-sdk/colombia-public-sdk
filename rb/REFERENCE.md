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
| `cityId` | `Integer` | No | City ID |
| `code` | `String` | No | IATA code |
| `departmentId` | `Integer` | No | Department ID |
| `id` | `Integer` | No | Airport ID |
| `latitude` | `Float` | No | Latitude coordinate |
| `longitude` | `Float` | No | Longitude coordinate |
| `name` | `String` | No | Airport name |
| `type` | `String` | No | Airport type |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Airport.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Airport.load({ "id" => 1 })
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
| `description` | `String` | No | Category description |
| `id` | `Integer` | No | Category ID |
| `name` | `String` | No | Category name |

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
| `articleNumber` | `Integer` | No | Article number |
| `chapter` | `String` | No | Constitution chapter |
| `description` | `String` | No | Article content |
| `id` | `Integer` | No | Article ID |
| `title` | `String` | No | Article title |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.ConstitutionArticle.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.ConstitutionArticle.load({ "id" => 1 })
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
| `capital` | `String` | No | Capital city |
| `currency` | `String` | No | Currency |
| `flag` | `String` | No | URL to flag image |
| `id` | `Integer` | No | Country ID |
| `languages` | `Array` | No | Official languages |
| `name` | `String` | No | Country name |
| `population` | `Integer` | No | Total population |
| `surface` | `Float` | No | Surface area in square kilometers |

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
| `cityCapital` | `String` | No | Capital city of the department |
| `description` | `String` | No | Department description |
| `id` | `Integer` | No | Department ID |
| `municipalities` | `Integer` | No | Number of municipalities |
| `name` | `String` | No | Department name |
| `population` | `Integer` | No | Population |
| `regionId` | `Integer` | No | Region ID |
| `surface` | `Float` | No | Surface area |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Department.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Department.load({ "id" => 1 })
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
| `date` | `String` | No | Holiday date |
| `description` | `String` | No | Holiday description |
| `id` | `Integer` | No | Holiday ID |
| `name` | `String` | No | Holiday name |
| `type` | `String` | No | Holiday type (religious, civic, etc.) |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Holiday.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Holiday.load({ "id" => 1 })
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
| `id` | `Integer` | No | Invasive species ID |
| `impact` | `String` | No | Environmental impact |
| `manage` | `String` | No | Management strategies |
| `name` | `String` | No | Species name |
| `scientificName` | `String` | No | Scientific name |
| `urlImage` | `String` | No | URL to species image |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.InvasiveSpecie.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.InvasiveSpecie.load({ "id" => 1 })
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
| `departmentId` | `Integer` | No | Department ID |
| `description` | `String` | No | Map description |
| `id` | `Integer` | No | Map ID |
| `name` | `String` | No | Map name |
| `urlImages` | `Array` | No | URLs to map images |

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
| `departmentId` | `Integer` | No | Department ID |
| `description` | `String` | No | Community description |
| `id` | `Integer` | No | Native community ID |
| `name` | `String` | No | Community name |
| `population` | `Integer` | No | Population |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.NativeCommunity.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.NativeCommunity.load({ "id" => 1 })
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
| `areaGroupId` | `Integer` | No | Area group ID |
| `categoryNaturalAreaId` | `Integer` | No | Category ID |
| `departmentId` | `Integer` | No | Department ID |
| `description` | `String` | No | Natural area description |
| `id` | `Integer` | No | Natural area ID |
| `landArea` | `Float` | No | Land area in hectares |
| `maritimeArea` | `Float` | No | Maritime area in hectares |
| `name` | `String` | No | Natural area name |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.NaturalArea.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.NaturalArea.load({ "id" => 1 })
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
| `description` | `String` | No | Biography and description |
| `endPeriodDate` | `String` | No | End date of presidency |
| `id` | `Integer` | No | President ID |
| `image` | `String` | No | URL to president image |
| `name` | `String` | No | President name |
| `politicalParty` | `String` | No | Political party |
| `startPeriodDate` | `String` | No | Start date of presidency |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.President.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.President.load({ "id" => 1 })
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
| `band` | `String` | No | Broadcasting band (AM/FM) |
| `frequency` | `String` | No | Broadcasting frequency |
| `id` | `Integer` | No | Radio station ID |
| `name` | `String` | No | Radio station name |
| `url` | `String` | No | Station URL |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Radio.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Radio.load({ "id" => 1 })
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
| `departments` | `Array` | No | List of departments in the region |
| `description` | `String` | No | Region description |
| `id` | `Integer` | No | Region ID |
| `name` | `String` | No | Region name |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Region.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Region.load({ "id" => 1 })
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
| `city` | `String` | No | City where the attraction is located |
| `description` | `String` | No | Attraction description |
| `id` | `Integer` | No | Touristic attraction ID |
| `images` | `Array` | No | List of image URLs |
| `latitude` | `Float` | No | Latitude coordinate |
| `longitude` | `Float` | No | Longitude coordinate |
| `name` | `String` | No | Attraction name |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.TouristicAttraction.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.TouristicAttraction.load({ "id" => 1 })
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
| `departmentId` | `Integer` | No | Department ID |
| `description` | `String` | No | Dish description |
| `id` | `Integer` | No | Typical dish ID |
| `ingredients` | `Array` | No | List of ingredients |
| `name` | `String` | No | Dish name |
| `urlImage` | `String` | No | URL to dish image |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.TypicalDish.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.TypicalDish.load({ "id" => 1 })
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


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

