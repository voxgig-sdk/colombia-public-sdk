# ColombiaPublic Python SDK



The Python SDK for the ColombiaPublic API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Airport()` — each
carrying a small, uniform set of operations (`list`, `load`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/colombia-public-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from colombiapublic_sdk import ColombiaPublicSDK

client = ColombiaPublicSDK()
```

### 2. List airport records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    airports = client.Airport().list()
    for airport in airports:
        print(airport)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load an airport

`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    airport = client.Airport().load({"id": 1})
    print(airport)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    typicaldishs = client.TypicalDish().list()
    print(typicaldishs)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = ColombiaPublicSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
typicaldish = client.TypicalDish().list()
# typicaldish contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = ColombiaPublicSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### ColombiaPublicSDK

```python
from colombiapublic_sdk import ColombiaPublicSDK

client = ColombiaPublicSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = ColombiaPublicSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### ColombiaPublicSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `airport = client.Airport()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cityId` | `int` | City ID |
| `code` | `str` | IATA code |
| `departmentId` | `int` | Department ID |
| `id` | `int` | Airport ID |
| `latitude` | `float` | Latitude coordinate |
| `longitude` | `float` | Longitude coordinate |
| `name` | `str` | Airport name |
| `type` | `str` | Airport type |

#### Example: Load

```python
airport = client.Airport().load({"id": 1})
```

#### Example: List

```python
airports = client.Airport().list()
```


### CategoryNaturalArea

Create an instance: `category_natural_area = client.CategoryNaturalArea()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` | Category description |
| `id` | `int` | Category ID |
| `name` | `str` | Category name |

#### Example: List

```python
category_natural_areas = client.CategoryNaturalArea().list()
```


### ConstitutionArticle

Create an instance: `constitution_article = client.ConstitutionArticle()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `articleNumber` | `int` | Article number |
| `chapter` | `str` | Constitution chapter |
| `description` | `str` | Article content |
| `id` | `int` | Article ID |
| `title` | `str` | Article title |

#### Example: Load

```python
constitution_article = client.ConstitutionArticle().load({"id": 1})
```

#### Example: List

```python
constitution_articles = client.ConstitutionArticle().list()
```


### Country

Create an instance: `country = client.Country()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capital` | `str` | Capital city |
| `currency` | `str` | Currency |
| `flag` | `str` | URL to flag image |
| `id` | `int` | Country ID |
| `languages` | `list` | Official languages |
| `name` | `str` | Country name |
| `population` | `int` | Total population |
| `surface` | `float` | Surface area in square kilometers |

#### Example: List

```python
countrys = client.Country().list()
```


### Department

Create an instance: `department = client.Department()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cityCapital` | `str` | Capital city of the department |
| `description` | `str` | Department description |
| `id` | `int` | Department ID |
| `municipalities` | `int` | Number of municipalities |
| `name` | `str` | Department name |
| `population` | `int` | Population |
| `regionId` | `int` | Region ID |
| `surface` | `float` | Surface area |

#### Example: Load

```python
department = client.Department().load({"id": 1})
```

#### Example: List

```python
departments = client.Department().list()
```


### Holiday

Create an instance: `holiday = client.Holiday()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | `str` | Holiday date |
| `description` | `str` | Holiday description |
| `id` | `int` | Holiday ID |
| `name` | `str` | Holiday name |
| `type` | `str` | Holiday type (religious, civic, etc.) |

#### Example: Load

```python
holiday = client.Holiday().load({"id": 1})
```

#### Example: List

```python
holidays = client.Holiday().list()
```


### InvasiveSpecie

Create an instance: `invasive_specie = client.InvasiveSpecie()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `int` | Invasive species ID |
| `impact` | `str` | Environmental impact |
| `manage` | `str` | Management strategies |
| `name` | `str` | Species name |
| `scientificName` | `str` | Scientific name |
| `urlImage` | `str` | URL to species image |

#### Example: Load

```python
invasive_specie = client.InvasiveSpecie().load({"id": 1})
```

#### Example: List

```python
invasive_species = client.InvasiveSpecie().list()
```


### Map

Create an instance: `map = client.Map()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `departmentId` | `int` | Department ID |
| `description` | `str` | Map description |
| `id` | `int` | Map ID |
| `name` | `str` | Map name |
| `urlImages` | `list` | URLs to map images |

