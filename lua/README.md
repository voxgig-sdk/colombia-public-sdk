# ColombiaPublic Lua SDK



The Lua SDK for the ColombiaPublic API — an entity-oriented client using Lua conventions.

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
  print(item["id"], item["name"])
end
```

### 3. Load an airport

```lua
local airport, err = client:Airport():load({ id = "example_id" })
if err then error(err) end
print(airport)
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

local result, err = client:Airport():load({ id = "test01" })
-- result is the loaded data; err is set on failure
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
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity. |
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
| `load` / `create` / `update` / `remove` | the entity record (a `table`) |
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
| `city_id` |  |
| `code` |  |
| `department_id` |  |
| `id` |  |
| `latitude` |  |
| `longitude` |  |
| `name` |  |
| `type` |  |

Operations: List, Load.

API path: `/Airport`

#### CategoryNaturalArea

| Field | Description |
| --- | --- |
| `description` |  |
| `id` |  |
| `name` |  |

Operations: List.

API path: `/CategoryNaturalArea`

#### ConstitutionArticle

| Field | Description |
| --- | --- |
| `article_number` |  |
| `chapter` |  |
| `description` |  |
| `id` |  |
| `title` |  |

Operations: List, Load.

API path: `/ConstitutionArticle`

#### Country

| Field | Description |
| --- | --- |
| `capital` |  |
| `currency` |  |
| `flag` |  |
| `id` |  |
| `language` |  |
| `name` |  |
| `population` |  |
| `surface` |  |

Operations: List.

API path: `/Country/Colombia`

#### Department

| Field | Description |
| --- | --- |
| `city_capital` |  |
| `description` |  |
| `id` |  |
| `municipality` |  |
| `name` |  |
| `population` |  |
| `region_id` |  |
| `surface` |  |

Operations: List, Load.

API path: `/Department`

#### Holiday

| Field | Description |
| --- | --- |
| `date` |  |
| `description` |  |
| `id` |  |
| `name` |  |
| `type` |  |

Operations: List, Load.

API path: `/Holiday`

#### InvasiveSpecie

| Field | Description |
| --- | --- |
| `id` |  |
| `impact` |  |
| `manage` |  |
| `name` |  |
| `scientific_name` |  |
| `url_image` |  |

Operations: List, Load.

API path: `/InvasiveSpecie`

#### Map

| Field | Description |
| --- | --- |
| `department_id` |  |
| `description` |  |
| `id` |  |
| `name` |  |
| `url_image` |  |

Operations: List.

API path: `/Map`

#### NativeCommunity

| Field | Description |
| --- | --- |
| `department_id` |  |
| `description` |  |
| `id` |  |
| `name` |  |
| `population` |  |

Operations: List, Load.

API path: `/NativeCommunity`

#### NaturalArea

| Field | Description |
| --- | --- |
| `area_group_id` |  |
| `category_natural_area_id` |  |
| `department_id` |  |
| `description` |  |
| `id` |  |
| `land_area` |  |
| `maritime_area` |  |
| `name` |  |

Operations: List, Load.

API path: `/NaturalArea`

#### President

| Field | Description |
| --- | --- |
| `description` |  |
| `end_period_date` |  |
| `id` |  |
| `image` |  |
| `name` |  |
| `political_party` |  |
| `start_period_date` |  |

Operations: List, Load.

API path: `/President`

#### Radio

| Field | Description |
| --- | --- |
| `band` |  |
| `frequency` |  |
| `id` |  |
| `name` |  |
| `url` |  |

Operations: List, Load.

API path: `/Radio`

#### Region

| Field | Description |
| --- | --- |
| `department` |  |
| `description` |  |
| `id` |  |
| `name` |  |

Operations: List, Load.

API path: `/Region`

#### TouristicAttraction

| Field | Description |
| --- | --- |
| `city` |  |
| `description` |  |
| `id` |  |
| `image` |  |
| `latitude` |  |
| `longitude` |  |
| `name` |  |

Operations: List, Load.

API path: `/TouristicAttraction`

#### TypicalDish

