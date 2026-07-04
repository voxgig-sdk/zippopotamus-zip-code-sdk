# frozen_string_literal: true

# Typed models for the ZippopotamusZipCode SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# GetLocationByPostalCode entity data model.
#
# @!attribute [rw] latitude
#   @return [String, nil]
#
# @!attribute [rw] longitude
#   @return [String, nil]
#
# @!attribute [rw] place_name
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] state_abbreviation
#   @return [String, nil]
GetLocationByPostalCode = Struct.new(
  :latitude,
  :longitude,
  :place_name,
  :state,
  :state_abbreviation,
  keyword_init: true
)

# Request payload for GetLocationByPostalCode#list.
#
# @!attribute [rw] country
#   @return [String]
#
# @!attribute [rw] postal_code
#   @return [String]
GetLocationByPostalCodeListMatch = Struct.new(
  :country,
  :postal_code,
  keyword_init: true
)

# GetPostalCodesByCity entity data model.
#
# @!attribute [rw] latitude
#   @return [String, nil]
#
# @!attribute [rw] longitude
#   @return [String, nil]
#
# @!attribute [rw] place_name
#   @return [String, nil]
#
# @!attribute [rw] post_code
#   @return [String, nil]
GetPostalCodesByCity = Struct.new(
  :latitude,
  :longitude,
  :place_name,
  :post_code,
  keyword_init: true
)

# Request payload for GetPostalCodesByCity#list.
#
# @!attribute [rw] city
#   @return [String]
#
# @!attribute [rw] country
#   @return [String]
#
# @!attribute [rw] state
#   @return [String]
GetPostalCodesByCityListMatch = Struct.new(
  :city,
  :country,
  :state,
  keyword_init: true
)

