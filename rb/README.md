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
    puts "#{item["id"]} #{item["cityId"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load an airport

```ruby
begin
  # load returns the ENTITY — call data_get for the Airport record (raises on error).
  airport = client.Airport.load({ "id" => 1 })
  puts airport
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  typicaldishs = client.TypicalDish.list()
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
  "entity" => { "typicaldish" => { "test01" => { "id" => "test01" } } },
})

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
typicaldish = client.TypicalDish.list()
puts typicaldish
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

Create an instance: `airport = client.Airport`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cityId` | `Integer` | City ID |
| `code` | `String` | IATA code |
| `departmentId` | `Integer` | Department ID |
| `id` | `Integer` | Airport ID |
| `latitude` | `Float` | Latitude coordinate |
| `longitude` | `Float` | Longitude coordinate |
| `name` | `String` | Airport name |
| `type` | `String` | Airport type |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Airport record (raises on error).
airport = client.Airport.load({ "id" => 1 })
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
| `description` | `String` | Category description |
| `id` | `Integer` | Category ID |
| `name` | `String` | Category name |

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
| `articleNumber` | `Integer` | Article number |
| `chapter` | `String` | Constitution chapter |
| `description` | `String` | Article content |
| `id` | `Integer` | Article ID |
| `title` | `String` | Article title |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ConstitutionArticle record (raises on error).
constitution_article = client.ConstitutionArticle.load({ "id" => 1 })
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
| `capital` | `String` | Capital city |
| `currency` | `String` | Currency |
| `flag` | `String` | URL to flag image |
| `id` | `Integer` | Country ID |
| `languages` | `Array` | Official languages |
| `name` | `String` | Country name |
| `population` | `Integer` | Total population |
| `surface` | `Float` | Surface area in square kilometers |

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
| `cityCapital` | `String` | Capital city of the department |
| `description` | `String` | Department description |
| `id` | `Integer` | Department ID |
| `municipalities` | `Integer` | Number of municipalities |
| `name` | `String` | Department name |
| `population` | `Integer` | Population |
| `regionId` | `Integer` | Region ID |
| `surface` | `Float` | Surface area |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Department record (raises on error).
department = client.Department.load({ "id" => 1 })
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
| `date` | `String` | Holiday date |
| `description` | `String` | Holiday description |
| `id` | `Integer` | Holiday ID |
| `name` | `String` | Holiday name |
| `type` | `String` | Holiday type (religious, civic, etc.) |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Holiday record (raises on error).
holiday = client.Holiday.load({ "id" => 1 })
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
| `id` | `Integer` | Invasive species ID |
| `impact` | `String` | Environmental impact |
| `manage` | `String` | Management strategies |
| `name` | `String` | Species name |
| `scientificName` | `String` | Scientific name |
| `urlImage` | `String` | URL to species image |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the InvasiveSpecie record (raises on error).
invasive_specie = client.InvasiveSpecie.load({ "id" => 1 })
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
| `departmentId` | `Integer` | Department ID |
| `description` | `String` | Map description |
| `id` | `Integer` | Map ID |
| `name` | `String` | Map name |
| `urlImages` | `Array` | URLs to map images |

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
| `departmentId` | `Integer` | Department ID |
| `description` | `String` | Community description |
| `id` | `Integer` | Native community ID |
| `name` | `String` | Community name |
| `population` | `Integer` | Population |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the NativeCommunity record (raises on error).
native_community = client.NativeCommunity.load({ "id" => 1 })
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
| `areaGroupId` | `Integer` | Area group ID |
| `categoryNaturalAreaId` | `Integer` | Category ID |
| `departmentId` | `Integer` | Department ID |
| `description` | `String` | Natural area description |
| `id` | `Integer` | Natural area ID |
| `landArea` | `Float` | Land area in hectares |
| `maritimeArea` | `Float` | Maritime area in hectares |
| `name` | `String` | Natural area name |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the NaturalArea record (raises on error).
natural_area = client.NaturalArea.load({ "id" => 1 })
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
| `description` | `String` | Biography and description |
| `endPeriodDate` | `String` | End date of presidency |
| `id` | `Integer` | President ID |
| `image` | `String` | URL to president image |
| `name` | `String` | President name |
| `politicalParty` | `String` | Political party |
| `startPeriodDate` | `String` | Start date of presidency |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the President record (raises on error).
president = client.President.load({ "id" => 1 })
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
| `band` | `String` | Broadcasting band (AM/FM) |
| `frequency` | `String` | Broadcasting frequency |
| `id` | `Integer` | Radio station ID |
| `name` | `String` | Radio station name |
| `url` | `String` | Station URL |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Radio record (raises on error).
radio = client.Radio.load({ "id" => 1 })
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
| `departments` | `Array` | List of departments in the region |
| `description` | `String` | Region description |
| `id` | `Integer` | Region ID |
| `name` | `String` | Region name |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Region record (raises on error).
region = client.Region.load({ "id" => 1 })
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
| `city` | `String` | City where the attraction is located |
| `description` | `String` | Attraction description |
| `id` | `Integer` | Touristic attraction ID |
| `images` | `Array` | List of image URLs |
| `latitude` | `Float` | Latitude coordinate |
| `longitude` | `Float` | Longitude coordinate |
| `name` | `String` | Attraction name |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the TouristicAttraction record (raises on error).
touristic_attraction = client.TouristicAttraction.load({ "id" => 1 })
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
| `departmentId` | `Integer` | Department ID |
| `description` | `String` | Dish description |
| `id` | `Integer` | Typical dish ID |
| `ingredients` | `Array` | List of ingredients |
| `name` | `String` | Dish name |
| `urlImage` | `String` | URL to dish image |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the TypicalDish record (raises on error).
typical_dish = client.TypicalDish.load({ "id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of TypicalDish records (raises on error).
typical_dishs = client.TypicalDish.list
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
typicaldish = client.TypicalDish
typicaldish.list()

# typicaldish.data_get now returns the typicaldish data from the last list
# typicaldish.match_get returns the last match criteria
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
