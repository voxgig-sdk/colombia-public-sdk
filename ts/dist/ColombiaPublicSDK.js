"use strict";
// ColombiaPublic Ts SDK
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK = exports.ColombiaPublicSDK = exports.ColombiaPublicEntityBase = exports.BaseFeature = exports.config = exports.stdutil = void 0;
const AirportEntity_1 = require("./entity/AirportEntity");
const CategoryNaturalAreaEntity_1 = require("./entity/CategoryNaturalAreaEntity");
const ConstitutionArticleEntity_1 = require("./entity/ConstitutionArticleEntity");
const CountryEntity_1 = require("./entity/CountryEntity");
const DepartmentEntity_1 = require("./entity/DepartmentEntity");
const HolidayEntity_1 = require("./entity/HolidayEntity");
const InvasiveSpecieEntity_1 = require("./entity/InvasiveSpecieEntity");
const MapEntity_1 = require("./entity/MapEntity");
const NativeCommunityEntity_1 = require("./entity/NativeCommunityEntity");
const NaturalAreaEntity_1 = require("./entity/NaturalAreaEntity");
const PresidentEntity_1 = require("./entity/PresidentEntity");
const RadioEntity_1 = require("./entity/RadioEntity");
const RegionEntity_1 = require("./entity/RegionEntity");
const TouristicAttractionEntity_1 = require("./entity/TouristicAttractionEntity");
const TypicalDishEntity_1 = require("./entity/TypicalDishEntity");
const node_util_1 = require("node:util");
const Config_1 = require("./Config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return Config_1.config; } });
const ColombiaPublicEntityBase_1 = require("./ColombiaPublicEntityBase");
Object.defineProperty(exports, "ColombiaPublicEntityBase", { enumerable: true, get: function () { return ColombiaPublicEntityBase_1.ColombiaPublicEntityBase; } });
const Utility_1 = require("./utility/Utility");
const BaseFeature_1 = require("./feature/base/BaseFeature");
Object.defineProperty(exports, "BaseFeature", { enumerable: true, get: function () { return BaseFeature_1.BaseFeature; } });
const stdutil = new Utility_1.Utility();
exports.stdutil = stdutil;
class ColombiaPublicSDK {
    _mode = 'live';
    _options;
    _utility = new Utility_1.Utility();
    _features;
    _rootctx;
    constructor(options) {
        this._rootctx = this._utility.makeContext({
            client: this,
            utility: this._utility,
            config: Config_1.config,
            options,
            shared: new WeakMap()
        });
        this._options = this._utility.makeOptions(this._rootctx);
        const struct = this._utility.struct;
        const getpath = struct.getpath;
        if (true === getpath(this._options.feature, 'test.active')) {
            this._mode = 'test';
        }
        this._rootctx.options = this._options;
        this._features = [];
        const featureAdd = this._utility.featureAdd;
        const featureInit = this._utility.featureInit;
        // Add features in the resolved order (makeOptions puts an explicit
        // array order first, else defaults to test-first). Ordering matters:
        // the `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
        // so `test` must be added before them to sit at the base of the chain.
        const extend = this._options.extend || [];
        const featureorder = getpath(this._options, '__derived__.featureorder') || [];
        for (const fname of featureorder) {
            const fopts = this._options.feature[fname] || {};
            if (fopts.active) {
                // An active name with no generated class is legal when an
                // extend-supplied instance carries that name (station's adopt
                // path): the instance is added below, positioned by its own
                // __after__ entry, so skip it here rather than fail construction.
                if (!this._rootctx.config.hasFeature(fname) &&
                    extend.some((f) => fname === f.name)) {
                    continue;
                }
                featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname));
            }
        }
        for (let f of extend) {
            featureAdd(this._rootctx, f);
        }
        for (let f of this._features) {
            featureInit(this._rootctx, f);
        }
        const featureHook = this._utility.featureHook;
        featureHook(this._rootctx, 'PostConstruct');
    }
    options() {
        return this._utility.struct.clone(this._options);
    }
    utility() {
        return this._utility.struct.clone(this._utility);
    }
    async prepare(fetchargs) {
        const utility = this._utility;
        const struct = utility.struct;
        const clone = struct.clone;
        const { makeContext, makeFetchDef, prepareHeaders, prepareAuth, } = utility;
        fetchargs = fetchargs || {};
        let ctx = makeContext({
            opname: 'prepare',
            ctrl: fetchargs.ctrl || {},
        }, this._rootctx);
        const options = this._options;
        // Build spec directly from SDK options + user-provided fetch args.
        const spec = {
            base: options.base,
            prefix: options.prefix,
            suffix: options.suffix,
            path: fetchargs.path || '',
            method: fetchargs.method || 'GET',
            params: fetchargs.params || {},
            query: fetchargs.query || {},
            headers: prepareHeaders(ctx),
            body: fetchargs.body,
            step: 'start',
        };
        ctx.spec = spec;
        // Merge user-provided headers over SDK defaults.
        if (fetchargs.headers) {
            const uheaders = fetchargs.headers;
            for (let key in uheaders) {
                spec.headers[key] = uheaders[key];
            }
        }
        // Apply SDK auth (apikey, auth prefix, etc.)
        const authResult = prepareAuth(ctx);
        if (authResult instanceof Error) {
            return authResult;
        }
        return makeFetchDef(ctx);
    }
    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    // either one reaches the same endpoint.
    async direct(fetchargs) {
        if (!this._options.allow.op.includes('direct')) {
            return {
                ok: false,
                err: new Error('ColombiaPublicSDK: direct: operation not allowed by' +
                    ' SDK option allow.op value: "' + this._options.allow.op + '"'),
            };
        }
        return this._rawRequest(fetchargs);
    }
    // Ungated request path shared by direct() and graphql(), each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    async _rawRequest(fetchargs) {
        const utility = this._utility;
        const fetcher = utility.fetcher;
        const makeContext = utility.makeContext;
        const fetchdef = await this.prepare(fetchargs);
        if (fetchdef instanceof Error) {
            return fetchdef;
        }
        let ctx = makeContext({
            opname: 'direct',
            ctrl: (fetchargs || {}).ctrl || {},
        }, this._rootctx);
        try {
            const fetched = await fetcher(ctx, fetchdef.url, fetchdef);
            if (null == fetched) {
                return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') };
            }
            else if (fetched instanceof Error) {
                return { ok: false, err: fetched };
            }
            const status = fetched.status;
            // No body responses (204 No Content, 304 Not Modified) and explicit
            // zero content-length must skip JSON parsing — fetched.json() would
            // throw `Unexpected end of JSON input` on an empty body.
            const headers = fetched.headers;
            const contentLength = headers && 'function' === typeof headers.get
                ? headers.get('content-length')
                : (headers || {})['content-length'];
            const noBody = 204 === status || 304 === status || '0' === String(contentLength);
            let json = undefined;
            if (!noBody) {
                try {
                    json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json;
                }
                catch (parseErr) {
                    // Body wasn't valid JSON — surface the raw response rather than
                    // throwing. data stays undefined; callers can inspect status/headers.
                    json = undefined;
                }
            }
            return {
                ok: status >= 200 && status < 300,
                status,
                headers: fetched.headers,
                data: json,
            };
        }
        catch (err) {
            return { ok: false, err };
        }
    }
    // Raw GraphQL access: the pressure valve that makes the generated
    // surface's deliberate omissions (per-call selection sets, typed filter
    // builders, batching, subscriptions) livable — the whole schema stays
    // reachable.
    //
    // Thin wrapper over the same prepare/fetch path `direct` uses, with the
    // one thing raw `direct` cannot do for GraphQL: a GraphQL failure rides
    // HTTP 200 as a top-level `errors` array, so status alone would report a
    // failed query as ok.
    //
    // NOTE: like `direct`, this bypasses the feature pipeline — no retry,
    // ratelimit or paging features apply.
    async graphql(query, variables, ctrl) {
        const options = this._options;
        if (!options.allow.op.includes('graphql')) {
            return {
                ok: false,
                err: new Error('ColombiaPublicSDK: graphql: operation not allowed by' +
                    ' SDK option allow.op value: "' + options.allow.op + '"'),
            };
        }
        const res = await this._rawRequest({
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: { query, variables: variables || {} },
            ctrl,
        });
        if (res instanceof Error) {
            return res;
        }
        // Errors are read BEFORE any status check: a GraphQL parse or validation
        // failure comes back as HTTP 400 carrying the standard { errors: [...] }
        // body, and the raw path represents a non-2xx as { ok: false } with no
        // err — so returning early on status would discard the server's own
        // diagnostics, which are the only useful part of that response.
        const errors = null == res.data ? undefined : res.data.errors;
        if (null != errors && Array.isArray(errors) && 0 < errors.length) {
            const first = errors[0] || {};
            const err = new Error('ColombiaPublicSDK: graphql: ' +
                (first.message || 'graphql error'));
            err.graphql = errors;
            return { ok: false, status: res.status, headers: res.headers, err, data: res.data };
        }
        return res;
    }
    // Entity access: `client.Airport().list()` / `client.Airport().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Airport(entopts) {
        const self = this;
        return new AirportEntity_1.AirportEntity(self, entopts);
    }
    // Entity access: `client.CategoryNaturalArea().list()` / `client.CategoryNaturalArea().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CategoryNaturalArea(entopts) {
        const self = this;
        return new CategoryNaturalAreaEntity_1.CategoryNaturalAreaEntity(self, entopts);
    }
    // Entity access: `client.ConstitutionArticle().list()` / `client.ConstitutionArticle().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ConstitutionArticle(entopts) {
        const self = this;
        return new ConstitutionArticleEntity_1.ConstitutionArticleEntity(self, entopts);
    }
    // Entity access: `client.Country().list()` / `client.Country().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Country(entopts) {
        const self = this;
        return new CountryEntity_1.CountryEntity(self, entopts);
    }
    // Entity access: `client.Department().list()` / `client.Department().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Department(entopts) {
        const self = this;
        return new DepartmentEntity_1.DepartmentEntity(self, entopts);
    }
    // Entity access: `client.Holiday().list()` / `client.Holiday().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Holiday(entopts) {
        const self = this;
        return new HolidayEntity_1.HolidayEntity(self, entopts);
    }
    // Entity access: `client.InvasiveSpecie().list()` / `client.InvasiveSpecie().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    InvasiveSpecie(entopts) {
        const self = this;
        return new InvasiveSpecieEntity_1.InvasiveSpecieEntity(self, entopts);
    }
    // Entity access: `client.Map().list()` / `client.Map().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Map(entopts) {
        const self = this;
        return new MapEntity_1.MapEntity(self, entopts);
    }
    // Entity access: `client.NativeCommunity().list()` / `client.NativeCommunity().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    NativeCommunity(entopts) {
        const self = this;
        return new NativeCommunityEntity_1.NativeCommunityEntity(self, entopts);
    }
    // Entity access: `client.NaturalArea().list()` / `client.NaturalArea().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    NaturalArea(entopts) {
        const self = this;
        return new NaturalAreaEntity_1.NaturalAreaEntity(self, entopts);
    }
    // Entity access: `client.President().list()` / `client.President().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    President(entopts) {
        const self = this;
        return new PresidentEntity_1.PresidentEntity(self, entopts);
    }
    // Entity access: `client.Radio().list()` / `client.Radio().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Radio(entopts) {
        const self = this;
        return new RadioEntity_1.RadioEntity(self, entopts);
    }
    // Entity access: `client.Region().list()` / `client.Region().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Region(entopts) {
        const self = this;
        return new RegionEntity_1.RegionEntity(self, entopts);
    }
    // Entity access: `client.TouristicAttraction().list()` / `client.TouristicAttraction().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    TouristicAttraction(entopts) {
        const self = this;
        return new TouristicAttractionEntity_1.TouristicAttractionEntity(self, entopts);
    }
    // Entity access: `client.TypicalDish().list()` / `client.TypicalDish().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    TypicalDish(entopts) {
        const self = this;
        return new TypicalDishEntity_1.TypicalDishEntity(self, entopts);
    }
    static test(testoptsarg, sdkoptsarg) {
        const struct = stdutil.struct;
        const setpath = struct.setpath;
        const getdef = struct.getdef;
        const clone = struct.clone;
        const setprop = struct.setprop;
        const sdkopts = getdef(clone(sdkoptsarg), {});
        const testopts = getdef(clone(testoptsarg), {});
        setprop(testopts, 'active', true);
        setpath(sdkopts, 'feature.test', testopts);
        const testsdk = new ColombiaPublicSDK(sdkopts);
        testsdk._mode = 'test';
        return testsdk;
    }
    tester(testopts, sdkopts) {
        return ColombiaPublicSDK.test(testopts, sdkopts);
    }
    toJSON() {
        return { name: 'ColombiaPublic' };
    }
    toString() {
        return 'ColombiaPublic ' + this._utility.struct.jsonify(this.toJSON());
    }
    [node_util_1.inspect.custom]() {
        return this.toString();
    }
}
exports.ColombiaPublicSDK = ColombiaPublicSDK;
const SDK = ColombiaPublicSDK;
exports.SDK = SDK;
//# sourceMappingURL=ColombiaPublicSDK.js.map