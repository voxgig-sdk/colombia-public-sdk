package voxgigcolombiapublicsdk

import (
	"github.com/voxgig-sdk/colombia-public-sdk/core"
	"github.com/voxgig-sdk/colombia-public-sdk/entity"
	"github.com/voxgig-sdk/colombia-public-sdk/feature"
	_ "github.com/voxgig-sdk/colombia-public-sdk/utility"
)

// Type aliases preserve external API.
type ColombiaPublicSDK = core.ColombiaPublicSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type ColombiaPublicEntity = core.ColombiaPublicEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type ColombiaPublicError = core.ColombiaPublicError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAirportEntityFunc = func(client *core.ColombiaPublicSDK, entopts map[string]any) core.ColombiaPublicEntity {
		return entity.NewAirportEntity(client, entopts)
	}
	core.NewCategoryNaturalAreaEntityFunc = func(client *core.ColombiaPublicSDK, entopts map[string]any) core.ColombiaPublicEntity {
		return entity.NewCategoryNaturalAreaEntity(client, entopts)
	}
	core.NewConstitutionArticleEntityFunc = func(client *core.ColombiaPublicSDK, entopts map[string]any) core.ColombiaPublicEntity {
		return entity.NewConstitutionArticleEntity(client, entopts)
	}
	core.NewCountryEntityFunc = func(client *core.ColombiaPublicSDK, entopts map[string]any) core.ColombiaPublicEntity {
		return entity.NewCountryEntity(client, entopts)
	}
	core.NewDepartmentEntityFunc = func(client *core.ColombiaPublicSDK, entopts map[string]any) core.ColombiaPublicEntity {
		return entity.NewDepartmentEntity(client, entopts)
	}
	core.NewHolidayEntityFunc = func(client *core.ColombiaPublicSDK, entopts map[string]any) core.ColombiaPublicEntity {
		return entity.NewHolidayEntity(client, entopts)
	}
	core.NewInvasiveSpecieEntityFunc = func(client *core.ColombiaPublicSDK, entopts map[string]any) core.ColombiaPublicEntity {
		return entity.NewInvasiveSpecieEntity(client, entopts)
	}
	core.NewMapEntityFunc = func(client *core.ColombiaPublicSDK, entopts map[string]any) core.ColombiaPublicEntity {
		return entity.NewMapEntity(client, entopts)
	}
	core.NewNativeCommunityEntityFunc = func(client *core.ColombiaPublicSDK, entopts map[string]any) core.ColombiaPublicEntity {
		return entity.NewNativeCommunityEntity(client, entopts)
	}
	core.NewNaturalAreaEntityFunc = func(client *core.ColombiaPublicSDK, entopts map[string]any) core.ColombiaPublicEntity {
		return entity.NewNaturalAreaEntity(client, entopts)
	}
	core.NewPresidentEntityFunc = func(client *core.ColombiaPublicSDK, entopts map[string]any) core.ColombiaPublicEntity {
		return entity.NewPresidentEntity(client, entopts)
	}
	core.NewRadioEntityFunc = func(client *core.ColombiaPublicSDK, entopts map[string]any) core.ColombiaPublicEntity {
		return entity.NewRadioEntity(client, entopts)
	}
	core.NewRegionEntityFunc = func(client *core.ColombiaPublicSDK, entopts map[string]any) core.ColombiaPublicEntity {
		return entity.NewRegionEntity(client, entopts)
	}
	core.NewTouristicAttractionEntityFunc = func(client *core.ColombiaPublicSDK, entopts map[string]any) core.ColombiaPublicEntity {
		return entity.NewTouristicAttractionEntity(client, entopts)
	}
	core.NewTypicalDishEntityFunc = func(client *core.ColombiaPublicSDK, entopts map[string]any) core.ColombiaPublicEntity {
		return entity.NewTypicalDishEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewColombiaPublicSDK = core.NewColombiaPublicSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
