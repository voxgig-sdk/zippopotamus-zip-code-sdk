# ZippopotamusZipCode SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "ZippopotamusZipCode",
            "slug": "zippopotamus-zip-code",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.zippopotam.us",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "get_location_by_postal_code": {},
                "get_postal_codes_by_city": {},
            },
        },
        "entity": {
      "get_location_by_postal_code": {
        "fields": [
          {
            "name": "latitude",
            "title": "Latitude",
            "type": "`$STRING`",
            "short": "Latitude coordinate",
          },
          {
            "name": "longitude",
            "title": "Longitude",
            "type": "`$STRING`",
            "short": "Longitude coordinate",
          },
          {
            "name": "placename",
            "title": "Placename",
            "type": "`$STRING`",
            "short": "Name of the place/city",
          },
          {
            "name": "state",
            "title": "State",
            "type": "`$STRING`",
            "short": "Full state or province name",
          },
          {
            "name": "stateabbreviation",
            "title": "Stateabbreviation",
            "type": "`$STRING`",
            "short": "State or province abbreviation",
          },
        ],
        "name": "get_location_by_postal_code",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/{country}/{postal-code}",
                "segments": [
                  {
                    "var": "country",
                  },
                  {
                    "var": "postal_code",
                  },
                ],
                "parts": [
                  "{country}",
                  "{postal_code}",
                ],
                "rename": {
                  "param": {
                    "postal-code": "postal_code",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.places`",
                },
                "args": {
                  "params": [
                    {
                      "name": "country",
                      "orig": "country",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "US",
                    },
                    {
                      "name": "postal_code",
                      "orig": "postal_code",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "90210",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "country",
                    "postal_code",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "get_postal_codes_by_city": {
        "fields": [
          {
            "name": "latitude",
            "title": "Latitude",
            "type": "`$STRING`",
            "short": "Latitude coordinate",
          },
          {
            "name": "longitude",
            "title": "Longitude",
            "type": "`$STRING`",
            "short": "Longitude coordinate",
          },
          {
            "name": "placename",
            "title": "Placename",
            "type": "`$STRING`",
            "short": "Name of the place/city",
          },
          {
            "name": "postcode",
            "title": "Postcode",
            "type": "`$STRING`",
            "short": "Postal code for this location",
          },
        ],
        "name": "get_postal_codes_by_city",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/{country}/{state}/{city}",
                "segments": [
                  {
                    "var": "country",
                  },
                  {
                    "var": "state",
                  },
                  {
                    "var": "city",
                  },
                ],
                "parts": [
                  "{country}",
                  "{state}",
                  "{city}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.places`",
                },
                "args": {
                  "params": [
                    {
                      "name": "city",
                      "orig": "city",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "Beverly Hills",
                    },
                    {
                      "name": "country",
                      "orig": "country",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "US",
                    },
                    {
                      "name": "state",
                      "orig": "state",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "CA",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "city",
                    "country",
                    "state",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
