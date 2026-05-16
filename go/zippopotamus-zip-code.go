package voxgigzippopotamuszipcodesdk

import (
	"github.com/voxgig-sdk/zippopotamus-zip-code-sdk/core"
	"github.com/voxgig-sdk/zippopotamus-zip-code-sdk/entity"
	"github.com/voxgig-sdk/zippopotamus-zip-code-sdk/feature"
	_ "github.com/voxgig-sdk/zippopotamus-zip-code-sdk/utility"
)

// Type aliases preserve external API.
type ZippopotamusZipCodeSDK = core.ZippopotamusZipCodeSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type ZippopotamusZipCodeEntity = core.ZippopotamusZipCodeEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type ZippopotamusZipCodeError = core.ZippopotamusZipCodeError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewGetLocationByPostalCodeEntityFunc = func(client *core.ZippopotamusZipCodeSDK, entopts map[string]any) core.ZippopotamusZipCodeEntity {
		return entity.NewGetLocationByPostalCodeEntity(client, entopts)
	}
	core.NewGetPostalCodesByCityEntityFunc = func(client *core.ZippopotamusZipCodeSDK, entopts map[string]any) core.ZippopotamusZipCodeEntity {
		return entity.NewGetPostalCodesByCityEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewZippopotamusZipCodeSDK = core.NewZippopotamusZipCodeSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
