
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ZippopotamusZipCode',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://api.zippopotam.us",

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
          "name": "latitude",
          "type": "`$STRING`"
        },
        {
          "name": "longitude",
          "type": "`$STRING`"
        },
        {
          "name": "placename",
          "type": "`$STRING`"
        },
        {
          "name": "state",
          "type": "`$STRING`"
        },
        {
          "name": "stateabbreviation",
          "type": "`$STRING`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "example": "90210",
                    "kind": "param",
                    "name": "postal_code",
                    "orig": "postal_code",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
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
                "res": "`body.places`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "get_postal_codes_by_city": {
      "fields": [
        {
          "name": "latitude",
          "type": "`$STRING`"
        },
        {
          "name": "longitude",
          "type": "`$STRING`"
        },
        {
          "name": "placename",
          "type": "`$STRING`"
        },
        {
          "name": "postcode",
          "type": "`$STRING`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "example": "US",
                    "kind": "param",
                    "name": "country",
                    "orig": "country",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "example": "CA",
                    "kind": "param",
                    "name": "state",
                    "orig": "state",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
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
                "res": "`body.places`"
              }
            }
          ]
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

