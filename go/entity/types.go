// Typed models for the ColombiaPublic SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Airport is the typed data model for the airport entity.
type Airport struct {
	CityId *int `json:"city_id,omitempty"`
	Code *string `json:"code,omitempty"`
	DepartmentId *int `json:"department_id,omitempty"`
	Id *int `json:"id,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Name *string `json:"name,omitempty"`
	Type *string `json:"type,omitempty"`
}

// AirportLoadMatch is the typed request payload for Airport.LoadTyped.
type AirportLoadMatch struct {
	Id int `json:"id"`
}

// AirportListMatch mirrors the airport fields as an all-optional match
// filter (Go analog of Partial<Airport>).
type AirportListMatch struct {
	CityId *int `json:"city_id,omitempty"`
	Code *string `json:"code,omitempty"`
	DepartmentId *int `json:"department_id,omitempty"`
	Id *int `json:"id,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Name *string `json:"name,omitempty"`
	Type *string `json:"type,omitempty"`
}

// CategoryNaturalArea is the typed data model for the category_natural_area entity.
type CategoryNaturalArea struct {
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
}

// CategoryNaturalAreaListMatch mirrors the category_natural_area fields as an all-optional match
// filter (Go analog of Partial<CategoryNaturalArea>).
type CategoryNaturalAreaListMatch struct {
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
}

// ConstitutionArticle is the typed data model for the constitution_article entity.
type ConstitutionArticle struct {
	ArticleNumber *int `json:"article_number,omitempty"`
	Chapter *string `json:"chapter,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Title *string `json:"title,omitempty"`
}

// ConstitutionArticleLoadMatch is the typed request payload for ConstitutionArticle.LoadTyped.
type ConstitutionArticleLoadMatch struct {
	Id int `json:"id"`
}

// ConstitutionArticleListMatch mirrors the constitution_article fields as an all-optional match
// filter (Go analog of Partial<ConstitutionArticle>).
type ConstitutionArticleListMatch struct {
	ArticleNumber *int `json:"article_number,omitempty"`
	Chapter *string `json:"chapter,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Title *string `json:"title,omitempty"`
}

// Country is the typed data model for the country entity.
type Country struct {
	Capital *string `json:"capital,omitempty"`
	Currency *string `json:"currency,omitempty"`
	Flag *string `json:"flag,omitempty"`
	Id *int `json:"id,omitempty"`
	Language *[]any `json:"language,omitempty"`
	Name *string `json:"name,omitempty"`
	Population *int `json:"population,omitempty"`
	Surface *float64 `json:"surface,omitempty"`
}

// CountryListMatch mirrors the country fields as an all-optional match
// filter (Go analog of Partial<Country>).
type CountryListMatch struct {
	Capital *string `json:"capital,omitempty"`
	Currency *string `json:"currency,omitempty"`
	Flag *string `json:"flag,omitempty"`
	Id *int `json:"id,omitempty"`
	Language *[]any `json:"language,omitempty"`
	Name *string `json:"name,omitempty"`
	Population *int `json:"population,omitempty"`
	Surface *float64 `json:"surface,omitempty"`
}

// Department is the typed data model for the department entity.
type Department struct {
	CityCapital *string `json:"city_capital,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Municipality *int `json:"municipality,omitempty"`
	Name *string `json:"name,omitempty"`
	Population *int `json:"population,omitempty"`
	RegionId *int `json:"region_id,omitempty"`
	Surface *float64 `json:"surface,omitempty"`
}

// DepartmentLoadMatch is the typed request payload for Department.LoadTyped.
type DepartmentLoadMatch struct {
	Id int `json:"id"`
}

// DepartmentListMatch mirrors the department fields as an all-optional match
// filter (Go analog of Partial<Department>).
type DepartmentListMatch struct {
	CityCapital *string `json:"city_capital,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Municipality *int `json:"municipality,omitempty"`
	Name *string `json:"name,omitempty"`
	Population *int `json:"population,omitempty"`
	RegionId *int `json:"region_id,omitempty"`
	Surface *float64 `json:"surface,omitempty"`
}

// Holiday is the typed data model for the holiday entity.
type Holiday struct {
	Date *string `json:"date,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Type *string `json:"type,omitempty"`
}

// HolidayLoadMatch is the typed request payload for Holiday.LoadTyped.
type HolidayLoadMatch struct {
	Id int `json:"id"`
}

// HolidayListMatch mirrors the holiday fields as an all-optional match
// filter (Go analog of Partial<Holiday>).
type HolidayListMatch struct {
	Date *string `json:"date,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Type *string `json:"type,omitempty"`
}

// InvasiveSpecie is the typed data model for the invasive_specie entity.
type InvasiveSpecie struct {
	Id *int `json:"id,omitempty"`
	Impact *string `json:"impact,omitempty"`
	Manage *string `json:"manage,omitempty"`
	Name *string `json:"name,omitempty"`
	ScientificName *string `json:"scientific_name,omitempty"`
	UrlImage *string `json:"url_image,omitempty"`
}

// InvasiveSpecieLoadMatch is the typed request payload for InvasiveSpecie.LoadTyped.
type InvasiveSpecieLoadMatch struct {
	Id int `json:"id"`
}

// InvasiveSpecieListMatch mirrors the invasive_specie fields as an all-optional match
// filter (Go analog of Partial<InvasiveSpecie>).
type InvasiveSpecieListMatch struct {
	Id *int `json:"id,omitempty"`
	Impact *string `json:"impact,omitempty"`
	Manage *string `json:"manage,omitempty"`
	Name *string `json:"name,omitempty"`
	ScientificName *string `json:"scientific_name,omitempty"`
	UrlImage *string `json:"url_image,omitempty"`
}

