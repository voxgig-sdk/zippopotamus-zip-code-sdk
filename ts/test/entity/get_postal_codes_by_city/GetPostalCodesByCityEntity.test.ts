

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"latitude","req":false,"short":"Latitude coordinate","type":"`$STRING`","index$":0},{"active":true,"name":"longitude","req":false,"short":"Longitude coordinate","type":"`$STRING`","index$":1},{"active":true,"name":"placename","req":false,"short":"Name of the place/city","type":"`$STRING`","index$":2},{"active":true,"name":"postcode","req":false,"short":"Postal code for this location","type":"`$STRING`","index$":3}],"name":"get_postal_codes_by_city","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"example":"Beverly Hills","kind":"param","name":"city","orig":"city","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"example":"US","kind":"param","name":"country","orig":"country","reqd":true,"type":"`$STRING`","index$":1},{"active":true,"example":"CA","kind":"param","name":"state","orig":"state","reqd":true,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /{country}/{state}/{city}","json":"{\"operationId\":\"getPostalCodesByCity\",\"parameters\":[{\"description\":\"ISO 3166-1 alpha-2 country code (e.g., US, GB, DE, FR, CA)\",\"in\":\"path\",\"name\":\"country\",\"required\":true,\"schema\":{\"example\":\"US\",\"pattern\":\"^[A-Z]{2}$\",\"type\":\"string\"}},{\"description\":\"State or province name/abbreviation\",\"in\":\"path\",\"name\":\"state\",\"required\":true,\"schema\":{\"example\":\"CA\",\"type\":\"string\"}},{\"description\":\"City name\",\"in\":\"path\",\"name\":\"city\",\"required\":true,\"schema\":{\"example\":\"Beverly Hills\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"country\":\"United States\",\"country abbreviation\":\"US\",\"places\":[{\"latitude\":\"34.0901\",\"longitude\":\"-118.4065\",\"place name\":\"Beverly Hills\",\"post code\":\"90210\"},{\"latitude\":\"34.0901\",\"longitude\":\"-118.4065\",\"place name\":\"Beverly Hills\",\"post code\":\"90211\"}],\"state\":\"California\",\"state abbreviation\":\"CA\"},\"schema\":{\"properties\":{\"country\":{\"description\":\"Full country name\",\"type\":\"string\"},\"country abbreviation\":{\"description\":\"ISO 3166-1 alpha-2 country code\",\"type\":\"string\"},\"places\":{\"description\":\"Array of postal codes for this city\",\"items\":{\"properties\":{\"latitude\":{\"description\":\"Latitude coordinate\",\"type\":\"string\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"type\":\"string\"},\"place name\":{\"description\":\"Name of the place/city\",\"type\":\"string\"},\"post code\":{\"description\":\"Postal code for this location\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"state\":{\"description\":\"Full state or province name\",\"type\":\"string\"},\"state abbreviation\":{\"description\":\"State or province abbreviation\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with postal codes for the city\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"City not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/{country}/{state}/{city}","segments":[{"var":"country"},{"var":"state"},{"var":"city"}],"select":{"exist":["city","country","state"]},"transform":{"req":"`reqdata`","res":"`body.places`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"get_postal_codes_by_city","name__orig":"get_postal_codes_by_city","Name":"GetPostalCodesByCity","name_":"get_postal_codes_by_city","name-":"get-postal-codes-by-city","NAME":"GET_POSTAL_CODES_BY_CITY","index$":1}, {"active":true,"entity":"get_postal_codes_by_city","key$":"BasicGetPostalCodesByCityFlow","kind":"basic","name":"BasicGetPostalCodesByCityFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{"city":"city01","country":"country01","state":"state01"},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"get_postal_codes_by_city_ref01"}}],"index$":0}]}, 'GetPostalCodesByCity')
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
    ['get_postal_codes_by_city01','get_postal_codes_by_city02','get_postal_codes_by_city03'],
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
  