| Field | Description |
| --- | --- |
| `department_id` |  |
| `description` |  |
| `id` |  |
| `ingredient` |  |
| `name` |  |
| `url_image` |  |

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
| `city_id` | ``$INTEGER`` |  |
| `code` | ``$STRING`` |  |
| `department_id` | ``$INTEGER`` |  |
| `id` | ``$INTEGER`` |  |
| `latitude` | ``$NUMBER`` |  |
| `longitude` | ``$NUMBER`` |  |
| `name` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |

#### Example: Load

```lua
local airport, err = client:Airport():load({ id = "airport_id" })
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
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |

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
| `article_number` | ``$INTEGER`` |  |
| `chapter` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `title` | ``$STRING`` |  |

#### Example: Load

```lua
local constitution_article, err = client:ConstitutionArticle():load({ id = "constitution_article_id" })
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
| `capital` | ``$STRING`` |  |
| `currency` | ``$STRING`` |  |
| `flag` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `language` | ``$ARRAY`` |  |
| `name` | ``$STRING`` |  |
| `population` | ``$INTEGER`` |  |
| `surface` | ``$NUMBER`` |  |

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
| `city_capital` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `municipality` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `population` | ``$INTEGER`` |  |
| `region_id` | ``$INTEGER`` |  |
| `surface` | ``$NUMBER`` |  |

#### Example: Load

```lua
local department, err = client:Department():load({ id = "department_id" })
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
| `date` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |

#### Example: Load

```lua
local holiday, err = client:Holiday():load({ id = "holiday_id" })
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
| `id` | ``$INTEGER`` |  |
| `impact` | ``$STRING`` |  |
| `manage` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `scientific_name` | ``$STRING`` |  |
| `url_image` | ``$STRING`` |  |

#### Example: Load

```lua
local invasive_specie, err = client:InvasiveSpecie():load({ id = "invasive_specie_id" })
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
| `department_id` | ``$INTEGER`` |  |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `url_image` | ``$ARRAY`` |  |

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
| `department_id` | ``$INTEGER`` |  |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `population` | ``$INTEGER`` |  |

#### Example: Load

```lua
local native_community, err = client:NativeCommunity():load({ id = "native_community_id" })
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
| `area_group_id` | ``$INTEGER`` |  |
| `category_natural_area_id` | ``$INTEGER`` |  |
| `department_id` | ``$INTEGER`` |  |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `land_area` | ``$NUMBER`` |  |
| `maritime_area` | ``$NUMBER`` |  |
| `name` | ``$STRING`` |  |

#### Example: Load

```lua
local natural_area, err = client:NaturalArea():load({ id = "natural_area_id" })
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
| `description` | ``$STRING`` |  |
| `end_period_date` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `image` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `political_party` | ``$STRING`` |  |
| `start_period_date` | ``$STRING`` |  |

#### Example: Load

```lua
local president, err = client:President():load({ id = "president_id" })
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
| `band` | ``$STRING`` |  |
| `frequency` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```lua
local radio, err = client:Radio():load({ id = "radio_id" })
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
| `department` | ``$ARRAY`` |  |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |

#### Example: Load

```lua
local region, err = client:Region():load({ id = "region_id" })
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
| `city` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `image` | ``$ARRAY`` |  |
| `latitude` | ``$NUMBER`` |  |
| `longitude` | ``$NUMBER`` |  |
| `name` | ``$STRING`` |  |

#### Example: Load

```lua
local touristic_attraction, err = client:TouristicAttraction():load({ id = "touristic_attraction_id" })
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
| `department_id` | ``$INTEGER`` |  |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `ingredient` | ``$ARRAY`` |  |
| `name` | ``$STRING`` |  |
| `url_image` | ``$STRING`` |  |

#### Example: Load

```lua
local typical_dish, err = client:TypicalDish():load({ id = "typical_dish_id" })
```

#### Example: List

```lua
local typical_dishs, err = client:TypicalDish():list()
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
error is returned to the caller as a second return value.

### Features and hooks

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

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

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```lua
local airport = client:Airport()
airport:load({ id = "example_id" })

-- airport:data_get() now returns the loaded airport data
-- airport:match_get() returns the last match criteria
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
