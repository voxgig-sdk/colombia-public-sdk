-- Typed models for the ColombiaPublic SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Airport
---@field cityId? number
---@field code? string
---@field departmentId? number
---@field id? number
---@field latitude? number
---@field longitude? number
---@field name? string
---@field type? string

---@class AirportLoadMatch
---@field id number

---@class AirportListMatch
---@field cityId? number
---@field code? string
---@field departmentId? number
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
---@field articleNumber? number
---@field chapter? string
---@field description? string
---@field id? number
---@field title? string

---@class ConstitutionArticleLoadMatch
---@field id number

---@class ConstitutionArticleListMatch
---@field articleNumber? number
---@field chapter? string
---@field description? string
---@field id? number
---@field title? string

---@class Country
---@field capital? string
---@field currency? string
---@field flag? string
---@field id? number
---@field languages? table
---@field name? string
---@field population? number
---@field surface? number

---@class CountryListMatch
---@field capital? string
---@field currency? string
---@field flag? string
---@field id? number
---@field languages? table
---@field name? string
---@field population? number
---@field surface? number

---@class Department
---@field cityCapital? string
---@field description? string
---@field id? number
---@field municipalities? number
---@field name? string
---@field population? number
---@field regionId? number
---@field surface? number

---@class DepartmentLoadMatch
---@field id number

---@class DepartmentListMatch
---@field cityCapital? string
---@field description? string
---@field id? number
---@field municipalities? number
---@field name? string
---@field population? number
---@field regionId? number
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
---@field scientificName? string
---@field urlImage? string

---@class InvasiveSpecieLoadMatch
---@field id number

---@class InvasiveSpecieListMatch
---@field id? number
---@field impact? string
---@field manage? string
---@field name? string
---@field scientificName? string
---@field urlImage? string

---@class Map
---@field departmentId? number
---@field description? string
---@field id? number
---@field name? string
---@field urlImages? table

---@class MapListMatch
---@field departmentId? number
---@field description? string
---@field id? number
---@field name? string
---@field urlImages? table

---@class NativeCommunity
---@field departmentId? number
---@field description? string
---@field id? number
---@field name? string
---@field population? number

---@class NativeCommunityLoadMatch
---@field id number

---@class NativeCommunityListMatch
---@field departmentId? number
---@field description? string
---@field id? number
---@field name? string
---@field population? number

---@class NaturalArea
---@field areaGroupId? number
---@field categoryNaturalAreaId? number
---@field departmentId? number
---@field description? string
---@field id? number
---@field landArea? number
---@field maritimeArea? number
---@field name? string

---@class NaturalAreaLoadMatch
---@field id number

---@class NaturalAreaListMatch
---@field areaGroupId? number
---@field categoryNaturalAreaId? number
---@field departmentId? number
---@field description? string
---@field id? number
---@field landArea? number
---@field maritimeArea? number
---@field name? string

---@class President
---@field description? string
---@field endPeriodDate? string
---@field id? number
---@field image? string
---@field name? string
---@field politicalParty? string
---@field startPeriodDate? string

---@class PresidentLoadMatch
---@field id number

---@class PresidentListMatch
---@field description? string
---@field endPeriodDate? string
---@field id? number
---@field image? string
---@field name? string
---@field politicalParty? string
---@field startPeriodDate? string

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
---@field departments? table
---@field description? string
---@field id? number
---@field name? string

---@class RegionLoadMatch
---@field id number

---@class RegionListMatch
---@field departments? table
---@field description? string
---@field id? number
---@field name? string

---@class TouristicAttraction
---@field city? string
---@field description? string
---@field id? number
---@field images? table
---@field latitude? number
---@field longitude? number
---@field name? string

---@class TouristicAttractionLoadMatch
---@field id number

---@class TouristicAttractionListMatch
---@field city? string
---@field description? string
---@field id? number
---@field images? table
---@field latitude? number
---@field longitude? number
---@field name? string

---@class TypicalDish
---@field departmentId? number
---@field description? string
---@field id? number
---@field ingredients? table
---@field name? string
---@field urlImage? string

---@class TypicalDishLoadMatch
---@field id number

---@class TypicalDishListMatch
---@field departmentId? number
---@field description? string
---@field id? number
---@field ingredients? table
---@field name? string
---@field urlImage? string

local M = {}

return M
