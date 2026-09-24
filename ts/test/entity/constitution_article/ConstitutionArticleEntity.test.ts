

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"articleNumber":{"a":true,"h":"Article Number","n":"articleNumber","r":false,"sh":"Article number","t":"`$INTEGER`","key$":"articleNumber","index$":0},"chapter":{"a":true,"h":"Chapter","n":"chapter","r":false,"sh":"Constitution chapter","t":"`$STRING`","key$":"chapter","index$":1},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Article content","t":"`$STRING`","key$":"description","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Article ID","t":"`$INTEGER`","key$":"id","index$":3},"title":{"a":true,"h":"Title","n":"title","r":false,"sh":"Article title","t":"`$STRING`","key$":"title","index$":4}},"id":{"field":"id","name":"id"},"name":"constitution_article","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /ConstitutionArticle","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/ConstitutionArticle","q":{},"r":{},"s":[{"lit":"ConstitutionArticle"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /ConstitutionArticle/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/ConstitutionArticle/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"ConstitutionArticle"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"constitution_article","name__orig":"constitution_article","Name":"ConstitutionArticle","name_":"constitution_article","name-":"constitution-article","NAME":"CONSTITUTION_ARTICLE","index$":2}, {"active":true,"entity":"constitution_article","key$":"BasicConstitutionArticleFlow","kind":"basic","name":"BasicConstitutionArticleFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"constitution_article_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"constitution_article_ref01","srcdatavar":"constitution_article_ref01_data","suffix":"_dt0"},"m":{"id":"constitution_article01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-constitution_article_ref01"}}],"index$":1}]}, 'ConstitutionArticle', {"GET /ConstitutionArticle":{"protocol":"http","operationId":"getConstitutionArticles","responses":{"200":{"description":"Successful response with list of constitution articles","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Article ID","key$":"id"},"articleNumber":{"type":"integer","description":"Article number","key$":"articleNumber"},"title":{"type":"string","description":"Article title","key$":"title"},"description":{"type":"string","description":"Article content","key$":"description"},"chapter":{"type":"string","description":"Constitution chapter","key$":"chapter"}},"x-ref":"#/components/schemas/ConstitutionArticle","index$":0}}}}},"500":{"description":"Internal server error"}},"parameters":[],"security":[],"securitySource":"definition","securitySchemes":{}},"GET /ConstitutionArticle/{id}":{"protocol":"http","operationId":"getConstitutionArticleById","responses":{"200":{"description":"Successful response with constitution article information","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"integer","description":"Article ID","key$":"id"},"articleNumber":{"type":"integer","description":"Article number","key$":"articleNumber"},"title":{"type":"string","description":"Article title","key$":"title"},"description":{"type":"string","description":"Article content","key$":"description"},"chapter":{"type":"string","description":"Constitution chapter","key$":"chapter"}},"x-ref":"#/components/schemas/ConstitutionArticle","index$":0}}}},"404":{"description":"Constitution article not found"},"500":{"description":"Internal server error"}},"parameters":[{"name":"id","in":"path","required":true,"description":"Constitution article ID","schema":{"type":"integer"},"index$":0}],"security":[],"securitySource":"definition","securitySchemes":{}}})
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
  
