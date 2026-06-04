# ZippopotamusZipCode SDK configuration


def make_config():
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
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "longitude",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "place_name",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "state",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "state_abbreviation",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
        ],
        "name": "get_location_by_postal_code",
        "op": {
          "list": {
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
                      "active": True,
                    },
                    {
                      "example": "90210",
                      "kind": "param",
                      "name": "postal_code",
                      "orig": "postal_code",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
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
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
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
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "longitude",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "place_name",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "post_code",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
        ],
        "name": "get_postal_codes_by_city",
        "op": {
          "list": {
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
                      "active": True,
                    },
                    {
                      "example": "US",
                      "kind": "param",
                      "name": "country",
                      "orig": "country",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": "CA",
                      "kind": "param",
                      "name": "state",
                      "orig": "state",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
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
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
