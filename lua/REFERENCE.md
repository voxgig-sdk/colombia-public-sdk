# ColombiaPublic Lua SDK Reference

Complete API reference for the ColombiaPublic Lua SDK.


## ColombiaPublicSDK

### Constructor

```lua
local sdk = require("colombia-public_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Airport(data)`

Create a new `Airport` entity instance. Pass `nil` for no initial data.

#### `CategoryNaturalArea(data)`

Create a new `CategoryNaturalArea` entity instance. Pass `nil` for no initial data.

#### `ConstitutionArticle(data)`

Create a new `ConstitutionArticle` entity instance. Pass `nil` for no initial data.

#### `Country(data)`

Create a new `Country` entity instance. Pass `nil` for no initial data.

#### `Department(data)`

Create a new `Department` entity instance. Pass `nil` for no initial data.

#### `Holiday(data)`

Create a new `Holiday` entity instance. Pass `nil` for no initial data.

#### `InvasiveSpecie(data)`

Create a new `InvasiveSpecie` entity instance. Pass `nil` for no initial data.

#### `Map(data)`

Create a new `Map` entity instance. Pass `nil` for no initial data.

#### `NativeCommunity(data)`

Create a new `NativeCommunity` entity instance. Pass `nil` for no initial data.

#### `NaturalArea(data)`

Create a new `NaturalArea` entity instance. Pass `nil` for no initial data.

#### `President(data)`

Create a new `President` entity instance. Pass `nil` for no initial data.

#### `Radio(data)`

Create a new `Radio` entity instance. Pass `nil` for no initial data.

#### `Region(data)`

Create a new `Region` entity instance. Pass `nil` for no initial data.

#### `TouristicAttraction(data)`

Create a new `TouristicAttraction` entity instance. Pass `nil` for no initial data.

#### `TypicalDish(data)`

Create a new `TypicalDish` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## AirportEntity

```lua
local airport = client:Airport(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cityId` | `number` | No | City ID |
| `code` | `string` | No | IATA code |
| `departmentId` | `number` | No | Department ID |
| `id` | `number` | No | Airport ID |
| `latitude` | `number` | No | Latitude coordinate |
| `longitude` | `number` | No | Longitude coordinate |
| `name` | `string` | No | Airport name |
| `type` | `string` | No | Airport type |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Airport():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Airport():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AirportEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CategoryNaturalAreaEntity

