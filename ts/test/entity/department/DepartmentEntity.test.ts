

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"cityCapital","req":false,"short":"Capital city of the department","type":"`$STRING`","index$":0},{"active":true,"name":"description","req":false,"short":"Department description","type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"short":"Department ID","type":"`$INTEGER`","index$":2},{"active":true,"name":"municipalities","req":false,"short":"Number of municipalities","type":"`$INTEGER`","index$":3},{"active":true,"name":"name","req":false,"short":"Department name","type":"`$STRING`","index$":4},{"active":true,"name":"population","req":false,"short":"Population","type":"`$INTEGER`","index$":5},{"active":true,"name":"regionId","req":false,"short":"Region ID","type":"`$INTEGER`","index$":6},{"active":true,"name":"surface","req":false,"short":"Surface area","type":"`$NUMBER`","index$":7}],"id":{"field":"id","name":"id"},"name":"department","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /Department","json":"{\"operationId\":\"getDepartments\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"cityCapital\":{\"description\":\"Capital city of the department\",\"type\":\"string\"},\"description\":{\"description\":\"Department description\",\"type\":\"string\"},\"id\":{\"description\":\"Department ID\",\"type\":\"integer\"},\"municipalities\":{\"description\":\"Number of municipalities\",\"type\":\"integer\"},\"name\":{\"description\":\"Department name\",\"type\":\"string\"},\"population\":{\"description\":\"Population\",\"type\":\"integer\"},\"regionId\":{\"description\":\"Region ID\",\"type\":\"integer\"},\"surface\":{\"description\":\"Surface area\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with list of departments\"},\"500\":{\"description\":\"Internal server error\"}},\"security\":[],\"securitySchemes\":{},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/Department","segments":[{"lit":"Department"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /Department/{id}","json":"{\"operationId\":\"getDepartmentById\",\"parameters\":[{\"description\":\"Department ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"cityCapital\":{\"description\":\"Capital city of the department\",\"type\":\"string\"},\"description\":{\"description\":\"Department description\",\"type\":\"string\"},\"id\":{\"description\":\"Department ID\",\"type\":\"integer\"},\"municipalities\":{\"description\":\"Number of municipalities\",\"type\":\"integer\"},\"name\":{\"description\":\"Department name\",\"type\":\"string\"},\"population\":{\"description\":\"Population\",\"type\":\"integer\"},\"regionId\":{\"description\":\"Region ID\",\"type\":\"integer\"},\"surface\":{\"description\":\"Surface area\",\"type\":\"number\"}},\"type\":\"object\"}}},\"description\":\"Successful response with department information\"},\"404\":{\"description\":\"Department not found\"},\"500\":{\"description\":\"Internal server error\"}},\"security\":[],\"securitySchemes\":{},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/Department/{id}","segments":[{"lit":"Department"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"department","name__orig":"department","Name":"Department","name_":"department","name-":"department","NAME":"DEPARTMENT","index$":4}, {"active":true,"entity":"department","key$":"BasicDepartmentFlow","kind":"basic","name":"BasicDepartmentFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"department_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"department_ref01","srcdatavar":"department_ref01_data","suffix":"_dt0"},"match":{"id":"department01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-department_ref01"}}],"index$":1}]}, 'Department')
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
  
