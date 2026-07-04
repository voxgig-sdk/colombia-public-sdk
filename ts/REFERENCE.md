# ColombiaPublic TypeScript SDK Reference

Complete API reference for the ColombiaPublic TypeScript SDK.


## ColombiaPublicSDK

### Constructor

```ts
new ColombiaPublicSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ColombiaPublicSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = ColombiaPublicSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `ColombiaPublicSDK` instance in test mode.


### Instance Methods

#### `Airport(data?: object)`

Create a new `Airport` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AirportEntity` instance.

#### `CategoryNaturalArea(data?: object)`

Create a new `CategoryNaturalArea` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CategoryNaturalAreaEntity` instance.

#### `ConstitutionArticle(data?: object)`

Create a new `ConstitutionArticle` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ConstitutionArticleEntity` instance.

#### `Country(data?: object)`

Create a new `Country` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CountryEntity` instance.

#### `Department(data?: object)`

Create a new `Department` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DepartmentEntity` instance.

#### `Holiday(data?: object)`

Create a new `Holiday` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `HolidayEntity` instance.

#### `InvasiveSpecie(data?: object)`

Create a new `InvasiveSpecie` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `InvasiveSpecieEntity` instance.

#### `Map(data?: object)`

Create a new `Map` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MapEntity` instance.

#### `NativeCommunity(data?: object)`

Create a new `NativeCommunity` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `NativeCommunityEntity` instance.

#### `NaturalArea(data?: object)`

Create a new `NaturalArea` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `NaturalAreaEntity` instance.

#### `President(data?: object)`

Create a new `President` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PresidentEntity` instance.

#### `Radio(data?: object)`

Create a new `Radio` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RadioEntity` instance.

#### `Region(data?: object)`

Create a new `Region` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RegionEntity` instance.

#### `TouristicAttraction(data?: object)`

Create a new `TouristicAttraction` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TouristicAttractionEntity` instance.

#### `TypicalDish(data?: object)`

Create a new `TypicalDish` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TypicalDishEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `ColombiaPublicSDK.test()`.

**Returns:** `ColombiaPublicSDK` instance in test mode.


---

## AirportEntity

```ts
const airport = client.airport
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.airport.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.airport.load({ id: 'airport_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AirportEntity` instance with the same client and
options.

#### `client()`

Return the parent `ColombiaPublicSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CategoryNaturalAreaEntity

```ts
const category_natural_area = client.category_natural_area
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.category_natural_area.list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CategoryNaturalAreaEntity` instance with the same client and
options.

#### `client()`

Return the parent `ColombiaPublicSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ConstitutionArticleEntity

```ts
const constitution_article = client.constitution_article
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.constitution_article.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.constitution_article.load({ id: 'constitution_article_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ConstitutionArticleEntity` instance with the same client and
options.

#### `client()`

Return the parent `ColombiaPublicSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CountryEntity

```ts
const country = client.country
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.country.list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CountryEntity` instance with the same client and
options.

#### `client()`

Return the parent `ColombiaPublicSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DepartmentEntity

```ts
const department = client.department
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.department.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.department.load({ id: 'department_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DepartmentEntity` instance with the same client and
options.

#### `client()`

Return the parent `ColombiaPublicSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## HolidayEntity

```ts
const holiday = client.holiday
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.holiday.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.holiday.load({ id: 'holiday_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `HolidayEntity` instance with the same client and
options.

#### `client()`

Return the parent `ColombiaPublicSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## InvasiveSpecieEntity

```ts
const invasive_specie = client.invasive_specie
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.invasive_specie.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.invasive_specie.load({ id: 'invasive_specie_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `InvasiveSpecieEntity` instance with the same client and
options.

#### `client()`

Return the parent `ColombiaPublicSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MapEntity

```ts
const map = client.map
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.map.list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MapEntity` instance with the same client and
options.

#### `client()`

Return the parent `ColombiaPublicSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## NativeCommunityEntity

```ts
const native_community = client.native_community
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.native_community.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.native_community.load({ id: 'native_community_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `NativeCommunityEntity` instance with the same client and
options.

#### `client()`

Return the parent `ColombiaPublicSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## NaturalAreaEntity

```ts
const natural_area = client.natural_area
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.natural_area.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.natural_area.load({ id: 'natural_area_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `NaturalAreaEntity` instance with the same client and
options.

#### `client()`

Return the parent `ColombiaPublicSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PresidentEntity

```ts
const president = client.president
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.president.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.president.load({ id: 'president_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PresidentEntity` instance with the same client and
options.

#### `client()`

Return the parent `ColombiaPublicSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RadioEntity

```ts
const radio = client.radio
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.radio.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.radio.load({ id: 'radio_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RadioEntity` instance with the same client and
options.

#### `client()`

Return the parent `ColombiaPublicSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RegionEntity

```ts
const region = client.region
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `department` | ``$ARRAY`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.region.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.region.load({ id: 'region_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RegionEntity` instance with the same client and
options.

#### `client()`

Return the parent `ColombiaPublicSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TouristicAttractionEntity

```ts
const touristic_attraction = client.touristic_attraction
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.touristic_attraction.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.touristic_attraction.load({ id: 'touristic_attraction_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TouristicAttractionEntity` instance with the same client and
options.

#### `client()`

Return the parent `ColombiaPublicSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TypicalDishEntity

```ts
const typical_dish = client.typical_dish
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.typical_dish.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.typical_dish.load({ id: 'typical_dish_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TypicalDishEntity` instance with the same client and
options.

#### `client()`

Return the parent `ColombiaPublicSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new ColombiaPublicSDK({
  feature: {
    test: { active: true },
  }
})
```

