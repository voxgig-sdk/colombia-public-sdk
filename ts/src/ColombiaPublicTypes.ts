// Typed models for the ColombiaPublic SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Airport {
  city_id?: number
  code?: string
  department_id?: number
  id?: number
  latitude?: number
  longitude?: number
  name?: string
  type?: string
}

export interface AirportLoadMatch {
  id: number
}

export interface AirportListMatch {
  city_id?: number
  code?: string
  department_id?: number
  id?: number
  latitude?: number
  longitude?: number
  name?: string
  type?: string
}

export interface CategoryNaturalArea {
  description?: string
  id?: number
  name?: string
}

export interface CategoryNaturalAreaListMatch {
  description?: string
  id?: number
  name?: string
}

export interface ConstitutionArticle {
  article_number?: number
  chapter?: string
  description?: string
  id?: number
  title?: string
}

export interface ConstitutionArticleLoadMatch {
  id: number
}

export interface ConstitutionArticleListMatch {
  article_number?: number
  chapter?: string
  description?: string
  id?: number
  title?: string
}

export interface Country {
  capital?: string
  currency?: string
  flag?: string
  id?: number
  language?: any[]
  name?: string
  population?: number
  surface?: number
}

export interface CountryListMatch {
  capital?: string
  currency?: string
  flag?: string
  id?: number
  language?: any[]
  name?: string
  population?: number
  surface?: number
}

export interface Department {
  city_capital?: string
  description?: string
  id?: number
  municipality?: number
  name?: string
  population?: number
  region_id?: number
  surface?: number
}

export interface DepartmentLoadMatch {
  id: number
}

export interface DepartmentListMatch {
  city_capital?: string
  description?: string
  id?: number
  municipality?: number
  name?: string
  population?: number
  region_id?: number
  surface?: number
}

export interface Holiday {
  date?: string
  description?: string
  id?: number
  name?: string
  type?: string
}

export interface HolidayLoadMatch {
  id: number
}

export interface HolidayListMatch {
  date?: string
  description?: string
  id?: number
  name?: string
  type?: string
}

export interface InvasiveSpecie {
  id?: number
  impact?: string
  manage?: string
  name?: string
  scientific_name?: string
  url_image?: string
}

export interface InvasiveSpecieLoadMatch {
  id: number
}

export interface InvasiveSpecieListMatch {
  id?: number
  impact?: string
  manage?: string
  name?: string
  scientific_name?: string
  url_image?: string
}

export interface Map {
  department_id?: number
  description?: string
  id?: number
  name?: string
  url_image?: any[]
}

export interface MapListMatch {
  department_id?: number
  description?: string
  id?: number
  name?: string
  url_image?: any[]
}

export interface NativeCommunity {
  department_id?: number
  description?: string
  id?: number
  name?: string
  population?: number
}

export interface NativeCommunityLoadMatch {
  id: number
}

export interface NativeCommunityListMatch {
  department_id?: number
  description?: string
  id?: number
  name?: string
  population?: number
}

export interface NaturalArea {
  area_group_id?: number
  category_natural_area_id?: number
  department_id?: number
  description?: string
  id?: number
  land_area?: number
  maritime_area?: number
  name?: string
}

export interface NaturalAreaLoadMatch {
  id: number
}

export interface NaturalAreaListMatch {
  area_group_id?: number
  category_natural_area_id?: number
  department_id?: number
  description?: string
  id?: number
  land_area?: number
  maritime_area?: number
  name?: string
}

export interface President {
  description?: string
  end_period_date?: string
  id?: number
  image?: string
  name?: string
  political_party?: string
  start_period_date?: string
}

export interface PresidentLoadMatch {
  id: number
}

export interface PresidentListMatch {
  description?: string
  end_period_date?: string
  id?: number
  image?: string
  name?: string
  political_party?: string
  start_period_date?: string
}

export interface Radio {
  band?: string
  frequency?: string
  id?: number
  name?: string
  url?: string
}

export interface RadioLoadMatch {
  id: number
}

export interface RadioListMatch {
  band?: string
  frequency?: string
  id?: number
  name?: string
  url?: string
}

export interface Region {
  department?: any[]
  description?: string
  id?: number
  name?: string
}

export interface RegionLoadMatch {
  id: number
}

export interface RegionListMatch {
  department?: any[]
  description?: string
  id?: number
  name?: string
}

export interface TouristicAttraction {
  city?: string
  description?: string
  id?: number
  image?: any[]
  latitude?: number
  longitude?: number
  name?: string
}

export interface TouristicAttractionLoadMatch {
  id: number
}

export interface TouristicAttractionListMatch {
  city?: string
  description?: string
  id?: number
  image?: any[]
  latitude?: number
  longitude?: number
  name?: string
}

export interface TypicalDish {
  department_id?: number
  description?: string
  id?: number
  ingredient?: any[]
  name?: string
  url_image?: string
}

export interface TypicalDishLoadMatch {
  id: number
}

export interface TypicalDishListMatch {
  department_id?: number
  description?: string
  id?: number
  ingredient?: any[]
  name?: string
  url_image?: string
}

