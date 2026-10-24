

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


describe('InvasiveSpecieEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COLOMBIA_PUBLIC_TEST_LIVE=TRUE.
  afterEach(liveDelay('COLOMBIA_PUBLIC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ColombiaPublicSDK.test()
    const ent = testsdk.InvasiveSpecie()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('invasive_specie hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of ColombiaPublicSDK.test(offline).InvasiveSpecie().stream('list')) { }
    }, /offline/)

    for await (const _item of ColombiaPublicSDK.test(offline).InvasiveSpecie()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = ColombiaPublicSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.InvasiveSpecie().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of ColombiaPublicSDK.test().InvasiveSpecie().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new ColombiaPublicSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.InvasiveSpecie().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.InvasiveSpecie().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ColombiaPublicSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.InvasiveSpecie().list({"id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COLOMBIA_PUBLIC_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'invasive_specie.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Invasive species ID","t":"`$INTEGER`","key$":"id","index$":0},"impact":{"a":true,"h":"Impact","n":"impact","r":false,"sh":"Environmental impact","t":"`$STRING`","key$":"impact","index$":1},"manage":{"a":true,"h":"Manage","n":"manage","r":false,"sh":"Management strategies","t":"`$STRING`","key$":"manage","index$":2},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Species name","t":"`$STRING`","key$":"name","index$":3},"scientificName":{"a":true,"h":"Scientific Name","n":"scientificName","r":false,"sh":"Scientific name","t":"`$STRING`","key$":"scientificName","index$":4},"urlImage":{"a":true,"h":"Url Image","n":"urlImage","r":false,"sh":"URL to species image","t":"`$STRING`","key$":"urlImage","index$":5}},"id":{"field":"id","name":"id"},"name":"invasive_specie","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /InvasiveSpecie","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/InvasiveSpecie","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"InvasiveSpecie"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /InvasiveSpecie/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/InvasiveSpecie/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"InvasiveSpecie"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"invasive_specie","name__orig":"invasive_specie","Name":"InvasiveSpecie","name_":"invasive_specie","name-":"invasive-specie","NAME":"INVASIVE_SPECIE","index$":6}, {"active":true,"entity":"invasive_specie","key$":"BasicInvasiveSpecieFlow","kind":"basic","name":"BasicInvasiveSpecieFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"invasive_specie_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"invasive_specie_ref01","srcdatavar":"invasive_specie_ref01_data","suffix":"_dt0"},"m":{"id":"invasive_specie01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-invasive_specie_ref01"}}],"index$":1}]}, 'InvasiveSpecie', {"GET /InvasiveSpecie":{"protocol":"http","parameters":[]},"GET /InvasiveSpecie/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"description":"Invasive species ID","schema":{"type":"integer"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let invasive_specie_ref01_data = Object.values(setup.data.existing.invasive_specie)[0] as any

    // LIST
    const invasive_specie_ref01_ent = client.InvasiveSpecie()
    const invasive_specie_ref01_match: any = {}

    const invasive_specie_ref01_list = (await invasive_specie_ref01_ent.list(invasive_specie_ref01_match)).map((e: any) => e.data())


    // LOAD
    const invasive_specie_ref01_match_dt0: any = {}
    invasive_specie_ref01_match_dt0.id = invasive_specie_ref01_data.id
    const invasive_specie_ref01_data_dt0 = (await invasive_specie_ref01_ent.load(invasive_specie_ref01_match_dt0)).data()
    assert(invasive_specie_ref01_data_dt0.id === invasive_specie_ref01_data.id)


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
      '../../../../.sdk/test/entity/invasive_specie/InvasiveSpecieTestData.json')

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
    ['invasive_specie01','invasive_specie02','invasive_specie03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COLOMBIA_PUBLIC_TEST_INVASIVE_SPECIE_ENTID': idmap,
    'COLOMBIA_PUBLIC_TEST_LIVE': 'FALSE',
    'COLOMBIA_PUBLIC_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['COLOMBIA_PUBLIC_TEST_INVASIVE_SPECIE_ENTID']

  const live = 'TRUE' === env.COLOMBIA_PUBLIC_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COLOMBIA_PUBLIC_TEST_INVASIVE_SPECIE_ENTID']
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
  
