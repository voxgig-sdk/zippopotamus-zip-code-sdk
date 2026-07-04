// Typed models for the ZippopotamusZipCode SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// GetLocationByPostalCode is the typed data model for the get_location_by_postal_code entity.
type GetLocationByPostalCode struct {
	Latitude *string `json:"latitude,omitempty"`
	Longitude *string `json:"longitude,omitempty"`
	PlaceName *string `json:"place_name,omitempty"`
	State *string `json:"state,omitempty"`
	StateAbbreviation *string `json:"state_abbreviation,omitempty"`
}

// GetLocationByPostalCodeListMatch is the typed request payload for GetLocationByPostalCode.ListTyped.
type GetLocationByPostalCodeListMatch struct {
	Country string `json:"country"`
	PostalCode string `json:"postal_code"`
}

// GetPostalCodesByCity is the typed data model for the get_postal_codes_by_city entity.
type GetPostalCodesByCity struct {
	Latitude *string `json:"latitude,omitempty"`
	Longitude *string `json:"longitude,omitempty"`
	PlaceName *string `json:"place_name,omitempty"`
	PostCode *string `json:"post_code,omitempty"`
}

// GetPostalCodesByCityListMatch is the typed request payload for GetPostalCodesByCity.ListTyped.
type GetPostalCodesByCityListMatch struct {
	City string `json:"city"`
	Country string `json:"country"`
	State string `json:"state"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
