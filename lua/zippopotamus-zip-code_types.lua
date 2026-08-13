-- Typed models for the ZippopotamusZipCode SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class GetLocationByPostalCode
---@field latitude? string
---@field longitude? string
---@field placename? string
---@field state? string
---@field stateabbreviation? string

---@class GetLocationByPostalCodeListMatch
---@field country string
---@field postal_code string

---@class GetPostalCodesByCity
---@field latitude? string
---@field longitude? string
---@field placename? string
---@field postcode? string

---@class GetPostalCodesByCityListMatch
---@field city string
---@field country string
---@field state string

local M = {}

return M
