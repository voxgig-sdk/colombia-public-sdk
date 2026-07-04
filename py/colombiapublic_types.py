# Typed models for the ColombiaPublic SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Airport:
    city_id: Optional[int] = None
    code: Optional[str] = None
    department_id: Optional[int] = None
    id: Optional[int] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    name: Optional[str] = None
    type: Optional[str] = None


@dataclass
class AirportLoadMatch:
    id: int


@dataclass
class AirportListMatch:
    city_id: Optional[int] = None
    code: Optional[str] = None
    department_id: Optional[int] = None
    id: Optional[int] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    name: Optional[str] = None
    type: Optional[str] = None


@dataclass
class CategoryNaturalArea:
    description: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None


@dataclass
class CategoryNaturalAreaListMatch:
    description: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None


@dataclass
class ConstitutionArticle:
    article_number: Optional[int] = None
    chapter: Optional[str] = None
    description: Optional[str] = None
    id: Optional[int] = None
    title: Optional[str] = None


@dataclass
class ConstitutionArticleLoadMatch:
    id: int


@dataclass
class ConstitutionArticleListMatch:
    article_number: Optional[int] = None
    chapter: Optional[str] = None
    description: Optional[str] = None
    id: Optional[int] = None
    title: Optional[str] = None


@dataclass
class Country:
    capital: Optional[str] = None
    currency: Optional[str] = None
    flag: Optional[str] = None
    id: Optional[int] = None
    language: Optional[list] = None
    name: Optional[str] = None
    population: Optional[int] = None
    surface: Optional[float] = None


@dataclass
class CountryListMatch:
    capital: Optional[str] = None
    currency: Optional[str] = None
    flag: Optional[str] = None
    id: Optional[int] = None
    language: Optional[list] = None
    name: Optional[str] = None
    population: Optional[int] = None
    surface: Optional[float] = None


@dataclass
class Department:
    city_capital: Optional[str] = None
    description: Optional[str] = None
    id: Optional[int] = None
    municipality: Optional[int] = None
    name: Optional[str] = None
    population: Optional[int] = None
    region_id: Optional[int] = None
    surface: Optional[float] = None


@dataclass
class DepartmentLoadMatch:
    id: int


@dataclass
class DepartmentListMatch:
    city_capital: Optional[str] = None
    description: Optional[str] = None
    id: Optional[int] = None
    municipality: Optional[int] = None
    name: Optional[str] = None
    population: Optional[int] = None
    region_id: Optional[int] = None
    surface: Optional[float] = None


@dataclass
class Holiday:
    date: Optional[str] = None
    description: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    type: Optional[str] = None


@dataclass
class HolidayLoadMatch:
    id: int


@dataclass
class HolidayListMatch:
    date: Optional[str] = None
    description: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    type: Optional[str] = None


@dataclass
class InvasiveSpecie:
    id: Optional[int] = None
    impact: Optional[str] = None
    manage: Optional[str] = None
    name: Optional[str] = None
    scientific_name: Optional[str] = None
    url_image: Optional[str] = None


@dataclass
class InvasiveSpecieLoadMatch:
    id: int


@dataclass
class InvasiveSpecieListMatch:
    id: Optional[int] = None
    impact: Optional[str] = None
    manage: Optional[str] = None
    name: Optional[str] = None
    scientific_name: Optional[str] = None
    url_image: Optional[str] = None


@dataclass
class Map:
    department_id: Optional[int] = None
    description: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    url_image: Optional[list] = None


@dataclass
class MapListMatch:
    department_id: Optional[int] = None
    description: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    url_image: Optional[list] = None


@dataclass
class NativeCommunity:
    department_id: Optional[int] = None
    description: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    population: Optional[int] = None


@dataclass
class NativeCommunityLoadMatch:
    id: int


@dataclass
class NativeCommunityListMatch:
    department_id: Optional[int] = None
    description: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    population: Optional[int] = None


@dataclass
class NaturalArea:
    area_group_id: Optional[int] = None
    category_natural_area_id: Optional[int] = None
    department_id: Optional[int] = None
    description: Optional[str] = None
    id: Optional[int] = None
    land_area: Optional[float] = None
    maritime_area: Optional[float] = None
    name: Optional[str] = None


@dataclass
class NaturalAreaLoadMatch:
    id: int


@dataclass
class NaturalAreaListMatch:
    area_group_id: Optional[int] = None
    category_natural_area_id: Optional[int] = None
    department_id: Optional[int] = None
    description: Optional[str] = None
    id: Optional[int] = None
    land_area: Optional[float] = None
    maritime_area: Optional[float] = None
    name: Optional[str] = None


@dataclass
class President:
    description: Optional[str] = None
    end_period_date: Optional[str] = None
    id: Optional[int] = None
    image: Optional[str] = None
    name: Optional[str] = None
    political_party: Optional[str] = None
    start_period_date: Optional[str] = None


@dataclass
class PresidentLoadMatch:
    id: int


@dataclass
class PresidentListMatch:
    description: Optional[str] = None
    end_period_date: Optional[str] = None
    id: Optional[int] = None
    image: Optional[str] = None
    name: Optional[str] = None
    political_party: Optional[str] = None
    start_period_date: Optional[str] = None


@dataclass
class Radio:
    band: Optional[str] = None
    frequency: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    url: Optional[str] = None


@dataclass
class RadioLoadMatch:
    id: int


@dataclass
class RadioListMatch:
    band: Optional[str] = None
    frequency: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    url: Optional[str] = None


@dataclass
class Region:
    department: Optional[list] = None
    description: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None


@dataclass
class RegionLoadMatch:
    id: int


@dataclass
class RegionListMatch:
    department: Optional[list] = None
    description: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None


@dataclass
class TouristicAttraction:
    city: Optional[str] = None
    description: Optional[str] = None
    id: Optional[int] = None
    image: Optional[list] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    name: Optional[str] = None


@dataclass
class TouristicAttractionLoadMatch:
    id: int


@dataclass
class TouristicAttractionListMatch:
    city: Optional[str] = None
    description: Optional[str] = None
    id: Optional[int] = None
    image: Optional[list] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    name: Optional[str] = None


@dataclass
class TypicalDish:
    department_id: Optional[int] = None
    description: Optional[str] = None
    id: Optional[int] = None
    ingredient: Optional[list] = None
    name: Optional[str] = None
    url_image: Optional[str] = None


@dataclass
class TypicalDishLoadMatch:
    id: int


@dataclass
class TypicalDishListMatch:
    department_id: Optional[int] = None
    description: Optional[str] = None
    id: Optional[int] = None
    ingredient: Optional[list] = None
    name: Optional[str] = None
    url_image: Optional[str] = None

