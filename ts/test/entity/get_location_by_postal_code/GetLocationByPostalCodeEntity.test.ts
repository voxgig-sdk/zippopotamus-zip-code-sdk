

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"latitude","req":false,"short":"Latitude coordinate","type":"`$STRING`","index$":0},{"active":true,"name":"longitude","req":false,"short":"Longitude coordinate","type":"`$STRING`","index$":1},{"active":true,"name":"placename","req":false,"short":"Name of the place/city","type":"`$STRING`","index$":2},{"active":true,"name":"state","req":false,"short":"Full state or province name","type":"`$STRING`","index$":3},{"active":true,"name":"stateabbreviation","req":false,"short":"State or province abbreviation","type":"`$STRING`","index$":4}],"name":"get_location_by_postal_code","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"example":"US","kind":"param","name":"country","orig":"country","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"example":"90210","kind":"param","name":"postal_code","orig":"postal_code","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /{country}/{postal-code}","json":"{\"operationId\":\"getLocationByPostalCode\",\"parameters\":[{\"description\":\"ISO 3166-1 alpha-2 country code (e.g., US, GB, DE, FR, CA)\",\"in\":\"path\",\"name\":\"country\",\"required\":true,\"schema\":{\"example\":\"US\",\"pattern\":\"^[A-Z]{2}$\",\"type\":\"string\"}},{\"description\":\"Postal code or zip code to query\",\"in\":\"path\",\"name\":\"postal-code\",\"required\":true,\"schema\":{\"example\":\"90210\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"country\":\"United States\",\"country abbreviation\":\"US\",\"places\":[{\"latitude\":\"34.0901\",\"longitude\":\"-118.4065\",\"place name\":\"Beverly Hills\",\"state\":\"California\",\"state abbreviation\":\"CA\"}],\"post code\":\"90210\"},\"schema\":{\"properties\":{\"country\":{\"description\":\"Full country name\",\"type\":\"string\"},\"country abbreviation\":{\"description\":\"ISO 3166-1 alpha-2 country code\",\"type\":\"string\"},\"places\":{\"description\":\"Array of places associated with this postal code\",\"items\":{\"properties\":{\"latitude\":{\"description\":\"Latitude coordinate\",\"type\":\"string\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"type\":\"string\"},\"place name\":{\"description\":\"Name of the place/city\",\"type\":\"string\"},\"state\":{\"description\":\"Full state or province name\",\"type\":\"string\"},\"state abbreviation\":{\"description\":\"State or province abbreviation\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"post code\":{\"description\":\"The postal code that was queried\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with location data\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Postal code not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/{country}/{postal-code}","rename":{"param":{"postal-code":"postal_code"}},"segments":[{"var":"country"},{"var":"postal_code"}],"select":{"exist":["country","postal_code"]},"transform":{"req":"`reqdata`","res":"`body.places`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"get_location_by_postal_code","name__orig":"get_location_by_postal_code","Name":"GetLocationByPostalCode","name_":"get_location_by_postal_code","name-":"get-location-by-postal-code","NAME":"GET_LOCATION_BY_POSTAL_CODE","index$":0}, {"active":true,"entity":"get_location_by_postal_code","key$":"BasicGetLocationByPostalCodeFlow","kind":"basic","name":"BasicGetLocationByPostalCodeFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{"country":"country01","postal_code":"postal_code01"},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"get_location_by_postal_code_ref01"}}],"index$":0}]}, 'GetLocationByPostalCode')
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
    ['get_location_by_postal_code01','get_location_by_postal_code02','get_location_by_postal_code03'],
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
  
