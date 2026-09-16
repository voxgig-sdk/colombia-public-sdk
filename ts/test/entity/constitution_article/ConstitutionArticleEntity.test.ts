

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


describe('ConstitutionArticleEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COLOMBIA_PUBLIC_TEST_LIVE=TRUE.
  afterEach(liveDelay('COLOMBIA_PUBLIC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ColombiaPublicSDK.test()
    const ent = testsdk.ConstitutionArticle()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COLOMBIA_PUBLIC_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'constitution_article.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"articleNumber","req":false,"short":"Article number","type":"`$INTEGER`","index$":0},{"active":true,"name":"chapter","req":false,"short":"Constitution chapter","type":"`$STRING`","index$":1},{"active":true,"name":"description","req":false,"short":"Article content","type":"`$STRING`","index$":2},{"active":true,"name":"id","req":false,"short":"Article ID","type":"`$INTEGER`","index$":3},{"active":true,"name":"title","req":false,"short":"Article title","type":"`$STRING`","index$":4}],"id":{"field":"id","name":"id"},"name":"constitution_article","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /ConstitutionArticle","json":"{\"operationId\":\"getConstitutionArticles\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"articleNumber\":{\"description\":\"Article number\",\"type\":\"integer\"},\"chapter\":{\"description\":\"Constitution chapter\",\"type\":\"string\"},\"description\":{\"description\":\"Article content\",\"type\":\"string\"},\"id\":{\"description\":\"Article ID\",\"type\":\"integer\"},\"title\":{\"description\":\"Article title\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with list of constitution articles\"},\"500\":{\"description\":\"Internal server error\"}},\"security\":[],\"securitySchemes\":{},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/ConstitutionArticle","segments":[{"lit":"ConstitutionArticle"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /ConstitutionArticle/{id}","json":"{\"operationId\":\"getConstitutionArticleById\",\"parameters\":[{\"description\":\"Constitution article ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"articleNumber\":{\"description\":\"Article number\",\"type\":\"integer\"},\"chapter\":{\"description\":\"Constitution chapter\",\"type\":\"string\"},\"description\":{\"description\":\"Article content\",\"type\":\"string\"},\"id\":{\"description\":\"Article ID\",\"type\":\"integer\"},\"title\":{\"description\":\"Article title\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with constitution article information\"},\"404\":{\"description\":\"Constitution article not found\"},\"500\":{\"description\":\"Internal server error\"}},\"security\":[],\"securitySchemes\":{},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/ConstitutionArticle/{id}","segments":[{"lit":"ConstitutionArticle"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"constitution_article","name__orig":"constitution_article","Name":"ConstitutionArticle","name_":"constitution_article","name-":"constitution-article","NAME":"CONSTITUTION_ARTICLE","index$":2}, {"active":true,"entity":"constitution_article","key$":"BasicConstitutionArticleFlow","kind":"basic","name":"BasicConstitutionArticleFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"constitution_article_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"constitution_article_ref01","srcdatavar":"constitution_article_ref01_data","suffix":"_dt0"},"match":{"id":"constitution_article01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-constitution_article_ref01"}}],"index$":1}]}, 'ConstitutionArticle')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let constitution_article_ref01_data = Object.values(setup.data.existing.constitution_article)[0] as any

    // LIST
    const constitution_article_ref01_ent = client.ConstitutionArticle()
    const constitution_article_ref01_match: any = {}

    const constitution_article_ref01_list = (await constitution_article_ref01_ent.list(constitution_article_ref01_match)).map((e: any) => e.data())


    // LOAD
    const constitution_article_ref01_match_dt0: any = {}
    constitution_article_ref01_match_dt0.id = constitution_article_ref01_data.id
    const constitution_article_ref01_data_dt0 = (await constitution_article_ref01_ent.load(constitution_article_ref01_match_dt0)).data()
    assert(constitution_article_ref01_data_dt0.id === constitution_article_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/constitution_article/ConstitutionArticleTestData.json')

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
    ['constitution_article01','constitution_article02','constitution_article03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COLOMBIA_PUBLIC_TEST_CONSTITUTION_ARTICLE_ENTID': idmap,
    'COLOMBIA_PUBLIC_TEST_LIVE': 'FALSE',
    'COLOMBIA_PUBLIC_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['COLOMBIA_PUBLIC_TEST_CONSTITUTION_ARTICLE_ENTID']

  const live = 'TRUE' === env.COLOMBIA_PUBLIC_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COLOMBIA_PUBLIC_TEST_CONSTITUTION_ARTICLE_ENTID']
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
  
