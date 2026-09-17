# ColombiaPublic Lua SDK



The Lua SDK for the ColombiaPublic API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Airport()` — each with the same small set of operations (`list`, `load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/colombia-public-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("colombia-public_sdk")

local client = sdk.new()
```

### 2. List airport records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local airports, err = client:Airport():list()
if err then error(err) end

for _, item in ipairs(airports) do
  print(item["id"], item["code"])
end
```

### 3. Load an airport

```lua
local airport, err = client:Airport():load({ id = 1 })
if err then error(err) end
print(airport)
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local typicaldishs, err = client:TypicalDish():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:TypicalDish():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### ColombiaPublicSDK

```lua
local sdk = require("colombia-public_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### ColombiaPublicSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Airport` | `(data) -> AirportEntity` | Create an Airport entity instance. |
| `CategoryNaturalArea` | `(data) -> CategoryNaturalAreaEntity` | Create a CategoryNaturalArea entity instance. |
| `ConstitutionArticle` | `(data) -> ConstitutionArticleEntity` | Create a ConstitutionArticle entity instance. |
| `Country` | `(data) -> CountryEntity` | Create a Country entity instance. |
| `Department` | `(data) -> DepartmentEntity` | Create a Department entity instance. |
| `Holiday` | `(data) -> HolidayEntity` | Create a Holiday entity instance. |
| `InvasiveSpecie` | `(data) -> InvasiveSpecieEntity` | Create an InvasiveSpecie entity instance. |
| `Map` | `(data) -> MapEntity` | Create a Map entity instance. |
| `NativeCommunity` | `(data) -> NativeCommunityEntity` | Create a NativeCommunity entity instance. |
| `NaturalArea` | `(data) -> NaturalAreaEntity` | Create a NaturalArea entity instance. |
| `President` | `(data) -> PresidentEntity` | Create a President entity instance. |
| `Radio` | `(data) -> RadioEntity` | Create a Radio entity instance. |
| `Region` | `(data) -> RegionEntity` | Create a Region entity instance. |
| `TouristicAttraction` | `(data) -> TouristicAttractionEntity` | Create a TouristicAttraction entity instance. |
| `TypicalDish` | `(data) -> TypicalDishEntity` | Create a TypicalDish entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local airport, err = client:Airport():load({ id = "example_id" })
    if err then error(err) end
    -- airport is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Airport

| Field | Description |
| --- | --- |
| `cityId` | City ID |
| `code` | IATA code |
| `departmentId` | Department ID |
| `id` | Airport ID |
| `latitude` | Latitude coordinate |
| `longitude` | Longitude coordinate |
| `name` | Airport name |
| `type` | Airport type |

Operations: List, Load.

API path: `/Airport`

#### CategoryNaturalArea

| Field | Description |
| --- | --- |
| `description` | Category description |
| `id` | Category ID |
| `name` | Category name |

Operations: List.

API path: `/CategoryNaturalArea`

#### ConstitutionArticle

| Field | Description |
| --- | --- |
| `articleNumber` | Article number |
| `chapter` | Constitution chapter |
| `description` | Article content |
| `id` | Article ID |
| `title` | Article title |

Operations: List, Load.

API path: `/ConstitutionArticle`

#### Country

| Field | Description |
| --- | --- |
| `capital` | Capital city |
| `currency` | Currency |
| `flag` | URL to flag image |
| `id` | Country ID |
| `languages` | Official languages |
| `name` | Country name |
| `population` | Total population |
| `surface` | Surface area in square kilometers |

Operations: List.

API path: `/Country/Colombia`

#### Department

| Field | Description |
| --- | --- |
| `cityCapital` | Capital city of the department |
| `description` | Department description |
| `id` | Department ID |
| `municipalities` | Number of municipalities |
| `name` | Department name |
| `population` | Population |
| `regionId` | Region ID |
| `surface` | Surface area |

Operations: List, Load.

API path: `/Department`

#### Holiday

| Field | Description |
| --- | --- |
| `date` | Holiday date |
| `description` | Holiday description |
| `id` | Holiday ID |
| `name` | Holiday name |
| `type` | Holiday type (religious, civic, etc.) |

Operations: List, Load.

API path: `/Holiday`

#### InvasiveSpecie

| Field | Description |
| --- | --- |
| `id` | Invasive species ID |
| `impact` | Environmental impact |
| `manage` | Management strategies |
| `name` | Species name |
| `scientificName` | Scientific name |
| `urlImage` | URL to species image |

Operations: List, Load.

API path: `/InvasiveSpecie`

#### Map

| Field | Description |
| --- | --- |
| `departmentId` | Department ID |
| `description` | Map description |
| `id` | Map ID |
| `name` | Map name |
| `urlImages` | URLs to map images |

Operations: List.

API path: `/Map`

#### NativeCommunity

| Field | Description |
| --- | --- |
| `departmentId` | Department ID |
| `description` | Community description |
| `id` | Native community ID |
| `name` | Community name |
| `population` | Population |

Operations: List, Load.

API path: `/NativeCommunity`

#### NaturalArea

| Field | Description |
| --- | --- |
| `areaGroupId` | Area group ID |
| `categoryNaturalAreaId` | Category ID |
| `departmentId` | Department ID |
| `description` | Natural area description |
| `id` | Natural area ID |
| `landArea` | Land area in hectares |
| `maritimeArea` | Maritime area in hectares |
| `name` | Natural area name |

Operations: List, Load.

API path: `/NaturalArea`

#### President

| Field | Description |
| --- | --- |
| `description` | Biography and description |
| `endPeriodDate` | End date of presidency |
| `id` | President ID |
| `image` | URL to president image |
| `name` | President name |
| `politicalParty` | Political party |
| `startPeriodDate` | Start date of presidency |

Operations: List, Load.

API path: `/President`

#### Radio

| Field | Description |
| --- | --- |
| `band` | Broadcasting band (AM/FM) |
| `frequency` | Broadcasting frequency |
| `id` | Radio station ID |
| `name` | Radio station name |
| `url` | Station URL |

Operations: List, Load.

API path: `/Radio`

#### Region

| Field | Description |
| --- | --- |
| `departments` | List of departments in the region |
| `description` | Region description |
| `id` | Region ID |
| `name` | Region name |

Operations: List, Load.

API path: `/Region`

#### TouristicAttraction

| Field | Description |
| --- | --- |
| `city` | City where the attraction is located |
| `description` | Attraction description |
| `id` | Touristic attraction ID |
| `images` | List of image URLs |
| `latitude` | Latitude coordinate |
| `longitude` | Longitude coordinate |
| `name` | Attraction name |

Operations: List, Load.

API path: `/TouristicAttraction`

#### TypicalDish

| Field | Description |
| --- | --- |
| `departmentId` | Department ID |
| `description` | Dish description |
| `id` | Typical dish ID |
| `ingredients` | List of ingredients |
| `name` | Dish name |
| `urlImage` | URL to dish image |

Operations: List, Load.

API path: `/TypicalDish`



## Entities


### Airport

Create an instance: `local airport = client:Airport(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cityId` | `number` | City ID |
| `code` | `string` | IATA code |
| `departmentId` | `number` | Department ID |
| `id` | `number` | Airport ID |
| `latitude` | `number` | Latitude coordinate |
| `longitude` | `number` | Longitude coordinate |
| `name` | `string` | Airport name |
| `type` | `string` | Airport type |

#### Example: Load

```lua
local airport, err = client:Airport():load({ id = 1 })
```

#### Example: List

```lua
local airports, err = client:Airport():list()
```


### CategoryNaturalArea

Create an instance: `local category_natural_area = client:CategoryNaturalArea(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | Category description |
| `id` | `number` | Category ID |
| `name` | `string` | Category name |

#### Example: List

```lua
local category_natural_areas, err = client:CategoryNaturalArea():list()
```


### ConstitutionArticle

Create an instance: `local constitution_article = client:ConstitutionArticle(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `articleNumber` | `number` | Article number |
| `chapter` | `string` | Constitution chapter |
| `description` | `string` | Article content |
| `id` | `number` | Article ID |
| `title` | `string` | Article title |

#### Example: Load

```lua
local constitution_article, err = client:ConstitutionArticle():load({ id = 1 })
```

#### Example: List

```lua
local constitution_articles, err = client:ConstitutionArticle():list()
```


### Country

Create an instance: `local country = client:Country(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capital` | `string` | Capital city |
| `currency` | `string` | Currency |
| `flag` | `string` | URL to flag image |
| `id` | `number` | Country ID |
| `languages` | `table` | Official languages |
| `name` | `string` | Country name |
| `population` | `number` | Total population |
| `surface` | `number` | Surface area in square kilometers |

#### Example: List

```lua
local countrys, err = client:Country():list()
```


### Department

Create an instance: `local department = client:Department(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cityCapital` | `string` | Capital city of the department |
| `description` | `string` | Department description |
| `id` | `number` | Department ID |
| `municipalities` | `number` | Number of municipalities |
| `name` | `string` | Department name |
| `population` | `number` | Population |
| `regionId` | `number` | Region ID |
| `surface` | `number` | Surface area |

#### Example: Load

```lua
local department, err = client:Department():load({ id = 1 })
```

#### Example: List

```lua
local departments, err = client:Department():list()
```


### Holiday

Create an instance: `local holiday = client:Holiday(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | `string` | Holiday date |
| `description` | `string` | Holiday description |
| `id` | `number` | Holiday ID |
| `name` | `string` | Holiday name |
| `type` | `string` | Holiday type (religious, civic, etc.) |

#### Example: Load

```lua
local holiday, err = client:Holiday():load({ id = 1 })
```

#### Example: List

```lua
local holidays, err = client:Holiday():list()
```


### InvasiveSpecie

Create an instance: `local invasive_specie = client:InvasiveSpecie(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `number` | Invasive species ID |
| `impact` | `string` | Environmental impact |
| `manage` | `string` | Management strategies |
| `name` | `string` | Species name |
| `scientificName` | `string` | Scientific name |
| `urlImage` | `string` | URL to species image |

#### Example: Load

```lua
local invasive_specie, err = client:InvasiveSpecie():load({ id = 1 })
```

#### Example: List

```lua
local invasive_species, err = client:InvasiveSpecie():list()
```


### Map

Create an instance: `local map = client:Map(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `departmentId` | `number` | Department ID |
| `description` | `string` | Map description |
| `id` | `number` | Map ID |
| `name` | `string` | Map name |
| `urlImages` | `table` | URLs to map images |

#### Example: List

```lua
local maps, err = client:Map():list()
```


### NativeCommunity

Create an instance: `local native_community = client:NativeCommunity(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `departmentId` | `number` | Department ID |
| `description` | `string` | Community description |
| `id` | `number` | Native community ID |
| `name` | `string` | Community name |
| `population` | `number` | Population |

#### Example: Load

```lua
local native_community, err = client:NativeCommunity():load({ id = 1 })
```

#### Example: List

```lua
local native_communitys, err = client:NativeCommunity():list()
```


### NaturalArea

Create an instance: `local natural_area = client:NaturalArea(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `areaGroupId` | `number` | Area group ID |
| `categoryNaturalAreaId` | `number` | Category ID |
| `departmentId` | `number` | Department ID |
| `description` | `string` | Natural area description |
| `id` | `number` | Natural area ID |
| `landArea` | `number` | Land area in hectares |
| `maritimeArea` | `number` | Maritime area in hectares |
| `name` | `string` | Natural area name |

#### Example: Load

```lua
local natural_area, err = client:NaturalArea():load({ id = 1 })
```

#### Example: List

```lua
local natural_areas, err = client:NaturalArea():list()
```


### President

Create an instance: `local president = client:President(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | Biography and description |
| `endPeriodDate` | `string` | End date of presidency |
| `id` | `number` | President ID |
| `image` | `string` | URL to president image |
| `name` | `string` | President name |
| `politicalParty` | `string` | Political party |
| `startPeriodDate` | `string` | Start date of presidency |

#### Example: Load

```lua
local president, err = client:President():load({ id = 1 })
```

#### Example: List

```lua
local presidents, err = client:President():list()
```


### Radio

Create an instance: `local radio = client:Radio(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `band` | `string` | Broadcasting band (AM/FM) |
| `frequency` | `string` | Broadcasting frequency |
| `id` | `number` | Radio station ID |
| `name` | `string` | Radio station name |
| `url` | `string` | Station URL |

#### Example: Load

```lua
local radio, err = client:Radio():load({ id = 1 })
```

#### Example: List

```lua
local radios, err = client:Radio():list()
```


### Region

Create an instance: `local region = client:Region(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `departments` | `table` | List of departments in the region |
| `description` | `string` | Region description |
| `id` | `number` | Region ID |
| `name` | `string` | Region name |

#### Example: Load

```lua
local region, err = client:Region():load({ id = 1 })
```

#### Example: List

```lua
local regions, err = client:Region():list()
```


### TouristicAttraction

Create an instance: `local touristic_attraction = client:TouristicAttraction(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `string` | City where the attraction is located |
| `description` | `string` | Attraction description |
| `id` | `number` | Touristic attraction ID |
| `images` | `table` | List of image URLs |
| `latitude` | `number` | Latitude coordinate |
| `longitude` | `number` | Longitude coordinate |
| `name` | `string` | Attraction name |

#### Example: Load

```lua
local touristic_attraction, err = client:TouristicAttraction():load({ id = 1 })
```

#### Example: List

```lua
local touristic_attractions, err = client:TouristicAttraction():list()
```


### TypicalDish

Create an instance: `local typical_dish = client:TypicalDish(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `departmentId` | `number` | Department ID |
| `description` | `string` | Dish description |
| `id` | `number` | Typical dish ID |
| `ingredients` | `table` | List of ingredients |
| `name` | `string` | Dish name |
| `urlImage` | `string` | URL to dish image |

#### Example: Load

```lua
local typical_dish, err = client:TypicalDish():load({ id = 1 })
```

#### Example: List

```lua
local typical_dishs, err = client:TypicalDish():list()
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Client-side rate limiting via a token bucket |
| [`retry`](#retry) | Automatic retry of transient failures with exponential backoff |
| [`test`](#test) | In-memory mock transport for testing without a live server |
| [`timeout`](#timeout) | Per-request timeout with transport abort |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Client-side rate limiting via a token bucket.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Automatic retry of transient failures with exponential backoff.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Per-request timeout with transport abort.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── colombia-public_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── schema.lua               -- Generated option + entity specs
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`colombia-public_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local typicaldish = client:TypicalDish()
typicaldish:list()

-- typicaldish:data_get() now returns the typicaldish data from the last list
-- typicaldish:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
