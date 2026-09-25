# ZippopotamusZipCode SDK configuration

module ZippopotamusZipCodeConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "ZippopotamusZipCode",
        "slug" => "zippopotamus-zip-code",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://api.zippopotam.us",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "get_location_by_postal_code" => {},
          "get_postal_codes_by_city" => {},
        },
      },
      "entity" => {
        "get_location_by_postal_code" => {
          "fields" => [
            {
              "name" => "latitude",
              "title" => "Latitude",
              "type" => "`$STRING`",
              "short" => "Latitude coordinate",
            },
            {
              "name" => "longitude",
              "title" => "Longitude",
              "type" => "`$STRING`",
              "short" => "Longitude coordinate",
            },
            {
              "name" => "placename",
              "title" => "Placename",
              "type" => "`$STRING`",
              "short" => "Name of the place/city",
            },
            {
              "name" => "state",
              "title" => "State",
              "type" => "`$STRING`",
              "short" => "Full state or province name",
            },
            {
              "name" => "stateabbreviation",
              "title" => "Stateabbreviation",
              "type" => "`$STRING`",
              "short" => "State or province abbreviation",
            },
          ],
          "name" => "get_location_by_postal_code",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{country}/{postal-code}",
                  "segments" => [
                    {
                      "var" => "country",
                    },
                    {
                      "var" => "postal_code",
                    },
                  ],
                  "parts" => [
                    "{country}",
                    "{postal_code}",
                  ],
                  "rename" => {
                    "param" => {
                      "postal-code" => "postal_code",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.places`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "country",
                        "orig" => "country",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "US",
                      },
                      {
                        "name" => "postal_code",
                        "orig" => "postal_code",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "90210",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "country",
                      "postal_code",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "get_postal_codes_by_city" => {
          "fields" => [
            {
              "name" => "latitude",
              "title" => "Latitude",
              "type" => "`$STRING`",
              "short" => "Latitude coordinate",
            },
            {
              "name" => "longitude",
              "title" => "Longitude",
              "type" => "`$STRING`",
              "short" => "Longitude coordinate",
            },
            {
              "name" => "placename",
              "title" => "Placename",
              "type" => "`$STRING`",
              "short" => "Name of the place/city",
            },
            {
              "name" => "postcode",
              "title" => "Postcode",
              "type" => "`$STRING`",
              "short" => "Postal code for this location",
            },
          ],
          "name" => "get_postal_codes_by_city",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{country}/{state}/{city}",
                  "segments" => [
                    {
                      "var" => "country",
                    },
                    {
                      "var" => "state",
                    },
                    {
                      "var" => "city",
                    },
                  ],
                  "parts" => [
                    "{country}",
                    "{state}",
                    "{city}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.places`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "city",
                        "orig" => "city",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "Beverly Hills",
                      },
                      {
                        "name" => "country",
                        "orig" => "country",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "US",
                      },
                      {
                        "name" => "state",
                        "orig" => "state",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "CA",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "city",
                      "country",
                      "state",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    ZippopotamusZipCodeFeatures.make_feature(name)
  end
end
