package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewGetLocationByPostalCodeEntityFunc func(client *ZippopotamusZipCodeSDK, entopts map[string]any) ZippopotamusZipCodeEntity

var NewGetPostalCodesByCityEntityFunc func(client *ZippopotamusZipCodeSDK, entopts map[string]any) ZippopotamusZipCodeEntity

