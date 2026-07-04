# Typed models for the ColombiaPublic SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Airport(TypedDict, total=False):
    city_id: int
    code: str
    department_id: int
    id: int
    latitude: float
    longitude: float
    name: str
    type: str


class AirportLoadMatch(TypedDict):
    id: int


class AirportListMatch(TypedDict, total=False):
    city_id: int
    code: str
    department_id: int
    id: int
    latitude: float
    longitude: float
    name: str
    type: str


class CategoryNaturalArea(TypedDict, total=False):
    description: str
    id: int
    name: str


class CategoryNaturalAreaListMatch(TypedDict, total=False):
    description: str
    id: int
    name: str


class ConstitutionArticle(TypedDict, total=False):
    article_number: int
    chapter: str
    description: str
    id: int
    title: str


class ConstitutionArticleLoadMatch(TypedDict):
    id: int


class ConstitutionArticleListMatch(TypedDict, total=False):
    article_number: int
    chapter: str
    description: str
    id: int
    title: str


class Country(TypedDict, total=False):
    capital: str
    currency: str
    flag: str
    id: int
    language: list
    name: str
    population: int
    surface: float


class CountryListMatch(TypedDict, total=False):
    capital: str
    currency: str
    flag: str
    id: int
    language: list
    name: str
    population: int
    surface: float


class Department(TypedDict, total=False):
    city_capital: str
    description: str
    id: int
    municipality: int
    name: str
    population: int
    region_id: int
    surface: float


class DepartmentLoadMatch(TypedDict):
    id: int


class DepartmentListMatch(TypedDict, total=False):
    city_capital: str
    description: str
    id: int
    municipality: int
    name: str
    population: int
    region_id: int
    surface: float


class Holiday(TypedDict, total=False):
    date: str
    description: str
    id: int
    name: str
    type: str


class HolidayLoadMatch(TypedDict):
    id: int


class HolidayListMatch(TypedDict, total=False):
    date: str
    description: str
    id: int
    name: str
    type: str


class InvasiveSpecie(TypedDict, total=False):
    id: int
    impact: str
    manage: str
    name: str
    scientific_name: str
    url_image: str


class InvasiveSpecieLoadMatch(TypedDict):
    id: int


class InvasiveSpecieListMatch(TypedDict, total=False):
    id: int
    impact: str
    manage: str
    name: str
    scientific_name: str
    url_image: str


class Map(TypedDict, total=False):
    department_id: int
    description: str
    id: int
    name: str
    url_image: list


class MapListMatch(TypedDict, total=False):
    department_id: int
    description: str
    id: int
    name: str
    url_image: list


class NativeCommunity(TypedDict, total=False):
    department_id: int
    description: str
    id: int
    name: str
    population: int


class NativeCommunityLoadMatch(TypedDict):
    id: int


class NativeCommunityListMatch(TypedDict, total=False):
    department_id: int
    description: str
    id: int
    name: str
    population: int


class NaturalArea(TypedDict, total=False):
    area_group_id: int
    category_natural_area_id: int
    department_id: int
    description: str
    id: int
    land_area: float
    maritime_area: float
    name: str


class NaturalAreaLoadMatch(TypedDict):
    id: int


class NaturalAreaListMatch(TypedDict, total=False):
    area_group_id: int
    category_natural_area_id: int
    department_id: int
    description: str
    id: int
    land_area: float
    maritime_area: float
    name: str


class President(TypedDict, total=False):
    description: str
    end_period_date: str
    id: int
    image: str
    name: str
    political_party: str
    start_period_date: str


class PresidentLoadMatch(TypedDict):
    id: int


class PresidentListMatch(TypedDict, total=False):
    description: str
    end_period_date: str
    id: int
    image: str
    name: str
    political_party: str
    start_period_date: str


class Radio(TypedDict, total=False):
    band: str
    frequency: str
    id: int
    name: str
    url: str


class RadioLoadMatch(TypedDict):
    id: int


class RadioListMatch(TypedDict, total=False):
    band: str
    frequency: str
    id: int
    name: str
    url: str


class Region(TypedDict, total=False):
    department: list
    description: str
    id: int
    name: str


class RegionLoadMatch(TypedDict):
    id: int


class RegionListMatch(TypedDict, total=False):
    department: list
    description: str
    id: int
    name: str


class TouristicAttraction(TypedDict, total=False):
    city: str
    description: str
    id: int
    image: list
    latitude: float
    longitude: float
    name: str


class TouristicAttractionLoadMatch(TypedDict):
    id: int


class TouristicAttractionListMatch(TypedDict, total=False):
    city: str
    description: str
    id: int
    image: list
    latitude: float
    longitude: float
    name: str


class TypicalDish(TypedDict, total=False):
    department_id: int
    description: str
    id: int
    ingredient: list
    name: str
    url_image: str


class TypicalDishLoadMatch(TypedDict):
    id: int


class TypicalDishListMatch(TypedDict, total=False):
    department_id: int
    description: str
    id: int
    ingredient: list
    name: str
    url_image: str
