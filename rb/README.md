# ColombiaPublic Ruby SDK



The Ruby SDK for the ColombiaPublic API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Airport` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/colombia-public-sdk/releases](https://github.com/voxgig-sdk/colombia-public-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "ColombiaPublic_sdk"

client = ColombiaPublicSDK.new
```

### 2. List airport records

```ruby
begin
  # list returns an Array of Airport records — iterate directly.
  airports = client.Airport.list
  airports.each do |item|
    puts "#{item["id"]} #{item["city_id"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load an airport

```ruby
begin
  # load returns the bare Airport record (raises on error).
  airport = client.Airport.load({ "id" => "example_id" })
  puts airport
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  airports = client.Airport.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = ColombiaPublicSDK.test({
  "entity" => { "airport" => { "test01" => { "id" => "test01" } } },
})

# Entity ops return the bare mock record (raises on error).
airport = client.Airport.list()
puts airport
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = ColombiaPublicSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### ColombiaPublicSDK

```ruby
require_relative "ColombiaPublic_sdk"
client = ColombiaPublicSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = ColombiaPublicSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### ColombiaPublicSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `ColombiaPublicError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `airport = client.Airport`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city_id` | `Integer` |  |
| `code` | `String` |  |
| `department_id` | `Integer` |  |
| `id` | `Integer` |  |
| `latitude` | `Float` |  |
| `longitude` | `Float` |  |
| `name` | `String` |  |
| `type` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Airport record (raises on error).
airport = client.Airport.load({ "id" => "airport_id" })
```

#### Example: List

```ruby
# list returns an Array of Airport records (raises on error).
airports = client.Airport.list
```


### CategoryNaturalArea

Create an instance: `category_natural_area = client.CategoryNaturalArea`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` |  |
| `id` | `Integer` |  |
| `name` | `String` |  |

#### Example: List

```ruby
# list returns an Array of CategoryNaturalArea records (raises on error).
category_natural_areas = client.CategoryNaturalArea.list
```


### ConstitutionArticle

Create an instance: `constitution_article = client.ConstitutionArticle`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `article_number` | `Integer` |  |
| `chapter` | `String` |  |
| `description` | `String` |  |
| `id` | `Integer` |  |
| `title` | `String` |  |

#### Example: Load

```ruby
# load returns the bare ConstitutionArticle record (raises on error).
constitution_article = client.ConstitutionArticle.load({ "id" => "constitution_article_id" })
```

#### Example: List

```ruby
# list returns an Array of ConstitutionArticle records (raises on error).
constitution_articles = client.ConstitutionArticle.list
```


### Country

Create an instance: `country = client.Country`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capital` | `String` |  |
| `currency` | `String` |  |
| `flag` | `String` |  |
| `id` | `Integer` |  |
| `language` | `Array` |  |
| `name` | `String` |  |
| `population` | `Integer` |  |
| `surface` | `Float` |  |

#### Example: List

```ruby
# list returns an Array of Country records (raises on error).
countrys = client.Country.list
```


### Department

Create an instance: `department = client.Department`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city_capital` | `String` |  |
| `description` | `String` |  |
| `id` | `Integer` |  |
| `municipality` | `Integer` |  |
| `name` | `String` |  |
| `population` | `Integer` |  |
| `region_id` | `Integer` |  |
| `surface` | `Float` |  |

#### Example: Load

```ruby
# load returns the bare Department record (raises on error).
department = client.Department.load({ "id" => "department_id" })
```

#### Example: List

```ruby
# list returns an Array of Department records (raises on error).
departments = client.Department.list
```


### Holiday

Create an instance: `holiday = client.Holiday`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | `String` |  |
| `description` | `String` |  |
| `id` | `Integer` |  |
| `name` | `String` |  |
| `type` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Holiday record (raises on error).
holiday = client.Holiday.load({ "id" => "holiday_id" })
```

#### Example: List

```ruby
# list returns an Array of Holiday records (raises on error).
holidays = client.Holiday.list
```


### InvasiveSpecie

Create an instance: `invasive_specie = client.InvasiveSpecie`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `Integer` |  |
| `impact` | `String` |  |
| `manage` | `String` |  |
| `name` | `String` |  |
| `scientific_name` | `String` |  |
| `url_image` | `String` |  |

#### Example: Load

```ruby
# load returns the bare InvasiveSpecie record (raises on error).
invasive_specie = client.InvasiveSpecie.load({ "id" => "invasive_specie_id" })
```

