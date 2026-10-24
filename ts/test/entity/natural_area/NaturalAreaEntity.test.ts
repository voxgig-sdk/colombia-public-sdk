

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ColombiaPublicSDK, BaseFeature, config, stdutil } from '../../..'

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


describe('NaturalAreaEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COLOMBIA_PUBLIC_TEST_LIVE=TRUE.
  afterEach(liveDelay('COLOMBIA_PUBLIC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ColombiaPublicSDK.test()
    const ent = testsdk.NaturalArea()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('natural_area hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of ColombiaPublicSDK.test(offline).NaturalArea().stream('list')) { }
    }, /offline/)

    for await (const _item of ColombiaPublicSDK.test(offline).NaturalArea()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = ColombiaPublicSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.NaturalArea().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of ColombiaPublicSDK.test().NaturalArea().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new ColombiaPublicSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.NaturalArea().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.NaturalArea().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ColombiaPublicSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.NaturalArea().list({"areaGroupId":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COLOMBIA_PUBLIC_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'natural_area.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"areaGroupId":{"a":true,"h":"Area Group Id","n":"areaGroupId","r":false,"sh":"Area group ID","t":"`$INTEGER`","key$":"areaGroupId","index$":0},"categoryNaturalAreaId":{"a":true,"h":"Category Natural Area Id","n":"categoryNaturalAreaId","r":false,"sh":"Category ID","t":"`$INTEGER`","key$":"categoryNaturalAreaId","index$":1},"departmentId":{"a":true,"h":"Department Id","n":"departmentId","r":false,"sh":"Department ID","t":"`$INTEGER`","key$":"departmentId","index$":2},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Natural area description","t":"`$STRING`","key$":"description","index$":3},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Natural area ID","t":"`$INTEGER`","key$":"id","index$":4},"landArea":{"a":true,"h":"Land Area","n":"landArea","r":false,"sh":"Land area in hectares","t":"`$NUMBER`","key$":"landArea","index$":5},"maritimeArea":{"a":true,"h":"Maritime Area","n":"maritimeArea","r":false,"sh":"Maritime area in hectares","t":"`$NUMBER`","key$":"maritimeArea","index$":6},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Natural area name","t":"`$STRING`","key$":"name","index$":7}},"id":{"field":"id","name":"id"},"name":"natural_area","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /NaturalArea","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/NaturalArea","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"NaturalArea"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /NaturalArea/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/NaturalArea/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"NaturalArea"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"natural_area","name__orig":"natural_area","Name":"NaturalArea","name_":"natural_area","name-":"natural-area","NAME":"NATURAL_AREA","index$":9}, {"active":true,"entity":"natural_area","key$":"BasicNaturalAreaFlow","kind":"basic","name":"BasicNaturalAreaFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"natural_area_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"natural_area_ref01","srcdatavar":"natural_area_ref01_data","suffix":"_dt0"},"m":{"id":"natural_area01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-natural_area_ref01"}}],"index$":1}]}, 'NaturalArea', {"GET /NaturalArea":{"protocol":"http","parameters":[]},"GET /NaturalArea/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"description":"Natural area ID","schema":{"type":"integer"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let natural_area_ref01_data = Object.values(setup.data.existing.natural_area)[0] as any

    // LIST
    const natural_area_ref01_ent = client.NaturalArea()
    const natural_area_ref01_match: any = {}

    const natural_area_ref01_list = (await natural_area_ref01_ent.list(natural_area_ref01_match)).map((e: any) => e.data())


    // LOAD
    const natural_area_ref01_match_dt0: any = {}
    natural_area_ref01_match_dt0.id = natural_area_ref01_data.id
    const natural_area_ref01_data_dt0 = (await natural_area_ref01_ent.load(natural_area_ref01_match_dt0)).data()
    assert(natural_area_ref01_data_dt0.id === natural_area_ref01_data.id)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/natural_area/NaturalAreaTestData.json')

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
    ['natural_area01','natural_area02','natural_area03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COLOMBIA_PUBLIC_TEST_NATURAL_AREA_ENTID': idmap,
    'COLOMBIA_PUBLIC_TEST_LIVE': 'FALSE',
    'COLOMBIA_PUBLIC_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['COLOMBIA_PUBLIC_TEST_NATURAL_AREA_ENTID']

  const live = 'TRUE' === env.COLOMBIA_PUBLIC_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COLOMBIA_PUBLIC_TEST_NATURAL_AREA_ENTID']
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
  
