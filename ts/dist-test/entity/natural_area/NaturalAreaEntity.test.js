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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "areaGroupId", "req": false, "short": "Area group ID", "type": "`$INTEGER`", "index$": 0 }, { "active": true, "name": "categoryNaturalAreaId", "req": false, "short": "Category ID", "type": "`$INTEGER`", "index$": 1 }, { "active": true, "name": "departmentId", "req": false, "short": "Department ID", "type": "`$INTEGER`", "index$": 2 }, { "active": true, "name": "description", "req": false, "short": "Natural area description", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "id", "req": false, "short": "Natural area ID", "type": "`$INTEGER`", "index$": 4 }, { "active": true, "name": "landArea", "req": false, "short": "Land area in hectares", "type": "`$NUMBER`", "index$": 5 }, { "active": true, "name": "maritimeArea", "req": false, "short": "Maritime area in hectares", "type": "`$NUMBER`", "index$": 6 }, { "active": true, "name": "name", "req": false, "short": "Natural area name", "type": "`$STRING`", "index$": 7 }], "id": { "field": "id", "name": "id" }, "name": "natural_area", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /NaturalArea", "json": "{\"operationId\":\"getNaturalAreas\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"areaGroupId\":{\"description\":\"Area group ID\",\"type\":\"integer\"},\"categoryNaturalAreaId\":{\"description\":\"Category ID\",\"type\":\"integer\"},\"departmentId\":{\"description\":\"Department ID\",\"type\":\"integer\"},\"description\":{\"description\":\"Natural area description\",\"type\":\"string\"},\"id\":{\"description\":\"Natural area ID\",\"type\":\"integer\"},\"landArea\":{\"description\":\"Land area in hectares\",\"type\":\"number\"},\"maritimeArea\":{\"description\":\"Maritime area in hectares\",\"type\":\"number\"},\"name\":{\"description\":\"Natural area name\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with list of natural areas\"},\"500\":{\"description\":\"Internal server error\"}},\"security\":[],\"securitySchemes\":{},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/NaturalArea", "segments": [{ "lit": "NaturalArea" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /NaturalArea/{id}", "json": "{\"operationId\":\"getNaturalAreaById\",\"parameters\":[{\"description\":\"Natural area ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"areaGroupId\":{\"description\":\"Area group ID\",\"type\":\"integer\"},\"categoryNaturalAreaId\":{\"description\":\"Category ID\",\"type\":\"integer\"},\"departmentId\":{\"description\":\"Department ID\",\"type\":\"integer\"},\"description\":{\"description\":\"Natural area description\",\"type\":\"string\"},\"id\":{\"description\":\"Natural area ID\",\"type\":\"integer\"},\"landArea\":{\"description\":\"Land area in hectares\",\"type\":\"number\"},\"maritimeArea\":{\"description\":\"Maritime area in hectares\",\"type\":\"number\"},\"name\":{\"description\":\"Natural area name\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with natural area information\"},\"404\":{\"description\":\"Natural area not found\"},\"500\":{\"description\":\"Internal server error\"}},\"security\":[],\"securitySchemes\":{},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/NaturalArea/{id}", "segments": [{ "lit": "NaturalArea" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "natural_area", "name__orig": "natural_area", "Name": "NaturalArea", "name_": "natural_area", "name-": "natural-area", "NAME": "NATURAL_AREA", "index$": 9 }, { "active": true, "entity": "natural_area", "key$": "BasicNaturalAreaFlow", "kind": "basic", "name": "BasicNaturalAreaFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "natural_area_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "natural_area_ref01", "srcdatavar": "natural_area_ref01_data", "suffix": "_dt0" }, "match": { "id": "natural_area01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-natural_area_ref01" } }], "index$": 1 }] }, 'NaturalArea');
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