```lua
local category_natural_area = client:CategoryNaturalArea(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Category description |
| `id` | `number` | No | Category ID |
| `name` | `string` | No | Category name |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:CategoryNaturalArea():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CategoryNaturalAreaEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ConstitutionArticleEntity

```lua
local constitution_article = client:ConstitutionArticle(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `articleNumber` | `number` | No | Article number |
| `chapter` | `string` | No | Constitution chapter |
| `description` | `string` | No | Article content |
| `id` | `number` | No | Article ID |
| `title` | `string` | No | Article title |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:ConstitutionArticle():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ConstitutionArticle():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ConstitutionArticleEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CountryEntity

```lua
local country = client:Country(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capital` | `string` | No | Capital city |
| `currency` | `string` | No | Currency |
| `flag` | `string` | No | URL to flag image |
| `id` | `number` | No | Country ID |
| `languages` | `table` | No | Official languages |
| `name` | `string` | No | Country name |
| `population` | `number` | No | Total population |
| `surface` | `number` | No | Surface area in square kilometers |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Country():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CountryEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DepartmentEntity

```lua
local department = client:Department(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cityCapital` | `string` | No | Capital city of the department |
| `description` | `string` | No | Department description |
| `id` | `number` | No | Department ID |
| `municipalities` | `number` | No | Number of municipalities |
| `name` | `string` | No | Department name |
| `population` | `number` | No | Population |
| `regionId` | `number` | No | Region ID |
| `surface` | `number` | No | Surface area |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Department():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Department():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DepartmentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## HolidayEntity

```lua
local holiday = client:Holiday(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `string` | No | Holiday date |
| `description` | `string` | No | Holiday description |
| `id` | `number` | No | Holiday ID |
| `name` | `string` | No | Holiday name |
| `type` | `string` | No | Holiday type (religious, civic, etc.) |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Holiday():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Holiday():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HolidayEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## InvasiveSpecieEntity

```lua
local invasive_specie = client:InvasiveSpecie(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `number` | No | Invasive species ID |
| `impact` | `string` | No | Environmental impact |
| `manage` | `string` | No | Management strategies |
| `name` | `string` | No | Species name |
| `scientificName` | `string` | No | Scientific name |
| `urlImage` | `string` | No | URL to species image |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:InvasiveSpecie():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:InvasiveSpecie():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InvasiveSpecieEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MapEntity

```lua
local map = client:Map(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `departmentId` | `number` | No | Department ID |
| `description` | `string` | No | Map description |
| `id` | `number` | No | Map ID |
| `name` | `string` | No | Map name |
| `urlImages` | `table` | No | URLs to map images |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Map():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MapEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## NativeCommunityEntity

```lua
local native_community = client:NativeCommunity(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `departmentId` | `number` | No | Department ID |
| `description` | `string` | No | Community description |
| `id` | `number` | No | Native community ID |
| `name` | `string` | No | Community name |
| `population` | `number` | No | Population |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:NativeCommunity():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:NativeCommunity():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NativeCommunityEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## NaturalAreaEntity

```lua
local natural_area = client:NaturalArea(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `areaGroupId` | `number` | No | Area group ID |
| `categoryNaturalAreaId` | `number` | No | Category ID |
| `departmentId` | `number` | No | Department ID |
| `description` | `string` | No | Natural area description |
| `id` | `number` | No | Natural area ID |
| `landArea` | `number` | No | Land area in hectares |
| `maritimeArea` | `number` | No | Maritime area in hectares |
| `name` | `string` | No | Natural area name |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:NaturalArea():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:NaturalArea():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NaturalAreaEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PresidentEntity

```lua
local president = client:President(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Biography and description |
| `endPeriodDate` | `string` | No | End date of presidency |
| `id` | `number` | No | President ID |
| `image` | `string` | No | URL to president image |
| `name` | `string` | No | President name |
| `politicalParty` | `string` | No | Political party |
| `startPeriodDate` | `string` | No | Start date of presidency |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:President():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:President():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PresidentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RadioEntity

```lua
local radio = client:Radio(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `band` | `string` | No | Broadcasting band (AM/FM) |
| `frequency` | `string` | No | Broadcasting frequency |
| `id` | `number` | No | Radio station ID |
| `name` | `string` | No | Radio station name |
| `url` | `string` | No | Station URL |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Radio():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Radio():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RadioEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RegionEntity

```lua
local region = client:Region(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `departments` | `table` | No | List of departments in the region |
| `description` | `string` | No | Region description |
| `id` | `number` | No | Region ID |
| `name` | `string` | No | Region name |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Region():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Region():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RegionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## TouristicAttractionEntity

```lua
local touristic_attraction = client:TouristicAttraction(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `string` | No | City where the attraction is located |
| `description` | `string` | No | Attraction description |
| `id` | `number` | No | Touristic attraction ID |
| `images` | `table` | No | List of image URLs |
| `latitude` | `number` | No | Latitude coordinate |
| `longitude` | `number` | No | Longitude coordinate |
| `name` | `string` | No | Attraction name |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:TouristicAttraction():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:TouristicAttraction():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TouristicAttractionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## TypicalDishEntity

```lua
local typical_dish = client:TypicalDish(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `departmentId` | `number` | No | Department ID |
| `description` | `string` | No | Dish description |
| `id` | `number` | No | Typical dish ID |
| `ingredients` | `table` | No | List of ingredients |
| `name` | `string` | No | Dish name |
| `urlImage` | `string` | No | URL to dish image |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:TypicalDish():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:TypicalDish():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TypicalDishEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
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

