

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


describe('PresidentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COLOMBIA_PUBLIC_TEST_LIVE=TRUE.
  afterEach(liveDelay('COLOMBIA_PUBLIC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ColombiaPublicSDK.test()
    const ent = testsdk.President()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COLOMBIA_PUBLIC_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'president.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Biography and description","t":"`$STRING`","key$":"description","index$":0},"endPeriodDate":{"a":true,"fo":"date","h":"End Period Date","n":"endPeriodDate","r":false,"sh":"End date of presidency","t":"`$STRING`","key$":"endPeriodDate","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"President ID","t":"`$INTEGER`","key$":"id","index$":2},"image":{"a":true,"h":"Image","n":"image","r":false,"sh":"URL to president image","t":"`$STRING`","key$":"image","index$":3},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"President name","t":"`$STRING`","key$":"name","index$":4},"politicalParty":{"a":true,"h":"Political Party","n":"politicalParty","r":false,"sh":"Political party","t":"`$STRING`","key$":"politicalParty","index$":5},"startPeriodDate":{"a":true,"fo":"date","h":"Start Period Date","n":"startPeriodDate","r":false,"sh":"Start date of presidency","t":"`$STRING`","key$":"startPeriodDate","index$":6}},"id":{"field":"id","name":"id"},"name":"president","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /President","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/President","q":{},"r":{},"s":[{"lit":"President"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /President/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/President/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"President"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"president","name__orig":"president","Name":"President","name_":"president","name-":"president","NAME":"PRESIDENT","index$":10}, {"active":true,"entity":"president","key$":"BasicPresidentFlow","kind":"basic","name":"BasicPresidentFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"president_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"president_ref01","srcdatavar":"president_ref01_data","suffix":"_dt0"},"m":{"id":"president01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-president_ref01"}}],"index$":1}]}, 'President', {"GET /President":{"protocol":"http","operationId":"getPresidents","responses":{"200":{"description":"Successful response with list of presidents","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"President ID","key$":"id"},"name":{"type":"string","description":"President name","key$":"name"},"description":{"type":"string","description":"Biography and description","key$":"description"},"startPeriodDate":{"type":"string","format":"date","description":"Start date of presidency","key$":"startPeriodDate"},"endPeriodDate":{"type":"string","format":"date","description":"End date of presidency","key$":"endPeriodDate"},"politicalParty":{"type":"string","description":"Political party","key$":"politicalParty"},"image":{"type":"string","description":"URL to president image","key$":"image"}},"x-ref":"#/components/schemas/President","index$":0}}}}},"500":{"description":"Internal server error"}},"parameters":[],"security":[],"securitySource":"definition","securitySchemes":{}},"GET /President/{id}":{"protocol":"http","operationId":"getPresidentById","responses":{"200":{"description":"Successful response with president information","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"integer","description":"President ID","key$":"id"},"name":{"type":"string","description":"President name","key$":"name"},"description":{"type":"string","description":"Biography and description","key$":"description"},"startPeriodDate":{"type":"string","format":"date","description":"Start date of presidency","key$":"startPeriodDate"},"endPeriodDate":{"type":"string","format":"date","description":"End date of presidency","key$":"endPeriodDate"},"politicalParty":{"type":"string","description":"Political party","key$":"politicalParty"},"image":{"type":"string","description":"URL to president image","key$":"image"}},"x-ref":"#/components/schemas/President","index$":0}}}},"404":{"description":"President not found"},"500":{"description":"Internal server error"}},"parameters":[{"name":"id","in":"path","required":true,"description":"President ID","schema":{"type":"integer"},"index$":0}],"security":[],"securitySource":"definition","securitySchemes":{}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let president_ref01_data = Object.values(setup.data.existing.president)[0] as any

    // LIST
    const president_ref01_ent = client.President()
    const president_ref01_match: any = {}

    const president_ref01_list = (await president_ref01_ent.list(president_ref01_match)).map((e: any) => e.data())


    // LOAD
    const president_ref01_match_dt0: any = {}
    president_ref01_match_dt0.id = president_ref01_data.id
    const president_ref01_data_dt0 = (await president_ref01_ent.load(president_ref01_match_dt0)).data()
    assert(president_ref01_data_dt0.id === president_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/president/PresidentTestData.json')

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
    ['president01','president02','president03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COLOMBIA_PUBLIC_TEST_PRESIDENT_ENTID': idmap,
    'COLOMBIA_PUBLIC_TEST_LIVE': 'FALSE',
    'COLOMBIA_PUBLIC_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['COLOMBIA_PUBLIC_TEST_PRESIDENT_ENTID']

  const live = 'TRUE' === env.COLOMBIA_PUBLIC_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COLOMBIA_PUBLIC_TEST_PRESIDENT_ENTID']
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
  
