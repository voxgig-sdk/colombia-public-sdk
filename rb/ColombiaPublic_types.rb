# frozen_string_literal: true

# Typed models for the ColombiaPublic SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Airport entity data model.
#
# @!attribute [rw] city_id
#   @return [Integer, nil]
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] department_id
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
Airport = Struct.new(
  :city_id,
  :code,
  :department_id,
  :id,
  :latitude,
  :longitude,
  :name,
  :type,
  keyword_init: true
)

# Request payload for Airport#load.
#
# @!attribute [rw] id
#   @return [Integer]
AirportLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Airport#list.
#
# @!attribute [rw] city_id
#   @return [Integer, nil]
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] department_id
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
AirportListMatch = Struct.new(
  :city_id,
  :code,
  :department_id,
  :id,
  :latitude,
  :longitude,
  :name,
  :type,
  keyword_init: true
)

# CategoryNaturalArea entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
CategoryNaturalArea = Struct.new(
  :description,
  :id,
  :name,
  keyword_init: true
)

# Request payload for CategoryNaturalArea#list.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
CategoryNaturalAreaListMatch = Struct.new(
  :description,
  :id,
  :name,
  keyword_init: true
)

# ConstitutionArticle entity data model.
#
# @!attribute [rw] article_number
#   @return [Integer, nil]
#
# @!attribute [rw] chapter
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
ConstitutionArticle = Struct.new(
  :article_number,
  :chapter,
  :description,
  :id,
  :title,
  keyword_init: true
)

# Request payload for ConstitutionArticle#load.
#
# @!attribute [rw] id
#   @return [Integer]
ConstitutionArticleLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ConstitutionArticle#list.
#
# @!attribute [rw] article_number
#   @return [Integer, nil]
#
# @!attribute [rw] chapter
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
ConstitutionArticleListMatch = Struct.new(
  :article_number,
  :chapter,
  :description,
  :id,
  :title,
  keyword_init: true
)

# Country entity data model.
#
# @!attribute [rw] capital
#   @return [String, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] flag
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] language
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] population
#   @return [Integer, nil]
#
# @!attribute [rw] surface
#   @return [Float, nil]
Country = Struct.new(
  :capital,
  :currency,
  :flag,
  :id,
  :language,
  :name,
  :population,
  :surface,
  keyword_init: true
)

# Request payload for Country#list.
#
# @!attribute [rw] capital
#   @return [String, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] flag
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] language
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] population
#   @return [Integer, nil]
#
# @!attribute [rw] surface
#   @return [Float, nil]
CountryListMatch = Struct.new(
  :capital,
  :currency,
  :flag,
  :id,
  :language,
  :name,
  :population,
  :surface,
  keyword_init: true
)

# Department entity data model.
#
# @!attribute [rw] city_capital
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] municipality
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] population
#   @return [Integer, nil]
#
# @!attribute [rw] region_id
#   @return [Integer, nil]
#
# @!attribute [rw] surface
#   @return [Float, nil]
Department = Struct.new(
  :city_capital,
  :description,
  :id,
  :municipality,
  :name,
  :population,
  :region_id,
  :surface,
  keyword_init: true
)

# Request payload for Department#load.
#
# @!attribute [rw] id
#   @return [Integer]
DepartmentLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Department#list.
#
# @!attribute [rw] city_capital
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] municipality
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] population
#   @return [Integer, nil]
#
# @!attribute [rw] region_id
#   @return [Integer, nil]
#
# @!attribute [rw] surface
#   @return [Float, nil]
DepartmentListMatch = Struct.new(
  :city_capital,
  :description,
  :id,
  :municipality,
  :name,
  :population,
  :region_id,
  :surface,
  keyword_init: true
)

# Holiday entity data model.
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
Holiday = Struct.new(
  :date,
  :description,
  :id,
  :name,
  :type,
  keyword_init: true
)

# Request payload for Holiday#load.
#
# @!attribute [rw] id
#   @return [Integer]
HolidayLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Holiday#list.
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
HolidayListMatch = Struct.new(
  :date,
  :description,
  :id,
  :name,
  :type,
  keyword_init: true
)

# InvasiveSpecie entity data model.
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] impact
#   @return [String, nil]
#
# @!attribute [rw] manage
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] scientific_name
#   @return [String, nil]
#
# @!attribute [rw] url_image
#   @return [String, nil]
InvasiveSpecie = Struct.new(
  :id,
  :impact,
  :manage,
  :name,
  :scientific_name,
  :url_image,
  keyword_init: true
)

# Request payload for InvasiveSpecie#load.
#
# @!attribute [rw] id
#   @return [Integer]
InvasiveSpecieLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for InvasiveSpecie#list.
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] impact
#   @return [String, nil]
#
# @!attribute [rw] manage
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] scientific_name
#   @return [String, nil]
#
# @!attribute [rw] url_image
#   @return [String, nil]
InvasiveSpecieListMatch = Struct.new(
  :id,
  :impact,
  :manage,
  :name,
  :scientific_name,
  :url_image,
  keyword_init: true
)

# Map entity data model.
#
# @!attribute [rw] department_id
#   @return [Integer, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] url_image
#   @return [Array, nil]
Map = Struct.new(
  :department_id,
  :description,
  :id,
  :name,
  :url_image,
  keyword_init: true
)

