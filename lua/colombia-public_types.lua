-- Typed models for the ColombiaPublic SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Airport
---@field city_id? number
---@field code? string
---@field department_id? number
---@field id? number
---@field latitude? number
---@field longitude? number
---@field name? string
---@field type? string

---@class AirportLoadMatch
---@field id number

---@class AirportListMatch
---@field city_id? number
---@field code? string
---@field department_id? number
---@field id? number
---@field latitude? number
---@field longitude? number
---@field name? string
---@field type? string

---@class CategoryNaturalArea
---@field description? string
---@field id? number
---@field name? string

---@class CategoryNaturalAreaListMatch
---@field description? string
---@field id? number
---@field name? string

---@class ConstitutionArticle
---@field article_number? number
---@field chapter? string
---@field description? string
---@field id? number
---@field title? string

---@class ConstitutionArticleLoadMatch
---@field id number

---@class ConstitutionArticleListMatch
---@field article_number? number
---@field chapter? string
---@field description? string
---@field id? number
---@field title? string

---@class Country
---@field capital? string
---@field currency? string
---@field flag? string
---@field id? number
---@field language? table
---@field name? string
---@field population? number
---@field surface? number

---@class CountryListMatch
---@field capital? string
---@field currency? string
---@field flag? string
---@field id? number
---@field language? table
---@field name? string
---@field population? number
---@field surface? number

---@class Department
---@field city_capital? string
---@field description? string
---@field id? number
---@field municipality? number
---@field name? string
---@field population? number
---@field region_id? number
---@field surface? number

---@class DepartmentLoadMatch
---@field id number

---@class DepartmentListMatch
---@field city_capital? string
---@field description? string
---@field id? number
---@field municipality? number
---@field name? string
---@field population? number
---@field region_id? number
---@field surface? number

---@class Holiday
---@field date? string
---@field description? string
---@field id? number
---@field name? string
---@field type? string

---@class HolidayLoadMatch
---@field id number

---@class HolidayListMatch
---@field date? string
---@field description? string
---@field id? number
---@field name? string
---@field type? string

---@class InvasiveSpecie
---@field id? number
---@field impact? string
---@field manage? string
---@field name? string
---@field scientific_name? string
---@field url_image? string

---@class InvasiveSpecieLoadMatch
---@field id number

---@class InvasiveSpecieListMatch
---@field id? number
---@field impact? string
---@field manage? string
---@field name? string
---@field scientific_name? string
---@field url_image? string

---@class Map
---@field department_id? number
---@field description? string
---@field id? number
---@field name? string
---@field url_image? table

---@class MapListMatch
---@field department_id? number
---@field description? string
---@field id? number
---@field name? string
---@field url_image? table

---@class NativeCommunity
---@field department_id? number
---@field description? string
---@field id? number
---@field name? string
---@field population? number

---@class NativeCommunityLoadMatch
---@field id number

---@class NativeCommunityListMatch
---@field department_id? number
---@field description? string
---@field id? number
---@field name? string
---@field population? number

---@class NaturalArea
---@field area_group_id? number
---@field category_natural_area_id? number
---@field department_id? number
---@field description? string
---@field id? number
---@field land_area? number
---@field maritime_area? number
---@field name? string

---@class NaturalAreaLoadMatch
---@field id number

---@class NaturalAreaListMatch
---@field area_group_id? number
---@field category_natural_area_id? number
---@field department_id? number
---@field description? string
---@field id? number
---@field land_area? number
---@field maritime_area? number
---@field name? string

---@class President
---@field description? string
---@field end_period_date? string
---@field id? number
---@field image? string
---@field name? string
---@field political_party? string
---@field start_period_date? string

---@class PresidentLoadMatch
---@field id number

---@class PresidentListMatch
---@field description? string
---@field end_period_date? string
---@field id? number
---@field image? string
---@field name? string
---@field political_party? string
---@field start_period_date? string

---@class Radio
---@field band? string
---@field frequency? string
---@field id? number
---@field name? string
---@field url? string

---@class RadioLoadMatch
---@field id number

---@class RadioListMatch
---@field band? string
---@field frequency? string
---@field id? number
---@field name? string
---@field url? string

---@class Region
---@field department? table
---@field description? string
---@field id? number
---@field name? string

---@class RegionLoadMatch
---@field id number

---@class RegionListMatch
---@field department? table
---@field description? string
---@field id? number
---@field name? string

---@class TouristicAttraction
---@field city? string
---@field description? string
---@field id? number
---@field image? table
---@field latitude? number
---@field longitude? number
---@field name? string

---@class TouristicAttractionLoadMatch
---@field id number

---@class TouristicAttractionListMatch
---@field city? string
---@field description? string
---@field id? number
---@field image? table
---@field latitude? number
---@field longitude? number
---@field name? string

---@class TypicalDish
---@field department_id? number
---@field description? string
---@field id? number
---@field ingredient? table
---@field name? string
---@field url_image? string

---@class TypicalDishLoadMatch
---@field id number

---@class TypicalDishListMatch
---@field department_id? number
---@field description? string
---@field id? number
---@field ingredient? table
---@field name? string
---@field url_image? string

local M = {}

return M
