

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ColombiaPublicSDK, BaseFeature, stdutil } from '../../..'

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


loadEnvLocal(__dirname + '/../../../.env.local')


describe('TypicalDishEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COLOMBIA_PUBLIC_TEST_LIVE=TRUE.
  afterEach(liveDelay('COLOMBIA_PUBLIC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ColombiaPublicSDK.test()
    const ent = testsdk.TypicalDish()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COLOMBIA_PUBLIC_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'typical_dish.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"departmentId":{"a":true,"h":"Department Id","n":"departmentId","r":false,"sh":"Department ID","t":"`$INTEGER`","key$":"departmentId","index$":0},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Dish description","t":"`$STRING`","key$":"description","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Typical dish ID","t":"`$INTEGER`","key$":"id","index$":2},"ingredients":{"a":true,"h":"Ingredients","n":"ingredients","r":false,"sh":"List of ingredients","t":"`$ARRAY`","key$":"ingredients","index$":3},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Dish name","t":"`$STRING`","key$":"name","index$":4},"urlImage":{"a":true,"h":"Url Image","n":"urlImage","r":false,"sh":"URL to dish image","t":"`$STRING`","key$":"urlImage","index$":5}},"id":{"field":"id","name":"id"},"name":"typical_dish","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /TypicalDish","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/TypicalDish","q":{},"r":{},"s":[{"lit":"TypicalDish"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /TypicalDish/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/TypicalDish/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"TypicalDish"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"typical_dish","name__orig":"typical_dish","Name":"TypicalDish","name_":"typical_dish","name-":"typical-dish","NAME":"TYPICAL_DISH","index$":14}, {"active":true,"entity":"typical_dish","key$":"BasicTypicalDishFlow","kind":"basic","name":"BasicTypicalDishFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"typical_dish_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"typical_dish_ref01","srcdatavar":"typical_dish_ref01_data","suffix":"_dt0"},"m":{"id":"typical_dish01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-typical_dish_ref01"}}],"index$":1}]}, 'TypicalDish', {"GET /TypicalDish":{"protocol":"http","operationId":"getTypicalDishes","responses":{"200":{"description":"Successful response with list of typical dishes","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Typical dish ID","key$":"id"},"name":{"type":"string","description":"Dish name","key$":"name"},"description":{"type":"string","description":"Dish description","key$":"description"},"ingredients":{"type":"array","items":{"type":"string"},"description":"List of ingredients","key$":"ingredients"},"departmentId":{"type":"integer","description":"Department ID","key$":"departmentId"},"urlImage":{"type":"string","description":"URL to dish image","key$":"urlImage"}},"x-ref":"#/components/schemas/TypicalDish","index$":0}}}}},"500":{"description":"Internal server error"}},"parameters":[],"security":[],"securitySource":"definition","securitySchemes":{}},"GET /TypicalDish/{id}":{"protocol":"http","operationId":"getTypicalDishById","responses":{"200":{"description":"Successful response with typical dish information","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"integer","description":"Typical dish ID","key$":"id"},"name":{"type":"string","description":"Dish name","key$":"name"},"description":{"type":"string","description":"Dish description","key$":"description"},"ingredients":{"type":"array","items":{"type":"string"},"description":"List of ingredients","key$":"ingredients"},"departmentId":{"type":"integer","description":"Department ID","key$":"departmentId"},"urlImage":{"type":"string","description":"URL to dish image","key$":"urlImage"}},"x-ref":"#/components/schemas/TypicalDish","index$":0}}}},"404":{"description":"Typical dish not found"},"500":{"description":"Internal server error"}},"parameters":[{"name":"id","in":"path","required":true,"description":"Typical dish ID","schema":{"type":"integer"},"index$":0}],"security":[],"securitySource":"definition","securitySchemes":{}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let typical_dish_ref01_data = Object.values(setup.data.existing.typical_dish)[0] as any

    // LIST
    const typical_dish_ref01_ent = client.TypicalDish()
    const typical_dish_ref01_match: any = {}

    const typical_dish_ref01_list = (await typical_dish_ref01_ent.list(typical_dish_ref01_match)).map((e: any) => e.data())


    // LOAD
    const typical_dish_ref01_match_dt0: any = {}
    typical_dish_ref01_match_dt0.id = typical_dish_ref01_data.id
    const typical_dish_ref01_data_dt0 = (await typical_dish_ref01_ent.load(typical_dish_ref01_match_dt0)).data()
    assert(typical_dish_ref01_data_dt0.id === typical_dish_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/typical_dish/TypicalDishTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = ColombiaPublicSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['typical_dish01','typical_dish02','typical_dish03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COLOMBIA_PUBLIC_TEST_TYPICAL_DISH_ENTID': idmap,
    'COLOMBIA_PUBLIC_TEST_LIVE': 'FALSE',
    'COLOMBIA_PUBLIC_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['COLOMBIA_PUBLIC_TEST_TYPICAL_DISH_ENTID']

  const live = 'TRUE' === env.COLOMBIA_PUBLIC_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COLOMBIA_PUBLIC_TEST_TYPICAL_DISH_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new ColombiaPublicSDK(merge([
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
    explain: 'TRUE' === env.COLOMBIA_PUBLIC_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
