// Typed models for the ZippopotamusZipCode SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface GetLocationByPostalCode {
  latitude?: string
  longitude?: string
  placename?: string
  state?: string
  stateabbreviation?: string
}

export interface GetLocationByPostalCodeListMatch {
  country: string
  postal_code: string
}

export interface GetPostalCodesByCity {
  latitude?: string
  longitude?: string
  placename?: string
  postcode?: string
}

export interface GetPostalCodesByCityListMatch {
  city: string
  country: string
  state: string
}

