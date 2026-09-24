

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


describe('CountryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COLOMBIA_PUBLIC_TEST_LIVE=TRUE.
  afterEach(liveDelay('COLOMBIA_PUBLIC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ColombiaPublicSDK.test()
    const ent = testsdk.Country()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COLOMBIA_PUBLIC_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'country.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"capital":{"a":true,"h":"Capital","n":"capital","r":false,"sh":"Capital city","t":"`$STRING`","key$":"capital","index$":0},"currency":{"a":true,"h":"Currency","n":"currency","r":false,"sh":"Currency","t":"`$STRING`","key$":"currency","index$":1},"flag":{"a":true,"h":"Flag","n":"flag","r":false,"sh":"URL to flag image","t":"`$STRING`","key$":"flag","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Country ID","t":"`$INTEGER`","key$":"id","index$":3},"languages":{"a":true,"h":"Languages","n":"languages","r":false,"sh":"Official languages","t":"`$ARRAY`","key$":"languages","index$":4},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Country name","t":"`$STRING`","key$":"name","index$":5},"population":{"a":true,"h":"Population","n":"population","r":false,"sh":"Total population","t":"`$INTEGER`","key$":"population","index$":6},"surface":{"a":true,"h":"Surface","n":"surface","r":false,"sh":"Surface area in square kilometers","t":"`$NUMBER`","key$":"surface","index$":7}},"id":{"field":"id","name":"id"},"name":"country","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /Country/Colombia","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/Country/Colombia","q":{"$action":"colombia"},"r":{},"s":[{"lit":"Country"},{"lit":"Colombia"}],"t":{"req":"`reqdata`","res":"`body.languages`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"country","name__orig":"country","Name":"Country","name_":"country","name-":"country","NAME":"COUNTRY","index$":3}, {"active":true,"entity":"country","key$":"BasicCountryFlow","kind":"basic","name":"BasicCountryFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"country_ref01"}}],"index$":0}]}, 'Country', {"GET /Country/Colombia":{"protocol":"http","operationId":"getColombiaInfo","responses":{"200":{"description":"Successful response with Colombia information","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"description":"Country ID","key$":"id","type":"integer"},"name":{"description":"Country name","key$":"name","type":"string"},"capital":{"description":"Capital city","key$":"capital","type":"string"},"surface":{"description":"Surface area in square kilometers","key$":"surface","type":"number"},"population":{"description":"Total population","key$":"population","type":"integer"},"languages":{"description":"Official languages","items":{"type":"string"},"key$":"languages","type":"array"},"currency":{"description":"Currency","key$":"currency","type":"string"},"flag":{"description":"URL to flag image","key$":"flag","type":"string"}},"x-ref":"#/components/schemas/Country","index$":0}}}},"404":{"description":"Country information not found"},"500":{"description":"Internal server error"}},"parameters":[],"security":[],"securitySource":"definition","securitySchemes":{}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let country_ref01_data = Object.values(setup.data.existing.country)[0] as any

    // LIST
    const country_ref01_ent = client.Country()
    const country_ref01_match: any = {}

    const country_ref01_list = (await country_ref01_ent.list(country_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/country/CountryTestData.json')

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
    ['country01','country02','country03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COLOMBIA_PUBLIC_TEST_COUNTRY_ENTID': idmap,
    'COLOMBIA_PUBLIC_TEST_LIVE': 'FALSE',
    'COLOMBIA_PUBLIC_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['COLOMBIA_PUBLIC_TEST_COUNTRY_ENTID']

  const live = 'TRUE' === env.COLOMBIA_PUBLIC_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COLOMBIA_PUBLIC_TEST_COUNTRY_ENTID']
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
  
