# ColombiaPublic Golang SDK



The Golang SDK for the ColombiaPublic API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Airport(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
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
airports, err := client.Airport(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = airports
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

airport, err := client.Airport(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(airport) // the returned mock data
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
| `"city_id"` |  |
| `"code"` |  |
| `"department_id"` |  |
| `"id"` |  |
| `"latitude"` |  |
| `"longitude"` |  |
| `"name"` |  |
| `"type"` |  |

Operations: List, Load.

API path: `/Airport`

#### CategoryNaturalArea

| Field | Description |
| --- | --- |
| `"description"` |  |
| `"id"` |  |
| `"name"` |  |

Operations: List.

API path: `/CategoryNaturalArea`

#### ConstitutionArticle

| Field | Description |
| --- | --- |
| `"article_number"` |  |
| `"chapter"` |  |
| `"description"` |  |
| `"id"` |  |
| `"title"` |  |

Operations: List, Load.

API path: `/ConstitutionArticle`

#### Country

| Field | Description |
| --- | --- |
| `"capital"` |  |
| `"currency"` |  |
| `"flag"` |  |
| `"id"` |  |
| `"language"` |  |
| `"name"` |  |
| `"population"` |  |
| `"surface"` |  |

Operations: List.

API path: `/Country/Colombia`

#### Department

| Field | Description |
| --- | --- |
| `"city_capital"` |  |
| `"description"` |  |
| `"id"` |  |
| `"municipality"` |  |
| `"name"` |  |
| `"population"` |  |
| `"region_id"` |  |
| `"surface"` |  |

Operations: List, Load.

API path: `/Department`

#### Holiday

| Field | Description |
| --- | --- |
| `"date"` |  |
| `"description"` |  |
| `"id"` |  |
| `"name"` |  |
| `"type"` |  |

Operations: List, Load.

API path: `/Holiday`

#### InvasiveSpecie

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"impact"` |  |
| `"manage"` |  |
| `"name"` |  |
| `"scientific_name"` |  |
| `"url_image"` |  |

Operations: List, Load.

API path: `/InvasiveSpecie`

#### Map

| Field | Description |
| --- | --- |
| `"department_id"` |  |
| `"description"` |  |
| `"id"` |  |
| `"name"` |  |
| `"url_image"` |  |

Operations: List.

API path: `/Map`

#### NativeCommunity

| Field | Description |
| --- | --- |
| `"department_id"` |  |
| `"description"` |  |
| `"id"` |  |
| `"name"` |  |
| `"population"` |  |

Operations: List, Load.

API path: `/NativeCommunity`

#### NaturalArea

| Field | Description |
| --- | --- |
| `"area_group_id"` |  |
| `"category_natural_area_id"` |  |
| `"department_id"` |  |
| `"description"` |  |
| `"id"` |  |
| `"land_area"` |  |
| `"maritime_area"` |  |
| `"name"` |  |

Operations: List, Load.

API path: `/NaturalArea`

#### President

| Field | Description |
| --- | --- |
| `"description"` |  |
| `"end_period_date"` |  |
| `"id"` |  |
| `"image"` |  |
| `"name"` |  |
| `"political_party"` |  |
| `"start_period_date"` |  |

Operations: List, Load.

API path: `/President`

#### Radio

| Field | Description |
| --- | --- |
| `"band"` |  |
| `"frequency"` |  |
| `"id"` |  |
| `"name"` |  |
| `"url"` |  |

Operations: List, Load.

API path: `/Radio`

#### Region

| Field | Description |
| --- | --- |
| `"department"` |  |
| `"description"` |  |
| `"id"` |  |
| `"name"` |  |

Operations: List, Load.

API path: `/Region`

#### TouristicAttraction

| Field | Description |
| --- | --- |
| `"city"` |  |
| `"description"` |  |
| `"id"` |  |
| `"image"` |  |
| `"latitude"` |  |
| `"longitude"` |  |
| `"name"` |  |

Operations: List, Load.

API path: `/TouristicAttraction`

#### TypicalDish

| Field | Description |
| --- | --- |
| `"department_id"` |  |
| `"description"` |  |
| `"id"` |  |
| `"ingredient"` |  |
| `"name"` |  |
| `"url_image"` |  |

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
| `city_id` | `int` |  |
| `code` | `string` |  |
| `department_id` | `int` |  |
| `id` | `int` |  |
| `latitude` | `float64` |  |
| `longitude` | `float64` |  |
| `name` | `string` |  |
| `type` | `string` |  |

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
| `description` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |

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
| `article_number` | `int` |  |
| `chapter` | `string` |  |
| `description` | `string` |  |
| `id` | `int` |  |
| `title` | `string` |  |

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
| `capital` | `string` |  |
| `currency` | `string` |  |
| `flag` | `string` |  |
| `id` | `int` |  |
| `language` | `[]any` |  |
| `name` | `string` |  |
| `population` | `int` |  |
| `surface` | `float64` |  |

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
| `city_capital` | `string` |  |
| `description` | `string` |  |
| `id` | `int` |  |
| `municipality` | `int` |  |
| `name` | `string` |  |
| `population` | `int` |  |
| `region_id` | `int` |  |
| `surface` | `float64` |  |

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
| `date` | `string` |  |
| `description` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `type` | `string` |  |

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
| `id` | `int` |  |
| `impact` | `string` |  |
| `manage` | `string` |  |
| `name` | `string` |  |
| `scientific_name` | `string` |  |
| `url_image` | `string` |  |

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
| `department_id` | `int` |  |
| `description` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `url_image` | `[]any` |  |

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
| `department_id` | `int` |  |
| `description` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `population` | `int` |  |

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
| `area_group_id` | `int` |  |
| `category_natural_area_id` | `int` |  |
| `department_id` | `int` |  |
| `description` | `string` |  |
| `id` | `int` |  |
| `land_area` | `float64` |  |
| `maritime_area` | `float64` |  |
| `name` | `string` |  |

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
| `description` | `string` |  |
| `end_period_date` | `string` |  |
| `id` | `int` |  |
| `image` | `string` |  |
| `name` | `string` |  |
| `political_party` | `string` |  |
| `start_period_date` | `string` |  |

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
| `band` | `string` |  |
| `frequency` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `url` | `string` |  |

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
| `department` | `[]any` |  |
| `description` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |

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
| `city` | `string` |  |
| `description` | `string` |  |
| `id` | `int` |  |
| `image` | `[]any` |  |
| `latitude` | `float64` |  |
| `longitude` | `float64` |  |
| `name` | `string` |  |

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
| `department_id` | `int` |  |
| `description` | `string` |  |
| `id` | `int` |  |
| `ingredient` | `[]any` |  |
| `name` | `string` |  |
| `url_image` | `string` |  |

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
airport := client.Airport(nil)
airport.List(nil, nil)

// airport.Data() now returns the airport data from the last list
// airport.Match() returns the last match criteria
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
