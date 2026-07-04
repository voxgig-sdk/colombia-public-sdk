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
    const items = struct.items

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    items(this._options.feature, (fitem: [string, any]) => {
      const fname = fitem[0]
      const fopts = fitem[1]
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    })

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



  _airport?: AirportEntity

  // Idiomatic facade: `client.airport.list()` / `client.airport.load({ id })`.
  get airport(): AirportEntity {
    return (this._airport ??= new AirportEntity(this, undefined))
  }

  /** @deprecated Use `client.airport` instead. */
  Airport(data?: any) {
    const self = this
    return new AirportEntity(self,data)
  }


  _category_natural_area?: CategoryNaturalAreaEntity

  // Idiomatic facade: `client.category_natural_area.list()` / `client.category_natural_area.load({ id })`.
  get category_natural_area(): CategoryNaturalAreaEntity {
    return (this._category_natural_area ??= new CategoryNaturalAreaEntity(this, undefined))
  }

  /** @deprecated Use `client.category_natural_area` instead. */
  CategoryNaturalArea(data?: any) {
    const self = this
    return new CategoryNaturalAreaEntity(self,data)
  }


  _constitution_article?: ConstitutionArticleEntity

  // Idiomatic facade: `client.constitution_article.list()` / `client.constitution_article.load({ id })`.
  get constitution_article(): ConstitutionArticleEntity {
    return (this._constitution_article ??= new ConstitutionArticleEntity(this, undefined))
  }

  /** @deprecated Use `client.constitution_article` instead. */
  ConstitutionArticle(data?: any) {
    const self = this
    return new ConstitutionArticleEntity(self,data)
  }


  _country?: CountryEntity

  // Idiomatic facade: `client.country.list()` / `client.country.load({ id })`.
  get country(): CountryEntity {
    return (this._country ??= new CountryEntity(this, undefined))
  }

  /** @deprecated Use `client.country` instead. */
  Country(data?: any) {
    const self = this
    return new CountryEntity(self,data)
  }


  _department?: DepartmentEntity

  // Idiomatic facade: `client.department.list()` / `client.department.load({ id })`.
  get department(): DepartmentEntity {
    return (this._department ??= new DepartmentEntity(this, undefined))
  }

  /** @deprecated Use `client.department` instead. */
  Department(data?: any) {
    const self = this
    return new DepartmentEntity(self,data)
  }


  _holiday?: HolidayEntity

  // Idiomatic facade: `client.holiday.list()` / `client.holiday.load({ id })`.
  get holiday(): HolidayEntity {
    return (this._holiday ??= new HolidayEntity(this, undefined))
  }

  /** @deprecated Use `client.holiday` instead. */
  Holiday(data?: any) {
    const self = this
    return new HolidayEntity(self,data)
  }


  _invasive_specie?: InvasiveSpecieEntity

  // Idiomatic facade: `client.invasive_specie.list()` / `client.invasive_specie.load({ id })`.
  get invasive_specie(): InvasiveSpecieEntity {
    return (this._invasive_specie ??= new InvasiveSpecieEntity(this, undefined))
  }

  /** @deprecated Use `client.invasive_specie` instead. */
  InvasiveSpecie(data?: any) {
    const self = this
    return new InvasiveSpecieEntity(self,data)
  }


  _map?: MapEntity

  // Idiomatic facade: `client.map.list()` / `client.map.load({ id })`.
  get map(): MapEntity {
    return (this._map ??= new MapEntity(this, undefined))
  }

  /** @deprecated Use `client.map` instead. */
  Map(data?: any) {
    const self = this
    return new MapEntity(self,data)
  }


  _native_community?: NativeCommunityEntity

  // Idiomatic facade: `client.native_community.list()` / `client.native_community.load({ id })`.
  get native_community(): NativeCommunityEntity {
    return (this._native_community ??= new NativeCommunityEntity(this, undefined))
  }

  /** @deprecated Use `client.native_community` instead. */
  NativeCommunity(data?: any) {
    const self = this
    return new NativeCommunityEntity(self,data)
  }


  _natural_area?: NaturalAreaEntity

  // Idiomatic facade: `client.natural_area.list()` / `client.natural_area.load({ id })`.
  get natural_area(): NaturalAreaEntity {
    return (this._natural_area ??= new NaturalAreaEntity(this, undefined))
  }

  /** @deprecated Use `client.natural_area` instead. */
  NaturalArea(data?: any) {
    const self = this
    return new NaturalAreaEntity(self,data)
  }


  _president?: PresidentEntity

  // Idiomatic facade: `client.president.list()` / `client.president.load({ id })`.
  get president(): PresidentEntity {
    return (this._president ??= new PresidentEntity(this, undefined))
  }

  /** @deprecated Use `client.president` instead. */
  President(data?: any) {
    const self = this
    return new PresidentEntity(self,data)
  }


  _radio?: RadioEntity

  // Idiomatic facade: `client.radio.list()` / `client.radio.load({ id })`.
  get radio(): RadioEntity {
    return (this._radio ??= new RadioEntity(this, undefined))
  }

  /** @deprecated Use `client.radio` instead. */
  Radio(data?: any) {
    const self = this
    return new RadioEntity(self,data)
  }


  _region?: RegionEntity

  // Idiomatic facade: `client.region.list()` / `client.region.load({ id })`.
  get region(): RegionEntity {
    return (this._region ??= new RegionEntity(this, undefined))
  }

  /** @deprecated Use `client.region` instead. */
  Region(data?: any) {
    const self = this
    return new RegionEntity(self,data)
  }


  _touristic_attraction?: TouristicAttractionEntity

  // Idiomatic facade: `client.touristic_attraction.list()` / `client.touristic_attraction.load({ id })`.
  get touristic_attraction(): TouristicAttractionEntity {
    return (this._touristic_attraction ??= new TouristicAttractionEntity(this, undefined))
  }

  /** @deprecated Use `client.touristic_attraction` instead. */
  TouristicAttraction(data?: any) {
    const self = this
    return new TouristicAttractionEntity(self,data)
  }


  _typical_dish?: TypicalDishEntity

  // Idiomatic facade: `client.typical_dish.list()` / `client.typical_dish.load({ id })`.
  get typical_dish(): TypicalDishEntity {
    return (this._typical_dish ??= new TypicalDishEntity(this, undefined))
  }

  /** @deprecated Use `client.typical_dish` instead. */
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

  BaseFeature,
  ColombiaPublicEntityBase,

  ColombiaPublicSDK,
  SDK,
}


