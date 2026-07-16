
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: 'https://api-colombia.com/api/v1',

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
          "active": true,
          "name": "city_id",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 0
        },
        {
          "active": true,
          "name": "code",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "department_id",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 2
        },
        {
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 3
        },
        {
          "active": true,
          "name": "latitude",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 4
        },
        {
          "active": true,
          "name": "longitude",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 5
        },
        {
          "active": true,
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "index$": 6
        },
        {
          "active": true,
          "name": "type",
          "req": false,
          "type": "`$STRING`",
          "index$": 7
        }
      ],
      "name": "airport",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/Airport",
              "parts": [
                "Airport"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  }
                ]
              },
              "method": "GET",
              "orig": "/Airport/{id}",
              "parts": [
                "Airport",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "category_natural_area": {
      "fields": [
        {
          "active": true,
          "name": "description",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 1
        },
        {
          "active": true,
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        }
      ],
      "name": "category_natural_area",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/CategoryNaturalArea",
              "parts": [
                "CategoryNaturalArea"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "constitution_article": {
      "fields": [
        {
          "active": true,
          "name": "article_number",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 0
        },
        {
          "active": true,
          "name": "chapter",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "description",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 3
        },
        {
          "active": true,
          "name": "title",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        }
      ],
      "name": "constitution_article",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/ConstitutionArticle",
              "parts": [
                "ConstitutionArticle"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  }
                ]
              },
              "method": "GET",
              "orig": "/ConstitutionArticle/{id}",
              "parts": [
                "ConstitutionArticle",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "country": {
      "fields": [
        {
          "active": true,
          "name": "capital",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "currency",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "flag",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 3
        },
        {
          "active": true,
          "name": "language",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 4
        },
        {
          "active": true,
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "index$": 5
        },
        {
          "active": true,
          "name": "population",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 6
        },
        {
          "active": true,
          "name": "surface",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 7
        }
      ],
      "name": "country",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/Country/Colombia",
              "parts": [
                "Country",
                "Colombia"
              ],
              "select": {
                "$action": "colombia"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "department": {
      "fields": [
        {
          "active": true,
          "name": "city_capital",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "description",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 2
        },
        {
          "active": true,
          "name": "municipality",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 3
        },
        {
          "active": true,
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "population",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 5
        },
        {
          "active": true,
          "name": "region_id",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 6
        },
        {
          "active": true,
          "name": "surface",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 7
        }
      ],
      "name": "department",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/Department",
              "parts": [
                "Department"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  }
                ]
              },
              "method": "GET",
              "orig": "/Department/{id}",
              "parts": [
                "Department",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "holiday": {
      "fields": [
        {
          "active": true,
          "name": "date",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "description",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 2
        },
        {
          "active": true,
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "type",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        }
      ],
      "name": "holiday",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/Holiday",
              "parts": [
                "Holiday"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  }
                ]
              },
              "method": "GET",
              "orig": "/Holiday/{id}",
              "parts": [
                "Holiday",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "invasive_specie": {
      "fields": [
        {
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 0
        },
        {
          "active": true,
          "name": "impact",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "manage",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "scientific_name",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "url_image",
          "req": false,
          "type": "`$STRING`",
          "index$": 5
        }
      ],
      "name": "invasive_specie",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/InvasiveSpecie",
              "parts": [
                "InvasiveSpecie"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  }
                ]
              },
              "method": "GET",
              "orig": "/InvasiveSpecie/{id}",
              "parts": [
                "InvasiveSpecie",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "map": {
      "fields": [
        {
          "active": true,
          "name": "department_id",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 0
        },
        {
          "active": true,
          "name": "description",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 2
        },
        {
          "active": true,
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "url_image",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 4
        }
      ],
      "name": "map",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/Map",
              "parts": [
                "Map"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "native_community": {
      "fields": [
        {
          "active": true,
          "name": "department_id",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 0
        },
        {
          "active": true,
          "name": "description",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 2
        },
        {
          "active": true,
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "population",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 4
        }
      ],
      "name": "native_community",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/NativeCommunity",
              "parts": [
                "NativeCommunity"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  }
                ]
              },
              "method": "GET",
              "orig": "/NativeCommunity/{id}",
              "parts": [
                "NativeCommunity",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "natural_area": {
      "fields": [
        {
          "active": true,
          "name": "area_group_id",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 0
        },
        {
          "active": true,
          "name": "category_natural_area_id",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 1
        },
        {
          "active": true,
          "name": "department_id",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 2
        },
        {
          "active": true,
          "name": "description",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 4
        },
        {
          "active": true,
          "name": "land_area",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 5
        },
        {
          "active": true,
          "name": "maritime_area",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 6
        },
        {
          "active": true,
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "index$": 7
        }
      ],
      "name": "natural_area",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/NaturalArea",
              "parts": [
                "NaturalArea"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  }
                ]
              },
              "method": "GET",
              "orig": "/NaturalArea/{id}",
              "parts": [
                "NaturalArea",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "president": {
      "fields": [
        {
          "active": true,
          "name": "description",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "end_period_date",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 2
        },
        {
          "active": true,
          "name": "image",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "political_party",
          "req": false,
          "type": "`$STRING`",
          "index$": 5
        },
        {
          "active": true,
          "name": "start_period_date",
          "req": false,
          "type": "`$STRING`",
          "index$": 6
        }
      ],
      "name": "president",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/President",
              "parts": [
                "President"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  }
                ]
              },
              "method": "GET",
              "orig": "/President/{id}",
              "parts": [
                "President",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "radio": {
      "fields": [
        {
          "active": true,
          "name": "band",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "frequency",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 2
        },
        {
          "active": true,
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "url",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        }
      ],
      "name": "radio",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/Radio",
              "parts": [
                "Radio"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  }
                ]
              },
              "method": "GET",
              "orig": "/Radio/{id}",
              "parts": [
                "Radio",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "region": {
      "fields": [
        {
          "active": true,
          "name": "department",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 0
        },
        {
          "active": true,
          "name": "description",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 2
        },
        {
          "active": true,
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        }
      ],
      "name": "region",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/Region",
              "parts": [
                "Region"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  }
                ]
              },
              "method": "GET",
              "orig": "/Region/{id}",
              "parts": [
                "Region",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "touristic_attraction": {
      "fields": [
        {
          "active": true,
          "name": "city",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "description",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 2
        },
        {
          "active": true,
          "name": "image",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 3
        },
        {
          "active": true,
          "name": "latitude",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 4
        },
        {
          "active": true,
          "name": "longitude",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 5
        },
        {
          "active": true,
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "index$": 6
        }
      ],
      "name": "touristic_attraction",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/TouristicAttraction",
              "parts": [
                "TouristicAttraction"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  }
                ]
              },
              "method": "GET",
              "orig": "/TouristicAttraction/{id}",
              "parts": [
                "TouristicAttraction",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "typical_dish": {
      "fields": [
        {
          "active": true,
          "name": "department_id",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 0
        },
        {
          "active": true,
          "name": "description",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 2
        },
        {
          "active": true,
          "name": "ingredient",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 3
        },
        {
          "active": true,
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "url_image",
          "req": false,
          "type": "`$STRING`",
          "index$": 5
        }
      ],
      "name": "typical_dish",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/TypicalDish",
              "parts": [
                "TypicalDish"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
                  }
                ]
              },
              "method": "GET",
              "orig": "/TypicalDish/{id}",
              "parts": [
                "TypicalDish",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
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
  config
}

