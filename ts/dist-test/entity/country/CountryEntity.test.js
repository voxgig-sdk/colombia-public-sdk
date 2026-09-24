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
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('CountryEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COLOMBIA_PUBLIC_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COLOMBIA_PUBLIC_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ColombiaPublicSDK.test();
        const ent = testsdk.Country();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COLOMBIA_PUBLIC_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'country.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "capital": { "a": true, "h": "Capital", "n": "capital", "r": false, "sh": "Capital city", "t": "`$STRING`", "key$": "capital", "index$": 0 }, "currency": { "a": true, "h": "Currency", "n": "currency", "r": false, "sh": "Currency", "t": "`$STRING`", "key$": "currency", "index$": 1 }, "flag": { "a": true, "h": "Flag", "n": "flag", "r": false, "sh": "URL to flag image", "t": "`$STRING`", "key$": "flag", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Country ID", "t": "`$INTEGER`", "key$": "id", "index$": 3 }, "languages": { "a": true, "h": "Languages", "n": "languages", "r": false, "sh": "Official languages", "t": "`$ARRAY`", "key$": "languages", "index$": 4 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Country name", "t": "`$STRING`", "key$": "name", "index$": 5 }, "population": { "a": true, "h": "Population", "n": "population", "r": false, "sh": "Total population", "t": "`$INTEGER`", "key$": "population", "index$": 6 }, "surface": { "a": true, "h": "Surface", "n": "surface", "r": false, "sh": "Surface area in square kilometers", "t": "`$NUMBER`", "key$": "surface", "index$": 7 } }, "id": { "field": "id", "name": "id" }, "name": "country", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /Country/Colombia", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/Country/Colombia", "q": { "$action": "colombia" }, "r": {}, "s": [{ "lit": "Country" }, { "lit": "Colombia" }], "t": { "req": "`reqdata`", "res": "`body.languages`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "country", "name__orig": "country", "Name": "Country", "name_": "country", "name-": "country", "NAME": "COUNTRY", "index$": 3 }, { "active": true, "entity": "country", "key$": "BasicCountryFlow", "kind": "basic", "name": "BasicCountryFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "country_ref01" } }], "index$": 0 }] }, 'Country', { "GET /Country/Colombia": { "protocol": "http", "operationId": "getColombiaInfo", "responses": { "200": { "description": "Successful response with Colombia information", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "description": "Country ID", "key$": "id", "type": "integer" }, "name": { "description": "Country name", "key$": "name", "type": "string" }, "capital": { "description": "Capital city", "key$": "capital", "type": "string" }, "surface": { "description": "Surface area in square kilometers", "key$": "surface", "type": "number" }, "population": { "description": "Total population", "key$": "population", "type": "integer" }, "languages": { "description": "Official languages", "items": { "type": "string" }, "key$": "languages", "type": "array" }, "currency": { "description": "Currency", "key$": "currency", "type": "string" }, "flag": { "description": "URL to flag image", "key$": "flag", "type": "string" } }, "x-ref": "#/components/schemas/Country", "index$": 0 } } } }, "404": { "description": "Country information not found" }, "500": { "description": "Internal server error" } }, "parameters": [], "security": [], "securitySource": "definition", "securitySchemes": {} } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let country_ref01_data = Object.values(setup.data.existing.country)[0];
        // LIST
        const country_ref01_ent = client.Country();
        const country_ref01_match = {};
        const country_ref01_list = (await country_ref01_ent.list(country_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/country/CountryTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ColombiaPublicSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['country01', 'country02', 'country03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COLOMBIA_PUBLIC_TEST_COUNTRY_ENTID': idmap,
        'COLOMBIA_PUBLIC_TEST_LIVE': 'FALSE',
        'COLOMBIA_PUBLIC_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['COLOMBIA_PUBLIC_TEST_COUNTRY_ENTID'];
    const live = 'TRUE' === env.COLOMBIA_PUBLIC_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COLOMBIA_PUBLIC_TEST_COUNTRY_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.ColombiaPublicSDK(merge([
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
        explain: 'TRUE' === env.COLOMBIA_PUBLIC_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=CountryEntity.test.js.map