#### Example: List

```ruby
# list returns an Array of InvasiveSpecie records (raises on error).
invasive_species = client.InvasiveSpecie.list
```


### Map

Create an instance: `map = client.Map`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `department_id` | `Integer` |  |
| `description` | `String` |  |
| `id` | `Integer` |  |
| `name` | `String` |  |
| `url_image` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of Map records (raises on error).
maps = client.Map.list
```


### NativeCommunity

Create an instance: `native_community = client.NativeCommunity`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `department_id` | `Integer` |  |
| `description` | `String` |  |
| `id` | `Integer` |  |
| `name` | `String` |  |
| `population` | `Integer` |  |

#### Example: Load

```ruby
# load returns the bare NativeCommunity record (raises on error).
native_community = client.NativeCommunity.load({ "id" => "native_community_id" })
```

#### Example: List

```ruby
# list returns an Array of NativeCommunity records (raises on error).
native_communitys = client.NativeCommunity.list
```


### NaturalArea

Create an instance: `natural_area = client.NaturalArea`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `area_group_id` | `Integer` |  |
| `category_natural_area_id` | `Integer` |  |
| `department_id` | `Integer` |  |
| `description` | `String` |  |
| `id` | `Integer` |  |
| `land_area` | `Float` |  |
| `maritime_area` | `Float` |  |
| `name` | `String` |  |

#### Example: Load

```ruby
# load returns the bare NaturalArea record (raises on error).
natural_area = client.NaturalArea.load({ "id" => "natural_area_id" })
```

#### Example: List

```ruby
# list returns an Array of NaturalArea records (raises on error).
natural_areas = client.NaturalArea.list
```


### President

Create an instance: `president = client.President`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` |  |
| `end_period_date` | `String` |  |
| `id` | `Integer` |  |
| `image` | `String` |  |
| `name` | `String` |  |
| `political_party` | `String` |  |
| `start_period_date` | `String` |  |

#### Example: Load

```ruby
# load returns the bare President record (raises on error).
president = client.President.load({ "id" => "president_id" })
```

#### Example: List

```ruby
# list returns an Array of President records (raises on error).
presidents = client.President.list
```


### Radio

Create an instance: `radio = client.Radio`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `band` | `String` |  |
| `frequency` | `String` |  |
| `id` | `Integer` |  |
| `name` | `String` |  |
| `url` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Radio record (raises on error).
radio = client.Radio.load({ "id" => "radio_id" })
```

#### Example: List

```ruby
# list returns an Array of Radio records (raises on error).
radios = client.Radio.list
```


### Region

Create an instance: `region = client.Region`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `department` | `Array` |  |
| `description` | `String` |  |
| `id` | `Integer` |  |
| `name` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Region record (raises on error).
region = client.Region.load({ "id" => "region_id" })
```

#### Example: List

```ruby
# list returns an Array of Region records (raises on error).
regions = client.Region.list
```


### TouristicAttraction

Create an instance: `touristic_attraction = client.TouristicAttraction`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `String` |  |
| `description` | `String` |  |
| `id` | `Integer` |  |
| `image` | `Array` |  |
| `latitude` | `Float` |  |
| `longitude` | `Float` |  |
| `name` | `String` |  |

#### Example: Load

```ruby
# load returns the bare TouristicAttraction record (raises on error).
touristic_attraction = client.TouristicAttraction.load({ "id" => "touristic_attraction_id" })
```

#### Example: List

```ruby
# list returns an Array of TouristicAttraction records (raises on error).
touristic_attractions = client.TouristicAttraction.list
```


### TypicalDish

Create an instance: `typical_dish = client.TypicalDish`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `department_id` | `Integer` |  |
| `description` | `String` |  |
| `id` | `Integer` |  |
| `ingredient` | `Array` |  |
| `name` | `String` |  |
| `url_image` | `String` |  |

#### Example: Load

```ruby
# load returns the bare TypicalDish record (raises on error).
typical_dish = client.TypicalDish.load({ "id" => "typical_dish_id" })
```

#### Example: List

```ruby
# list returns an Array of TypicalDish records (raises on error).
typical_dishs = client.TypicalDish.list
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── ColombiaPublic_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`ColombiaPublic_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
airport = client.Airport
airport.list()

# airport.data_get now returns the airport data from the last list
# airport.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