# Request payload for Map#list.
#
# @!attribute [rw] department_id
#   @return [Integer, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] url_image
#   @return [Array, nil]
MapListMatch = Struct.new(
  :department_id,
  :description,
  :id,
  :name,
  :url_image,
  keyword_init: true
)

# NativeCommunity entity data model.
#
# @!attribute [rw] department_id
#   @return [Integer, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] population
#   @return [Integer, nil]
NativeCommunity = Struct.new(
  :department_id,
  :description,
  :id,
  :name,
  :population,
  keyword_init: true
)

# Request payload for NativeCommunity#load.
#
# @!attribute [rw] id
#   @return [Integer]
NativeCommunityLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for NativeCommunity#list.
#
# @!attribute [rw] department_id
#   @return [Integer, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] population
#   @return [Integer, nil]
NativeCommunityListMatch = Struct.new(
  :department_id,
  :description,
  :id,
  :name,
  :population,
  keyword_init: true
)

# NaturalArea entity data model.
#
# @!attribute [rw] area_group_id
#   @return [Integer, nil]
#
# @!attribute [rw] category_natural_area_id
#   @return [Integer, nil]
#
# @!attribute [rw] department_id
#   @return [Integer, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] land_area
#   @return [Float, nil]
#
# @!attribute [rw] maritime_area
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
NaturalArea = Struct.new(
  :area_group_id,
  :category_natural_area_id,
  :department_id,
  :description,
  :id,
  :land_area,
  :maritime_area,
  :name,
  keyword_init: true
)

# Request payload for NaturalArea#load.
#
# @!attribute [rw] id
#   @return [Integer]
NaturalAreaLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for NaturalArea#list.
#
# @!attribute [rw] area_group_id
#   @return [Integer, nil]
#
# @!attribute [rw] category_natural_area_id
#   @return [Integer, nil]
#
# @!attribute [rw] department_id
#   @return [Integer, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] land_area
#   @return [Float, nil]
#
# @!attribute [rw] maritime_area
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
NaturalAreaListMatch = Struct.new(
  :area_group_id,
  :category_natural_area_id,
  :department_id,
  :description,
  :id,
  :land_area,
  :maritime_area,
  :name,
  keyword_init: true
)

# President entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] end_period_date
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] image
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] political_party
#   @return [String, nil]
#
# @!attribute [rw] start_period_date
#   @return [String, nil]
President = Struct.new(
  :description,
  :end_period_date,
  :id,
  :image,
  :name,
  :political_party,
  :start_period_date,
  keyword_init: true
)

# Request payload for President#load.
#
# @!attribute [rw] id
#   @return [Integer]
PresidentLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for President#list.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] end_period_date
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] image
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] political_party
#   @return [String, nil]
#
# @!attribute [rw] start_period_date
#   @return [String, nil]
PresidentListMatch = Struct.new(
  :description,
  :end_period_date,
  :id,
  :image,
  :name,
  :political_party,
  :start_period_date,
  keyword_init: true
)

# Radio entity data model.
#
# @!attribute [rw] band
#   @return [String, nil]
#
# @!attribute [rw] frequency
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Radio = Struct.new(
  :band,
  :frequency,
  :id,
  :name,
  :url,
  keyword_init: true
)

# Request payload for Radio#load.
#
# @!attribute [rw] id
#   @return [Integer]
RadioLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Radio#list.
#
# @!attribute [rw] band
#   @return [String, nil]
#
# @!attribute [rw] frequency
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
RadioListMatch = Struct.new(
  :band,
  :frequency,
  :id,
  :name,
  :url,
  keyword_init: true
)

# Region entity data model.
#
# @!attribute [rw] department
#   @return [Array, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
Region = Struct.new(
  :department,
  :description,
  :id,
  :name,
  keyword_init: true
)

# Request payload for Region#load.
#
# @!attribute [rw] id
#   @return [Integer]
RegionLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Region#list.
#
# @!attribute [rw] department
#   @return [Array, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
RegionListMatch = Struct.new(
  :department,
  :description,
  :id,
  :name,
  keyword_init: true
)

# TouristicAttraction entity data model.
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] image
#   @return [Array, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
TouristicAttraction = Struct.new(
  :city,
  :description,
  :id,
  :image,
  :latitude,
  :longitude,
  :name,
  keyword_init: true
)

# Request payload for TouristicAttraction#load.
#
# @!attribute [rw] id
#   @return [Integer]
TouristicAttractionLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for TouristicAttraction#list.
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] image
#   @return [Array, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
TouristicAttractionListMatch = Struct.new(
  :city,
  :description,
  :id,
  :image,
  :latitude,
  :longitude,
  :name,
  keyword_init: true
)

# TypicalDish entity data model.
#
# @!attribute [rw] department_id
#   @return [Integer, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] ingredient
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] url_image
#   @return [String, nil]
TypicalDish = Struct.new(
  :department_id,
  :description,
  :id,
  :ingredient,
  :name,
  :url_image,
  keyword_init: true
)

# Request payload for TypicalDish#load.
#
# @!attribute [rw] id
#   @return [Integer]
TypicalDishLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for TypicalDish#list.
#
# @!attribute [rw] department_id
#   @return [Integer, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] ingredient
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] url_image
#   @return [String, nil]
TypicalDishListMatch = Struct.new(
  :department_id,
  :description,
  :id,
  :ingredient,
  :name,
  :url_image,
  keyword_init: true
)

