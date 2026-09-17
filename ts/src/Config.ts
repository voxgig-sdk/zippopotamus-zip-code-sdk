
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'ZippopotamusZipCode',
        slug: "zippopotamus-zip-code",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
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
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
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
          "short": "Latitude coordinate",
          "type": "`$STRING`"
        },
        {
          "name": "longitude",
          "short": "Longitude coordinate",
          "type": "`$STRING`"
        },
        {
          "name": "placename",
          "short": "Name of the place/city",
          "type": "`$STRING`"
        },
        {
          "name": "state",
          "short": "Full state or province name",
          "type": "`$STRING`"
        },
        {
          "name": "stateabbreviation",
          "short": "State or province abbreviation",
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
              "rename": {
                "param": {
                  "postal-code": "postal_code"
                }
              },
              "segments": [
                {
                  "var": "country"
                },
                {
                  "var": "postal_code"
                }
              ],
              "select": {
                "exist": [
                  "country",
                  "postal_code"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.places`"
              },
              "parts": [
                "{country}",
                "{postal_code}"
              ]
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
          "short": "Latitude coordinate",
          "type": "`$STRING`"
        },
        {
          "name": "longitude",
          "short": "Longitude coordinate",
          "type": "`$STRING`"
        },
        {
          "name": "placename",
          "short": "Name of the place/city",
          "type": "`$STRING`"
        },
        {
          "name": "postcode",
          "short": "Postal code for this location",
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
              "segments": [
                {
                  "var": "country"
                },
                {
                  "var": "state"
                },
                {
                  "var": "city"
                }
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
              },
              "parts": [
                "{country}",
                "{state}",
                "{city}"
              ]
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
  config,
  FEATURE_PLUGINS,
}

