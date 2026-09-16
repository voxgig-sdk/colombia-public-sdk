

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


describe('RadioEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COLOMBIA_PUBLIC_TEST_LIVE=TRUE.
  afterEach(liveDelay('COLOMBIA_PUBLIC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ColombiaPublicSDK.test()
    const ent = testsdk.Radio()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COLOMBIA_PUBLIC_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'radio.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"band","req":false,"short":"Broadcasting band (AM/FM)","type":"`$STRING`","index$":0},{"active":true,"name":"frequency","req":false,"short":"Broadcasting frequency","type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"short":"Radio station ID","type":"`$INTEGER`","index$":2},{"active":true,"name":"name","req":false,"short":"Radio station name","type":"`$STRING`","index$":3},{"active":true,"name":"url","req":false,"short":"Station URL","type":"`$STRING`","index$":4}],"id":{"field":"id","name":"id"},"name":"radio","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /Radio","json":"{\"operationId\":\"getRadioStations\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"band\":{\"description\":\"Broadcasting band (AM/FM)\",\"type\":\"string\"},\"frequency\":{\"description\":\"Broadcasting frequency\",\"type\":\"string\"},\"id\":{\"description\":\"Radio station ID\",\"type\":\"integer\"},\"name\":{\"description\":\"Radio station name\",\"type\":\"string\"},\"url\":{\"description\":\"Station URL\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with list of radio stations\"},\"500\":{\"description\":\"Internal server error\"}},\"security\":[],\"securitySchemes\":{},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/Radio","segments":[{"lit":"Radio"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /Radio/{id}","json":"{\"operationId\":\"getRadioById\",\"parameters\":[{\"description\":\"Radio station ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"band\":{\"description\":\"Broadcasting band (AM/FM)\",\"type\":\"string\"},\"frequency\":{\"description\":\"Broadcasting frequency\",\"type\":\"string\"},\"id\":{\"description\":\"Radio station ID\",\"type\":\"integer\"},\"name\":{\"description\":\"Radio station name\",\"type\":\"string\"},\"url\":{\"description\":\"Station URL\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with radio station information\"},\"404\":{\"description\":\"Radio station not found\"},\"500\":{\"description\":\"Internal server error\"}},\"security\":[],\"securitySchemes\":{},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/Radio/{id}","segments":[{"lit":"Radio"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"radio","name__orig":"radio","Name":"Radio","name_":"radio","name-":"radio","NAME":"RADIO","index$":11}, {"active":true,"entity":"radio","key$":"BasicRadioFlow","kind":"basic","name":"BasicRadioFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"radio_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"radio_ref01","srcdatavar":"radio_ref01_data","suffix":"_dt0"},"match":{"id":"radio01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-radio_ref01"}}],"index$":1}]}, 'Radio')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let radio_ref01_data = Object.values(setup.data.existing.radio)[0] as any

    // LIST
    const radio_ref01_ent = client.Radio()
    const radio_ref01_match: any = {}

    const radio_ref01_list = (await radio_ref01_ent.list(radio_ref01_match)).map((e: any) => e.data())


    // LOAD
    const radio_ref01_match_dt0: any = {}
    radio_ref01_match_dt0.id = radio_ref01_data.id
    const radio_ref01_data_dt0 = (await radio_ref01_ent.load(radio_ref01_match_dt0)).data()
    assert(radio_ref01_data_dt0.id === radio_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/radio/RadioTestData.json')

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
    ['radio01','radio02','radio03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COLOMBIA_PUBLIC_TEST_RADIO_ENTID': idmap,
    'COLOMBIA_PUBLIC_TEST_LIVE': 'FALSE',
    'COLOMBIA_PUBLIC_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['COLOMBIA_PUBLIC_TEST_RADIO_ENTID']

  const live = 'TRUE' === env.COLOMBIA_PUBLIC_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COLOMBIA_PUBLIC_TEST_RADIO_ENTID']
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
  
