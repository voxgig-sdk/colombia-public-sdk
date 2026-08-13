// Typed models for the ColombiaPublic SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/colombia-public-sdk/go/core"
)

// Airport is the typed data model for the airport entity.
type Airport struct {
	CityId *int `json:"cityId,omitempty"`
	Code *string `json:"code,omitempty"`
	DepartmentId *int `json:"departmentId,omitempty"`
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

// AirportListMatch is the typed request payload for Airport.ListTyped.
type AirportListMatch struct {
	CityId *int `json:"cityId,omitempty"`
	Code *string `json:"code,omitempty"`
	DepartmentId *int `json:"departmentId,omitempty"`
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

// CategoryNaturalAreaListMatch is the typed request payload for CategoryNaturalArea.ListTyped.
type CategoryNaturalAreaListMatch struct {
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
}

// ConstitutionArticle is the typed data model for the constitution_article entity.
type ConstitutionArticle struct {
	ArticleNumber *int `json:"articleNumber,omitempty"`
	Chapter *string `json:"chapter,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Title *string `json:"title,omitempty"`
}

// ConstitutionArticleLoadMatch is the typed request payload for ConstitutionArticle.LoadTyped.
type ConstitutionArticleLoadMatch struct {
	Id int `json:"id"`
}

// ConstitutionArticleListMatch is the typed request payload for ConstitutionArticle.ListTyped.
type ConstitutionArticleListMatch struct {
	ArticleNumber *int `json:"articleNumber,omitempty"`
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
	Languages *[]any `json:"languages,omitempty"`
	Name *string `json:"name,omitempty"`
	Population *int `json:"population,omitempty"`
	Surface *float64 `json:"surface,omitempty"`
}

// CountryListMatch is the typed request payload for Country.ListTyped.
type CountryListMatch struct {
	Capital *string `json:"capital,omitempty"`
	Currency *string `json:"currency,omitempty"`
	Flag *string `json:"flag,omitempty"`
	Id *int `json:"id,omitempty"`
	Languages *[]any `json:"languages,omitempty"`
	Name *string `json:"name,omitempty"`
	Population *int `json:"population,omitempty"`
	Surface *float64 `json:"surface,omitempty"`
}

// Department is the typed data model for the department entity.
type Department struct {
	CityCapital *string `json:"cityCapital,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Municipalities *int `json:"municipalities,omitempty"`
	Name *string `json:"name,omitempty"`
	Population *int `json:"population,omitempty"`
	RegionId *int `json:"regionId,omitempty"`
	Surface *float64 `json:"surface,omitempty"`
}

// DepartmentLoadMatch is the typed request payload for Department.LoadTyped.
type DepartmentLoadMatch struct {
	Id int `json:"id"`
}

// DepartmentListMatch is the typed request payload for Department.ListTyped.
type DepartmentListMatch struct {
	CityCapital *string `json:"cityCapital,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Municipalities *int `json:"municipalities,omitempty"`
	Name *string `json:"name,omitempty"`
	Population *int `json:"population,omitempty"`
	RegionId *int `json:"regionId,omitempty"`
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

// HolidayListMatch is the typed request payload for Holiday.ListTyped.
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
	ScientificName *string `json:"scientificName,omitempty"`
	UrlImage *string `json:"urlImage,omitempty"`
}

// InvasiveSpecieLoadMatch is the typed request payload for InvasiveSpecie.LoadTyped.
type InvasiveSpecieLoadMatch struct {
	Id int `json:"id"`
}

// InvasiveSpecieListMatch is the typed request payload for InvasiveSpecie.ListTyped.
type InvasiveSpecieListMatch struct {
	Id *int `json:"id,omitempty"`
	Impact *string `json:"impact,omitempty"`
	Manage *string `json:"manage,omitempty"`
	Name *string `json:"name,omitempty"`
	ScientificName *string `json:"scientificName,omitempty"`
	UrlImage *string `json:"urlImage,omitempty"`
}

// Map is the typed data model for the map entity.
type Map struct {
	DepartmentId *int `json:"departmentId,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	UrlImages *[]any `json:"urlImages,omitempty"`
}

// MapListMatch is the typed request payload for Map.ListTyped.
type MapListMatch struct {
	DepartmentId *int `json:"departmentId,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	UrlImages *[]any `json:"urlImages,omitempty"`
}

// NativeCommunity is the typed data model for the native_community entity.
type NativeCommunity struct {
	DepartmentId *int `json:"departmentId,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Population *int `json:"population,omitempty"`
}

// NativeCommunityLoadMatch is the typed request payload for NativeCommunity.LoadTyped.
type NativeCommunityLoadMatch struct {
	Id int `json:"id"`
}

// NativeCommunityListMatch is the typed request payload for NativeCommunity.ListTyped.
type NativeCommunityListMatch struct {
	DepartmentId *int `json:"departmentId,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Population *int `json:"population,omitempty"`
}

// NaturalArea is the typed data model for the natural_area entity.
type NaturalArea struct {
	AreaGroupId *int `json:"areaGroupId,omitempty"`
	CategoryNaturalAreaId *int `json:"categoryNaturalAreaId,omitempty"`
	DepartmentId *int `json:"departmentId,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	LandArea *float64 `json:"landArea,omitempty"`
	MaritimeArea *float64 `json:"maritimeArea,omitempty"`
	Name *string `json:"name,omitempty"`
}

// NaturalAreaLoadMatch is the typed request payload for NaturalArea.LoadTyped.
type NaturalAreaLoadMatch struct {
	Id int `json:"id"`
}

// NaturalAreaListMatch is the typed request payload for NaturalArea.ListTyped.
type NaturalAreaListMatch struct {
	AreaGroupId *int `json:"areaGroupId,omitempty"`
	CategoryNaturalAreaId *int `json:"categoryNaturalAreaId,omitempty"`
	DepartmentId *int `json:"departmentId,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	LandArea *float64 `json:"landArea,omitempty"`
	MaritimeArea *float64 `json:"maritimeArea,omitempty"`
	Name *string `json:"name,omitempty"`
}

// President is the typed data model for the president entity.
type President struct {
	Description *string `json:"description,omitempty"`
	EndPeriodDate *string `json:"endPeriodDate,omitempty"`
	Id *int `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	Name *string `json:"name,omitempty"`
	PoliticalParty *string `json:"politicalParty,omitempty"`
	StartPeriodDate *string `json:"startPeriodDate,omitempty"`
}

// PresidentLoadMatch is the typed request payload for President.LoadTyped.
type PresidentLoadMatch struct {
	Id int `json:"id"`
}

// PresidentListMatch is the typed request payload for President.ListTyped.
type PresidentListMatch struct {
	Description *string `json:"description,omitempty"`
	EndPeriodDate *string `json:"endPeriodDate,omitempty"`
	Id *int `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	Name *string `json:"name,omitempty"`
	PoliticalParty *string `json:"politicalParty,omitempty"`
	StartPeriodDate *string `json:"startPeriodDate,omitempty"`
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

// RadioListMatch is the typed request payload for Radio.ListTyped.
type RadioListMatch struct {
	Band *string `json:"band,omitempty"`
	Frequency *string `json:"frequency,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Region is the typed data model for the region entity.
type Region struct {
	Departments *[]any `json:"departments,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
}

// RegionLoadMatch is the typed request payload for Region.LoadTyped.
type RegionLoadMatch struct {
	Id int `json:"id"`
}

// RegionListMatch is the typed request payload for Region.ListTyped.
type RegionListMatch struct {
	Departments *[]any `json:"departments,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
}

// TouristicAttraction is the typed data model for the touristic_attraction entity.
type TouristicAttraction struct {
	City *string `json:"city,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Images *[]any `json:"images,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Name *string `json:"name,omitempty"`
}

// TouristicAttractionLoadMatch is the typed request payload for TouristicAttraction.LoadTyped.
type TouristicAttractionLoadMatch struct {
	Id int `json:"id"`
}

// TouristicAttractionListMatch is the typed request payload for TouristicAttraction.ListTyped.
type TouristicAttractionListMatch struct {
	City *string `json:"city,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Images *[]any `json:"images,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Name *string `json:"name,omitempty"`
}

// TypicalDish is the typed data model for the typical_dish entity.
type TypicalDish struct {
	DepartmentId *int `json:"departmentId,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Ingredients *[]any `json:"ingredients,omitempty"`
	Name *string `json:"name,omitempty"`
	UrlImage *string `json:"urlImage,omitempty"`
}

// TypicalDishLoadMatch is the typed request payload for TypicalDish.LoadTyped.
type TypicalDishLoadMatch struct {
	Id int `json:"id"`
}

// TypicalDishListMatch is the typed request payload for TypicalDish.ListTyped.
type TypicalDishListMatch struct {
	DepartmentId *int `json:"departmentId,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Ingredients *[]any `json:"ingredients,omitempty"`
	Name *string `json:"name,omitempty"`
	UrlImage *string `json:"urlImage,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
