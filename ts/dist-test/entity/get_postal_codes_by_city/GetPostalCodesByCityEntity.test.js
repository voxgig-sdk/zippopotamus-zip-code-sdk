"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('GetPostalCodesByCityEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ZIPPOPOTAMUS_ZIP_CODE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ZIPPOPOTAMUS_ZIP_CODE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ZippopotamusZipCodeSDK.test();
        const ent = testsdk.GetPostalCodesByCity();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ZIPPOPOTAMUS_ZIP_CODE_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'get_postal_codes_by_city.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "latitude", "req": false, "short": "Latitude coordinate", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "longitude", "req": false, "short": "Longitude coordinate", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "placename", "req": false, "short": "Name of the place/city", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "postcode", "req": false, "short": "Postal code for this location", "type": "`$STRING`", "index$": 3 }], "name": "get_postal_codes_by_city", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "Beverly Hills", "kind": "param", "name": "city", "orig": "city", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": "US", "kind": "param", "name": "country", "orig": "country", "reqd": true, "type": "`$STRING`", "index$": 1 }, { "active": true, "example": "CA", "kind": "param", "name": "state", "orig": "state", "reqd": true, "type": "`$STRING`", "index$": 2 }] }, "contract": { "id": "GET /{country}/{state}/{city}", "json": "{\"operationId\":\"getPostalCodesByCity\",\"parameters\":[{\"description\":\"ISO 3166-1 alpha-2 country code (e.g., US, GB, DE, FR, CA)\",\"in\":\"path\",\"name\":\"country\",\"required\":true,\"schema\":{\"example\":\"US\",\"pattern\":\"^[A-Z]{2}$\",\"type\":\"string\"}},{\"description\":\"State or province name/abbreviation\",\"in\":\"path\",\"name\":\"state\",\"required\":true,\"schema\":{\"example\":\"CA\",\"type\":\"string\"}},{\"description\":\"City name\",\"in\":\"path\",\"name\":\"city\",\"required\":true,\"schema\":{\"example\":\"Beverly Hills\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"country\":\"United States\",\"country abbreviation\":\"US\",\"places\":[{\"latitude\":\"34.0901\",\"longitude\":\"-118.4065\",\"place name\":\"Beverly Hills\",\"post code\":\"90210\"},{\"latitude\":\"34.0901\",\"longitude\":\"-118.4065\",\"place name\":\"Beverly Hills\",\"post code\":\"90211\"}],\"state\":\"California\",\"state abbreviation\":\"CA\"},\"schema\":{\"properties\":{\"country\":{\"description\":\"Full country name\",\"type\":\"string\"},\"country abbreviation\":{\"description\":\"ISO 3166-1 alpha-2 country code\",\"type\":\"string\"},\"places\":{\"description\":\"Array of postal codes for this city\",\"items\":{\"properties\":{\"latitude\":{\"description\":\"Latitude coordinate\",\"type\":\"string\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"type\":\"string\"},\"place name\":{\"description\":\"Name of the place/city\",\"type\":\"string\"},\"post code\":{\"description\":\"Postal code for this location\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"state\":{\"description\":\"Full state or province name\",\"type\":\"string\"},\"state abbreviation\":{\"description\":\"State or province abbreviation\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with postal codes for the city\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"City not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/{country}/{state}/{city}", "segments": [{ "var": "country" }, { "var": "state" }, { "var": "city" }], "select": { "exist": ["city", "country", "state"] }, "transform": { "req": "`reqdata`", "res": "`body.places`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "get_postal_codes_by_city", "name__orig": "get_postal_codes_by_city", "Name": "GetPostalCodesByCity", "name_": "get_postal_codes_by_city", "name-": "get-postal-codes-by-city", "NAME": "GET_POSTAL_CODES_BY_CITY", "index$": 1 }, { "active": true, "entity": "get_postal_codes_by_city", "key$": "BasicGetPostalCodesByCityFlow", "kind": "basic", "name": "BasicGetPostalCodesByCityFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": { "city": "city01", "country": "country01", "state": "state01" }, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "get_postal_codes_by_city_ref01" } }], "index$": 0 }] }, 'GetPostalCodesByCity');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let get_postal_codes_by_city_ref01_data = Object.values(setup.data.existing.get_postal_codes_by_city)[0];
        // LIST
        const get_postal_codes_by_city_ref01_ent = client.GetPostalCodesByCity();
        const get_postal_codes_by_city_ref01_match = {};
        get_postal_codes_by_city_ref01_match['city'] = setup.idmap['city01'];
        get_postal_codes_by_city_ref01_match['country'] = setup.idmap['country01'];
        get_postal_codes_by_city_ref01_match['state'] = setup.idmap['state01'];
        const get_postal_codes_by_city_ref01_list = (await get_postal_codes_by_city_ref01_ent.list(get_postal_codes_by_city_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/get_postal_codes_by_city/GetPostalCodesByCityTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ZippopotamusZipCodeSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['get_postal_codes_by_city01', 'get_postal_codes_by_city02', 'get_postal_codes_by_city03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ZIPPOPOTAMUS_ZIP_CODE_TEST_GET_POSTAL_CODES_BY_CITY_ENTID': idmap,
        'ZIPPOPOTAMUS_ZIP_CODE_TEST_LIVE': 'FALSE',
        'ZIPPOPOTAMUS_ZIP_CODE_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['ZIPPOPOTAMUS_ZIP_CODE_TEST_GET_POSTAL_CODES_BY_CITY_ENTID'];
    const live = 'TRUE' === env.ZIPPOPOTAMUS_ZIP_CODE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ZIPPOPOTAMUS_ZIP_CODE_TEST_GET_POSTAL_CODES_BY_CITY_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.ZippopotamusZipCodeSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=GetPostalCodesByCityEntity.test.js.map