// Map is the typed data model for the map entity.
type Map struct {
	DepartmentId *int `json:"department_id,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	UrlImage *[]any `json:"url_image,omitempty"`
}

// MapListMatch mirrors the map fields as an all-optional match
// filter (Go analog of Partial<Map>).
type MapListMatch struct {
	DepartmentId *int `json:"department_id,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	UrlImage *[]any `json:"url_image,omitempty"`
}

// NativeCommunity is the typed data model for the native_community entity.
type NativeCommunity struct {
	DepartmentId *int `json:"department_id,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Population *int `json:"population,omitempty"`
}

// NativeCommunityLoadMatch is the typed request payload for NativeCommunity.LoadTyped.
type NativeCommunityLoadMatch struct {
	Id int `json:"id"`
}

// NativeCommunityListMatch mirrors the native_community fields as an all-optional match
// filter (Go analog of Partial<NativeCommunity>).
type NativeCommunityListMatch struct {
	DepartmentId *int `json:"department_id,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Population *int `json:"population,omitempty"`
}

// NaturalArea is the typed data model for the natural_area entity.
type NaturalArea struct {
	AreaGroupId *int `json:"area_group_id,omitempty"`
	CategoryNaturalAreaId *int `json:"category_natural_area_id,omitempty"`
	DepartmentId *int `json:"department_id,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	LandArea *float64 `json:"land_area,omitempty"`
	MaritimeArea *float64 `json:"maritime_area,omitempty"`
	Name *string `json:"name,omitempty"`
}

// NaturalAreaLoadMatch is the typed request payload for NaturalArea.LoadTyped.
type NaturalAreaLoadMatch struct {
	Id int `json:"id"`
}

// NaturalAreaListMatch mirrors the natural_area fields as an all-optional match
// filter (Go analog of Partial<NaturalArea>).
type NaturalAreaListMatch struct {
	AreaGroupId *int `json:"area_group_id,omitempty"`
	CategoryNaturalAreaId *int `json:"category_natural_area_id,omitempty"`
	DepartmentId *int `json:"department_id,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	LandArea *float64 `json:"land_area,omitempty"`
	MaritimeArea *float64 `json:"maritime_area,omitempty"`
	Name *string `json:"name,omitempty"`
}

// President is the typed data model for the president entity.
type President struct {
	Description *string `json:"description,omitempty"`
	EndPeriodDate *string `json:"end_period_date,omitempty"`
	Id *int `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	Name *string `json:"name,omitempty"`
	PoliticalParty *string `json:"political_party,omitempty"`
	StartPeriodDate *string `json:"start_period_date,omitempty"`
}

// PresidentLoadMatch is the typed request payload for President.LoadTyped.
type PresidentLoadMatch struct {
	Id int `json:"id"`
}

// PresidentListMatch mirrors the president fields as an all-optional match
// filter (Go analog of Partial<President>).
type PresidentListMatch struct {
	Description *string `json:"description,omitempty"`
	EndPeriodDate *string `json:"end_period_date,omitempty"`
	Id *int `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	Name *string `json:"name,omitempty"`
	PoliticalParty *string `json:"political_party,omitempty"`
	StartPeriodDate *string `json:"start_period_date,omitempty"`
}

// Radio is the typed data model for the radio entity.
type Radio struct {
	Band *string `json:"band,omitempty"`
	Frequency *string `json:"frequency,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Url *string `json:"url,omitempty"`
}

// RadioLoadMatch is the typed request payload for Radio.LoadTyped.
type RadioLoadMatch struct {
	Id int `json:"id"`
}

// RadioListMatch mirrors the radio fields as an all-optional match
// filter (Go analog of Partial<Radio>).
type RadioListMatch struct {
	Band *string `json:"band,omitempty"`
	Frequency *string `json:"frequency,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Region is the typed data model for the region entity.
type Region struct {
	Department *[]any `json:"department,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
}

// RegionLoadMatch is the typed request payload for Region.LoadTyped.
type RegionLoadMatch struct {
	Id int `json:"id"`
}

// RegionListMatch mirrors the region fields as an all-optional match
// filter (Go analog of Partial<Region>).
type RegionListMatch struct {
	Department *[]any `json:"department,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
}

// TouristicAttraction is the typed data model for the touristic_attraction entity.
type TouristicAttraction struct {
	City *string `json:"city,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Image *[]any `json:"image,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Name *string `json:"name,omitempty"`
}

// TouristicAttractionLoadMatch is the typed request payload for TouristicAttraction.LoadTyped.
type TouristicAttractionLoadMatch struct {
	Id int `json:"id"`
}

// TouristicAttractionListMatch mirrors the touristic_attraction fields as an all-optional match
// filter (Go analog of Partial<TouristicAttraction>).
type TouristicAttractionListMatch struct {
	City *string `json:"city,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Image *[]any `json:"image,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Name *string `json:"name,omitempty"`
}

// TypicalDish is the typed data model for the typical_dish entity.
type TypicalDish struct {
	DepartmentId *int `json:"department_id,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Ingredient *[]any `json:"ingredient,omitempty"`
	Name *string `json:"name,omitempty"`
	UrlImage *string `json:"url_image,omitempty"`
}

// TypicalDishLoadMatch is the typed request payload for TypicalDish.LoadTyped.
type TypicalDishLoadMatch struct {
	Id int `json:"id"`
}

// TypicalDishListMatch mirrors the typical_dish fields as an all-optional match
// filter (Go analog of Partial<TypicalDish>).
type TypicalDishListMatch struct {
	DepartmentId *int `json:"department_id,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Ingredient *[]any `json:"ingredient,omitempty"`
	Name *string `json:"name,omitempty"`
	UrlImage *string `json:"url_image,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
