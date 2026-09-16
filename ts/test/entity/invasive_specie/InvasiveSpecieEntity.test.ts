

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


describe('InvasiveSpecieEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COLOMBIA_PUBLIC_TEST_LIVE=TRUE.
  afterEach(liveDelay('COLOMBIA_PUBLIC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ColombiaPublicSDK.test()
    const ent = testsdk.InvasiveSpecie()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COLOMBIA_PUBLIC_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'invasive_specie.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"short":"Invasive species ID","type":"`$INTEGER`","index$":0},{"active":true,"name":"impact","req":false,"short":"Environmental impact","type":"`$STRING`","index$":1},{"active":true,"name":"manage","req":false,"short":"Management strategies","type":"`$STRING`","index$":2},{"active":true,"name":"name","req":false,"short":"Species name","type":"`$STRING`","index$":3},{"active":true,"name":"scientificName","req":false,"short":"Scientific name","type":"`$STRING`","index$":4},{"active":true,"name":"urlImage","req":false,"short":"URL to species image","type":"`$STRING`","index$":5}],"id":{"field":"id","name":"id"},"name":"invasive_specie","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /InvasiveSpecie","json":"{\"operationId\":\"getInvasiveSpecies\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"id\":{\"description\":\"Invasive species ID\",\"type\":\"integer\"},\"impact\":{\"description\":\"Environmental impact\",\"type\":\"string\"},\"manage\":{\"description\":\"Management strategies\",\"type\":\"string\"},\"name\":{\"description\":\"Species name\",\"type\":\"string\"},\"scientificName\":{\"description\":\"Scientific name\",\"type\":\"string\"},\"urlImage\":{\"description\":\"URL to species image\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with list of invasive species\"},\"500\":{\"description\":\"Internal server error\"}},\"security\":[],\"securitySchemes\":{},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/InvasiveSpecie","segments":[{"lit":"InvasiveSpecie"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /InvasiveSpecie/{id}","json":"{\"operationId\":\"getInvasiveSpecieById\",\"parameters\":[{\"description\":\"Invasive species ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"id\":{\"description\":\"Invasive species ID\",\"type\":\"integer\"},\"impact\":{\"description\":\"Environmental impact\",\"type\":\"string\"},\"manage\":{\"description\":\"Management strategies\",\"type\":\"string\"},\"name\":{\"description\":\"Species name\",\"type\":\"string\"},\"scientificName\":{\"description\":\"Scientific name\",\"type\":\"string\"},\"urlImage\":{\"description\":\"URL to species image\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with invasive species information\"},\"404\":{\"description\":\"Invasive species not found\"},\"500\":{\"description\":\"Internal server error\"}},\"security\":[],\"securitySchemes\":{},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/InvasiveSpecie/{id}","segments":[{"lit":"InvasiveSpecie"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"invasive_specie","name__orig":"invasive_specie","Name":"InvasiveSpecie","name_":"invasive_specie","name-":"invasive-specie","NAME":"INVASIVE_SPECIE","index$":6}, {"active":true,"entity":"invasive_specie","key$":"BasicInvasiveSpecieFlow","kind":"basic","name":"BasicInvasiveSpecieFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"invasive_specie_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"invasive_specie_ref01","srcdatavar":"invasive_specie_ref01_data","suffix":"_dt0"},"match":{"id":"invasive_specie01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-invasive_specie_ref01"}}],"index$":1}]}, 'InvasiveSpecie')
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
  
