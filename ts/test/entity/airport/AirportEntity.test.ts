

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


describe('AirportEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COLOMBIA_PUBLIC_TEST_LIVE=TRUE.
  afterEach(liveDelay('COLOMBIA_PUBLIC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ColombiaPublicSDK.test()
    const ent = testsdk.Airport()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COLOMBIA_PUBLIC_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'airport.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"cityId":{"a":true,"h":"City Id","n":"cityId","r":false,"sh":"City ID","t":"`$INTEGER`","key$":"cityId","index$":0},"code":{"a":true,"h":"Code","n":"code","r":false,"sh":"IATA code","t":"`$STRING`","key$":"code","index$":1},"departmentId":{"a":true,"h":"Department Id","n":"departmentId","r":false,"sh":"Department ID","t":"`$INTEGER`","key$":"departmentId","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Airport ID","t":"`$INTEGER`","key$":"id","index$":3},"latitude":{"a":true,"h":"Latitude","n":"latitude","r":false,"sh":"Latitude coordinate","t":"`$NUMBER`","key$":"latitude","index$":4},"longitude":{"a":true,"h":"Longitude","n":"longitude","r":false,"sh":"Longitude coordinate","t":"`$NUMBER`","key$":"longitude","index$":5},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Airport name","t":"`$STRING`","key$":"name","index$":6},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"Airport type","t":"`$STRING`","key$":"type","index$":7}},"id":{"field":"id","name":"id"},"name":"airport","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /Airport","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/Airport","q":{},"r":{},"s":[{"lit":"Airport"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /Airport/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/Airport/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"Airport"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"airport","name__orig":"airport","Name":"Airport","name_":"airport","name-":"airport","NAME":"AIRPORT","index$":0}, {"active":true,"entity":"airport","key$":"BasicAirportFlow","kind":"basic","name":"BasicAirportFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"airport_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"airport_ref01","srcdatavar":"airport_ref01_data","suffix":"_dt0"},"m":{"id":"airport01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-airport_ref01"}}],"index$":1}]}, 'Airport', {"GET /Airport":{"protocol":"http","operationId":"getAirports","responses":{"200":{"description":"Successful response with list of airports","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Airport ID","key$":"id"},"name":{"type":"string","description":"Airport name","key$":"name"},"code":{"type":"string","description":"IATA code","key$":"code"},"type":{"type":"string","description":"Airport type","key$":"type"},"departmentId":{"type":"integer","description":"Department ID","key$":"departmentId"},"cityId":{"type":"integer","description":"City ID","key$":"cityId"},"latitude":{"type":"number","description":"Latitude coordinate","key$":"latitude"},"longitude":{"type":"number","description":"Longitude coordinate","key$":"longitude"}},"x-ref":"#/components/schemas/Airport","index$":0}}}}},"500":{"description":"Internal server error"}},"parameters":[],"security":[],"securitySource":"definition","securitySchemes":{}},"GET /Airport/{id}":{"protocol":"http","operationId":"getAirportById","responses":{"200":{"description":"Successful response with airport information","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"integer","description":"Airport ID","key$":"id"},"name":{"type":"string","description":"Airport name","key$":"name"},"code":{"type":"string","description":"IATA code","key$":"code"},"type":{"type":"string","description":"Airport type","key$":"type"},"departmentId":{"type":"integer","description":"Department ID","key$":"departmentId"},"cityId":{"type":"integer","description":"City ID","key$":"cityId"},"latitude":{"type":"number","description":"Latitude coordinate","key$":"latitude"},"longitude":{"type":"number","description":"Longitude coordinate","key$":"longitude"}},"x-ref":"#/components/schemas/Airport","index$":0}}}},"404":{"description":"Airport not found"},"500":{"description":"Internal server error"}},"parameters":[{"name":"id","in":"path","required":true,"description":"Airport ID","schema":{"type":"integer"},"index$":0}],"security":[],"securitySource":"definition","securitySchemes":{}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let airport_ref01_data = Object.values(setup.data.existing.airport)[0] as any

    // LIST
    const airport_ref01_ent = client.Airport()
    const airport_ref01_match: any = {}

    const airport_ref01_list = (await airport_ref01_ent.list(airport_ref01_match)).map((e: any) => e.data())


    // LOAD
    const airport_ref01_match_dt0: any = {}
    airport_ref01_match_dt0.id = airport_ref01_data.id
    const airport_ref01_data_dt0 = (await airport_ref01_ent.load(airport_ref01_match_dt0)).data()
    assert(airport_ref01_data_dt0.id === airport_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/airport/AirportTestData.json')

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
    ['airport01','airport02','airport03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COLOMBIA_PUBLIC_TEST_AIRPORT_ENTID': idmap,
    'COLOMBIA_PUBLIC_TEST_LIVE': 'FALSE',
    'COLOMBIA_PUBLIC_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['COLOMBIA_PUBLIC_TEST_AIRPORT_ENTID']

  const live = 'TRUE' === env.COLOMBIA_PUBLIC_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COLOMBIA_PUBLIC_TEST_AIRPORT_ENTID']
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
  
