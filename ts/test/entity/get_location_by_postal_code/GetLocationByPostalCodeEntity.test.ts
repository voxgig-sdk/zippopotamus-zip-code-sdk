

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


describe('GetLocationByPostalCodeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ZIPPOPOTAMUS_ZIP_CODE_TEST_LIVE=TRUE.
  afterEach(liveDelay('ZIPPOPOTAMUS_ZIP_CODE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ZippopotamusZipCodeSDK.test()
    const ent = testsdk.GetLocationByPostalCode()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ZIPPOPOTAMUS_ZIP_CODE_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'get_location_by_postal_code.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"latitude":{"a":true,"h":"Latitude","n":"latitude","r":false,"sh":"Latitude coordinate","t":"`$STRING`","key$":"latitude","index$":0},"longitude":{"a":true,"h":"Longitude","n":"longitude","r":false,"sh":"Longitude coordinate","t":"`$STRING`","key$":"longitude","index$":1},"placename":{"a":true,"h":"Placename","n":"placename","r":false,"sh":"Name of the place/city","t":"`$STRING`","key$":"placename","index$":2},"state":{"a":true,"h":"State","n":"state","r":false,"sh":"Full state or province name","t":"`$STRING`","key$":"state","index$":3},"stateabbreviation":{"a":true,"h":"Stateabbreviation","n":"stateabbreviation","r":false,"sh":"State or province abbreviation","t":"`$STRING`","key$":"stateabbreviation","index$":4}},"name":"get_location_by_postal_code","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /{country}/{postal-code}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"US","k":"param","n":"country","or":"country","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"90210","k":"param","n":"postal_code","or":"postal_code","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/{country}/{postal-code}","q":{"exist":["country","postal_code"]},"r":{"param":{"postal-code":"postal_code"}},"s":[{"var":"country"},{"var":"postal_code"}],"t":{"req":"`reqdata`","res":"`body.places`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"get_location_by_postal_code","name__orig":"get_location_by_postal_code","Name":"GetLocationByPostalCode","name_":"get_location_by_postal_code","name-":"get-location-by-postal-code","NAME":"GET_LOCATION_BY_POSTAL_CODE","index$":0}, {"active":true,"entity":"get_location_by_postal_code","key$":"BasicGetLocationByPostalCodeFlow","kind":"basic","name":"BasicGetLocationByPostalCodeFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"country":"country01","postal_code":"postal_code01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"get_location_by_postal_code_ref01"}}],"index$":0}]}, 'GetLocationByPostalCode', {"GET /{country}/{postal-code}":{"protocol":"http","operationId":"getLocationByPostalCode","responses":{"200":{"description":"Successful response with location data","content":{"application/json":{"schema":{"type":"object","properties":{"post code":{"description":"The postal code that was queried","key$":"post code","type":"string"},"country":{"description":"Full country name","key$":"country","type":"string"},"country abbreviation":{"description":"ISO 3166-1 alpha-2 country code","key$":"country abbreviation","type":"string"},"places":{"description":"Array of places associated with this postal code","items":{"properties":{"latitude":{"description":"Latitude coordinate","type":"string","key$":"latitude"},"longitude":{"description":"Longitude coordinate","type":"string","key$":"longitude"},"place name":{"description":"Name of the place/city","type":"string","key$":"place name"},"state":{"description":"Full state or province name","type":"string","key$":"state"},"state abbreviation":{"description":"State or province abbreviation","type":"string","key$":"state abbreviation"}},"type":"object","x-ref":"#/components/schemas/Place","index$":0},"key$":"places","type":"array"}},"x-ref":"#/components/schemas/LocationResponse"},"example":{"post code":"90210","country":"United States","country abbreviation":"US","places":[{"place name":"Beverly Hills","longitude":"-118.4065","state":"California","state abbreviation":"CA","latitude":"34.0901"}]}}}},"404":{"description":"Postal code not found","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"}},"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[{"name":"country","in":"path","description":"ISO 3166-1 alpha-2 country code (e.g., US, GB, DE, FR, CA)","required":true,"schema":{"type":"string","pattern":"^[A-Z]{2}$","example":"US"},"index$":0},{"name":"postal-code","in":"path","description":"Postal code or zip code to query","required":true,"schema":{"type":"string","example":"90210"},"index$":1}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_location_by_postal_code_ref01_data = Object.values(setup.data.existing.get_location_by_postal_code)[0] as any

    // LIST
    const get_location_by_postal_code_ref01_ent = client.GetLocationByPostalCode()
    const get_location_by_postal_code_ref01_match: any = {}
    get_location_by_postal_code_ref01_match['country'] = setup.idmap['country01']
    get_location_by_postal_code_ref01_match['postal_code'] = setup.idmap['postal_code01']

    const get_location_by_postal_code_ref01_list = (await get_location_by_postal_code_ref01_ent.list(get_location_by_postal_code_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/get_location_by_postal_code/GetLocationByPostalCodeTestData.json')

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
    ['get_location_by_postal_code01','get_location_by_postal_code02','get_location_by_postal_code03','country01','postal_code01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ZIPPOPOTAMUS_ZIP_CODE_TEST_GET_LOCATION_BY_POSTAL_CODE_ENTID': idmap,
    'ZIPPOPOTAMUS_ZIP_CODE_TEST_LIVE': 'FALSE',
    'ZIPPOPOTAMUS_ZIP_CODE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ZIPPOPOTAMUS_ZIP_CODE_TEST_GET_LOCATION_BY_POSTAL_CODE_ENTID']

  const live = 'TRUE' === env.ZIPPOPOTAMUS_ZIP_CODE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ZIPPOPOTAMUS_ZIP_CODE_TEST_GET_LOCATION_BY_POSTAL_CODE_ENTID']
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
  
