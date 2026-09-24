

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


describe('DepartmentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COLOMBIA_PUBLIC_TEST_LIVE=TRUE.
  afterEach(liveDelay('COLOMBIA_PUBLIC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ColombiaPublicSDK.test()
    const ent = testsdk.Department()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COLOMBIA_PUBLIC_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'department.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"cityCapital":{"a":true,"h":"City Capital","n":"cityCapital","r":false,"sh":"Capital city of the department","t":"`$STRING`","key$":"cityCapital","index$":0},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Department description","t":"`$STRING`","key$":"description","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Department ID","t":"`$INTEGER`","key$":"id","index$":2},"municipalities":{"a":true,"h":"Municipalities","n":"municipalities","r":false,"sh":"Number of municipalities","t":"`$INTEGER`","key$":"municipalities","index$":3},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Department name","t":"`$STRING`","key$":"name","index$":4},"population":{"a":true,"h":"Population","n":"population","r":false,"sh":"Population","t":"`$INTEGER`","key$":"population","index$":5},"regionId":{"a":true,"h":"Region Id","n":"regionId","r":false,"sh":"Region ID","t":"`$INTEGER`","key$":"regionId","index$":6},"surface":{"a":true,"h":"Surface","n":"surface","r":false,"sh":"Surface area","t":"`$NUMBER`","key$":"surface","index$":7}},"id":{"field":"id","name":"id"},"name":"department","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /Department","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/Department","q":{},"r":{},"s":[{"lit":"Department"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /Department/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/Department/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"Department"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"department","name__orig":"department","Name":"Department","name_":"department","name-":"department","NAME":"DEPARTMENT","index$":4}, {"active":true,"entity":"department","key$":"BasicDepartmentFlow","kind":"basic","name":"BasicDepartmentFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"department_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"department_ref01","srcdatavar":"department_ref01_data","suffix":"_dt0"},"m":{"id":"department01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-department_ref01"}}],"index$":1}]}, 'Department', {"GET /Department":{"protocol":"http","operationId":"getDepartments","responses":{"200":{"description":"Successful response with list of departments","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Department ID","key$":"id"},"name":{"type":"string","description":"Department name","key$":"name"},"description":{"type":"string","description":"Department description","key$":"description"},"cityCapital":{"type":"string","description":"Capital city of the department","key$":"cityCapital"},"municipalities":{"type":"integer","description":"Number of municipalities","key$":"municipalities"},"surface":{"type":"number","description":"Surface area","key$":"surface"},"population":{"type":"integer","description":"Population","key$":"population"},"regionId":{"type":"integer","description":"Region ID","key$":"regionId"}},"x-ref":"#/components/schemas/Department","index$":0}}}}},"500":{"description":"Internal server error"}},"parameters":[],"security":[],"securitySource":"definition","securitySchemes":{}},"GET /Department/{id}":{"protocol":"http","operationId":"getDepartmentById","responses":{"200":{"description":"Successful response with department information","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"integer","description":"Department ID","key$":"id"},"name":{"type":"string","description":"Department name","key$":"name"},"description":{"type":"string","description":"Department description","key$":"description"},"cityCapital":{"type":"string","description":"Capital city of the department","key$":"cityCapital"},"municipalities":{"type":"integer","description":"Number of municipalities","key$":"municipalities"},"surface":{"type":"number","description":"Surface area","key$":"surface"},"population":{"type":"integer","description":"Population","key$":"population"},"regionId":{"type":"integer","description":"Region ID","key$":"regionId"}},"x-ref":"#/components/schemas/Department","index$":0}}}},"404":{"description":"Department not found"},"500":{"description":"Internal server error"}},"parameters":[{"name":"id","in":"path","required":true,"description":"Department ID","schema":{"type":"integer"},"index$":0}],"security":[],"securitySource":"definition","securitySchemes":{}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let department_ref01_data = Object.values(setup.data.existing.department)[0] as any

    // LIST
    const department_ref01_ent = client.Department()
    const department_ref01_match: any = {}

    const department_ref01_list = (await department_ref01_ent.list(department_ref01_match)).map((e: any) => e.data())


    // LOAD
    const department_ref01_match_dt0: any = {}
    department_ref01_match_dt0.id = department_ref01_data.id
    const department_ref01_data_dt0 = (await department_ref01_ent.load(department_ref01_match_dt0)).data()
    assert(department_ref01_data_dt0.id === department_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/department/DepartmentTestData.json')

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
    ['department01','department02','department03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COLOMBIA_PUBLIC_TEST_DEPARTMENT_ENTID': idmap,
    'COLOMBIA_PUBLIC_TEST_LIVE': 'FALSE',
    'COLOMBIA_PUBLIC_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['COLOMBIA_PUBLIC_TEST_DEPARTMENT_ENTID']

  const live = 'TRUE' === env.COLOMBIA_PUBLIC_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COLOMBIA_PUBLIC_TEST_DEPARTMENT_ENTID']
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
  
