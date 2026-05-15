package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAirportEntityFunc func(client *ColombiaPublicSDK, entopts map[string]any) ColombiaPublicEntity

var NewCategoryNaturalAreaEntityFunc func(client *ColombiaPublicSDK, entopts map[string]any) ColombiaPublicEntity

var NewConstitutionArticleEntityFunc func(client *ColombiaPublicSDK, entopts map[string]any) ColombiaPublicEntity

var NewCountryEntityFunc func(client *ColombiaPublicSDK, entopts map[string]any) ColombiaPublicEntity

var NewDepartmentEntityFunc func(client *ColombiaPublicSDK, entopts map[string]any) ColombiaPublicEntity

var NewHolidayEntityFunc func(client *ColombiaPublicSDK, entopts map[string]any) ColombiaPublicEntity

var NewInvasiveSpecieEntityFunc func(client *ColombiaPublicSDK, entopts map[string]any) ColombiaPublicEntity

var NewMapEntityFunc func(client *ColombiaPublicSDK, entopts map[string]any) ColombiaPublicEntity

var NewNativeCommunityEntityFunc func(client *ColombiaPublicSDK, entopts map[string]any) ColombiaPublicEntity

var NewNaturalAreaEntityFunc func(client *ColombiaPublicSDK, entopts map[string]any) ColombiaPublicEntity

var NewPresidentEntityFunc func(client *ColombiaPublicSDK, entopts map[string]any) ColombiaPublicEntity

var NewRadioEntityFunc func(client *ColombiaPublicSDK, entopts map[string]any) ColombiaPublicEntity

var NewRegionEntityFunc func(client *ColombiaPublicSDK, entopts map[string]any) ColombiaPublicEntity

var NewTouristicAttractionEntityFunc func(client *ColombiaPublicSDK, entopts map[string]any) ColombiaPublicEntity

var NewTypicalDishEntityFunc func(client *ColombiaPublicSDK, entopts map[string]any) ColombiaPublicEntity

