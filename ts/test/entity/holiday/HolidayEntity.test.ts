

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


describe('HolidayEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COLOMBIA_PUBLIC_TEST_LIVE=TRUE.
  afterEach(liveDelay('COLOMBIA_PUBLIC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ColombiaPublicSDK.test()
    const ent = testsdk.Holiday()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COLOMBIA_PUBLIC_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'holiday.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"date":{"a":true,"fo":"date","h":"Date","n":"date","r":false,"sh":"Holiday date","t":"`$STRING`","key$":"date","index$":0},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Holiday description","t":"`$STRING`","key$":"description","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Holiday ID","t":"`$INTEGER`","key$":"id","index$":2},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Holiday name","t":"`$STRING`","key$":"name","index$":3},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"Holiday type (religious, civic, etc.)","t":"`$STRING`","key$":"type","index$":4}},"id":{"field":"id","name":"id"},"name":"holiday","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /Holiday","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/Holiday","q":{},"r":{},"s":[{"lit":"Holiday"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /Holiday/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/Holiday/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"Holiday"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"holiday","name__orig":"holiday","Name":"Holiday","name_":"holiday","name-":"holiday","NAME":"HOLIDAY","index$":5}, {"active":true,"entity":"holiday","key$":"BasicHolidayFlow","kind":"basic","name":"BasicHolidayFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"holiday_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"holiday_ref01","srcdatavar":"holiday_ref01_data","suffix":"_dt0"},"m":{"id":"holiday01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-holiday_ref01"}}],"index$":1}]}, 'Holiday', {"GET /Holiday":{"protocol":"http","operationId":"getHolidays","responses":{"200":{"description":"Successful response with list of holidays","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Holiday ID","key$":"id"},"name":{"type":"string","description":"Holiday name","key$":"name"},"description":{"type":"string","description":"Holiday description","key$":"description"},"date":{"type":"string","format":"date","description":"Holiday date","key$":"date"},"type":{"type":"string","description":"Holiday type (religious, civic, etc.)","key$":"type"}},"x-ref":"#/components/schemas/Holiday","index$":0}}}}},"500":{"description":"Internal server error"}},"parameters":[],"security":[],"securitySource":"definition","securitySchemes":{}},"GET /Holiday/{id}":{"protocol":"http","operationId":"getHolidayById","responses":{"200":{"description":"Successful response with holiday information","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"integer","description":"Holiday ID","key$":"id"},"name":{"type":"string","description":"Holiday name","key$":"name"},"description":{"type":"string","description":"Holiday description","key$":"description"},"date":{"type":"string","format":"date","description":"Holiday date","key$":"date"},"type":{"type":"string","description":"Holiday type (religious, civic, etc.)","key$":"type"}},"x-ref":"#/components/schemas/Holiday","index$":0}}}},"404":{"description":"Holiday not found"},"500":{"description":"Internal server error"}},"parameters":[{"name":"id","in":"path","required":true,"description":"Holiday ID","schema":{"type":"integer"},"index$":0}],"security":[],"securitySource":"definition","securitySchemes":{}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let holiday_ref01_data = Object.values(setup.data.existing.holiday)[0] as any

    // LIST
    const holiday_ref01_ent = client.Holiday()
    const holiday_ref01_match: any = {}

    const holiday_ref01_list = (await holiday_ref01_ent.list(holiday_ref01_match)).map((e: any) => e.data())


    // LOAD
    const holiday_ref01_match_dt0: any = {}
    holiday_ref01_match_dt0.id = holiday_ref01_data.id
    const holiday_ref01_data_dt0 = (await holiday_ref01_ent.load(holiday_ref01_match_dt0)).data()
    assert(holiday_ref01_data_dt0.id === holiday_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/holiday/HolidayTestData.json')

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
    ['holiday01','holiday02','holiday03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COLOMBIA_PUBLIC_TEST_HOLIDAY_ENTID': idmap,
    'COLOMBIA_PUBLIC_TEST_LIVE': 'FALSE',
    'COLOMBIA_PUBLIC_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['COLOMBIA_PUBLIC_TEST_HOLIDAY_ENTID']

  const live = 'TRUE' === env.COLOMBIA_PUBLIC_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COLOMBIA_PUBLIC_TEST_HOLIDAY_ENTID']
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
  
