package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "ZippopotamusZipCode",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://api.zippopotam.us",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"get_location_by_postal_code": map[string]any{},
				"get_postal_codes_by_city": map[string]any{},
			},
		},
		"entity": map[string]any{
			"get_location_by_postal_code": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "latitude",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "longitude",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "placename",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "state",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "stateabbreviation",
						"type": "`$STRING`",
					},
				},
				"name": "get_location_by_postal_code",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "US",
											"kind": "param",
											"name": "country",
											"orig": "country",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "90210",
											"kind": "param",
											"name": "postal_code",
											"orig": "postal_code",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{country}/{postal-code}",
								"parts": []any{
									"{country}",
									"{postal_code}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"postal-code": "postal_code",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"country",
										"postal_code",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.places`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"get_postal_codes_by_city": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "latitude",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "longitude",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "placename",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "postcode",
						"type": "`$STRING`",
					},
				},
				"name": "get_postal_codes_by_city",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "Beverly Hills",
											"kind": "param",
											"name": "city",
											"orig": "city",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "US",
											"kind": "param",
											"name": "country",
											"orig": "country",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "CA",
											"kind": "param",
											"name": "state",
											"orig": "state",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{country}/{state}/{city}",
								"parts": []any{
									"{country}",
									"{state}",
									"{city}",
								},
								"select": map[string]any{
									"exist": []any{
										"city",
										"country",
										"state",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.places`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
