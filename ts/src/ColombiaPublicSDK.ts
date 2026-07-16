// ColombiaPublic Ts SDK

import { AirportEntity } from './entity/AirportEntity'
import { CategoryNaturalAreaEntity } from './entity/CategoryNaturalAreaEntity'
import { ConstitutionArticleEntity } from './entity/ConstitutionArticleEntity'
import { CountryEntity } from './entity/CountryEntity'
import { DepartmentEntity } from './entity/DepartmentEntity'
import { HolidayEntity } from './entity/HolidayEntity'
import { InvasiveSpecieEntity } from './entity/InvasiveSpecieEntity'
import { MapEntity } from './entity/MapEntity'
import { NativeCommunityEntity } from './entity/NativeCommunityEntity'
import { NaturalAreaEntity } from './entity/NaturalAreaEntity'
import { PresidentEntity } from './entity/PresidentEntity'
import { RadioEntity } from './entity/RadioEntity'
import { RegionEntity } from './entity/RegionEntity'
import { TouristicAttractionEntity } from './entity/TouristicAttractionEntity'
import { TypicalDishEntity } from './entity/TypicalDishEntity'

export type * from './ColombiaPublicTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { ColombiaPublicEntityBase } from './ColombiaPublicEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class ColombiaPublicSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    // Add features in the resolved order (makeOptions puts an explicit
    // array order first, else defaults to test-first). Ordering matters:
    // the `test` feature installs the base mock transport and the transport
    // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
    // so `test` must be added before them to sit at the base of the chain.
    const featureorder = getpath(this._options, '__derived__.featureorder') || []
    for (const fname of featureorder) {
      const fopts = this._options.feature[fname] || {}
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    }

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
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
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  async direct(fetchargs?: any) {
    const utility = this._utility
    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  // Entity access: `client.Airport().list()` / `client.Airport().load({ id })`.
  Airport(data?: any) {
    const self = this
    return new AirportEntity(self,data)
  }


  // Entity access: `client.CategoryNaturalArea().list()` / `client.CategoryNaturalArea().load({ id })`.
  CategoryNaturalArea(data?: any) {
    const self = this
    return new CategoryNaturalAreaEntity(self,data)
  }


  // Entity access: `client.ConstitutionArticle().list()` / `client.ConstitutionArticle().load({ id })`.
  ConstitutionArticle(data?: any) {
    const self = this
    return new ConstitutionArticleEntity(self,data)
  }


  // Entity access: `client.Country().list()` / `client.Country().load({ id })`.
  Country(data?: any) {
    const self = this
    return new CountryEntity(self,data)
  }


  // Entity access: `client.Department().list()` / `client.Department().load({ id })`.
  Department(data?: any) {
    const self = this
    return new DepartmentEntity(self,data)
  }


  // Entity access: `client.Holiday().list()` / `client.Holiday().load({ id })`.
  Holiday(data?: any) {
    const self = this
    return new HolidayEntity(self,data)
  }


  // Entity access: `client.InvasiveSpecie().list()` / `client.InvasiveSpecie().load({ id })`.
  InvasiveSpecie(data?: any) {
    const self = this
    return new InvasiveSpecieEntity(self,data)
  }


  // Entity access: `client.Map().list()` / `client.Map().load({ id })`.
  Map(data?: any) {
    const self = this
    return new MapEntity(self,data)
  }


  // Entity access: `client.NativeCommunity().list()` / `client.NativeCommunity().load({ id })`.
  NativeCommunity(data?: any) {
    const self = this
    return new NativeCommunityEntity(self,data)
  }


  // Entity access: `client.NaturalArea().list()` / `client.NaturalArea().load({ id })`.
  NaturalArea(data?: any) {
    const self = this
    return new NaturalAreaEntity(self,data)
  }


  // Entity access: `client.President().list()` / `client.President().load({ id })`.
  President(data?: any) {
    const self = this
    return new PresidentEntity(self,data)
  }


  // Entity access: `client.Radio().list()` / `client.Radio().load({ id })`.
  Radio(data?: any) {
    const self = this
    return new RadioEntity(self,data)
  }


  // Entity access: `client.Region().list()` / `client.Region().load({ id })`.
  Region(data?: any) {
    const self = this
    return new RegionEntity(self,data)
  }


  // Entity access: `client.TouristicAttraction().list()` / `client.TouristicAttraction().load({ id })`.
  TouristicAttraction(data?: any) {
    const self = this
    return new TouristicAttractionEntity(self,data)
  }


  // Entity access: `client.TypicalDish().list()` / `client.TypicalDish().load({ id })`.
  TypicalDish(data?: any) {
    const self = this
    return new TypicalDishEntity(self,data)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new ColombiaPublicSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return ColombiaPublicSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'ColombiaPublic' }
  }

  toString() {
    return 'ColombiaPublic ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = ColombiaPublicSDK


export {
  stdutil,
  config,

  BaseFeature,
  ColombiaPublicEntityBase,

  ColombiaPublicSDK,
  SDK,
}


