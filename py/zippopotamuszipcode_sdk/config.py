# ZippopotamusZipCode SDK configuration


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
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
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
            "type": "`$STRING`",
          },
          {
            "name": "longitude",
            "type": "`$STRING`",
          },
          {
            "name": "placename",
            "type": "`$STRING`",
          },
          {
            "name": "state",
            "type": "`$STRING`",
          },
          {
            "name": "stateabbreviation",
            "type": "`$STRING`",
          },
        ],
        "name": "get_location_by_postal_code",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "US",
                      "kind": "param",
                      "name": "country",
                      "orig": "country",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "90210",
                      "kind": "param",
                      "name": "postal_code",
                      "orig": "postal_code",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/{country}/{postal-code}",
                "parts": [
                  "{country}",
                  "{postal_code}",
                ],
                "rename": {
                  "param": {
                    "postal-code": "postal_code",
                  },
                },
                "select": {
                  "exist": [
                    "country",
                    "postal_code",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.places`",
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
            "type": "`$STRING`",
          },
          {
            "name": "longitude",
            "type": "`$STRING`",
          },
          {
            "name": "placename",
            "type": "`$STRING`",
          },
          {
            "name": "postcode",
            "type": "`$STRING`",
          },
        ],
        "name": "get_postal_codes_by_city",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "Beverly Hills",
                      "kind": "param",
                      "name": "city",
                      "orig": "city",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "US",
                      "kind": "param",
                      "name": "country",
                      "orig": "country",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "CA",
                      "kind": "param",
                      "name": "state",
                      "orig": "state",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/{country}/{state}/{city}",
                "parts": [
                  "{country}",
                  "{state}",
                  "{city}",
                ],
                "select": {
                  "exist": [
                    "city",
                    "country",
                    "state",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.places`",
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
