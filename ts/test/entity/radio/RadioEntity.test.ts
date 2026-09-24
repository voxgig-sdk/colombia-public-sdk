

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"band":{"a":true,"h":"Band","n":"band","r":false,"sh":"Broadcasting band (AM/FM)","t":"`$STRING`","key$":"band","index$":0},"frequency":{"a":true,"h":"Frequency","n":"frequency","r":false,"sh":"Broadcasting frequency","t":"`$STRING`","key$":"frequency","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Radio station ID","t":"`$INTEGER`","key$":"id","index$":2},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Radio station name","t":"`$STRING`","key$":"name","index$":3},"url":{"a":true,"h":"Url","n":"url","r":false,"sh":"Station URL","t":"`$STRING`","key$":"url","index$":4}},"id":{"field":"id","name":"id"},"name":"radio","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /Radio","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/Radio","q":{},"r":{},"s":[{"lit":"Radio"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /Radio/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/Radio/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"Radio"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"radio","name__orig":"radio","Name":"Radio","name_":"radio","name-":"radio","NAME":"RADIO","index$":11}, {"active":true,"entity":"radio","key$":"BasicRadioFlow","kind":"basic","name":"BasicRadioFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"radio_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"radio_ref01","srcdatavar":"radio_ref01_data","suffix":"_dt0"},"m":{"id":"radio01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-radio_ref01"}}],"index$":1}]}, 'Radio', {"GET /Radio":{"protocol":"http","operationId":"getRadioStations","responses":{"200":{"description":"Successful response with list of radio stations","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Radio station ID","key$":"id"},"name":{"type":"string","description":"Radio station name","key$":"name"},"url":{"type":"string","description":"Station URL","key$":"url"},"frequency":{"type":"string","description":"Broadcasting frequency","key$":"frequency"},"band":{"type":"string","description":"Broadcasting band (AM/FM)","key$":"band"}},"x-ref":"#/components/schemas/Radio","index$":0}}}}},"500":{"description":"Internal server error"}},"parameters":[],"security":[],"securitySource":"definition","securitySchemes":{}},"GET /Radio/{id}":{"protocol":"http","operationId":"getRadioById","responses":{"200":{"description":"Successful response with radio station information","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"integer","description":"Radio station ID","key$":"id"},"name":{"type":"string","description":"Radio station name","key$":"name"},"url":{"type":"string","description":"Station URL","key$":"url"},"frequency":{"type":"string","description":"Broadcasting frequency","key$":"frequency"},"band":{"type":"string","description":"Broadcasting band (AM/FM)","key$":"band"}},"x-ref":"#/components/schemas/Radio","index$":0}}}},"404":{"description":"Radio station not found"},"500":{"description":"Internal server error"}},"parameters":[{"name":"id","in":"path","required":true,"description":"Radio station ID","schema":{"type":"integer"},"index$":0}],"security":[],"securitySource":"definition","securitySchemes":{}}})
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
  
