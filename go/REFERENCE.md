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
fmt.Println(airport.GetName()) // "airport"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cityId` | `int` | No | City ID |
| `code` | `string` | No | IATA code |
| `departmentId` | `int` | No | Department ID |
| `id` | `int` | No | Airport ID |
| `latitude` | `float64` | No | Latitude coordinate |
| `longitude` | `float64` | No | Longitude coordinate |
| `name` | `string` | No | Airport name |
| `type` | `string` | No | Airport type |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Airport(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Airport(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
categoryNaturalArea := client.CategoryNaturalArea(nil)
fmt.Println(categoryNaturalArea.GetName()) // "category_natural_area"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Category description |
| `id` | `int` | No | Category ID |
| `name` | `string` | No | Category name |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.CategoryNaturalArea(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
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
constitutionArticle := client.ConstitutionArticle(nil)
fmt.Println(constitutionArticle.GetName()) // "constitution_article"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `articleNumber` | `int` | No | Article number |
| `chapter` | `string` | No | Constitution chapter |
| `description` | `string` | No | Article content |
| `id` | `int` | No | Article ID |
| `title` | `string` | No | Article title |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.ConstitutionArticle(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ConstitutionArticle(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(country.GetName()) // "country"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capital` | `string` | No | Capital city |
| `currency` | `string` | No | Currency |
| `flag` | `string` | No | URL to flag image |
| `id` | `int` | No | Country ID |
| `languages` | `[]any` | No | Official languages |
| `name` | `string` | No | Country name |
| `population` | `int` | No | Total population |
| `surface` | `float64` | No | Surface area in square kilometers |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Country(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
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
fmt.Println(department.GetName()) // "department"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cityCapital` | `string` | No | Capital city of the department |
| `description` | `string` | No | Department description |
| `id` | `int` | No | Department ID |
| `municipalities` | `int` | No | Number of municipalities |
| `name` | `string` | No | Department name |
| `population` | `int` | No | Population |
| `regionId` | `int` | No | Region ID |
| `surface` | `float64` | No | Surface area |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Department(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Department(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(holiday.GetName()) // "holiday"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `string` | No | Holiday date |
| `description` | `string` | No | Holiday description |
| `id` | `int` | No | Holiday ID |
| `name` | `string` | No | Holiday name |
| `type` | `string` | No | Holiday type (religious, civic, etc.) |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Holiday(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Holiday(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
invasiveSpecie := client.InvasiveSpecie(nil)
fmt.Println(invasiveSpecie.GetName()) // "invasive_specie"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `int` | No | Invasive species ID |
| `impact` | `string` | No | Environmental impact |
| `manage` | `string` | No | Management strategies |
| `name` | `string` | No | Species name |
| `scientificName` | `string` | No | Scientific name |
| `urlImage` | `string` | No | URL to species image |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.InvasiveSpecie(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.InvasiveSpecie(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
map_ := client.Map(nil)
fmt.Println(map_.GetName()) // "map"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `departmentId` | `int` | No | Department ID |
| `description` | `string` | No | Map description |
| `id` | `int` | No | Map ID |
| `name` | `string` | No | Map name |
| `urlImages` | `[]any` | No | URLs to map images |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Map(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
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
nativeCommunity := client.NativeCommunity(nil)
fmt.Println(nativeCommunity.GetName()) // "native_community"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `departmentId` | `int` | No | Department ID |
| `description` | `string` | No | Community description |
| `id` | `int` | No | Native community ID |
| `name` | `string` | No | Community name |
| `population` | `int` | No | Population |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.NativeCommunity(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.NativeCommunity(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
naturalArea := client.NaturalArea(nil)
fmt.Println(naturalArea.GetName()) // "natural_area"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `areaGroupId` | `int` | No | Area group ID |
| `categoryNaturalAreaId` | `int` | No | Category ID |
| `departmentId` | `int` | No | Department ID |
| `description` | `string` | No | Natural area description |
| `id` | `int` | No | Natural area ID |
| `landArea` | `float64` | No | Land area in hectares |
| `maritimeArea` | `float64` | No | Maritime area in hectares |
| `name` | `string` | No | Natural area name |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.NaturalArea(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.NaturalArea(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(president.GetName()) // "president"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Biography and description |
| `endPeriodDate` | `string` | No | End date of presidency |
| `id` | `int` | No | President ID |
| `image` | `string` | No | URL to president image |
| `name` | `string` | No | President name |
| `politicalParty` | `string` | No | Political party |
| `startPeriodDate` | `string` | No | Start date of presidency |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.President(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.President(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(radio.GetName()) // "radio"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `band` | `string` | No | Broadcasting band (AM/FM) |
| `frequency` | `string` | No | Broadcasting frequency |
| `id` | `int` | No | Radio station ID |
| `name` | `string` | No | Radio station name |
| `url` | `string` | No | Station URL |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Radio(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Radio(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(region.GetName()) // "region"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `departments` | `[]any` | No | List of departments in the region |
| `description` | `string` | No | Region description |
| `id` | `int` | No | Region ID |
| `name` | `string` | No | Region name |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Region(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Region(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
touristicAttraction := client.TouristicAttraction(nil)
fmt.Println(touristicAttraction.GetName()) // "touristic_attraction"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `string` | No | City where the attraction is located |
| `description` | `string` | No | Attraction description |
| `id` | `int` | No | Touristic attraction ID |
| `images` | `[]any` | No | List of image URLs |
| `latitude` | `float64` | No | Latitude coordinate |
| `longitude` | `float64` | No | Longitude coordinate |
| `name` | `string` | No | Attraction name |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.TouristicAttraction(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.TouristicAttraction(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
typicalDish := client.TypicalDish(nil)
fmt.Println(typicalDish.GetName()) // "typical_dish"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `departmentId` | `int` | No | Department ID |
| `description` | `string` | No | Dish description |
| `id` | `int` | No | Typical dish ID |
| `ingredients` | `[]any` | No | List of ingredients |
| `name` | `string` | No | Dish name |
| `urlImage` | `string` | No | URL to dish image |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.TypicalDish(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.TypicalDish(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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

