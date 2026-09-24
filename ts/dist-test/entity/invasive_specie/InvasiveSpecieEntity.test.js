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
(0, node_test_1.describe)('InvasiveSpecieEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COLOMBIA_PUBLIC_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COLOMBIA_PUBLIC_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ColombiaPublicSDK.test();
        const ent = testsdk.InvasiveSpecie();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COLOMBIA_PUBLIC_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'invasive_specie.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Invasive species ID", "t": "`$INTEGER`", "key$": "id", "index$": 0 }, "impact": { "a": true, "h": "Impact", "n": "impact", "r": false, "sh": "Environmental impact", "t": "`$STRING`", "key$": "impact", "index$": 1 }, "manage": { "a": true, "h": "Manage", "n": "manage", "r": false, "sh": "Management strategies", "t": "`$STRING`", "key$": "manage", "index$": 2 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Species name", "t": "`$STRING`", "key$": "name", "index$": 3 }, "scientificName": { "a": true, "h": "Scientific Name", "n": "scientificName", "r": false, "sh": "Scientific name", "t": "`$STRING`", "key$": "scientificName", "index$": 4 }, "urlImage": { "a": true, "h": "Url Image", "n": "urlImage", "r": false, "sh": "URL to species image", "t": "`$STRING`", "key$": "urlImage", "index$": 5 } }, "id": { "field": "id", "name": "id" }, "name": "invasive_specie", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /InvasiveSpecie", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/InvasiveSpecie", "q": {}, "r": {}, "s": [{ "lit": "InvasiveSpecie" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /InvasiveSpecie/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/InvasiveSpecie/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "InvasiveSpecie" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "invasive_specie", "name__orig": "invasive_specie", "Name": "InvasiveSpecie", "name_": "invasive_specie", "name-": "invasive-specie", "NAME": "INVASIVE_SPECIE", "index$": 6 }, { "active": true, "entity": "invasive_specie", "key$": "BasicInvasiveSpecieFlow", "kind": "basic", "name": "BasicInvasiveSpecieFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "invasive_specie_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "invasive_specie_ref01", "srcdatavar": "invasive_specie_ref01_data", "suffix": "_dt0" }, "m": { "id": "invasive_specie01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-invasive_specie_ref01" } }], "index$": 1 }] }, 'InvasiveSpecie', { "GET /InvasiveSpecie": { "protocol": "http", "operationId": "getInvasiveSpecies", "responses": { "200": { "description": "Successful response with list of invasive species", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "id": { "type": "integer", "description": "Invasive species ID", "key$": "id" }, "name": { "type": "string", "description": "Species name", "key$": "name" }, "scientificName": { "type": "string", "description": "Scientific name", "key$": "scientificName" }, "impact": { "type": "string", "description": "Environmental impact", "key$": "impact" }, "manage": { "type": "string", "description": "Management strategies", "key$": "manage" }, "urlImage": { "type": "string", "description": "URL to species image", "key$": "urlImage" } }, "x-ref": "#/components/schemas/InvasiveSpecie", "index$": 0 } } } } }, "500": { "description": "Internal server error" } }, "parameters": [], "security": [], "securitySource": "definition", "securitySchemes": {} }, "GET /InvasiveSpecie/{id}": { "protocol": "http", "operationId": "getInvasiveSpecieById", "responses": { "200": { "description": "Successful response with invasive species information", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "type": "integer", "description": "Invasive species ID", "key$": "id" }, "name": { "type": "string", "description": "Species name", "key$": "name" }, "scientificName": { "type": "string", "description": "Scientific name", "key$": "scientificName" }, "impact": { "type": "string", "description": "Environmental impact", "key$": "impact" }, "manage": { "type": "string", "description": "Management strategies", "key$": "manage" }, "urlImage": { "type": "string", "description": "URL to species image", "key$": "urlImage" } }, "x-ref": "#/components/schemas/InvasiveSpecie", "index$": 0 } } } }, "404": { "description": "Invasive species not found" }, "500": { "description": "Internal server error" } }, "parameters": [{ "name": "id", "in": "path", "required": true, "description": "Invasive species ID", "schema": { "type": "integer" }, "index$": 0 }], "security": [], "securitySource": "definition", "securitySchemes": {} } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let invasive_specie_ref01_data = Object.values(setup.data.existing.invasive_specie)[0];
        // LIST
        const invasive_specie_ref01_ent = client.InvasiveSpecie();
        const invasive_specie_ref01_match = {};
        const invasive_specie_ref01_list = (await invasive_specie_ref01_ent.list(invasive_specie_ref01_match)).map((e) => e.data());
        // LOAD
        const invasive_specie_ref01_match_dt0 = {};
        invasive_specie_ref01_match_dt0.id = invasive_specie_ref01_data.id;
        const invasive_specie_ref01_data_dt0 = (await invasive_specie_ref01_ent.load(invasive_specie_ref01_match_dt0)).data();
        (0, node_assert_1.default)(invasive_specie_ref01_data_dt0.id === invasive_specie_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/invasive_specie/InvasiveSpecieTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ColombiaPublicSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['invasive_specie01', 'invasive_specie02', 'invasive_specie03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COLOMBIA_PUBLIC_TEST_INVASIVE_SPECIE_ENTID': idmap,
        'COLOMBIA_PUBLIC_TEST_LIVE': 'FALSE',
        'COLOMBIA_PUBLIC_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['COLOMBIA_PUBLIC_TEST_INVASIVE_SPECIE_ENTID'];
    const live = 'TRUE' === env.COLOMBIA_PUBLIC_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COLOMBIA_PUBLIC_TEST_INVASIVE_SPECIE_ENTID'];
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
//# sourceMappingURL=InvasiveSpecieEntity.test.js.map