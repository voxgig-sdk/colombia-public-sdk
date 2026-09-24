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
(0, node_test_1.describe)('ConstitutionArticleEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COLOMBIA_PUBLIC_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COLOMBIA_PUBLIC_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ColombiaPublicSDK.test();
        const ent = testsdk.ConstitutionArticle();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COLOMBIA_PUBLIC_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'constitution_article.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "articleNumber": { "a": true, "h": "Article Number", "n": "articleNumber", "r": false, "sh": "Article number", "t": "`$INTEGER`", "key$": "articleNumber", "index$": 0 }, "chapter": { "a": true, "h": "Chapter", "n": "chapter", "r": false, "sh": "Constitution chapter", "t": "`$STRING`", "key$": "chapter", "index$": 1 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Article content", "t": "`$STRING`", "key$": "description", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Article ID", "t": "`$INTEGER`", "key$": "id", "index$": 3 }, "title": { "a": true, "h": "Title", "n": "title", "r": false, "sh": "Article title", "t": "`$STRING`", "key$": "title", "index$": 4 } }, "id": { "field": "id", "name": "id" }, "name": "constitution_article", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /ConstitutionArticle", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/ConstitutionArticle", "q": {}, "r": {}, "s": [{ "lit": "ConstitutionArticle" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /ConstitutionArticle/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/ConstitutionArticle/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "ConstitutionArticle" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "constitution_article", "name__orig": "constitution_article", "Name": "ConstitutionArticle", "name_": "constitution_article", "name-": "constitution-article", "NAME": "CONSTITUTION_ARTICLE", "index$": 2 }, { "active": true, "entity": "constitution_article", "key$": "BasicConstitutionArticleFlow", "kind": "basic", "name": "BasicConstitutionArticleFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "constitution_article_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "constitution_article_ref01", "srcdatavar": "constitution_article_ref01_data", "suffix": "_dt0" }, "m": { "id": "constitution_article01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-constitution_article_ref01" } }], "index$": 1 }] }, 'ConstitutionArticle', { "GET /ConstitutionArticle": { "protocol": "http", "operationId": "getConstitutionArticles", "responses": { "200": { "description": "Successful response with list of constitution articles", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "id": { "type": "integer", "description": "Article ID", "key$": "id" }, "articleNumber": { "type": "integer", "description": "Article number", "key$": "articleNumber" }, "title": { "type": "string", "description": "Article title", "key$": "title" }, "description": { "type": "string", "description": "Article content", "key$": "description" }, "chapter": { "type": "string", "description": "Constitution chapter", "key$": "chapter" } }, "x-ref": "#/components/schemas/ConstitutionArticle", "index$": 0 } } } } }, "500": { "description": "Internal server error" } }, "parameters": [], "security": [], "securitySource": "definition", "securitySchemes": {} }, "GET /ConstitutionArticle/{id}": { "protocol": "http", "operationId": "getConstitutionArticleById", "responses": { "200": { "description": "Successful response with constitution article information", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "type": "integer", "description": "Article ID", "key$": "id" }, "articleNumber": { "type": "integer", "description": "Article number", "key$": "articleNumber" }, "title": { "type": "string", "description": "Article title", "key$": "title" }, "description": { "type": "string", "description": "Article content", "key$": "description" }, "chapter": { "type": "string", "description": "Constitution chapter", "key$": "chapter" } }, "x-ref": "#/components/schemas/ConstitutionArticle", "index$": 0 } } } }, "404": { "description": "Constitution article not found" }, "500": { "description": "Internal server error" } }, "parameters": [{ "name": "id", "in": "path", "required": true, "description": "Constitution article ID", "schema": { "type": "integer" }, "index$": 0 }], "security": [], "securitySource": "definition", "securitySchemes": {} } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let constitution_article_ref01_data = Object.values(setup.data.existing.constitution_article)[0];
        // LIST
        const constitution_article_ref01_ent = client.ConstitutionArticle();
        const constitution_article_ref01_match = {};
        const constitution_article_ref01_list = (await constitution_article_ref01_ent.list(constitution_article_ref01_match)).map((e) => e.data());
        // LOAD
        const constitution_article_ref01_match_dt0 = {};
        constitution_article_ref01_match_dt0.id = constitution_article_ref01_data.id;
        const constitution_article_ref01_data_dt0 = (await constitution_article_ref01_ent.load(constitution_article_ref01_match_dt0)).data();
        (0, node_assert_1.default)(constitution_article_ref01_data_dt0.id === constitution_article_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/constitution_article/ConstitutionArticleTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ColombiaPublicSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['constitution_article01', 'constitution_article02', 'constitution_article03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COLOMBIA_PUBLIC_TEST_CONSTITUTION_ARTICLE_ENTID': idmap,
        'COLOMBIA_PUBLIC_TEST_LIVE': 'FALSE',
        'COLOMBIA_PUBLIC_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['COLOMBIA_PUBLIC_TEST_CONSTITUTION_ARTICLE_ENTID'];
    const live = 'TRUE' === env.COLOMBIA_PUBLIC_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COLOMBIA_PUBLIC_TEST_CONSTITUTION_ARTICLE_ENTID'];
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
//# sourceMappingURL=ConstitutionArticleEntity.test.js.map