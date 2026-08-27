# ColombiaPublic Golang SDK



The Golang SDK for the ColombiaPublic API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Airport(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/colombia-public-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/colombia-public-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/colombia-public-sdk/go=../colombia-public-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/colombia-public-sdk/go"
)

func main() {
    client := sdk.New()

    // List airport records — the value is the array of records itself.
    airports, err := client.Airport(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range airports.([]any) {
        fmt.Println(item)
    }

    // Load a single airport — the value is the loaded record.
    airport, err := client.Airport(nil).Load(map[string]any{"id": 1}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(airport)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
typicaldishs, err := client.TypicalDish(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = typicaldishs
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

typicalDish, err := client.TypicalDish(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(typicalDish) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewColombiaPublicSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
COLOMBIA_PUBLIC_TEST_LIVE=TRUE
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewColombiaPublicSDK

```go
func NewColombiaPublicSDK(options map[string]any) *ColombiaPublicSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *ColombiaPublicSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### ColombiaPublicSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Airport` | `(data map[string]any) ColombiaPublicEntity` | Create an Airport entity instance. |
| `CategoryNaturalArea` | `(data map[string]any) ColombiaPublicEntity` | Create a CategoryNaturalArea entity instance. |
| `ConstitutionArticle` | `(data map[string]any) ColombiaPublicEntity` | Create a ConstitutionArticle entity instance. |
| `Country` | `(data map[string]any) ColombiaPublicEntity` | Create a Country entity instance. |
| `Department` | `(data map[string]any) ColombiaPublicEntity` | Create a Department entity instance. |
| `Holiday` | `(data map[string]any) ColombiaPublicEntity` | Create a Holiday entity instance. |
| `InvasiveSpecie` | `(data map[string]any) ColombiaPublicEntity` | Create an InvasiveSpecie entity instance. |
| `Map` | `(data map[string]any) ColombiaPublicEntity` | Create a Map entity instance. |
| `NativeCommunity` | `(data map[string]any) ColombiaPublicEntity` | Create a NativeCommunity entity instance. |
| `NaturalArea` | `(data map[string]any) ColombiaPublicEntity` | Create a NaturalArea entity instance. |
| `President` | `(data map[string]any) ColombiaPublicEntity` | Create a President entity instance. |
| `Radio` | `(data map[string]any) ColombiaPublicEntity` | Create a Radio entity instance. |
| `Region` | `(data map[string]any) ColombiaPublicEntity` | Create a Region entity instance. |
| `TouristicAttraction` | `(data map[string]any) ColombiaPublicEntity` | Create a TouristicAttraction entity instance. |
| `TypicalDish` | `(data map[string]any) ColombiaPublicEntity` | Create a TypicalDish entity instance. |

### Entity interface (ColombiaPublicEntity)

All entities implement the `ColombiaPublicEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    airport, err := client.Airport(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // airport is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Airport

| Field | Description |
| --- | --- |
| `"cityId"` | City ID |
| `"code"` | IATA code |
| `"departmentId"` | Department ID |
| `"id"` | Airport ID |
| `"latitude"` | Latitude coordinate |
| `"longitude"` | Longitude coordinate |
| `"name"` | Airport name |
| `"type"` | Airport type |

Operations: List, Load.

API path: `/Airport`

#### CategoryNaturalArea

| Field | Description |
| --- | --- |
| `"description"` | Category description |
| `"id"` | Category ID |
| `"name"` | Category name |

Operations: List.

API path: `/CategoryNaturalArea`

#### ConstitutionArticle

| Field | Description |
| --- | --- |
| `"articleNumber"` | Article number |
| `"chapter"` | Constitution chapter |
| `"description"` | Article content |
| `"id"` | Article ID |
| `"title"` | Article title |

Operations: List, Load.

API path: `/ConstitutionArticle`

#### Country

| Field | Description |
| --- | --- |
| `"capital"` | Capital city |
| `"currency"` | Currency |
| `"flag"` | URL to flag image |
| `"id"` | Country ID |
| `"languages"` | Official languages |
| `"name"` | Country name |
| `"population"` | Total population |
| `"surface"` | Surface area in square kilometers |

Operations: List.

API path: `/Country/Colombia`

#### Department

| Field | Description |
| --- | --- |
| `"cityCapital"` | Capital city of the department |
| `"description"` | Department description |
| `"id"` | Department ID |
| `"municipalities"` | Number of municipalities |
| `"name"` | Department name |
| `"population"` | Population |
| `"regionId"` | Region ID |
| `"surface"` | Surface area |

Operations: List, Load.

API path: `/Department`

#### Holiday

| Field | Description |
| --- | --- |
| `"date"` | Holiday date |
| `"description"` | Holiday description |
| `"id"` | Holiday ID |
| `"name"` | Holiday name |
| `"type"` | Holiday type (religious, civic, etc.) |

Operations: List, Load.

API path: `/Holiday`

#### InvasiveSpecie

| Field | Description |
| --- | --- |
| `"id"` | Invasive species ID |
| `"impact"` | Environmental impact |
| `"manage"` | Management strategies |
| `"name"` | Species name |
| `"scientificName"` | Scientific name |
| `"urlImage"` | URL to species image |

Operations: List, Load.

API path: `/InvasiveSpecie`

#### Map

| Field | Description |
| --- | --- |
| `"departmentId"` | Department ID |
| `"description"` | Map description |
| `"id"` | Map ID |
| `"name"` | Map name |
| `"urlImages"` | URLs to map images |

Operations: List.

API path: `/Map`

#### NativeCommunity

| Field | Description |
| --- | --- |
| `"departmentId"` | Department ID |
| `"description"` | Community description |
| `"id"` | Native community ID |
| `"name"` | Community name |
| `"population"` | Population |

Operations: List, Load.

API path: `/NativeCommunity`

#### NaturalArea

| Field | Description |
| --- | --- |
| `"areaGroupId"` | Area group ID |
| `"categoryNaturalAreaId"` | Category ID |
| `"departmentId"` | Department ID |
| `"description"` | Natural area description |
| `"id"` | Natural area ID |
| `"landArea"` | Land area in hectares |
| `"maritimeArea"` | Maritime area in hectares |
| `"name"` | Natural area name |

Operations: List, Load.

API path: `/NaturalArea`

#### President

| Field | Description |
| --- | --- |
| `"description"` | Biography and description |
| `"endPeriodDate"` | End date of presidency |
| `"id"` | President ID |
| `"image"` | URL to president image |
| `"name"` | President name |
| `"politicalParty"` | Political party |
| `"startPeriodDate"` | Start date of presidency |

Operations: List, Load.

API path: `/President`

#### Radio

| Field | Description |
| --- | --- |
| `"band"` | Broadcasting band (AM/FM) |
| `"frequency"` | Broadcasting frequency |
| `"id"` | Radio station ID |
| `"name"` | Radio station name |
| `"url"` | Station URL |

Operations: List, Load.

API path: `/Radio`

#### Region

| Field | Description |
| --- | --- |
| `"departments"` | List of departments in the region |
| `"description"` | Region description |
| `"id"` | Region ID |
| `"name"` | Region name |

Operations: List, Load.

API path: `/Region`

#### TouristicAttraction

| Field | Description |
| --- | --- |
| `"city"` | City where the attraction is located |
| `"description"` | Attraction description |
| `"id"` | Touristic attraction ID |
| `"images"` | List of image URLs |
| `"latitude"` | Latitude coordinate |
| `"longitude"` | Longitude coordinate |
| `"name"` | Attraction name |

Operations: List, Load.

API path: `/TouristicAttraction`

#### TypicalDish

| Field | Description |
| --- | --- |
| `"departmentId"` | Department ID |
| `"description"` | Dish description |
| `"id"` | Typical dish ID |
| `"ingredients"` | List of ingredients |
| `"name"` | Dish name |
| `"urlImage"` | URL to dish image |

Operations: List, Load.

API path: `/TypicalDish`



## Entities


### Airport

Create an instance: `airport := client.Airport(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cityId` | `int` | City ID |
| `code` | `string` | IATA code |
| `departmentId` | `int` | Department ID |
| `id` | `int` | Airport ID |
| `latitude` | `float64` | Latitude coordinate |
| `longitude` | `float64` | Longitude coordinate |
| `name` | `string` | Airport name |
| `type` | `string` | Airport type |

#### Example: Load

```go
airport, err := client.Airport(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(airport) // the loaded record
```

#### Example: List

```go
airports, err := client.Airport(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(airports) // the array of records
```


### CategoryNaturalArea

Create an instance: `categoryNaturalArea := client.CategoryNaturalArea(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | Category description |
| `id` | `int` | Category ID |
| `name` | `string` | Category name |

#### Example: List

```go
categoryNaturalAreas, err := client.CategoryNaturalArea(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(categoryNaturalAreas) // the array of records
```


### ConstitutionArticle

Create an instance: `constitutionArticle := client.ConstitutionArticle(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `articleNumber` | `int` | Article number |
| `chapter` | `string` | Constitution chapter |
| `description` | `string` | Article content |
| `id` | `int` | Article ID |
| `title` | `string` | Article title |

#### Example: Load

```go
constitutionArticle, err := client.ConstitutionArticle(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(constitutionArticle) // the loaded record
```

#### Example: List

```go
constitutionArticles, err := client.ConstitutionArticle(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(constitutionArticles) // the array of records
```


### Country

Create an instance: `country := client.Country(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capital` | `string` | Capital city |
| `currency` | `string` | Currency |
| `flag` | `string` | URL to flag image |
| `id` | `int` | Country ID |
| `languages` | `[]any` | Official languages |
| `name` | `string` | Country name |
| `population` | `int` | Total population |
| `surface` | `float64` | Surface area in square kilometers |

#### Example: List

```go
countrys, err := client.Country(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(countrys) // the array of records
```


### Department

Create an instance: `department := client.Department(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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
| `surface` | `float64` | Surface area |

#### Example: Load

```go
department, err := client.Department(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(department) // the loaded record
```

#### Example: List

```go
departments, err := client.Department(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(departments) // the array of records
```


### Holiday

Create an instance: `holiday := client.Holiday(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | `string` | Holiday date |
| `description` | `string` | Holiday description |
| `id` | `int` | Holiday ID |
| `name` | `string` | Holiday name |
| `type` | `string` | Holiday type (religious, civic, etc.) |

#### Example: Load

```go
holiday, err := client.Holiday(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(holiday) // the loaded record
```

#### Example: List

```go
holidays, err := client.Holiday(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(holidays) // the array of records
```


### InvasiveSpecie

Create an instance: `invasiveSpecie := client.InvasiveSpecie(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
invasiveSpecie, err := client.InvasiveSpecie(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(invasiveSpecie) // the loaded record
```

#### Example: List

```go
invasiveSpecies, err := client.InvasiveSpecie(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(invasiveSpecies) // the array of records
```


### Map

Create an instance: `map_ := client.Map(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `departmentId` | `int` | Department ID |
| `description` | `string` | Map description |
| `id` | `int` | Map ID |
| `name` | `string` | Map name |
| `urlImages` | `[]any` | URLs to map images |

#### Example: List

```go
map_s, err := client.Map(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(map_s) // the array of records
```


### NativeCommunity

Create an instance: `nativeCommunity := client.NativeCommunity(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `departmentId` | `int` | Department ID |
| `description` | `string` | Community description |
| `id` | `int` | Native community ID |
| `name` | `string` | Community name |
| `population` | `int` | Population |

#### Example: Load

```go
nativeCommunity, err := client.NativeCommunity(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(nativeCommunity) // the loaded record
```

#### Example: List

```go
nativeCommunitys, err := client.NativeCommunity(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(nativeCommunitys) // the array of records
```


### NaturalArea

Create an instance: `naturalArea := client.NaturalArea(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `areaGroupId` | `int` | Area group ID |
| `categoryNaturalAreaId` | `int` | Category ID |
| `departmentId` | `int` | Department ID |
| `description` | `string` | Natural area description |
| `id` | `int` | Natural area ID |
| `landArea` | `float64` | Land area in hectares |
| `maritimeArea` | `float64` | Maritime area in hectares |
| `name` | `string` | Natural area name |

#### Example: Load

```go
naturalArea, err := client.NaturalArea(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(naturalArea) // the loaded record
```

#### Example: List

```go
naturalAreas, err := client.NaturalArea(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(naturalAreas) // the array of records
```


### President

Create an instance: `president := client.President(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
president, err := client.President(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(president) // the loaded record
```

#### Example: List

```go
presidents, err := client.President(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(presidents) // the array of records
```


### Radio

Create an instance: `radio := client.Radio(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `band` | `string` | Broadcasting band (AM/FM) |
| `frequency` | `string` | Broadcasting frequency |
| `id` | `int` | Radio station ID |
| `name` | `string` | Radio station name |
| `url` | `string` | Station URL |

#### Example: Load

```go
radio, err := client.Radio(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(radio) // the loaded record
```

#### Example: List

```go
radios, err := client.Radio(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(radios) // the array of records
```


### Region

Create an instance: `region := client.Region(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `departments` | `[]any` | List of departments in the region |
| `description` | `string` | Region description |
| `id` | `int` | Region ID |
| `name` | `string` | Region name |

#### Example: Load

```go
region, err := client.Region(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(region) // the loaded record
```

#### Example: List

```go
regions, err := client.Region(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(regions) // the array of records
```


### TouristicAttraction

Create an instance: `touristicAttraction := client.TouristicAttraction(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `string` | City where the attraction is located |
| `description` | `string` | Attraction description |
| `id` | `int` | Touristic attraction ID |
| `images` | `[]any` | List of image URLs |
| `latitude` | `float64` | Latitude coordinate |
| `longitude` | `float64` | Longitude coordinate |
| `name` | `string` | Attraction name |

#### Example: Load

```go
touristicAttraction, err := client.TouristicAttraction(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(touristicAttraction) // the loaded record
```

#### Example: List

```go
touristicAttractions, err := client.TouristicAttraction(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(touristicAttractions) // the array of records
```


### TypicalDish

Create an instance: `typicalDish := client.TypicalDish(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `departmentId` | `int` | Department ID |
| `description` | `string` | Dish description |
| `id` | `int` | Typical dish ID |
| `ingredients` | `[]any` | List of ingredients |
| `name` | `string` | Dish name |
| `urlImage` | `string` | URL to dish image |

#### Example: Load

```go
typicalDish, err := client.TypicalDish(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(typicalDish) // the loaded record
```

#### Example: List

```go
typicalDishs, err := client.TypicalDish(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(typicalDishs) // the array of records
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/colombia-public-sdk/go/
├── colombia-public.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/colombia-public-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
typicaldish := client.TypicalDish(nil)
typicaldish.List(nil, nil)

// typicaldish.Data() now returns the typicaldish data from the last list
// typicaldish.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
