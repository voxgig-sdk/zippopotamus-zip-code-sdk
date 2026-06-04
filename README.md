# ZippopotamusZipCode SDK

Look up postal/zip codes and their locations across 60+ countries with a simple JSON API

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Zippopotamus Zip Code API

[Zippopotam.us](https://api.zippopotam.us) is a free, open-source API that returns postal-code and place data as JSON. The project is community-maintained and draws its underlying data from the [GeoNames](https://www.geonames.org/) postal dataset.

What you get from the API:

- Forward lookup: given a country code and a postal/zip code, get the matching places (e.g. `/us/90210`, `/ch/3007`)
- Reverse lookup: given a country, state/region and city name, get the postal codes for that city (e.g. `/us/ma/belmont`)
- Per-place fields: place name, state / province, state abbreviation, latitude, longitude
- Top-level fields: post code, country name and country abbreviation

Coverage spans 60+ countries, including large datasets for the United States, Spain, France, Germany, Japan, Brazil, Canada, Australia, India and Russia.

Operational notes: responses are JSON over plain HTTP GET, with no API key required. CORS is not enabled, so browser-side use generally needs a proxy. There are no formally documented rate limits — the service is free and best-effort.

## Try it

**TypeScript**
```bash
npm install zippopotamus-zip-code
```

**Python**
```bash
pip install zippopotamus-zip-code-sdk
```

**PHP**
```bash
composer require voxgig/zippopotamus-zip-code-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/zippopotamus-zip-code-sdk/go
```

**Ruby**
```bash
gem install zippopotamus-zip-code-sdk
```

**Lua**
```bash
luarocks install zippopotamus-zip-code-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { ZippopotamusZipCodeSDK } from 'zippopotamus-zip-code'

const client = new ZippopotamusZipCodeSDK({})

// List all getlocationbypostalcodes
const getlocationbypostalcodes = await client.GetLocationByPostalCode().list()
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
cd go-mcp && go build -o zippopotamus-zip-code-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "zippopotamus-zip-code": {
      "command": "/abs/path/to/zippopotamus-zip-code-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **GetLocationByPostalCode** | Forward postal-code lookup that resolves a country + postal code into one or more place records with names, state info and coordinates, served from paths like `/{country}/{postal_code}` (e.g. `/us/90210`). | `/{country}/{postal-code}` |
| **GetPostalCodesByCity** | Reverse lookup that returns the postal codes associated with a given city, served from paths like `/{country}/{state}/{city}` (e.g. `/us/ma/belmont`). | `/{country}/{state}/{city}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from zippopotamuszipcode_sdk import ZippopotamusZipCodeSDK

client = ZippopotamusZipCodeSDK({})

# List all getlocationbypostalcodes
getlocationbypostalcodes, err = client.GetLocationByPostalCode(None).list(None, None)
```

### PHP

```php
<?php
require_once 'zippopotamuszipcode_sdk.php';

$client = new ZippopotamusZipCodeSDK([]);

// List all getlocationbypostalcodes
[$getlocationbypostalcodes, $err] = $client->GetLocationByPostalCode(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/zippopotamus-zip-code-sdk/go"

client := sdk.NewZippopotamusZipCodeSDK(map[string]any{})

// List all getlocationbypostalcodes
getlocationbypostalcodes, err := client.GetLocationByPostalCode(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "ZippopotamusZipCode_sdk"

client = ZippopotamusZipCodeSDK.new({})

# List all getlocationbypostalcodes
getlocationbypostalcodes, err = client.GetLocationByPostalCode(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("zippopotamus-zip-code_sdk")

local client = sdk.new({})

-- List all getlocationbypostalcodes
local getlocationbypostalcodes, err = client:GetLocationByPostalCode(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = ZippopotamusZipCodeSDK.test()
const result = await client.GetLocationByPostalCode().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = ZippopotamusZipCodeSDK.test(None, None)
result, err = client.GetLocationByPostalCode(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = ZippopotamusZipCodeSDK::test(null, null);
[$result, $err] = $client->GetLocationByPostalCode(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.GetLocationByPostalCode(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = ZippopotamusZipCodeSDK.test(nil, nil)
result, err = client.GetLocationByPostalCode(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:GetLocationByPostalCode(nil):load(
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

## Using the Zippopotamus Zip Code API

- Upstream: [https://api.zippopotam.us](https://api.zippopotam.us)

- Database licensed under the [Open Database License (ODbL) 1.0](http://opendatacommons.org/licenses/odbl/1.0/)
- Individual record contents are made available under the Database Contents License
- Underlying postal data is sourced from [GeoNames](https://www.geonames.org/)
- Attribution to Zippopotam.us / GeoNames is expected when redistributing data

---

Generated from the Zippopotamus Zip Code API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
