"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'ZippopotamusZipCode',
        slug: "zippopotamus-zip-code",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
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
        retry: {
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
        test: {
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
        timeout: {
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
    };
    options = {
        base: "https://api.zippopotam.us",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            get_location_by_postal_code: {},
            get_postal_codes_by_city: {},
        }
    };
    entity = {
        "get_location_by_postal_code": {
            "fields": [
                {
                    "name": "latitude",
                    "title": "Latitude",
                    "type": "`$STRING`",
                    "short": "Latitude coordinate"
                },
                {
                    "name": "longitude",
                    "title": "Longitude",
                    "type": "`$STRING`",
                    "short": "Longitude coordinate"
                },
                {
                    "name": "placename",
                    "title": "Placename",
                    "type": "`$STRING`",
                    "short": "Name of the place/city"
                },
                {
                    "name": "state",
                    "title": "State",
                    "type": "`$STRING`",
                    "short": "Full state or province name"
                },
                {
                    "name": "stateabbreviation",
                    "title": "Stateabbreviation",
                    "type": "`$STRING`",
                    "short": "State or province abbreviation"
                }
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
                                    "var": "country"
                                },
                                {
                                    "var": "postal_code"
                                }
                            ],
                            "parts": [
                                "{country}",
                                "{postal_code}"
                            ],
                            "rename": {
                                "param": {
                                    "postal-code": "postal_code"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.places`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "country",
                                        "orig": "country",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "US"
                                    },
                                    {
                                        "name": "postal_code",
                                        "orig": "postal_code",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "90210"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "country",
                                    "postal_code"
                                ]
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
                    "title": "Latitude",
                    "type": "`$STRING`",
                    "short": "Latitude coordinate"
                },
                {
                    "name": "longitude",
                    "title": "Longitude",
                    "type": "`$STRING`",
                    "short": "Longitude coordinate"
                },
                {
                    "name": "placename",
                    "title": "Placename",
                    "type": "`$STRING`",
                    "short": "Name of the place/city"
                },
                {
                    "name": "postcode",
                    "title": "Postcode",
                    "type": "`$STRING`",
                    "short": "Postal code for this location"
                }
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
                                    "var": "country"
                                },
                                {
                                    "var": "state"
                                },
                                {
                                    "var": "city"
                                }
                            ],
                            "parts": [
                                "{country}",
                                "{state}",
                                "{city}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.places`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "city",
                                        "orig": "city",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "Beverly Hills"
                                    },
                                    {
                                        "name": "country",
                                        "orig": "country",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "US"
                                    },
                                    {
                                        "name": "state",
                                        "orig": "state",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "CA"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "city",
                                    "country",
                                    "state"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map