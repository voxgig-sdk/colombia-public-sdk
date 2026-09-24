

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


describe('NativeCommunityEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COLOMBIA_PUBLIC_TEST_LIVE=TRUE.
  afterEach(liveDelay('COLOMBIA_PUBLIC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ColombiaPublicSDK.test()
    const ent = testsdk.NativeCommunity()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COLOMBIA_PUBLIC_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'native_community.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"departmentId":{"a":true,"h":"Department Id","n":"departmentId","r":false,"sh":"Department ID","t":"`$INTEGER`","key$":"departmentId","index$":0},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Community description","t":"`$STRING`","key$":"description","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Native community ID","t":"`$INTEGER`","key$":"id","index$":2},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Community name","t":"`$STRING`","key$":"name","index$":3},"population":{"a":true,"h":"Population","n":"population","r":false,"sh":"Population","t":"`$INTEGER`","key$":"population","index$":4}},"id":{"field":"id","name":"id"},"name":"native_community","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /NativeCommunity","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/NativeCommunity","q":{},"r":{},"s":[{"lit":"NativeCommunity"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /NativeCommunity/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/NativeCommunity/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"NativeCommunity"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"native_community","name__orig":"native_community","Name":"NativeCommunity","name_":"native_community","name-":"native-community","NAME":"NATIVE_COMMUNITY","index$":8}, {"active":true,"entity":"native_community","key$":"BasicNativeCommunityFlow","kind":"basic","name":"BasicNativeCommunityFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"native_community_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"native_community_ref01","srcdatavar":"native_community_ref01_data","suffix":"_dt0"},"m":{"id":"native_community01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-native_community_ref01"}}],"index$":1}]}, 'NativeCommunity', {"GET /NativeCommunity":{"protocol":"http","operationId":"getNativeCommunities","responses":{"200":{"description":"Successful response with list of native communities","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Native community ID","key$":"id"},"name":{"type":"string","description":"Community name","key$":"name"},"description":{"type":"string","description":"Community description","key$":"description"},"departmentId":{"type":"integer","description":"Department ID","key$":"departmentId"},"population":{"type":"integer","description":"Population","key$":"population"}},"x-ref":"#/components/schemas/NativeCommunity","index$":0}}}}},"500":{"description":"Internal server error"}},"parameters":[],"security":[],"securitySource":"definition","securitySchemes":{}},"GET /NativeCommunity/{id}":{"protocol":"http","operationId":"getNativeCommunityById","responses":{"200":{"description":"Successful response with native community information","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"integer","description":"Native community ID","key$":"id"},"name":{"type":"string","description":"Community name","key$":"name"},"description":{"type":"string","description":"Community description","key$":"description"},"departmentId":{"type":"integer","description":"Department ID","key$":"departmentId"},"population":{"type":"integer","description":"Population","key$":"population"}},"x-ref":"#/components/schemas/NativeCommunity","index$":0}}}},"404":{"description":"Native community not found"},"500":{"description":"Internal server error"}},"parameters":[{"name":"id","in":"path","required":true,"description":"Native community ID","schema":{"type":"integer"},"index$":0}],"security":[],"securitySource":"definition","securitySchemes":{}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let native_community_ref01_data = Object.values(setup.data.existing.native_community)[0] as any

    // LIST
    const native_community_ref01_ent = client.NativeCommunity()
    const native_community_ref01_match: any = {}

    const native_community_ref01_list = (await native_community_ref01_ent.list(native_community_ref01_match)).map((e: any) => e.data())


    // LOAD
    const native_community_ref01_match_dt0: any = {}
    native_community_ref01_match_dt0.id = native_community_ref01_data.id
    const native_community_ref01_data_dt0 = (await native_community_ref01_ent.load(native_community_ref01_match_dt0)).data()
    assert(native_community_ref01_data_dt0.id === native_community_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/native_community/NativeCommunityTestData.json')

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
    ['native_community01','native_community02','native_community03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COLOMBIA_PUBLIC_TEST_NATIVE_COMMUNITY_ENTID': idmap,
    'COLOMBIA_PUBLIC_TEST_LIVE': 'FALSE',
    'COLOMBIA_PUBLIC_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['COLOMBIA_PUBLIC_TEST_NATIVE_COMMUNITY_ENTID']

  const live = 'TRUE' === env.COLOMBIA_PUBLIC_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COLOMBIA_PUBLIC_TEST_NATIVE_COMMUNITY_ENTID']
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
  
