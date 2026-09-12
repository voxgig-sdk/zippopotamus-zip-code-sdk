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
			"slug": "zippopotamus-zip-code",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
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
						"short": "Latitude coordinate",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "longitude",
						"short": "Longitude coordinate",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "placename",
						"short": "Name of the place/city",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "state",
						"short": "Full state or province name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "stateabbreviation",
						"short": "State or province abbreviation",
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
								"rename": map[string]any{
									"param": map[string]any{
										"postal-code": "postal_code",
									},
								},
								"segments": []any{
									map[string]any{
										"var": "country",
									},
									map[string]any{
										"var": "postal_code",
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
								"parts": []any{
									"{country}",
									"{postal_code}",
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
						"short": "Latitude coordinate",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "longitude",
						"short": "Longitude coordinate",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "placename",
						"short": "Name of the place/city",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "postcode",
						"short": "Postal code for this location",
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
								"segments": []any{
									map[string]any{
										"var": "country",
									},
									map[string]any{
										"var": "state",
									},
									map[string]any{
										"var": "city",
									},
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
								"parts": []any{
									"{country}",
									"{state}",
									"{city}",
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
