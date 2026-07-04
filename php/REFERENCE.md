# ZippopotamusZipCode PHP SDK Reference

Complete API reference for the ZippopotamusZipCode PHP SDK.


## ZippopotamusZipCodeSDK

### Constructor

```php
require_once __DIR__ . '/zippopotamus-zip-code_sdk.php';

$client = new ZippopotamusZipCodeSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ZippopotamusZipCodeSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = ZippopotamusZipCodeSDK::test();
```


### Instance Methods

#### `GetLocationByPostalCode($data = null)`

Create a new `GetLocationByPostalCodeEntity` instance. Pass `null` for no initial data.

#### `GetPostalCodesByCity($data = null)`

Create a new `GetPostalCodesByCityEntity` instance. Pass `null` for no initial data.

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## GetLocationByPostalCodeEntity

```php
$get_location_by_postal_code = $client->get_location_by_postal_code();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `latitude` | ``$STRING`` | No |  |
| `longitude` | ``$STRING`` | No |  |
| `place_name` | ``$STRING`` | No |  |
| `state` | ``$STRING`` | No |  |
| `state_abbreviation` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->get_location_by_postal_code()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GetLocationByPostalCodeEntity`

Create a new `GetLocationByPostalCodeEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## GetPostalCodesByCityEntity

```php
$get_postal_codes_by_city = $client->get_postal_codes_by_city();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `latitude` | ``$STRING`` | No |  |
| `longitude` | ``$STRING`` | No |  |
| `place_name` | ``$STRING`` | No |  |
| `post_code` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->get_postal_codes_by_city()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GetPostalCodesByCityEntity`

Create a new `GetPostalCodesByCityEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new ZippopotamusZipCodeSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

