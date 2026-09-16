

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"departmentId","req":false,"short":"Department ID","type":"`$INTEGER`","index$":0},{"active":true,"name":"description","req":false,"short":"Community description","type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"short":"Native community ID","type":"`$INTEGER`","index$":2},{"active":true,"name":"name","req":false,"short":"Community name","type":"`$STRING`","index$":3},{"active":true,"name":"population","req":false,"short":"Population","type":"`$INTEGER`","index$":4}],"id":{"field":"id","name":"id"},"name":"native_community","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /NativeCommunity","json":"{\"operationId\":\"getNativeCommunities\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"departmentId\":{\"description\":\"Department ID\",\"type\":\"integer\"},\"description\":{\"description\":\"Community description\",\"type\":\"string\"},\"id\":{\"description\":\"Native community ID\",\"type\":\"integer\"},\"name\":{\"description\":\"Community name\",\"type\":\"string\"},\"population\":{\"description\":\"Population\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with list of native communities\"},\"500\":{\"description\":\"Internal server error\"}},\"security\":[],\"securitySchemes\":{},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/NativeCommunity","segments":[{"lit":"NativeCommunity"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /NativeCommunity/{id}","json":"{\"operationId\":\"getNativeCommunityById\",\"parameters\":[{\"description\":\"Native community ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"departmentId\":{\"description\":\"Department ID\",\"type\":\"integer\"},\"description\":{\"description\":\"Community description\",\"type\":\"string\"},\"id\":{\"description\":\"Native community ID\",\"type\":\"integer\"},\"name\":{\"description\":\"Community name\",\"type\":\"string\"},\"population\":{\"description\":\"Population\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response with native community information\"},\"404\":{\"description\":\"Native community not found\"},\"500\":{\"description\":\"Internal server error\"}},\"security\":[],\"securitySchemes\":{},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/NativeCommunity/{id}","segments":[{"lit":"NativeCommunity"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"native_community","name__orig":"native_community","Name":"NativeCommunity","name_":"native_community","name-":"native-community","NAME":"NATIVE_COMMUNITY","index$":8}, {"active":true,"entity":"native_community","key$":"BasicNativeCommunityFlow","kind":"basic","name":"BasicNativeCommunityFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"native_community_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"native_community_ref01","srcdatavar":"native_community_ref01_data","suffix":"_dt0"},"match":{"id":"native_community01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-native_community_ref01"}}],"index$":1}]}, 'NativeCommunity')
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
  
