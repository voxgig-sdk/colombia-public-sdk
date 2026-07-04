# ColombiaPublic Golang SDK



The Golang SDK for the ColombiaPublic API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

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
    airport, err := client.Airport(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(airport)
}
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

airport, err := client.Airport(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(airport) // the loaded mock data
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
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    airport, err := client.Airport(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil { /* handle */ }
    // airport is the loaded record

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
| `city_id` | ``$INTEGER`` |  |
| `code` | ``$STRING`` |  |
| `department_id` | ``$INTEGER`` |  |
| `id` | ``$INTEGER`` |  |
| `latitude` | ``$NUMBER`` |  |
| `longitude` | ``$NUMBER`` |  |
| `name` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |

#### Example: Load

```go
airport, err := client.Airport(nil).Load(map[string]any{"id": "airport_id"}, nil)
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

Create an instance: `category_natural_area := client.CategoryNaturalArea(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |

#### Example: List

```go
category_natural_areas, err := client.CategoryNaturalArea(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(category_natural_areas) // the array of records
```


### ConstitutionArticle

Create an instance: `constitution_article := client.ConstitutionArticle(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `article_number` | ``$INTEGER`` |  |
| `chapter` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `title` | ``$STRING`` |  |

#### Example: Load

```go
constitution_article, err := client.ConstitutionArticle(nil).Load(map[string]any{"id": "constitution_article_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(constitution_article) // the loaded record
```

#### Example: List

```go
constitution_articles, err := client.ConstitutionArticle(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(constitution_articles) // the array of records
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
| `capital` | ``$STRING`` |  |
| `currency` | ``$STRING`` |  |
| `flag` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `language` | ``$ARRAY`` |  |
| `name` | ``$STRING`` |  |
| `population` | ``$INTEGER`` |  |
| `surface` | ``$NUMBER`` |  |

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
| `city_capital` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `municipality` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `population` | ``$INTEGER`` |  |
| `region_id` | ``$INTEGER`` |  |
| `surface` | ``$NUMBER`` |  |

#### Example: Load

```go
department, err := client.Department(nil).Load(map[string]any{"id": "department_id"}, nil)
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
| `date` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |

#### Example: Load

```go
holiday, err := client.Holiday(nil).Load(map[string]any{"id": "holiday_id"}, nil)
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

Create an instance: `invasive_specie := client.InvasiveSpecie(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | ``$INTEGER`` |  |
| `impact` | ``$STRING`` |  |
| `manage` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `scientific_name` | ``$STRING`` |  |
| `url_image` | ``$STRING`` |  |

#### Example: Load

```go
invasive_specie, err := client.InvasiveSpecie(nil).Load(map[string]any{"id": "invasive_specie_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(invasive_specie) // the loaded record
```

#### Example: List

```go
invasive_species, err := client.InvasiveSpecie(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(invasive_species) // the array of records
```


### Map

Create an instance: `map := client.Map(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `department_id` | ``$INTEGER`` |  |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `url_image` | ``$ARRAY`` |  |

#### Example: List

```go
maps, err := client.Map(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(maps) // the array of records
```


### NativeCommunity

Create an instance: `native_community := client.NativeCommunity(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `department_id` | ``$INTEGER`` |  |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `population` | ``$INTEGER`` |  |

#### Example: Load

```go
native_community, err := client.NativeCommunity(nil).Load(map[string]any{"id": "native_community_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(native_community) // the loaded record
```

#### Example: List

```go
native_communitys, err := client.NativeCommunity(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(native_communitys) // the array of records
```


### NaturalArea

Create an instance: `natural_area := client.NaturalArea(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `area_group_id` | ``$INTEGER`` |  |
| `category_natural_area_id` | ``$INTEGER`` |  |
| `department_id` | ``$INTEGER`` |  |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `land_area` | ``$NUMBER`` |  |
| `maritime_area` | ``$NUMBER`` |  |
| `name` | ``$STRING`` |  |

#### Example: Load

```go
natural_area, err := client.NaturalArea(nil).Load(map[string]any{"id": "natural_area_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(natural_area) // the loaded record
```

#### Example: List

```go
natural_areas, err := client.NaturalArea(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(natural_areas) // the array of records
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
| `description` | ``$STRING`` |  |
| `end_period_date` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `image` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `political_party` | ``$STRING`` |  |
| `start_period_date` | ``$STRING`` |  |

#### Example: Load

```go
president, err := client.President(nil).Load(map[string]any{"id": "president_id"}, nil)
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
| `band` | ``$STRING`` |  |
| `frequency` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```go
radio, err := client.Radio(nil).Load(map[string]any{"id": "radio_id"}, nil)
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
| `department` | ``$ARRAY`` |  |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |

#### Example: Load

```go
region, err := client.Region(nil).Load(map[string]any{"id": "region_id"}, nil)
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

Create an instance: `touristic_attraction := client.TouristicAttraction(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `image` | ``$ARRAY`` |  |
| `latitude` | ``$NUMBER`` |  |
| `longitude` | ``$NUMBER`` |  |
| `name` | ``$STRING`` |  |

#### Example: Load

```go
touristic_attraction, err := client.TouristicAttraction(nil).Load(map[string]any{"id": "touristic_attraction_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(touristic_attraction) // the loaded record
```

#### Example: List

```go
touristic_attractions, err := client.TouristicAttraction(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(touristic_attractions) // the array of records
```


### TypicalDish

Create an instance: `typical_dish := client.TypicalDish(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `department_id` | ``$INTEGER`` |  |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `ingredient` | ``$ARRAY`` |  |
| `name` | ``$STRING`` |  |
| `url_image` | ``$STRING`` |  |

#### Example: Load

```go
typical_dish, err := client.TypicalDish(nil).Load(map[string]any{"id": "typical_dish_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(typical_dish) // the loaded record
```

#### Example: List

```go
typical_dishs, err := client.TypicalDish(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(typical_dishs) // the array of records
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

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

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
airport := client.Airport(nil)
airport.Load(map[string]any{"id": "example_id"}, nil)

// airport.Data() now returns the loaded airport data
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
