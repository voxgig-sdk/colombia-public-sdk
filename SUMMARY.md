# Colombia Public API

API-Colombia is a public RESTful API that provides access to a wide range of data about Colombia, including information on departments, regions, and tourist attractions. Users can explore public information without the need for authentication, making it easy to discover diverse aspects of the country.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 15 entities and 27 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Airport

Results: Successful response with list of airports; Successful response with airport information.

SDK operations: `list`, `load`.

Key fields to recognise:

- `cityId`: City ID
- `code`: IATA code
- `departmentId`: Department ID
- `id`: Airport ID
- `latitude`: Latitude coordinate

### CategoryNaturalArea

Results: Successful response with list of natural area categories.

SDK operations: `list`.

Key fields to recognise:

- `description`: Category description
- `id`: Category ID
- `name`: Category name

### ConstitutionArticle

Results: Successful response with list of constitution articles; Successful response with constitution article information.

SDK operations: `list`, `load`.

Key fields to recognise:

- `articleNumber`: Article number
- `chapter`: Constitution chapter
- `description`: Article content
- `id`: Article ID
- `title`: Article title

### Country

Results: Successful response with Colombia information.

SDK operations: `list`.

Key fields to recognise:

- `capital`: Capital city
- `currency`: Currency
- `flag`: URL to flag image
- `id`: Country ID
- `languages`: Official languages

### Department

Results: Successful response with list of departments; Successful response with department information.

SDK operations: `list`, `load`.

Key fields to recognise:

- `cityCapital`: Capital city of the department
- `description`: Department description
- `id`: Department ID
- `municipalities`: Number of municipalities
- `name`: Department name

### Holiday

Results: Successful response with list of holidays; Successful response with holiday information.

SDK operations: `list`, `load`.

Key fields to recognise:

- `date`: Holiday date
- `description`: Holiday description
- `id`: Holiday ID
- `name`: Holiday name
- `type`: Holiday type (religious, civic, etc.)

### InvasiveSpecie

Results: Successful response with list of invasive species; Successful response with invasive species information.

SDK operations: `list`, `load`.

Key fields to recognise:

- `id`: Invasive species ID
- `impact`: Environmental impact
- `manage`: Management strategies
- `name`: Species name
- `scientificName`: Scientific name

### Map

Results: Successful response with map information.

SDK operations: `list`.

Key fields to recognise:

- `departmentId`: Department ID
- `description`: Map description
- `id`: Map ID
- `name`: Map name
- `urlImages`: URLs to map images

### NativeCommunity

Results: Successful response with list of native communities; Successful response with native community information.

SDK operations: `list`, `load`.

Key fields to recognise:

- `departmentId`: Department ID
- `description`: Community description
- `id`: Native community ID
- `name`: Community name
- `population`: Population

### NaturalArea

Results: Successful response with list of natural areas; Successful response with natural area information.

SDK operations: `list`, `load`.

Key fields to recognise:

- `areaGroupId`: Area group ID
- `categoryNaturalAreaId`: Category ID
- `departmentId`: Department ID
- `description`: Natural area description
- `id`: Natural area ID

### President

Results: Successful response with list of presidents; Successful response with president information.

SDK operations: `list`, `load`.

Key fields to recognise:

- `description`: Biography and description
- `endPeriodDate`: End date of presidency
- `id`: President ID
- `image`: URL to president image
- `name`: President name

### Radio

Results: Successful response with list of radio stations; Successful response with radio station information.

SDK operations: `list`, `load`.

Key fields to recognise:

- `band`: Broadcasting band (AM/FM)
- `frequency`: Broadcasting frequency
- `id`: Radio station ID
- `name`: Radio station name
- `url`: Station URL

### Region

Results: Successful response with list of regions; Successful response with region information.

SDK operations: `list`, `load`.

Key fields to recognise:

- `departments`: List of departments in the region
- `description`: Region description
- `id`: Region ID
- `name`: Region name

### TouristicAttraction

Results: Successful response with list of touristic attractions; Successful response with touristic attraction information.

SDK operations: `list`, `load`.

Key fields to recognise:

- `city`: City where the attraction is located
- `description`: Attraction description
- `id`: Touristic attraction ID
- `images`: List of image URLs
- `latitude`: Latitude coordinate

### TypicalDish

Results: Successful response with list of typical dishes; Successful response with typical dish information.

SDK operations: `list`, `load`.

Key fields to recognise:

- `departmentId`: Department ID
- `description`: Dish description
- `id`: Typical dish ID
- `ingredients`: List of ingredients
- `name`: Dish name

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Airport | `list` | `GET /Airport` | Not required |
| Airport | `load` | `GET /Airport/{id}` | Not required |
| CategoryNaturalArea | `list` | `GET /CategoryNaturalArea` | Not required |
| ConstitutionArticle | `list` | `GET /ConstitutionArticle` | Not required |
| ConstitutionArticle | `load` | `GET /ConstitutionArticle/{id}` | Not required |
| Country | `list` | `GET /Country/Colombia` | Not required |
| Department | `list` | `GET /Department` | Not required |
| Department | `load` | `GET /Department/{id}` | Not required |
| Holiday | `list` | `GET /Holiday` | Not required |
| Holiday | `load` | `GET /Holiday/{id}` | Not required |
| InvasiveSpecie | `list` | `GET /InvasiveSpecie` | Not required |
| InvasiveSpecie | `load` | `GET /InvasiveSpecie/{id}` | Not required |
| Map | `list` | `GET /Map` | Not required |
| NativeCommunity | `list` | `GET /NativeCommunity` | Not required |
| NativeCommunity | `load` | `GET /NativeCommunity/{id}` | Not required |
| NaturalArea | `list` | `GET /NaturalArea` | Not required |
| NaturalArea | `load` | `GET /NaturalArea/{id}` | Not required |
| President | `list` | `GET /President` | Not required |
| President | `load` | `GET /President/{id}` | Not required |
| Radio | `list` | `GET /Radio` | Not required |
| Radio | `load` | `GET /Radio/{id}` | Not required |
| Region | `list` | `GET /Region` | Not required |
| Region | `load` | `GET /Region/{id}` | Not required |
| TouristicAttraction | `list` | `GET /TouristicAttraction` | Not required |
| TouristicAttraction | `load` | `GET /TouristicAttraction/{id}` | Not required |
| TypicalDish | `list` | `GET /TypicalDish` | Not required |
| TypicalDish | `load` | `GET /TypicalDish/{id}` | Not required |

## Connect to the API

- Production server: `https://api-colombia.com/api/v1`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

A read request without required parameters or authentication is `GET /Airport`. For example:

```sh
curl --fail-with-body --silent --show-error 'https://api-colombia.com/api/v1/Airport'
```

Inspect the response using the Airport reference. This checks the public route; authenticated operations need their own credentials and request data.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `colombia-public_list`: List records for an entity. Supported entities: `airport`, `category_natural_area`, `constitution_article`, `country`, `department`, `holiday`, `invasive_specie`, `map`, `native_community`, `natural_area`, `president`, `radio`, `region`, `touristic_attraction`, `typical_dish`.
- `colombia-public_load`: Load one record for an entity. Supported entities: `airport`, `constitution_article`, `department`, `holiday`, `invasive_specie`, `native_community`, `natural_area`, `president`, `radio`, `region`, `touristic_attraction`, `typical_dish`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

