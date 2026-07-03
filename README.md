# ZippopotamusZipCode SDK

Zippopotamus Zip Code API client, generated from the OpenAPI spec.

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

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

## Quickstart

### TypeScript

```ts
import { ZippopotamusZipCodeSDK } from 'zippopotamus-zip-code'

const client = new ZippopotamusZipCodeSDK({
  apikey: process.env.ZIPPOPOTAMUS-ZIP-CODE_APIKEY,
})

// List all getlocationbypostalcodes
const getlocationbypostalcodes = await client.GetLocationByPostalCode().list()
console.log(getlocationbypostalcodes.data)
```

See the [TypeScript README](ts/README.md) for the full guide.

## Surfaces

| Surface | Path |
| --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | `go-cli/` |
| **MCP server** | `go-mcp/` |

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
| **GetLocationByPostalCode** |  | `/{country}/{postal-code}` |
| **GetPostalCodesByCity** |  | `/{country}/{state}/{city}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
import os
from zippopotamuszipcode_sdk import ZippopotamusZipCodeSDK

client = ZippopotamusZipCodeSDK({
    "apikey": os.environ.get("ZIPPOPOTAMUS-ZIP-CODE_APIKEY"),
})

# List all getlocationbypostalcodes
getlocationbypostalcodes, err = client.GetLocationByPostalCode().list()
print(getlocationbypostalcodes)
```

### PHP

```php
<?php
require_once 'zippopotamuszipcode_sdk.php';

$client = new ZippopotamusZipCodeSDK([
    "apikey" => getenv("ZIPPOPOTAMUS-ZIP-CODE_APIKEY"),
]);

// List all getlocationbypostalcodes
[$getlocationbypostalcodes, $err] = $client->GetLocationByPostalCode()->list();
print_r($getlocationbypostalcodes);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/zippopotamus-zip-code-sdk/go"

client := sdk.NewZippopotamusZipCodeSDK(map[string]any{
    "apikey": os.Getenv("ZIPPOPOTAMUS-ZIP-CODE_APIKEY"),
})

// List all getlocationbypostalcodes
getlocationbypostalcodes, err := client.GetLocationByPostalCode(nil).List(nil, nil)
fmt.Println(getlocationbypostalcodes)
```

### Ruby

```ruby
require_relative "ZippopotamusZipCode_sdk"

client = ZippopotamusZipCodeSDK.new({
  "apikey" => ENV["ZIPPOPOTAMUS-ZIP-CODE_APIKEY"],
})

# List all getlocationbypostalcodes
getlocationbypostalcodes, err = client.GetLocationByPostalCode().list
puts getlocationbypostalcodes
```

### Lua

```lua
local sdk = require("zippopotamus-zip-code_sdk")

local client = sdk.new({
  apikey = os.getenv("ZIPPOPOTAMUS-ZIP-CODE_APIKEY"),
})

-- List all getlocationbypostalcodes
local getlocationbypostalcodes, err = client:GetLocationByPostalCode():list()
print(getlocationbypostalcodes)
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
client = ZippopotamusZipCodeSDK.test()
result, err = client.GetLocationByPostalCode().load({"id": "test01"})
```

### PHP

```php
$client = ZippopotamusZipCodeSDK::test();
[$result, $err] = $client->GetLocationByPostalCode()->load(["id" => "test01"]);
```

### Golang

```go
client := sdk.Test()
result, err := client.GetLocationByPostalCode(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = ZippopotamusZipCodeSDK.test
result, err = client.GetLocationByPostalCode().load({ "id" => "test01" })
```

### Lua

```lua
local client = sdk.test()
local result, err = client:GetLocationByPostalCode():load({ id = "test01" })
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

---

Generated from the Zippopotamus Zip Code API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
