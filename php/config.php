<?php
declare(strict_types=1);

// ZippopotamusZipCode SDK configuration

class ZippopotamusZipCodeConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "ZippopotamusZipCode",
                "slug" => "zippopotamus-zip-code",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://api.zippopotam.us",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "get_location_by_postal_code" => [],
                    "get_postal_codes_by_city" => [],
                ],
            ],
            "entity" => [
        'get_location_by_postal_code' => [
          'fields' => [
            [
              'name' => 'latitude',
              'short' => 'Latitude coordinate',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'longitude',
              'short' => 'Longitude coordinate',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'placename',
              'short' => 'Name of the place/city',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'state',
              'short' => 'Full state or province name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'stateabbreviation',
              'short' => 'State or province abbreviation',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'get_location_by_postal_code',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'US',
                        'kind' => 'param',
                        'name' => 'country',
                        'orig' => 'country',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => '90210',
                        'kind' => 'param',
                        'name' => 'postal_code',
                        'orig' => 'postal_code',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{country}/{postal-code}',
                  'parts' => [
                    '{country}',
                    '{postal_code}',
                  ],
                  'rename' => [
                    'param' => [
                      'postal-code' => 'postal_code',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'country',
                      'postal_code',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.places`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'get_postal_codes_by_city' => [
          'fields' => [
            [
              'name' => 'latitude',
              'short' => 'Latitude coordinate',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'longitude',
              'short' => 'Longitude coordinate',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'placename',
              'short' => 'Name of the place/city',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'postcode',
              'short' => 'Postal code for this location',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'get_postal_codes_by_city',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'Beverly Hills',
                        'kind' => 'param',
                        'name' => 'city',
                        'orig' => 'city',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'US',
                        'kind' => 'param',
                        'name' => 'country',
                        'orig' => 'country',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'CA',
                        'kind' => 'param',
                        'name' => 'state',
                        'orig' => 'state',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{country}/{state}/{city}',
                  'parts' => [
                    '{country}',
                    '{state}',
                    '{city}',
                  ],
                  'select' => [
                    'exist' => [
                      'city',
                      'country',
                      'state',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.places`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return ZippopotamusZipCodeFeatures::make_feature($name);
    }
}