#### Example: List

```python
maps = client.Map().list()
```


### NativeCommunity

Create an instance: `native_community = client.NativeCommunity()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `departmentId` | `int` | Department ID |
| `description` | `str` | Community description |
| `id` | `int` | Native community ID |
| `name` | `str` | Community name |
| `population` | `int` | Population |

#### Example: Load

```python
native_community = client.NativeCommunity().load({"id": 1})
```

#### Example: List

```python
native_communitys = client.NativeCommunity().list()
```


### NaturalArea

Create an instance: `natural_area = client.NaturalArea()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `areaGroupId` | `int` | Area group ID |
| `categoryNaturalAreaId` | `int` | Category ID |
| `departmentId` | `int` | Department ID |
| `description` | `str` | Natural area description |
| `id` | `int` | Natural area ID |
| `landArea` | `float` | Land area in hectares |
| `maritimeArea` | `float` | Maritime area in hectares |
| `name` | `str` | Natural area name |

#### Example: Load

```python
natural_area = client.NaturalArea().load({"id": 1})
```

#### Example: List

```python
natural_areas = client.NaturalArea().list()
```


### President

Create an instance: `president = client.President()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` | Biography and description |
| `endPeriodDate` | `str` | End date of presidency |
| `id` | `int` | President ID |
| `image` | `str` | URL to president image |
| `name` | `str` | President name |
| `politicalParty` | `str` | Political party |
| `startPeriodDate` | `str` | Start date of presidency |

#### Example: Load

```python
president = client.President().load({"id": 1})
```

#### Example: List

```python
presidents = client.President().list()
```


### Radio

Create an instance: `radio = client.Radio()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `band` | `str` | Broadcasting band (AM/FM) |
| `frequency` | `str` | Broadcasting frequency |
| `id` | `int` | Radio station ID |
| `name` | `str` | Radio station name |
| `url` | `str` | Station URL |

#### Example: Load

```python
radio = client.Radio().load({"id": 1})
```

#### Example: List

```python
radios = client.Radio().list()
```


### Region

Create an instance: `region = client.Region()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `departments` | `list` | List of departments in the region |
| `description` | `str` | Region description |
| `id` | `int` | Region ID |
| `name` | `str` | Region name |

#### Example: Load

```python
region = client.Region().load({"id": 1})
```

#### Example: List

```python
regions = client.Region().list()
```


### TouristicAttraction

Create an instance: `touristic_attraction = client.TouristicAttraction()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `str` | City where the attraction is located |
| `description` | `str` | Attraction description |
| `id` | `int` | Touristic attraction ID |
| `images` | `list` | List of image URLs |
| `latitude` | `float` | Latitude coordinate |
| `longitude` | `float` | Longitude coordinate |
| `name` | `str` | Attraction name |

#### Example: Load

```python
touristic_attraction = client.TouristicAttraction().load({"id": 1})
```

#### Example: List

```python
touristic_attractions = client.TouristicAttraction().list()
```


### TypicalDish

Create an instance: `typical_dish = client.TypicalDish()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `departmentId` | `int` | Department ID |
| `description` | `str` | Dish description |
| `id` | `int` | Typical dish ID |
| `ingredients` | `list` | List of ingredients |
| `name` | `str` | Dish name |
| `urlImage` | `str` | URL to dish image |

#### Example: Load

```python
typical_dish = client.TypicalDish().load({"id": 1})
```

#### Example: List

```python
typical_dishs = client.TypicalDish().list()
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── colombiapublic_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`colombiapublic_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
typicaldish = client.TypicalDish()
typicaldish.list()

# typicaldish.data_get() now returns the typicaldish data from the last list
# typicaldish.match_get() returns the last match criteria
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
