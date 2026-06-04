# ColombiaPublic SDK

Public RESTful data about Colombia — geography, government, culture, nature, and tourism

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Colombia Public API

[API-Colombia](https://api-colombia.com) is a public, open-source REST API maintained by Miguel Teheran and contributors since 2022. It exposes curated reference data about Colombia — its territory, institutions, culture, and natural heritage — at the base URL `https://api-colombia.com/api/v1/`.

What you get from the API:
- Geographic and administrative data: country, departments, regions, airports.
- Government and civic information: presidents, constitution articles, public holidays.
- Culture and travel: touristic attractions, typical dishes, radio stations.
- Natural heritage: natural areas (with category classifications), invasive species, native communities, and maps.

The service is open to the public with no authentication required and reports serving in the order of millions of requests per month. Human-readable docs are at [docs.api-colombia.com](https://docs.api-colombia.com/) and a Swagger UI is available at [api-colombia.com/swagger/index.html](https://api-colombia.com/swagger/index.html). No official rate limits are documented; CORS behaviour and uptime vary, so treat the service as best-effort.

## Try it

**TypeScript**
```bash
npm install colombia-public
```

**Python**
```bash
pip install colombia-public-sdk
```

**PHP**
```bash
composer require voxgig/colombia-public-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/colombia-public-sdk/go
```

**Ruby**
```bash
gem install colombia-public-sdk
```

**Lua**
```bash
luarocks install colombia-public-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { ColombiaPublicSDK } from 'colombia-public'

const client = new ColombiaPublicSDK({})

// List all airports
const airports = await client.Airport().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o colombia-public-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "colombia-public": {
      "command": "/abs/path/to/colombia-public-mcp"
    }
  }
}
```

## Entities

The API exposes 15 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Airport** | Airports in Colombia, served from `/api/v1/Airport`. | `/Airport` |
| **CategoryNaturalArea** | Classification categories used to group natural areas, served from `/api/v1/CategoryNaturalArea`. | `/CategoryNaturalArea` |
| **ConstitutionArticle** | Articles of the Colombian Constitution, served from `/api/v1/ConstitutionArticle`. | `/ConstitutionArticle` |
| **Country** | Country-level information about Colombia, served from `/api/v1/Country`. | `/Country/Colombia` |
| **Department** | Colombia's administrative departments, served from `/api/v1/Department`. | `/Department` |
| **Holiday** | Colombian public holidays, served from `/api/v1/Holiday`. | `/Holiday` |
| **InvasiveSpecie** | Invasive species recorded in Colombia, served from `/api/v1/InvasiveSpecie`. | `/InvasiveSpecie` |
| **Map** | Map resources related to Colombian geography, served from `/api/v1/Map`. | `/Map` |
| **NativeCommunity** | Indigenous and native communities of Colombia, served from `/api/v1/NativeCommunity`. | `/NativeCommunity` |
| **NaturalArea** | Protected natural areas and parks, served from `/api/v1/NaturalArea`. | `/NaturalArea` |
| **President** | Past and present presidents of Colombia, served from `/api/v1/President`. | `/President` |
| **Radio** | Colombian radio stations, served from `/api/v1/Radio`. | `/Radio` |
| **Region** | Geographic regions of Colombia (groupings of departments), served from `/api/v1/Region`. | `/Region` |
| **TouristicAttraction** | Touristic attractions across Colombia, served from `/api/v1/TouristicAttraction`. | `/TouristicAttraction` |
| **TypicalDish** | Typical Colombian dishes and regional cuisine, served from `/api/v1/TypicalDish`. | `/TypicalDish` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from colombiapublic_sdk import ColombiaPublicSDK

client = ColombiaPublicSDK({})

# List all airports
airports, err = client.Airport(None).list(None, None)

# Load a specific airport
airport, err = client.Airport(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'colombiapublic_sdk.php';

$client = new ColombiaPublicSDK([]);

// List all airports
[$airports, $err] = $client->Airport(null)->list(null, null);

// Load a specific airport
[$airport, $err] = $client->Airport(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/colombia-public-sdk/go"

client := sdk.NewColombiaPublicSDK(map[string]any{})

// List all airports
airports, err := client.Airport(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "ColombiaPublic_sdk"

client = ColombiaPublicSDK.new({})

# List all airports
airports, err = client.Airport(nil).list(nil, nil)

# Load a specific airport
airport, err = client.Airport(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("colombia-public_sdk")

local client = sdk.new({})

-- List all airports
local airports, err = client:Airport(nil):list(nil, nil)

-- Load a specific airport
local airport, err = client:Airport(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = ColombiaPublicSDK.test()
const result = await client.Airport().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = ColombiaPublicSDK.test(None, None)
result, err = client.Airport(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = ColombiaPublicSDK::test(null, null);
[$result, $err] = $client->Airport(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Airport(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = ColombiaPublicSDK.test(nil, nil)
result, err = client.Airport(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Airport(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Colombia Public API

- Upstream: [https://api-colombia.com](https://api-colombia.com)
- API docs: [https://docs.api-colombia.com/](https://docs.api-colombia.com/)

- API-Colombia is an open-source community project; source is hosted at https://github.com/Mteheran/api-colombia.
- Public access without API keys or authentication.
- No formal terms of use or rate-limit policy are published; consult the repository for licence details before redistribution.

---

Generated from the Colombia Public API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
