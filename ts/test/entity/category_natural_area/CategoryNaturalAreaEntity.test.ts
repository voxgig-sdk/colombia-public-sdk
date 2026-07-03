
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { ColombiaPublicSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('CategoryNaturalAreaEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COLOMBIAPUBLIC_TEST_LIVE=TRUE.
  afterEach(liveDelay('COLOMBIAPUBLIC_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ColombiaPublicSDK.test()
    const ent = testsdk.CategoryNaturalArea()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COLOMBIA_PUBLIC_TEST_LIVE
    for (const op of ['list']) {
      if (maybeSkipControl(t, 'entityOp', 'category_natural_area.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set COLOMBIA_PUBLIC_TEST_CATEGORY_NATURAL_AREA_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let category_natural_area_ref01_data = Object.values(setup.data.existing.category_natural_area)[0] as any

    // LIST
    const category_natural_area_ref01_ent = client.CategoryNaturalArea()
    const category_natural_area_ref01_match: any = {}

    const category_natural_area_ref01_list = await category_natural_area_ref01_ent.list(category_natural_area_ref01_match)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/category_natural_area/CategoryNaturalAreaTestData.json')

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
    ['category_natural_area01','category_natural_area02','category_natural_area03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['COLOMBIA_PUBLIC_TEST_CATEGORY_NATURAL_AREA_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'COLOMBIA_PUBLIC_TEST_CATEGORY_NATURAL_AREA_ENTID': idmap,
    'COLOMBIA_PUBLIC_TEST_LIVE': 'FALSE',
    'COLOMBIA_PUBLIC_TEST_EXPLAIN': 'FALSE',
    'COLOMBIA_PUBLIC_APIKEY': 'NONE',
  })

  idmap = env['COLOMBIA_PUBLIC_TEST_CATEGORY_NATURAL_AREA_ENTID']

  const live = 'TRUE' === env.COLOMBIA_PUBLIC_TEST_LIVE

  if (live) {
    client = new ColombiaPublicSDK(merge([
      {
        apikey: env.COLOMBIA_PUBLIC_APIKEY,
      },
      extra
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
