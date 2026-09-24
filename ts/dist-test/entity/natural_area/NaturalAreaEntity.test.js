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
(0, node_test_1.describe)('NaturalAreaEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COLOMBIA_PUBLIC_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COLOMBIA_PUBLIC_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ColombiaPublicSDK.test();
        const ent = testsdk.NaturalArea();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COLOMBIA_PUBLIC_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'natural_area.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "areaGroupId": { "a": true, "h": "Area Group Id", "n": "areaGroupId", "r": false, "sh": "Area group ID", "t": "`$INTEGER`", "key$": "areaGroupId", "index$": 0 }, "categoryNaturalAreaId": { "a": true, "h": "Category Natural Area Id", "n": "categoryNaturalAreaId", "r": false, "sh": "Category ID", "t": "`$INTEGER`", "key$": "categoryNaturalAreaId", "index$": 1 }, "departmentId": { "a": true, "h": "Department Id", "n": "departmentId", "r": false, "sh": "Department ID", "t": "`$INTEGER`", "key$": "departmentId", "index$": 2 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Natural area description", "t": "`$STRING`", "key$": "description", "index$": 3 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Natural area ID", "t": "`$INTEGER`", "key$": "id", "index$": 4 }, "landArea": { "a": true, "h": "Land Area", "n": "landArea", "r": false, "sh": "Land area in hectares", "t": "`$NUMBER`", "key$": "landArea", "index$": 5 }, "maritimeArea": { "a": true, "h": "Maritime Area", "n": "maritimeArea", "r": false, "sh": "Maritime area in hectares", "t": "`$NUMBER`", "key$": "maritimeArea", "index$": 6 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Natural area name", "t": "`$STRING`", "key$": "name", "index$": 7 } }, "id": { "field": "id", "name": "id" }, "name": "natural_area", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /NaturalArea", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/NaturalArea", "q": {}, "r": {}, "s": [{ "lit": "NaturalArea" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /NaturalArea/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/NaturalArea/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "NaturalArea" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "natural_area", "name__orig": "natural_area", "Name": "NaturalArea", "name_": "natural_area", "name-": "natural-area", "NAME": "NATURAL_AREA", "index$": 9 }, { "active": true, "entity": "natural_area", "key$": "BasicNaturalAreaFlow", "kind": "basic", "name": "BasicNaturalAreaFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "natural_area_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "natural_area_ref01", "srcdatavar": "natural_area_ref01_data", "suffix": "_dt0" }, "m": { "id": "natural_area01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-natural_area_ref01" } }], "index$": 1 }] }, 'NaturalArea', { "GET /NaturalArea": { "protocol": "http", "operationId": "getNaturalAreas", "responses": { "200": { "description": "Successful response with list of natural areas", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "id": { "type": "integer", "description": "Natural area ID", "key$": "id" }, "name": { "type": "string", "description": "Natural area name", "key$": "name" }, "description": { "type": "string", "description": "Natural area description", "key$": "description" }, "departmentId": { "type": "integer", "description": "Department ID", "key$": "departmentId" }, "categoryNaturalAreaId": { "type": "integer", "description": "Category ID", "key$": "categoryNaturalAreaId" }, "areaGroupId": { "type": "integer", "description": "Area group ID", "key$": "areaGroupId" }, "landArea": { "type": "number", "description": "Land area in hectares", "key$": "landArea" }, "maritimeArea": { "type": "number", "description": "Maritime area in hectares", "key$": "maritimeArea" } }, "x-ref": "#/components/schemas/NaturalArea", "index$": 0 } } } } }, "500": { "description": "Internal server error" } }, "parameters": [], "security": [], "securitySource": "definition", "securitySchemes": {} }, "GET /NaturalArea/{id}": { "protocol": "http", "operationId": "getNaturalAreaById", "responses": { "200": { "description": "Successful response with natural area information", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "type": "integer", "description": "Natural area ID", "key$": "id" }, "name": { "type": "string", "description": "Natural area name", "key$": "name" }, "description": { "type": "string", "description": "Natural area description", "key$": "description" }, "departmentId": { "type": "integer", "description": "Department ID", "key$": "departmentId" }, "categoryNaturalAreaId": { "type": "integer", "description": "Category ID", "key$": "categoryNaturalAreaId" }, "areaGroupId": { "type": "integer", "description": "Area group ID", "key$": "areaGroupId" }, "landArea": { "type": "number", "description": "Land area in hectares", "key$": "landArea" }, "maritimeArea": { "type": "number", "description": "Maritime area in hectares", "key$": "maritimeArea" } }, "x-ref": "#/components/schemas/NaturalArea", "index$": 0 } } } }, "404": { "description": "Natural area not found" }, "500": { "description": "Internal server error" } }, "parameters": [{ "name": "id", "in": "path", "required": true, "description": "Natural area ID", "schema": { "type": "integer" }, "index$": 0 }], "security": [], "securitySource": "definition", "securitySchemes": {} } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let natural_area_ref01_data = Object.values(setup.data.existing.natural_area)[0];
        // LIST
        const natural_area_ref01_ent = client.NaturalArea();
        const natural_area_ref01_match = {};
        const natural_area_ref01_list = (await natural_area_ref01_ent.list(natural_area_ref01_match)).map((e) => e.data());
        // LOAD
        const natural_area_ref01_match_dt0 = {};
        natural_area_ref01_match_dt0.id = natural_area_ref01_data.id;
        const natural_area_ref01_data_dt0 = (await natural_area_ref01_ent.load(natural_area_ref01_match_dt0)).data();
        (0, node_assert_1.default)(natural_area_ref01_data_dt0.id === natural_area_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/natural_area/NaturalAreaTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ColombiaPublicSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['natural_area01', 'natural_area02', 'natural_area03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COLOMBIA_PUBLIC_TEST_NATURAL_AREA_ENTID': idmap,
        'COLOMBIA_PUBLIC_TEST_LIVE': 'FALSE',
        'COLOMBIA_PUBLIC_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['COLOMBIA_PUBLIC_TEST_NATURAL_AREA_ENTID'];
    const live = 'TRUE' === env.COLOMBIA_PUBLIC_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COLOMBIA_PUBLIC_TEST_NATURAL_AREA_ENTID'];
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
//# sourceMappingURL=NaturalAreaEntity.test.js.map