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

export type AirportListMatch = Partial<Airport>

export interface CategoryNaturalArea {
  description?: string
  id?: number
  name?: string
}

export type CategoryNaturalAreaListMatch = Partial<CategoryNaturalArea>

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

export type ConstitutionArticleListMatch = Partial<ConstitutionArticle>

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

export type CountryListMatch = Partial<Country>

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

export type DepartmentListMatch = Partial<Department>

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

export type HolidayListMatch = Partial<Holiday>

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

export type InvasiveSpecieListMatch = Partial<InvasiveSpecie>

export interface Map {
  department_id?: number
  description?: string
  id?: number
  name?: string
  url_image?: any[]
}

export type MapListMatch = Partial<Map>

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

export type NativeCommunityListMatch = Partial<NativeCommunity>

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

export type NaturalAreaListMatch = Partial<NaturalArea>

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

export type PresidentListMatch = Partial<President>

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

export type RadioListMatch = Partial<Radio>

export interface Region {
  department?: any[]
  description?: string
  id?: number
  name?: string
}

export interface RegionLoadMatch {
  id: number
}

export type RegionListMatch = Partial<Region>

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

export type TouristicAttractionListMatch = Partial<TouristicAttraction>

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

export type TypicalDishListMatch = Partial<TypicalDish>

