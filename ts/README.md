# ColombiaPublic TypeScript SDK



The TypeScript SDK for the ColombiaPublic API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Airport()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/colombia-public-sdk/releases](https://github.com/voxgig-sdk/colombia-public-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { ColombiaPublicSDK } from '@voxgig-sdk/colombia-public'

const client = new ColombiaPublicSDK()
```

### 2. List airport records

`list()` resolves to an array of Airport ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const airports = await client.Airport().list()

for (const airport of airports) {
  console.log(airport)
}
```

### 3. Load an airport

`load()` returns the entity directly and throws on failure:

```ts
try {
  const airport = await client.Airport().load({ id: 1 })
  console.log(airport)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const typicaldishs = await client.TypicalDish().list()
  console.log(typicaldishs)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = ColombiaPublicSDK.test()

const typicaldish = await client.TypicalDish().list()
// typicaldish is the entity, populated with mock response data
// — call typicaldish.data() for the record itself
console.log(typicaldish)
```

You can also use the instance method:

```ts
const client = new ColombiaPublicSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.TypicalDish()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new ColombiaPublicSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
COLOMBIA_PUBLIC_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### ColombiaPublicSDK

#### Constructor

```ts
new ColombiaPublicSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Airport(data?)` | `AirportEntity` | Create an Airport entity instance. |
| `CategoryNaturalArea(data?)` | `CategoryNaturalAreaEntity` | Create a CategoryNaturalArea entity instance. |
| `ConstitutionArticle(data?)` | `ConstitutionArticleEntity` | Create a ConstitutionArticle entity instance. |
| `Country(data?)` | `CountryEntity` | Create a Country entity instance. |
| `Department(data?)` | `DepartmentEntity` | Create a Department entity instance. |
| `Holiday(data?)` | `HolidayEntity` | Create a Holiday entity instance. |
| `InvasiveSpecie(data?)` | `InvasiveSpecieEntity` | Create an InvasiveSpecie entity instance. |
| `Map(data?)` | `MapEntity` | Create a Map entity instance. |
| `NativeCommunity(data?)` | `NativeCommunityEntity` | Create a NativeCommunity entity instance. |
| `NaturalArea(data?)` | `NaturalAreaEntity` | Create a NaturalArea entity instance. |
| `President(data?)` | `PresidentEntity` | Create a President entity instance. |
| `Radio(data?)` | `RadioEntity` | Create a Radio entity instance. |
| `Region(data?)` | `RegionEntity` | Create a Region entity instance. |
| `TouristicAttraction(data?)` | `TouristicAttractionEntity` | Create a TouristicAttraction entity instance. |
| `TypicalDish(data?)` | `TypicalDishEntity` | Create a TypicalDish entity instance. |
| `tester(testopts?, sdkopts?)` | `ColombiaPublicSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `ColombiaPublicSDK.test(testopts?, sdkopts?)` | `ColombiaPublicSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): ColombiaPublicSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: list, load.

API path: `/Airport`

#### CategoryNaturalArea

| Field | Description |
| --- | --- |
| `description` | Category description |
| `id` | Category ID |
| `name` | Category name |

Operations: list.

API path: `/CategoryNaturalArea`

#### ConstitutionArticle

| Field | Description |
| --- | --- |
| `articleNumber` | Article number |
| `chapter` | Constitution chapter |
| `description` | Article content |
| `id` | Article ID |
| `title` | Article title |

Operations: list, load.

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

Operations: list.

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

Operations: list, load.

API path: `/Department`

#### Holiday

| Field | Description |
| --- | --- |
| `date` | Holiday date |
| `description` | Holiday description |
| `id` | Holiday ID |
| `name` | Holiday name |
| `type` | Holiday type (religious, civic, etc.) |

Operations: list, load.

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

Operations: list, load.

API path: `/InvasiveSpecie`

#### Map

| Field | Description |
| --- | --- |
| `departmentId` | Department ID |
| `description` | Map description |
| `id` | Map ID |
| `name` | Map name |
| `urlImages` | URLs to map images |

Operations: list.

API path: `/Map`

#### NativeCommunity

| Field | Description |
| --- | --- |
| `departmentId` | Department ID |
| `description` | Community description |
| `id` | Native community ID |
| `name` | Community name |
| `population` | Population |

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

API path: `/President`

#### Radio

| Field | Description |
| --- | --- |
| `band` | Broadcasting band (AM/FM) |
| `frequency` | Broadcasting frequency |
| `id` | Radio station ID |
| `name` | Radio station name |
| `url` | Station URL |

Operations: list, load.

API path: `/Radio`

#### Region

| Field | Description |
| --- | --- |
| `departments` | List of departments in the region |
| `description` | Region description |
| `id` | Region ID |
| `name` | Region name |

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

API path: `/TypicalDish`



## Entities


### Airport

Create an instance: `const airport = client.Airport()`

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

```ts
const airport = await client.Airport().load({ id: 1 })
```

#### Example: List

```ts
const airports = await client.Airport().list()
```


### CategoryNaturalArea

Create an instance: `const category_natural_area = client.CategoryNaturalArea()`

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

```ts
const category_natural_areas = await client.CategoryNaturalArea().list()
```


### ConstitutionArticle

Create an instance: `const constitution_article = client.ConstitutionArticle()`

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

```ts
const constitution_article = await client.ConstitutionArticle().load({ id: 1 })
```

#### Example: List

```ts
const constitution_articles = await client.ConstitutionArticle().list()
```


### Country

Create an instance: `const country = client.Country()`

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
| `languages` | `any[]` | Official languages |
| `name` | `string` | Country name |
| `population` | `number` | Total population |
| `surface` | `number` | Surface area in square kilometers |

#### Example: List

```ts
const countrys = await client.Country().list()
```


### Department

Create an instance: `const department = client.Department()`

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

```ts
const department = await client.Department().load({ id: 1 })
```

#### Example: List

```ts
const departments = await client.Department().list()
```


### Holiday

Create an instance: `const holiday = client.Holiday()`

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

```ts
const holiday = await client.Holiday().load({ id: 1 })
```

#### Example: List

```ts
const holidays = await client.Holiday().list()
```


### InvasiveSpecie

Create an instance: `const invasive_specie = client.InvasiveSpecie()`

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

```ts
const invasive_specie = await client.InvasiveSpecie().load({ id: 1 })
```

#### Example: List

```ts
const invasive_species = await client.InvasiveSpecie().list()
```


### Map

Create an instance: `const map = client.Map()`

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
| `urlImages` | `any[]` | URLs to map images |

#### Example: List

```ts
const maps = await client.Map().list()
```


### NativeCommunity

Create an instance: `const native_community = client.NativeCommunity()`

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

```ts
const native_community = await client.NativeCommunity().load({ id: 1 })
```

#### Example: List

```ts
const native_communitys = await client.NativeCommunity().list()
```


### NaturalArea

Create an instance: `const natural_area = client.NaturalArea()`

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

```ts
const natural_area = await client.NaturalArea().load({ id: 1 })
```

#### Example: List

```ts
const natural_areas = await client.NaturalArea().list()
```


### President

Create an instance: `const president = client.President()`

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

```ts
const president = await client.President().load({ id: 1 })
```

#### Example: List

```ts
const presidents = await client.President().list()
```


### Radio

Create an instance: `const radio = client.Radio()`

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

```ts
const radio = await client.Radio().load({ id: 1 })
```

#### Example: List

```ts
const radios = await client.Radio().list()
```


### Region

Create an instance: `const region = client.Region()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `departments` | `any[]` | List of departments in the region |
| `description` | `string` | Region description |
| `id` | `number` | Region ID |
| `name` | `string` | Region name |

#### Example: Load

```ts
const region = await client.Region().load({ id: 1 })
```

#### Example: List

```ts
const regions = await client.Region().list()
```


### TouristicAttraction

Create an instance: `const touristic_attraction = client.TouristicAttraction()`

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
| `images` | `any[]` | List of image URLs |
| `latitude` | `number` | Latitude coordinate |
| `longitude` | `number` | Longitude coordinate |
| `name` | `string` | Attraction name |

#### Example: Load

```ts
const touristic_attraction = await client.TouristicAttraction().load({ id: 1 })
```

#### Example: List

```ts
const touristic_attractions = await client.TouristicAttraction().list()
```


### TypicalDish

Create an instance: `const typical_dish = client.TypicalDish()`

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
| `ingredients` | `any[]` | List of ingredients |
| `name` | `string` | Dish name |
| `urlImage` | `string` | URL to dish image |

#### Example: Load

```ts
const typical_dish = await client.TypicalDish().load({ id: 1 })
```

#### Example: List

```ts
const typical_dishs = await client.TypicalDish().list()
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
colombia-public/
├── src/
│   ├── ColombiaPublicSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { ColombiaPublicSDK } from '@voxgig-sdk/colombia-public'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const typicaldish = client.TypicalDish()
await typicaldish.list()

// typicaldish.data() now returns the typicaldish data from the last `list`
// typicaldish.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
