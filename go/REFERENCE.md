# ColombiaPublic Golang SDK Reference

Complete API reference for the ColombiaPublic Golang SDK.


## ColombiaPublicSDK

### Constructor

```go
func NewColombiaPublicSDK(options map[string]any) *ColombiaPublicSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *ColombiaPublicSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *ColombiaPublicSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Airport(data map[string]any) ColombiaPublicEntity`

Create a new `Airport` entity instance. Pass `nil` for no initial data.

#### `CategoryNaturalArea(data map[string]any) ColombiaPublicEntity`

Create a new `CategoryNaturalArea` entity instance. Pass `nil` for no initial data.

#### `ConstitutionArticle(data map[string]any) ColombiaPublicEntity`

Create a new `ConstitutionArticle` entity instance. Pass `nil` for no initial data.

#### `Country(data map[string]any) ColombiaPublicEntity`

Create a new `Country` entity instance. Pass `nil` for no initial data.

#### `Department(data map[string]any) ColombiaPublicEntity`

Create a new `Department` entity instance. Pass `nil` for no initial data.

#### `Holiday(data map[string]any) ColombiaPublicEntity`

Create a new `Holiday` entity instance. Pass `nil` for no initial data.

#### `InvasiveSpecie(data map[string]any) ColombiaPublicEntity`

Create a new `InvasiveSpecie` entity instance. Pass `nil` for no initial data.

#### `Map(data map[string]any) ColombiaPublicEntity`

Create a new `Map` entity instance. Pass `nil` for no initial data.

#### `NativeCommunity(data map[string]any) ColombiaPublicEntity`

Create a new `NativeCommunity` entity instance. Pass `nil` for no initial data.

#### `NaturalArea(data map[string]any) ColombiaPublicEntity`

Create a new `NaturalArea` entity instance. Pass `nil` for no initial data.

#### `President(data map[string]any) ColombiaPublicEntity`

Create a new `President` entity instance. Pass `nil` for no initial data.

#### `Radio(data map[string]any) ColombiaPublicEntity`

Create a new `Radio` entity instance. Pass `nil` for no initial data.

#### `Region(data map[string]any) ColombiaPublicEntity`

Create a new `Region` entity instance. Pass `nil` for no initial data.

#### `TouristicAttraction(data map[string]any) ColombiaPublicEntity`

Create a new `TouristicAttraction` entity instance. Pass `nil` for no initial data.

#### `TypicalDish(data map[string]any) ColombiaPublicEntity`

Create a new `TypicalDish` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AirportEntity

```go
airport := client.Airport(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city_id` | `int` | No |  |
| `code` | `string` | No |  |
| `department_id` | `int` | No |  |
| `id` | `int` | No |  |
| `latitude` | `float64` | No |  |
| `longitude` | `float64` | No |  |
| `name` | `string` | No |  |
| `type` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Airport(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Airport(nil).Load(map[string]any{"id": "airport_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AirportEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CategoryNaturalAreaEntity

```go
category_natural_area := client.CategoryNaturalArea(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.CategoryNaturalArea(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CategoryNaturalAreaEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ConstitutionArticleEntity

```go
constitution_article := client.ConstitutionArticle(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `article_number` | `int` | No |  |
| `chapter` | `string` | No |  |
| `description` | `string` | No |  |
| `id` | `int` | No |  |
| `title` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.ConstitutionArticle(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ConstitutionArticle(nil).Load(map[string]any{"id": "constitution_article_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ConstitutionArticleEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CountryEntity

```go
country := client.Country(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capital` | `string` | No |  |
| `currency` | `string` | No |  |
| `flag` | `string` | No |  |
| `id` | `int` | No |  |
| `language` | `[]any` | No |  |
| `name` | `string` | No |  |
| `population` | `int` | No |  |
| `surface` | `float64` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Country(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CountryEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DepartmentEntity

```go
department := client.Department(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city_capital` | `string` | No |  |
| `description` | `string` | No |  |
| `id` | `int` | No |  |
| `municipality` | `int` | No |  |
| `name` | `string` | No |  |
| `population` | `int` | No |  |
| `region_id` | `int` | No |  |
| `surface` | `float64` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Department(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Department(nil).Load(map[string]any{"id": "department_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DepartmentEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## HolidayEntity

```go
holiday := client.Holiday(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `string` | No |  |
| `description` | `string` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `type` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Holiday(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Holiday(nil).Load(map[string]any{"id": "holiday_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `HolidayEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## InvasiveSpecieEntity

```go
invasive_specie := client.InvasiveSpecie(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `int` | No |  |
| `impact` | `string` | No |  |
| `manage` | `string` | No |  |
| `name` | `string` | No |  |
| `scientific_name` | `string` | No |  |
| `url_image` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.InvasiveSpecie(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.InvasiveSpecie(nil).Load(map[string]any{"id": "invasive_specie_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `InvasiveSpecieEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MapEntity

```go
map := client.Map(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `department_id` | `int` | No |  |
| `description` | `string` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `url_image` | `[]any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Map(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MapEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## NativeCommunityEntity

```go
native_community := client.NativeCommunity(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `department_id` | `int` | No |  |
| `description` | `string` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `population` | `int` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.NativeCommunity(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.NativeCommunity(nil).Load(map[string]any{"id": "native_community_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `NativeCommunityEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## NaturalAreaEntity

```go
natural_area := client.NaturalArea(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `area_group_id` | `int` | No |  |
| `category_natural_area_id` | `int` | No |  |
| `department_id` | `int` | No |  |
| `description` | `string` | No |  |
| `id` | `int` | No |  |
| `land_area` | `float64` | No |  |
| `maritime_area` | `float64` | No |  |
| `name` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.NaturalArea(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.NaturalArea(nil).Load(map[string]any{"id": "natural_area_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `NaturalAreaEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PresidentEntity

```go
president := client.President(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `end_period_date` | `string` | No |  |
| `id` | `int` | No |  |
| `image` | `string` | No |  |
| `name` | `string` | No |  |
| `political_party` | `string` | No |  |
| `start_period_date` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.President(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.President(nil).Load(map[string]any{"id": "president_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PresidentEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RadioEntity

```go
radio := client.Radio(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `band` | `string` | No |  |
| `frequency` | `string` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Radio(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Radio(nil).Load(map[string]any{"id": "radio_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RadioEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RegionEntity

```go
region := client.Region(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `department` | `[]any` | No |  |
| `description` | `string` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Region(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Region(nil).Load(map[string]any{"id": "region_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RegionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## TouristicAttractionEntity

```go
touristic_attraction := client.TouristicAttraction(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `string` | No |  |
| `description` | `string` | No |  |
| `id` | `int` | No |  |
| `image` | `[]any` | No |  |
| `latitude` | `float64` | No |  |
| `longitude` | `float64` | No |  |
| `name` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.TouristicAttraction(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.TouristicAttraction(nil).Load(map[string]any{"id": "touristic_attraction_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TouristicAttractionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## TypicalDishEntity

```go
typical_dish := client.TypicalDish(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `department_id` | `int` | No |  |
| `description` | `string` | No |  |
| `id` | `int` | No |  |
| `ingredient` | `[]any` | No |  |
| `name` | `string` | No |  |
| `url_image` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.TypicalDish(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.TypicalDish(nil).Load(map[string]any{"id": "typical_dish_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TypicalDishEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewColombiaPublicSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

