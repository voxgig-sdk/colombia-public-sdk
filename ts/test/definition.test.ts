import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "airport",
    "accessor": "Airport",
    "op": "list",
    "method": "GET",
    "path": "/Airport",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "name": "x",
        "code": "x",
        "type": "x",
        "departmentId": 1,
        "cityId": 1,
        "latitude": 1,
        "longitude": 1
      }
    ],
    "idField": "id"
  },
  {
    "entity": "airport",
    "accessor": "Airport",
    "op": "load",
    "method": "GET",
    "path": "/Airport/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "name": "x",
      "code": "x",
      "type": "x",
      "departmentId": 1,
      "cityId": 1,
      "latitude": 1,
      "longitude": 1
    },
    "idField": "id"
  },
  {
    "entity": "category_natural_area",
    "accessor": "CategoryNaturalArea",
    "op": "list",
    "method": "GET",
    "path": "/CategoryNaturalArea",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "name": "x",
        "description": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "constitution_article",
    "accessor": "ConstitutionArticle",
    "op": "list",
    "method": "GET",
    "path": "/ConstitutionArticle",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "articleNumber": 1,
        "title": "x",
        "description": "x",
        "chapter": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "constitution_article",
    "accessor": "ConstitutionArticle",
    "op": "load",
    "method": "GET",
    "path": "/ConstitutionArticle/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "articleNumber": 1,
      "title": "x",
      "description": "x",
      "chapter": "x"
    },
    "idField": "id"
  },
  {
    "entity": "country",
    "accessor": "Country",
    "op": "list",
    "method": "GET",
    "path": "/Country/Colombia",
    "action": "colombia",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "name": "x",
      "capital": "x",
      "surface": 1,
      "population": 1,
      "languages": [
        "x"
      ],
      "currency": "x",
      "flag": "x"
    },
    "idField": "id"
  },
  {
    "entity": "department",
    "accessor": "Department",
    "op": "list",
    "method": "GET",
    "path": "/Department",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "name": "x",
        "description": "x",
        "cityCapital": "x",
        "municipalities": 1,
        "surface": 1,
        "population": 1,
        "regionId": 1
      }
    ],
    "idField": "id"
  },
  {
    "entity": "department",
    "accessor": "Department",
    "op": "load",
    "method": "GET",
    "path": "/Department/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "name": "x",
      "description": "x",
      "cityCapital": "x",
      "municipalities": 1,
      "surface": 1,
      "population": 1,
      "regionId": 1
    },
    "idField": "id"
  },
  {
    "entity": "holiday",
    "accessor": "Holiday",
    "op": "list",
    "method": "GET",
    "path": "/Holiday",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "name": "x",
        "description": "x",
        "date": "2026-01-01",
        "type": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "holiday",
    "accessor": "Holiday",
    "op": "load",
    "method": "GET",
    "path": "/Holiday/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "name": "x",
      "description": "x",
      "date": "2026-01-01",
      "type": "x"
    },
    "idField": "id"
  },
  {
    "entity": "invasive_specie",
    "accessor": "InvasiveSpecie",
    "op": "list",
    "method": "GET",
    "path": "/InvasiveSpecie",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "name": "x",
        "scientificName": "x",
        "impact": "x",
        "manage": "x",
        "urlImage": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "invasive_specie",
    "accessor": "InvasiveSpecie",
    "op": "load",
    "method": "GET",
    "path": "/InvasiveSpecie/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "name": "x",
      "scientificName": "x",
      "impact": "x",
      "manage": "x",
      "urlImage": "x"
    },
    "idField": "id"
  },
  {
    "entity": "map",
    "accessor": "Map",
    "op": "list",
    "method": "GET",
    "path": "/Map",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "name": "x",
        "description": "x",
        "departmentId": 1,
        "urlImages": [
          "x"
        ]
      }
    ],
    "idField": "id"
  },
  {
    "entity": "native_community",
    "accessor": "NativeCommunity",
    "op": "list",
    "method": "GET",
    "path": "/NativeCommunity",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "name": "x",
        "description": "x",
        "departmentId": 1,
        "population": 1
      }
    ],
    "idField": "id"
  },
  {
    "entity": "native_community",
    "accessor": "NativeCommunity",
    "op": "load",
    "method": "GET",
    "path": "/NativeCommunity/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "name": "x",
      "description": "x",
      "departmentId": 1,
      "population": 1
    },
    "idField": "id"
  },
  {
    "entity": "natural_area",
    "accessor": "NaturalArea",
    "op": "list",
    "method": "GET",
    "path": "/NaturalArea",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "name": "x",
        "description": "x",
        "departmentId": 1,
        "categoryNaturalAreaId": 1,
        "areaGroupId": 1,
        "landArea": 1,
        "maritimeArea": 1
      }
    ],
    "idField": "id"
  },
  {
    "entity": "natural_area",
    "accessor": "NaturalArea",
    "op": "load",
    "method": "GET",
    "path": "/NaturalArea/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "name": "x",
      "description": "x",
      "departmentId": 1,
      "categoryNaturalAreaId": 1,
      "areaGroupId": 1,
      "landArea": 1,
      "maritimeArea": 1
    },
    "idField": "id"
  },
  {
    "entity": "president",
    "accessor": "President",
    "op": "list",
    "method": "GET",
    "path": "/President",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "name": "x",
        "description": "x",
        "startPeriodDate": "2026-01-01",
        "endPeriodDate": "2026-01-01",
        "politicalParty": "x",
        "image": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "president",
    "accessor": "President",
    "op": "load",
    "method": "GET",
    "path": "/President/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "name": "x",
      "description": "x",
      "startPeriodDate": "2026-01-01",
      "endPeriodDate": "2026-01-01",
      "politicalParty": "x",
      "image": "x"
    },
    "idField": "id"
  },
  {
    "entity": "radio",
    "accessor": "Radio",
    "op": "list",
    "method": "GET",
    "path": "/Radio",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "name": "x",
        "url": "x",
        "frequency": "x",
        "band": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "radio",
    "accessor": "Radio",
    "op": "load",
    "method": "GET",
    "path": "/Radio/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "name": "x",
      "url": "x",
      "frequency": "x",
      "band": "x"
    },
    "idField": "id"
  },
  {
    "entity": "region",
    "accessor": "Region",
    "op": "list",
    "method": "GET",
    "path": "/Region",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "name": "x",
        "description": "x",
        "departments": [
          "x"
        ]
      }
    ],
    "idField": "id"
  },
  {
    "entity": "region",
    "accessor": "Region",
    "op": "load",
    "method": "GET",
    "path": "/Region/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "name": "x",
      "description": "x",
      "departments": [
        "x"
      ]
    },
    "idField": "id"
  },
  {
    "entity": "touristic_attraction",
    "accessor": "TouristicAttraction",
    "op": "list",
    "method": "GET",
    "path": "/TouristicAttraction",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "name": "x",
        "description": "x",
        "city": "x",
        "latitude": 1,
        "longitude": 1,
        "images": [
          "x"
        ]
      }
    ],
    "idField": "id"
  },
  {
    "entity": "touristic_attraction",
    "accessor": "TouristicAttraction",
    "op": "load",
    "method": "GET",
    "path": "/TouristicAttraction/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "name": "x",
      "description": "x",
      "city": "x",
      "latitude": 1,
      "longitude": 1,
      "images": [
        "x"
      ]
    },
    "idField": "id"
  },
  {
    "entity": "typical_dish",
    "accessor": "TypicalDish",
    "op": "list",
    "method": "GET",
    "path": "/TypicalDish",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "name": "x",
        "description": "x",
        "ingredients": [
          "x"
        ],
        "departmentId": 1,
        "urlImage": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "typical_dish",
    "accessor": "TypicalDish",
    "op": "load",
    "method": "GET",
    "path": "/TypicalDish/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "name": "x",
      "description": "x",
      "ingredients": [
        "x"
      ],
      "departmentId": 1,
      "urlImage": "x"
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
