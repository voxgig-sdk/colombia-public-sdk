# ColombiaPublic SDK



Available for [Golang](go/) and [Lua](lua/) and [PHP](php/) and [Python](py/) and [Ruby](rb/) and [TypeScript](ts/).


## Entities

The API exposes 15 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Airport** |  | `/Airport` |
| **CategoryNaturalArea** |  | `/CategoryNaturalArea` |
| **ConstitutionArticle** |  | `/ConstitutionArticle` |
| **Country** |  | `/Country/Colombia` |
| **Department** |  | `/Department` |
| **Holiday** |  | `/Holiday` |
| **InvasiveSpecie** |  | `/InvasiveSpecie` |
| **Map** |  | `/Map` |
| **NativeCommunity** |  | `/NativeCommunity` |
| **NaturalArea** |  | `/NaturalArea` |
| **President** |  | `/President` |
| **Radio** |  | `/Radio` |
| **Region** |  | `/Region` |
| **TouristicAttraction** |  | `/TouristicAttraction` |
| **TypicalDish** |  | `/TypicalDish` |

Each entity supports the following operations where available: **load**, **list**, **create**,
**update**, and **remove**.


## Architecture

### Entity-operation model

Every SDK call follows the same pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

At each stage a feature hook fires (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), allowing features to inspect or modify the pipeline.

### Features

Features are hook-based middleware that extend SDK behaviour.

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

You can add custom features by passing them in the `extend` option at
construction time.

### Direct and Prepare

For endpoints not covered by the entity model, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`, `headers`,
and `body`.


## Quick start

### Golang

```go
import sdk "github.com/voxgig-sdk/colombia-public-sdk"

client := sdk.NewColombiaPublicSDK(map[string]any{
    "apikey": os.Getenv("COLOMBIA-PUBLIC_APIKEY"),
})

// List all airports
airports, err := client.Airport(nil).List(nil, nil)
```

### Lua

```lua
local sdk = require("colombia-public_sdk")

local client = sdk.new({
  apikey = os.getenv("COLOMBIA-PUBLIC_APIKEY"),
})

-- List all airports
local airports, err = client:Airport(nil):list(nil, nil)

-- Load a specific airport
local airport, err = client:Airport(nil):load(
  { id = "example_id" }, nil
)
```

### PHP

```php
<?php
require_once 'colombiapublic_sdk.php';

$client = new ColombiaPublicSDK([
    "apikey" => getenv("COLOMBIA-PUBLIC_APIKEY"),
]);

// List all airports
[$airports, $err] = $client->Airport(null)->list(null, null);

// Load a specific airport
[$airport, $err] = $client->Airport(null)->load(
    ["id" => "example_id"], null
);
```

### Python

```python
import os
from colombiapublic_sdk import ColombiaPublicSDK

client = ColombiaPublicSDK({
    "apikey": os.environ.get("COLOMBIA-PUBLIC_APIKEY"),
})

# List all airports
airports, err = client.Airport(None).list(None, None)

# Load a specific airport
airport, err = client.Airport(None).load(
    {"id": "example_id"}, None
)
```

### Ruby

```ruby
require_relative "ColombiaPublic_sdk"

client = ColombiaPublicSDK.new({
  "apikey" => ENV["COLOMBIA-PUBLIC_APIKEY"],
})

# List all airports
airports, err = client.Airport(nil).list(nil, nil)

# Load a specific airport
airport, err = client.Airport(nil).load(
  { "id" => "example_id" }, nil
)
```

### TypeScript

```ts
import { ColombiaPublicSDK } from 'colombia-public'

const client = new ColombiaPublicSDK({
  apikey: process.env.COLOMBIA-PUBLIC_APIKEY,
})

// List all airports
const airports = await client.Airport().list()
```


## Testing

Both SDKs provide a test mode that replaces the HTTP transport with an
in-memory mock, so tests run without a network connection.

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Airport(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Airport(nil):load(
  { id = "test01" }, nil
)
```

### PHP

```php
$client = ColombiaPublicSDK::test(null, null);
[$result, $err] = $client->Airport(null)->load(
    ["id" => "test01"], null
);
```

### Python

```python
client = ColombiaPublicSDK.test(None, None)
result, err = client.Airport(None).load(
    {"id": "test01"}, None
)
```

### Ruby

```ruby
client = ColombiaPublicSDK.test(nil, nil)
result, err = client.Airport(nil).load(
  { "id" => "test01" }, nil
)
```

### TypeScript

```ts
const client = ColombiaPublicSDK.test()
const result = await client.Airport().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```


## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
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

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
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

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```


## Language-specific documentation

- [Golang SDK](go/README.md)
- [Lua SDK](lua/README.md)
- [PHP SDK](php/README.md)
- [Python SDK](py/README.md)
- [Ruby SDK](rb/README.md)
- [TypeScript SDK](ts/README.md)

