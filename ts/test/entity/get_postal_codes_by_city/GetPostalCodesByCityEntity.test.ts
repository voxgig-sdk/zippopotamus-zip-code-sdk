

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ZippopotamusZipCodeSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('GetPostalCodesByCityEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ZIPPOPOTAMUS_ZIP_CODE_TEST_LIVE=TRUE.
  afterEach(liveDelay('ZIPPOPOTAMUS_ZIP_CODE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ZippopotamusZipCodeSDK.test()
    const ent = testsdk.GetPostalCodesByCity()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ZIPPOPOTAMUS_ZIP_CODE_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'get_postal_codes_by_city.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"latitude":{"a":true,"h":"Latitude","n":"latitude","r":false,"sh":"Latitude coordinate","t":"`$STRING`","key$":"latitude","index$":0},"longitude":{"a":true,"h":"Longitude","n":"longitude","r":false,"sh":"Longitude coordinate","t":"`$STRING`","key$":"longitude","index$":1},"placename":{"a":true,"h":"Placename","n":"placename","r":false,"sh":"Name of the place/city","t":"`$STRING`","key$":"placename","index$":2},"postcode":{"a":true,"h":"Postcode","n":"postcode","r":false,"sh":"Postal code for this location","t":"`$STRING`","key$":"postcode","index$":3}},"name":"get_postal_codes_by_city","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /{country}/{state}/{city}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"Beverly Hills","k":"param","n":"city","or":"city","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"US","k":"param","n":"country","or":"country","r":true,"t":"`$STRING`","index$":1},{"a":true,"ex":"CA","k":"param","n":"state","or":"state","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/{country}/{state}/{city}","q":{"exist":["city","country","state"]},"r":{},"s":[{"var":"country"},{"var":"state"},{"var":"city"}],"t":{"req":"`reqdata`","res":"`body.places`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"get_postal_codes_by_city","name__orig":"get_postal_codes_by_city","Name":"GetPostalCodesByCity","name_":"get_postal_codes_by_city","name-":"get-postal-codes-by-city","NAME":"GET_POSTAL_CODES_BY_CITY","index$":1}, {"active":true,"entity":"get_postal_codes_by_city","key$":"BasicGetPostalCodesByCityFlow","kind":"basic","name":"BasicGetPostalCodesByCityFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"city":"city01","country":"country01","state":"state01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"get_postal_codes_by_city_ref01"}}],"index$":0}]}, 'GetPostalCodesByCity', {"GET /{country}/{state}/{city}":{"protocol":"http","operationId":"getPostalCodesByCity","responses":{"200":{"description":"Successful response with postal codes for the city","content":{"application/json":{"schema":{"type":"object","properties":{"country":{"description":"Full country name","key$":"country","type":"string"},"country abbreviation":{"description":"ISO 3166-1 alpha-2 country code","key$":"country abbreviation","type":"string"},"state":{"description":"Full state or province name","key$":"state","type":"string"},"state abbreviation":{"description":"State or province abbreviation","key$":"state abbreviation","type":"string"},"places":{"description":"Array of postal codes for this city","items":{"properties":{"latitude":{"description":"Latitude coordinate","type":"string","key$":"latitude"},"longitude":{"description":"Longitude coordinate","type":"string","key$":"longitude"},"place name":{"description":"Name of the place/city","type":"string","key$":"place name"},"post code":{"description":"Postal code for this location","type":"string","key$":"post code"}},"type":"object","x-ref":"#/components/schemas/CityPlace","index$":0},"key$":"places","type":"array"}},"x-ref":"#/components/schemas/CityResponse"},"example":{"country":"United States","country abbreviation":"US","places":[{"place name":"Beverly Hills","longitude":"-118.4065","post code":"90210","latitude":"34.0901"},{"place name":"Beverly Hills","longitude":"-118.4065","post code":"90211","latitude":"34.0901"}],"state":"California","state abbreviation":"CA"}}}},"404":{"description":"City not found","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"}},"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[{"name":"country","in":"path","description":"ISO 3166-1 alpha-2 country code (e.g., US, GB, DE, FR, CA)","required":true,"schema":{"type":"string","pattern":"^[A-Z]{2}$","example":"US"},"index$":0},{"name":"state","in":"path","description":"State or province name/abbreviation","required":true,"schema":{"type":"string","example":"CA"},"index$":1},{"name":"city","in":"path","description":"City name","required":true,"schema":{"type":"string","example":"Beverly Hills"},"index$":2}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_postal_codes_by_city_ref01_data = Object.values(setup.data.existing.get_postal_codes_by_city)[0] as any

    // LIST
    const get_postal_codes_by_city_ref01_ent = client.GetPostalCodesByCity()
    const get_postal_codes_by_city_ref01_match: any = {}
    get_postal_codes_by_city_ref01_match['city'] = setup.idmap['city01']
    get_postal_codes_by_city_ref01_match['country'] = setup.idmap['country01']
    get_postal_codes_by_city_ref01_match['state'] = setup.idmap['state01']

    const get_postal_codes_by_city_ref01_list = (await get_postal_codes_by_city_ref01_ent.list(get_postal_codes_by_city_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/get_postal_codes_by_city/GetPostalCodesByCityTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = ZippopotamusZipCodeSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['get_postal_codes_by_city01','get_postal_codes_by_city02','get_postal_codes_by_city03','city01','country01','state01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ZIPPOPOTAMUS_ZIP_CODE_TEST_GET_POSTAL_CODES_BY_CITY_ENTID': idmap,
    'ZIPPOPOTAMUS_ZIP_CODE_TEST_LIVE': 'FALSE',
    'ZIPPOPOTAMUS_ZIP_CODE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ZIPPOPOTAMUS_ZIP_CODE_TEST_GET_POSTAL_CODES_BY_CITY_ENTID']

  const live = 'TRUE' === env.ZIPPOPOTAMUS_ZIP_CODE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ZIPPOPOTAMUS_ZIP_CODE_TEST_GET_POSTAL_CODES_BY_CITY_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new ZippopotamusZipCodeSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.ZIPPOPOTAMUS_ZIP_CODE_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
