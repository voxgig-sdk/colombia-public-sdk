

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


describe('TouristicAttractionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COLOMBIA_PUBLIC_TEST_LIVE=TRUE.
  afterEach(liveDelay('COLOMBIA_PUBLIC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ColombiaPublicSDK.test()
    const ent = testsdk.TouristicAttraction()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('touristic_attraction hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of ColombiaPublicSDK.test(offline).TouristicAttraction().stream('list')) { }
    }, /offline/)

    for await (const _item of ColombiaPublicSDK.test(offline).TouristicAttraction()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = ColombiaPublicSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.TouristicAttraction().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of ColombiaPublicSDK.test().TouristicAttraction().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new ColombiaPublicSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.TouristicAttraction().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.TouristicAttraction().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ColombiaPublicSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.TouristicAttraction().list({"city":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COLOMBIA_PUBLIC_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'touristic_attraction.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"city":{"a":true,"h":"City","n":"city","r":false,"sh":"City where the attraction is located","t":"`$STRING`","key$":"city","index$":0},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Attraction description","t":"`$STRING`","key$":"description","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Touristic attraction ID","t":"`$INTEGER`","key$":"id","index$":2},"images":{"a":true,"h":"Images","n":"images","r":false,"sh":"List of image URLs","t":"`$ARRAY`","key$":"images","index$":3},"latitude":{"a":true,"h":"Latitude","n":"latitude","r":false,"sh":"Latitude coordinate","t":"`$NUMBER`","key$":"latitude","index$":4},"longitude":{"a":true,"h":"Longitude","n":"longitude","r":false,"sh":"Longitude coordinate","t":"`$NUMBER`","key$":"longitude","index$":5},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Attraction name","t":"`$STRING`","key$":"name","index$":6}},"id":{"field":"id","name":"id"},"name":"touristic_attraction","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /TouristicAttraction","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/TouristicAttraction","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"TouristicAttraction"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /TouristicAttraction/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/TouristicAttraction/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"TouristicAttraction"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"touristic_attraction","name__orig":"touristic_attraction","Name":"TouristicAttraction","name_":"touristic_attraction","name-":"touristic-attraction","NAME":"TOURISTIC_ATTRACTION","index$":13}, {"active":true,"entity":"touristic_attraction","key$":"BasicTouristicAttractionFlow","kind":"basic","name":"BasicTouristicAttractionFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"touristic_attraction_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"touristic_attraction_ref01","srcdatavar":"touristic_attraction_ref01_data","suffix":"_dt0"},"m":{"id":"touristic_attraction01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-touristic_attraction_ref01"}}],"index$":1}]}, 'TouristicAttraction', {"GET /TouristicAttraction":{"protocol":"http","parameters":[]},"GET /TouristicAttraction/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"description":"Touristic attraction ID","schema":{"type":"integer"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let touristic_attraction_ref01_data = Object.values(setup.data.existing.touristic_attraction)[0] as any

    // LIST
    const touristic_attraction_ref01_ent = client.TouristicAttraction()
    const touristic_attraction_ref01_match: any = {}

    const touristic_attraction_ref01_list = (await touristic_attraction_ref01_ent.list(touristic_attraction_ref01_match)).map((e: any) => e.data())


    // LOAD
    const touristic_attraction_ref01_match_dt0: any = {}
    touristic_attraction_ref01_match_dt0.id = touristic_attraction_ref01_data.id
    const touristic_attraction_ref01_data_dt0 = (await touristic_attraction_ref01_ent.load(touristic_attraction_ref01_match_dt0)).data()
    assert(touristic_attraction_ref01_data_dt0.id === touristic_attraction_ref01_data.id)


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
      '../../../../.sdk/test/entity/touristic_attraction/TouristicAttractionTestData.json')

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
    ['touristic_attraction01','touristic_attraction02','touristic_attraction03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COLOMBIA_PUBLIC_TEST_TOURISTIC_ATTRACTION_ENTID': idmap,
    'COLOMBIA_PUBLIC_TEST_LIVE': 'FALSE',
    'COLOMBIA_PUBLIC_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['COLOMBIA_PUBLIC_TEST_TOURISTIC_ATTRACTION_ENTID']

  const live = 'TRUE' === env.COLOMBIA_PUBLIC_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COLOMBIA_PUBLIC_TEST_TOURISTIC_ATTRACTION_ENTID']
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
  
