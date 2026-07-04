# ColombiaPublic Python SDK



The Python SDK for the ColombiaPublic API — an entity-oriented client following Pythonic conventions.

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
    airports = client.Airport().list({})
    for airport in airports:
        print(airport)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load an airport

`load()` returns the bare record (a `dict`) and raises on error.

```python
try:
    airport = client.Airport().load({"id": "example_id"})
    print(airport)
except Exception as err:
    print(f"load failed: {err}")
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
    print(result["err"])     # error value
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

# Entity ops return the bare record and raise on error.
airport = client.Airport().load({"id": "test01"})
# airport contains the mock response record
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
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the bare result data (a `dict` for single-entity
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

Create an instance: `airport = client.Airport()`

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

```python
airport = client.Airport().load({"id": "airport_id"})
```

#### Example: List

```python
airports = client.Airport().list({})
```


### CategoryNaturalArea

Create an instance: `category_natural_area = client.CategoryNaturalArea()`

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

```python
category_natural_areas = client.CategoryNaturalArea().list({})
```


### ConstitutionArticle

Create an instance: `constitution_article = client.ConstitutionArticle()`

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

```python
constitution_article = client.ConstitutionArticle().load({"id": "constitution_article_id"})
```

#### Example: List

```python
constitution_articles = client.ConstitutionArticle().list({})
```


### Country

Create an instance: `country = client.Country()`

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

```python
countrys = client.Country().list({})
```


### Department

Create an instance: `department = client.Department()`

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

```python
department = client.Department().load({"id": "department_id"})
```

#### Example: List

```python
departments = client.Department().list({})
```


### Holiday

Create an instance: `holiday = client.Holiday()`

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

```python
holiday = client.Holiday().load({"id": "holiday_id"})
```

#### Example: List

```python
holidays = client.Holiday().list({})
```


### InvasiveSpecie

Create an instance: `invasive_specie = client.InvasiveSpecie()`

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

```python
invasive_specie = client.InvasiveSpecie().load({"id": "invasive_specie_id"})
```

#### Example: List

```python
invasive_species = client.InvasiveSpecie().list({})
```


### Map

Create an instance: `map = client.Map()`

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

```python
maps = client.Map().list({})
```


### NativeCommunity

Create an instance: `native_community = client.NativeCommunity()`

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

```python
native_community = client.NativeCommunity().load({"id": "native_community_id"})
```

#### Example: List

```python
native_communitys = client.NativeCommunity().list({})
```


### NaturalArea

Create an instance: `natural_area = client.NaturalArea()`

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

```python
natural_area = client.NaturalArea().load({"id": "natural_area_id"})
```

#### Example: List

```python
natural_areas = client.NaturalArea().list({})
```


### President

Create an instance: `president = client.President()`

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

```python
president = client.President().load({"id": "president_id"})
```

#### Example: List

```python
presidents = client.President().list({})
```


### Radio

Create an instance: `radio = client.Radio()`

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

```python
radio = client.Radio().load({"id": "radio_id"})
```

#### Example: List

```python
radios = client.Radio().list({})
```


### Region

Create an instance: `region = client.Region()`

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

```python
region = client.Region().load({"id": "region_id"})
```

#### Example: List

```python
regions = client.Region().list({})
```


### TouristicAttraction

Create an instance: `touristic_attraction = client.TouristicAttraction()`

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

```python
touristic_attraction = client.TouristicAttraction().load({"id": "touristic_attraction_id"})
```

#### Example: List

```python
touristic_attractions = client.TouristicAttraction().list({})
```


### TypicalDish

Create an instance: `typical_dish = client.TypicalDish()`

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

```python
typical_dish = client.TypicalDish().load({"id": "typical_dish_id"})
```

#### Example: List

```python
typical_dishs = client.TypicalDish().list({})
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
error is returned to the caller as the second element in the return tuple.

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

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
airport = client.Airport()
airport.load({"id": "example_id"})

# airport.data_get() now returns the loaded airport data
# airport.match_get() returns the last match criteria
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
