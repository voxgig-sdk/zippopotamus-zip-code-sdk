# Typed models for the ZippopotamusZipCode SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class GetLocationByPostalCode:
    latitude: Optional[str] = None
    longitude: Optional[str] = None
    place_name: Optional[str] = None
    state: Optional[str] = None
    state_abbreviation: Optional[str] = None


@dataclass
class GetLocationByPostalCodeListMatch:
    country: str
    postal_code: str


@dataclass
class GetPostalCodesByCity:
    latitude: Optional[str] = None
    longitude: Optional[str] = None
    place_name: Optional[str] = None
    post_code: Optional[str] = None


@dataclass
class GetPostalCodesByCityListMatch:
    city: str
    country: str
    state: str

