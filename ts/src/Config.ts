
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://api.zippopotam.us',

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      get_location_by_postal_code: {
      },

      get_postal_codes_by_city: {
      },

    }
  }


  entity = {
    "get_location_by_postal_code": {
      "fields": [
        {
          "active": true,
          "name": "latitude",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "longitude",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "place_name",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "state",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "state_abbreviation",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        }
      ],
      "name": "get_location_by_postal_code",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "US",
                    "kind": "param",
                    "name": "country",
                    "orig": "country",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "example": "90210",
                    "kind": "param",
                    "name": "postal_code",
                    "orig": "postal_code",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 1
                  }
                ]
              },
              "method": "GET",
              "orig": "/{country}/{postal-code}",
              "parts": [
                "{country}",
                "{postal_code}"
              ],
              "rename": {
                "param": {
                  "postal-code": "postal_code"
                }
              },
              "select": {
                "exist": [
                  "country",
                  "postal_code"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "get_postal_codes_by_city": {
      "fields": [
        {
          "active": true,
          "name": "latitude",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "longitude",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "place_name",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "post_code",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        }
      ],
      "name": "get_postal_codes_by_city",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "Beverly Hills",
                    "kind": "param",
                    "name": "city",
                    "orig": "city",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "example": "US",
                    "kind": "param",
                    "name": "country",
                    "orig": "country",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 1
                  },
                  {
                    "active": true,
                    "example": "CA",
                    "kind": "param",
                    "name": "state",
                    "orig": "state",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 2
                  }
                ]
              },
              "method": "GET",
              "orig": "/{country}/{state}/{city}",
              "parts": [
                "{country}",
                "{state}",
                "{city}"
              ],
              "select": {
                "exist": [
                  "city",
                  "country",
                  "state"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

