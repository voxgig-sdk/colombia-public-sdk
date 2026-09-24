
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'ColombiaPublic',
        slug: "colombia-public",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://api-colombia.com/api/v1",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        airport: {
        },
  
        category_natural_area: {
        },
  
        constitution_article: {
        },
  
        country: {
        },
  
        department: {
        },
  
        holiday: {
        },
  
        invasive_specie: {
        },
  
        map: {
        },
  
        native_community: {
        },
  
        natural_area: {
        },
  
        president: {
        },
  
        radio: {
        },
  
        region: {
        },
  
        touristic_attraction: {
        },
  
        typical_dish: {
        },
  
    }
  }


  entity = {
    "airport": {
      "fields": [
        {
          "name": "cityId",
          "title": "City Id",
          "type": "`$INTEGER`",
          "short": "City ID"
        },
        {
          "name": "code",
          "title": "Code",
          "type": "`$STRING`",
          "short": "IATA code"
        },
        {
          "name": "departmentId",
          "title": "Department Id",
          "type": "`$INTEGER`",
          "short": "Department ID"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Airport ID"
        },
        {
          "name": "latitude",
          "title": "Latitude",
          "type": "`$NUMBER`",
          "short": "Latitude coordinate"
        },
        {
          "name": "longitude",
          "title": "Longitude",
          "type": "`$NUMBER`",
          "short": "Longitude coordinate"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Airport name"
        },
        {
          "name": "type",
          "title": "Type",
          "type": "`$STRING`",
          "short": "Airport type"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "airport",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/Airport",
              "segments": [
                {
                  "lit": "Airport"
                }
              ],
              "parts": [
                "Airport"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/Airport/{id}",
              "segments": [
                {
                  "lit": "Airport"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "Airport",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "category_natural_area": {
      "fields": [
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Category description"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Category ID"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Category name"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "category_natural_area",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/CategoryNaturalArea",
              "segments": [
                {
                  "lit": "CategoryNaturalArea"
                }
              ],
              "parts": [
                "CategoryNaturalArea"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "constitution_article": {
      "fields": [
        {
          "name": "articleNumber",
          "title": "Article Number",
          "type": "`$INTEGER`",
          "short": "Article number"
        },
        {
          "name": "chapter",
          "title": "Chapter",
          "type": "`$STRING`",
          "short": "Constitution chapter"
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Article content"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Article ID"
        },
        {
          "name": "title",
          "title": "Title",
          "type": "`$STRING`",
          "short": "Article title"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "constitution_article",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/ConstitutionArticle",
              "segments": [
                {
                  "lit": "ConstitutionArticle"
                }
              ],
              "parts": [
                "ConstitutionArticle"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/ConstitutionArticle/{id}",
              "segments": [
                {
                  "lit": "ConstitutionArticle"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "ConstitutionArticle",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "country": {
      "fields": [
        {
          "name": "capital",
          "title": "Capital",
          "type": "`$STRING`",
          "short": "Capital city"
        },
        {
          "name": "currency",
          "title": "Currency",
          "type": "`$STRING`",
          "short": "Currency"
        },
        {
          "name": "flag",
          "title": "Flag",
          "type": "`$STRING`",
          "short": "URL to flag image"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Country ID"
        },
        {
          "name": "languages",
          "title": "Languages",
          "type": "`$ARRAY`",
          "short": "Official languages"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Country name"
        },
        {
          "name": "population",
          "title": "Population",
          "type": "`$INTEGER`",
          "short": "Total population"
        },
        {
          "name": "surface",
          "title": "Surface",
          "type": "`$NUMBER`",
          "short": "Surface area in square kilometers"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "country",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/Country/Colombia",
              "segments": [
                {
                  "lit": "Country"
                },
                {
                  "lit": "Colombia"
                }
              ],
              "parts": [
                "Country",
                "Colombia"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.languages`"
              },
              "args": {},
              "select": {
                "$action": "colombia"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "department": {
      "fields": [
        {
          "name": "cityCapital",
          "title": "City Capital",
          "type": "`$STRING`",
          "short": "Capital city of the department"
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Department description"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Department ID"
        },
        {
          "name": "municipalities",
          "title": "Municipalities",
          "type": "`$INTEGER`",
          "short": "Number of municipalities"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Department name"
        },
        {
          "name": "population",
          "title": "Population",
          "type": "`$INTEGER`",
          "short": "Population"
        },
        {
          "name": "regionId",
          "title": "Region Id",
          "type": "`$INTEGER`",
          "short": "Region ID"
        },
        {
          "name": "surface",
          "title": "Surface",
          "type": "`$NUMBER`",
          "short": "Surface area"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "department",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/Department",
              "segments": [
                {
                  "lit": "Department"
                }
              ],
              "parts": [
                "Department"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/Department/{id}",
              "segments": [
                {
                  "lit": "Department"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "Department",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "holiday": {
      "fields": [
        {
          "name": "date",
          "title": "Date",
          "type": "`$STRING`",
          "short": "Holiday date",
          "format": "date"
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Holiday description"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Holiday ID"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Holiday name"
        },
        {
          "name": "type",
          "title": "Type",
          "type": "`$STRING`",
          "short": "Holiday type (religious, civic, etc.)"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "holiday",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/Holiday",
              "segments": [
                {
                  "lit": "Holiday"
                }
              ],
              "parts": [
                "Holiday"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/Holiday/{id}",
              "segments": [
                {
                  "lit": "Holiday"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "Holiday",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "invasive_specie": {
      "fields": [
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Invasive species ID"
        },
        {
          "name": "impact",
          "title": "Impact",
          "type": "`$STRING`",
          "short": "Environmental impact"
        },
        {
          "name": "manage",
          "title": "Manage",
          "type": "`$STRING`",
          "short": "Management strategies"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Species name"
        },
        {
          "name": "scientificName",
          "title": "Scientific Name",
          "type": "`$STRING`",
          "short": "Scientific name"
        },
        {
          "name": "urlImage",
          "title": "Url Image",
          "type": "`$STRING`",
          "short": "URL to species image"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "invasive_specie",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/InvasiveSpecie",
              "segments": [
                {
                  "lit": "InvasiveSpecie"
                }
              ],
              "parts": [
                "InvasiveSpecie"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/InvasiveSpecie/{id}",
              "segments": [
                {
                  "lit": "InvasiveSpecie"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "InvasiveSpecie",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "map": {
      "fields": [
        {
          "name": "departmentId",
          "title": "Department Id",
          "type": "`$INTEGER`",
          "short": "Department ID"
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Map description"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Map ID"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Map name"
        },
        {
          "name": "urlImages",
          "title": "Url Images",
          "type": "`$ARRAY`",
          "short": "URLs to map images"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "map",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/Map",
              "segments": [
                {
                  "lit": "Map"
                }
              ],
              "parts": [
                "Map"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "native_community": {
      "fields": [
        {
          "name": "departmentId",
          "title": "Department Id",
          "type": "`$INTEGER`",
          "short": "Department ID"
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Community description"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Native community ID"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Community name"
        },
        {
          "name": "population",
          "title": "Population",
          "type": "`$INTEGER`",
          "short": "Population"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "native_community",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/NativeCommunity",
              "segments": [
                {
                  "lit": "NativeCommunity"
                }
              ],
              "parts": [
                "NativeCommunity"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/NativeCommunity/{id}",
              "segments": [
                {
                  "lit": "NativeCommunity"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "NativeCommunity",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "natural_area": {
      "fields": [
        {
          "name": "areaGroupId",
          "title": "Area Group Id",
          "type": "`$INTEGER`",
          "short": "Area group ID"
        },
        {
          "name": "categoryNaturalAreaId",
          "title": "Category Natural Area Id",
          "type": "`$INTEGER`",
          "short": "Category ID"
        },
        {
          "name": "departmentId",
          "title": "Department Id",
          "type": "`$INTEGER`",
          "short": "Department ID"
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Natural area description"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Natural area ID"
        },
        {
          "name": "landArea",
          "title": "Land Area",
          "type": "`$NUMBER`",
          "short": "Land area in hectares"
        },
        {
          "name": "maritimeArea",
          "title": "Maritime Area",
          "type": "`$NUMBER`",
          "short": "Maritime area in hectares"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Natural area name"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "natural_area",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/NaturalArea",
              "segments": [
                {
                  "lit": "NaturalArea"
                }
              ],
              "parts": [
                "NaturalArea"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/NaturalArea/{id}",
              "segments": [
                {
                  "lit": "NaturalArea"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "NaturalArea",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "president": {
      "fields": [
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Biography and description"
        },
        {
          "name": "endPeriodDate",
          "title": "End Period Date",
          "type": "`$STRING`",
          "short": "End date of presidency",
          "format": "date"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "President ID"
        },
        {
          "name": "image",
          "title": "Image",
          "type": "`$STRING`",
          "short": "URL to president image"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "President name"
        },
        {
          "name": "politicalParty",
          "title": "Political Party",
          "type": "`$STRING`",
          "short": "Political party"
        },
        {
          "name": "startPeriodDate",
          "title": "Start Period Date",
          "type": "`$STRING`",
          "short": "Start date of presidency",
          "format": "date"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "president",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/President",
              "segments": [
                {
                  "lit": "President"
                }
              ],
              "parts": [
                "President"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/President/{id}",
              "segments": [
                {
                  "lit": "President"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "President",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "radio": {
      "fields": [
        {
          "name": "band",
          "title": "Band",
          "type": "`$STRING`",
          "short": "Broadcasting band (AM/FM)"
        },
        {
          "name": "frequency",
          "title": "Frequency",
          "type": "`$STRING`",
          "short": "Broadcasting frequency"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Radio station ID"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Radio station name"
        },
        {
          "name": "url",
          "title": "Url",
          "type": "`$STRING`",
          "short": "Station URL"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "radio",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/Radio",
              "segments": [
                {
                  "lit": "Radio"
                }
              ],
              "parts": [
                "Radio"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/Radio/{id}",
              "segments": [
                {
                  "lit": "Radio"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "Radio",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "region": {
      "fields": [
        {
          "name": "departments",
          "title": "Departments",
          "type": "`$ARRAY`",
          "short": "List of departments in the region"
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Region description"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Region ID"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Region name"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "region",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/Region",
              "segments": [
                {
                  "lit": "Region"
                }
              ],
              "parts": [
                "Region"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/Region/{id}",
              "segments": [
                {
                  "lit": "Region"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "Region",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "touristic_attraction": {
      "fields": [
        {
          "name": "city",
          "title": "City",
          "type": "`$STRING`",
          "short": "City where the attraction is located"
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Attraction description"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Touristic attraction ID"
        },
        {
          "name": "images",
          "title": "Images",
          "type": "`$ARRAY`",
          "short": "List of image URLs"
        },
        {
          "name": "latitude",
          "title": "Latitude",
          "type": "`$NUMBER`",
          "short": "Latitude coordinate"
        },
        {
          "name": "longitude",
          "title": "Longitude",
          "type": "`$NUMBER`",
          "short": "Longitude coordinate"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Attraction name"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "touristic_attraction",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/TouristicAttraction",
              "segments": [
                {
                  "lit": "TouristicAttraction"
                }
              ],
              "parts": [
                "TouristicAttraction"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/TouristicAttraction/{id}",
              "segments": [
                {
                  "lit": "TouristicAttraction"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "TouristicAttraction",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "typical_dish": {
      "fields": [
        {
          "name": "departmentId",
          "title": "Department Id",
          "type": "`$INTEGER`",
          "short": "Department ID"
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Dish description"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Typical dish ID"
        },
        {
          "name": "ingredients",
          "title": "Ingredients",
          "type": "`$ARRAY`",
          "short": "List of ingredients"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Dish name"
        },
        {
          "name": "urlImage",
          "title": "Url Image",
          "type": "`$STRING`",
          "short": "URL to dish image"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "typical_dish",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/TypicalDish",
              "segments": [
                {
                  "lit": "TypicalDish"
                }
              ],
              "parts": [
                "TypicalDish"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/TypicalDish/{id}",
              "segments": [
                {
                  "lit": "TypicalDish"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "TypicalDish",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

