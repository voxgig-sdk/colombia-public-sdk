# ColombiaPublic Python SDK Reference

Complete API reference for the ColombiaPublic Python SDK.


## ColombiaPublicSDK

### Constructor

```python
from colombia-public_sdk import ColombiaPublicSDK

client = ColombiaPublicSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ColombiaPublicSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = ColombiaPublicSDK.test()
```


### Instance Methods

#### `Airport(data=None)`

Create a new `AirportEntity` instance. Pass `None` for no initial data.

#### `CategoryNaturalArea(data=None)`

Create a new `CategoryNaturalAreaEntity` instance. Pass `None` for no initial data.

#### `ConstitutionArticle(data=None)`

Create a new `ConstitutionArticleEntity` instance. Pass `None` for no initial data.

#### `Country(data=None)`

Create a new `CountryEntity` instance. Pass `None` for no initial data.

#### `Department(data=None)`

Create a new `DepartmentEntity` instance. Pass `None` for no initial data.

#### `Holiday(data=None)`

Create a new `HolidayEntity` instance. Pass `None` for no initial data.

#### `InvasiveSpecie(data=None)`

Create a new `InvasiveSpecieEntity` instance. Pass `None` for no initial data.

#### `Map(data=None)`

Create a new `MapEntity` instance. Pass `None` for no initial data.

#### `NativeCommunity(data=None)`

Create a new `NativeCommunityEntity` instance. Pass `None` for no initial data.

#### `NaturalArea(data=None)`

Create a new `NaturalAreaEntity` instance. Pass `None` for no initial data.

#### `President(data=None)`

Create a new `PresidentEntity` instance. Pass `None` for no initial data.

#### `Radio(data=None)`

Create a new `RadioEntity` instance. Pass `None` for no initial data.

#### `Region(data=None)`

Create a new `RegionEntity` instance. Pass `None` for no initial data.

#### `TouristicAttraction(data=None)`

Create a new `TouristicAttractionEntity` instance. Pass `None` for no initial data.

#### `TypicalDish(data=None)`

Create a new `TypicalDishEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AirportEntity

```python
airport = client.Airport()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city_id` | ``$INTEGER`` | No |  |
| `code` | ``$STRING`` | No |  |
| `department_id` | ``$INTEGER`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `latitude` | ``$NUMBER`` | No |  |
| `longitude` | ``$NUMBER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Airport().list({})
for airport in results:
    print(airport)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Airport().load({"id": "airport_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AirportEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CategoryNaturalAreaEntity

```python
category_natural_area = client.CategoryNaturalArea()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.CategoryNaturalArea().list({})
for category_natural_area in results:
    print(category_natural_area)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CategoryNaturalAreaEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ConstitutionArticleEntity

```python
constitution_article = client.ConstitutionArticle()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `article_number` | ``$INTEGER`` | No |  |
| `chapter` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `title` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.ConstitutionArticle().list({})
for constitution_article in results:
    print(constitution_article)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ConstitutionArticle().load({"id": "constitution_article_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ConstitutionArticleEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CountryEntity

```python
country = client.Country()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capital` | ``$STRING`` | No |  |
| `currency` | ``$STRING`` | No |  |
| `flag` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `language` | ``$ARRAY`` | No |  |
| `name` | ``$STRING`` | No |  |
| `population` | ``$INTEGER`` | No |  |
| `surface` | ``$NUMBER`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Country().list({})
for country in results:
    print(country)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CountryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DepartmentEntity

```python
department = client.Department()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city_capital` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `municipality` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `population` | ``$INTEGER`` | No |  |
| `region_id` | ``$INTEGER`` | No |  |
| `surface` | ``$NUMBER`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Department().list({})
for department in results:
    print(department)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Department().load({"id": "department_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DepartmentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## HolidayEntity

```python
holiday = client.Holiday()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Holiday().list({})
for holiday in results:
    print(holiday)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Holiday().load({"id": "holiday_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HolidayEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## InvasiveSpecieEntity

```python
invasive_specie = client.InvasiveSpecie()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | ``$INTEGER`` | No |  |
| `impact` | ``$STRING`` | No |  |
| `manage` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `scientific_name` | ``$STRING`` | No |  |
| `url_image` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.InvasiveSpecie().list({})
for invasive_specie in results:
    print(invasive_specie)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.InvasiveSpecie().load({"id": "invasive_specie_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InvasiveSpecieEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MapEntity

```python
map = client.Map()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `department_id` | ``$INTEGER`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `url_image` | ``$ARRAY`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Map().list({})
for map in results:
    print(map)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MapEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## NativeCommunityEntity

```python
native_community = client.NativeCommunity()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `department_id` | ``$INTEGER`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `population` | ``$INTEGER`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.NativeCommunity().list({})
for native_community in results:
    print(native_community)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.NativeCommunity().load({"id": "native_community_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NativeCommunityEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## NaturalAreaEntity

```python
natural_area = client.NaturalArea()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `area_group_id` | ``$INTEGER`` | No |  |
| `category_natural_area_id` | ``$INTEGER`` | No |  |
| `department_id` | ``$INTEGER`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `land_area` | ``$NUMBER`` | No |  |
| `maritime_area` | ``$NUMBER`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.NaturalArea().list({})
for natural_area in results:
    print(natural_area)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.NaturalArea().load({"id": "natural_area_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NaturalAreaEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PresidentEntity

```python
president = client.President()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `end_period_date` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `image` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `political_party` | ``$STRING`` | No |  |
| `start_period_date` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.President().list({})
for president in results:
    print(president)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.President().load({"id": "president_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PresidentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RadioEntity

```python
radio = client.Radio()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `band` | ``$STRING`` | No |  |
| `frequency` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Radio().list({})
for radio in results:
    print(radio)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Radio().load({"id": "radio_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RadioEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RegionEntity

```python
region = client.Region()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `department` | ``$ARRAY`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Region().list({})
for region in results:
    print(region)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Region().load({"id": "region_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RegionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TouristicAttractionEntity

```python
touristic_attraction = client.TouristicAttraction()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `image` | ``$ARRAY`` | No |  |
| `latitude` | ``$NUMBER`` | No |  |
| `longitude` | ``$NUMBER`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.TouristicAttraction().list({})
for touristic_attraction in results:
    print(touristic_attraction)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.TouristicAttraction().load({"id": "touristic_attraction_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TouristicAttractionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TypicalDishEntity

```python
typical_dish = client.TypicalDish()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `department_id` | ``$INTEGER`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `ingredient` | ``$ARRAY`` | No |  |
| `name` | ``$STRING`` | No |  |
| `url_image` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.TypicalDish().list({})
for typical_dish in results:
    print(typical_dish)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.TypicalDish().load({"id": "typical_dish_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TypicalDishEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = ColombiaPublicSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

