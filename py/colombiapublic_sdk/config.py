# ColombiaPublic SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "ColombiaPublic",
            "slug": "colombia-public",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api-colombia.com/api/v1",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "airport": {},
                "category_natural_area": {},
                "constitution_article": {},
                "country": {},
                "department": {},
                "holiday": {},
                "invasive_specie": {},
                "map": {},
                "native_community": {},
                "natural_area": {},
                "president": {},
                "radio": {},
                "region": {},
                "touristic_attraction": {},
                "typical_dish": {},
            },
        },
        "entity": {
      "airport": {
        "fields": [
          {
            "name": "cityId",
            "short": "City ID",
            "type": "`$INTEGER`",
          },
          {
            "name": "code",
            "short": "IATA code",
            "type": "`$STRING`",
          },
          {
            "name": "departmentId",
            "short": "Department ID",
            "type": "`$INTEGER`",
          },
          {
            "name": "id",
            "short": "Airport ID",
            "type": "`$INTEGER`",
          },
          {
            "name": "latitude",
            "short": "Latitude coordinate",
            "type": "`$NUMBER`",
          },
          {
            "name": "longitude",
            "short": "Longitude coordinate",
            "type": "`$NUMBER`",
          },
          {
            "name": "name",
            "short": "Airport name",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "short": "Airport type",
            "type": "`$STRING`",
          },
        ],
        "name": "airport",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/Airport",
                "parts": [
                  "Airport",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/Airport/{id}",
                "parts": [
                  "Airport",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "category_natural_area": {
        "fields": [
          {
            "name": "description",
            "short": "Category description",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Category ID",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "short": "Category name",
            "type": "`$STRING`",
          },
        ],
        "name": "category_natural_area",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/CategoryNaturalArea",
                "parts": [
                  "CategoryNaturalArea",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "constitution_article": {
        "fields": [
          {
            "name": "articleNumber",
            "short": "Article number",
            "type": "`$INTEGER`",
          },
          {
            "name": "chapter",
            "short": "Constitution chapter",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "short": "Article content",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Article ID",
            "type": "`$INTEGER`",
          },
          {
            "name": "title",
            "short": "Article title",
            "type": "`$STRING`",
          },
        ],
        "name": "constitution_article",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/ConstitutionArticle",
                "parts": [
                  "ConstitutionArticle",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/ConstitutionArticle/{id}",
                "parts": [
                  "ConstitutionArticle",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "country": {
        "fields": [
          {
            "name": "capital",
            "short": "Capital city",
            "type": "`$STRING`",
          },
          {
            "name": "currency",
            "short": "Currency",
            "type": "`$STRING`",
          },
          {
            "name": "flag",
            "short": "URL to flag image",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Country ID",
            "type": "`$INTEGER`",
          },
          {
            "name": "languages",
            "short": "Official languages",
            "type": "`$ARRAY`",
          },
          {
            "name": "name",
            "short": "Country name",
            "type": "`$STRING`",
          },
          {
            "name": "population",
            "short": "Total population",
            "type": "`$INTEGER`",
          },
          {
            "name": "surface",
            "short": "Surface area in square kilometers",
            "type": "`$NUMBER`",
          },
        ],
        "name": "country",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/Country/Colombia",
                "parts": [
                  "Country",
                  "Colombia",
                ],
                "select": {
                  "$action": "colombia",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.languages`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "department": {
        "fields": [
          {
            "name": "cityCapital",
            "short": "Capital city of the department",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "short": "Department description",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Department ID",
            "type": "`$INTEGER`",
          },
          {
            "name": "municipalities",
            "short": "Number of municipalities",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "short": "Department name",
            "type": "`$STRING`",
          },
          {
            "name": "population",
            "short": "Population",
            "type": "`$INTEGER`",
          },
          {
            "name": "regionId",
            "short": "Region ID",
            "type": "`$INTEGER`",
          },
          {
            "name": "surface",
            "short": "Surface area",
            "type": "`$NUMBER`",
          },
        ],
        "name": "department",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/Department",
                "parts": [
                  "Department",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/Department/{id}",
                "parts": [
                  "Department",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "holiday": {
        "fields": [
          {
            "name": "date",
            "short": "Holiday date",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "short": "Holiday description",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Holiday ID",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "short": "Holiday name",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "short": "Holiday type (religious, civic, etc.)",
            "type": "`$STRING`",
          },
        ],
        "name": "holiday",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/Holiday",
                "parts": [
                  "Holiday",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/Holiday/{id}",
                "parts": [
                  "Holiday",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "invasive_specie": {
        "fields": [
          {
            "name": "id",
            "short": "Invasive species ID",
            "type": "`$INTEGER`",
          },
          {
            "name": "impact",
            "short": "Environmental impact",
            "type": "`$STRING`",
          },
          {
            "name": "manage",
            "short": "Management strategies",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "short": "Species name",
            "type": "`$STRING`",
          },
          {
            "name": "scientificName",
            "short": "Scientific name",
            "type": "`$STRING`",
          },
          {
            "name": "urlImage",
            "short": "URL to species image",
            "type": "`$STRING`",
          },
        ],
        "name": "invasive_specie",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/InvasiveSpecie",
                "parts": [
                  "InvasiveSpecie",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/InvasiveSpecie/{id}",
                "parts": [
                  "InvasiveSpecie",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "map": {
        "fields": [
          {
            "name": "departmentId",
            "short": "Department ID",
            "type": "`$INTEGER`",
          },
          {
            "name": "description",
            "short": "Map description",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Map ID",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "short": "Map name",
            "type": "`$STRING`",
          },
          {
            "name": "urlImages",
            "short": "URLs to map images",
            "type": "`$ARRAY`",
          },
        ],
        "name": "map",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/Map",
                "parts": [
                  "Map",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "native_community": {
        "fields": [
          {
            "name": "departmentId",
            "short": "Department ID",
            "type": "`$INTEGER`",
          },
          {
            "name": "description",
            "short": "Community description",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Native community ID",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "short": "Community name",
            "type": "`$STRING`",
          },
          {
            "name": "population",
            "short": "Population",
            "type": "`$INTEGER`",
          },
        ],
        "name": "native_community",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/NativeCommunity",
                "parts": [
                  "NativeCommunity",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/NativeCommunity/{id}",
                "parts": [
                  "NativeCommunity",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "natural_area": {
        "fields": [
          {
            "name": "areaGroupId",
            "short": "Area group ID",
            "type": "`$INTEGER`",
          },
          {
            "name": "categoryNaturalAreaId",
            "short": "Category ID",
            "type": "`$INTEGER`",
          },
          {
            "name": "departmentId",
            "short": "Department ID",
            "type": "`$INTEGER`",
          },
          {
            "name": "description",
            "short": "Natural area description",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Natural area ID",
            "type": "`$INTEGER`",
          },
          {
            "name": "landArea",
            "short": "Land area in hectares",
            "type": "`$NUMBER`",
          },
          {
            "name": "maritimeArea",
            "short": "Maritime area in hectares",
            "type": "`$NUMBER`",
          },
          {
            "name": "name",
            "short": "Natural area name",
            "type": "`$STRING`",
          },
        ],
        "name": "natural_area",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/NaturalArea",
                "parts": [
                  "NaturalArea",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/NaturalArea/{id}",
                "parts": [
                  "NaturalArea",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "president": {
        "fields": [
          {
            "name": "description",
            "short": "Biography and description",
            "type": "`$STRING`",
          },
          {
            "name": "endPeriodDate",
            "short": "End date of presidency",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "President ID",
            "type": "`$INTEGER`",
          },
          {
            "name": "image",
            "short": "URL to president image",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "short": "President name",
            "type": "`$STRING`",
          },
          {
            "name": "politicalParty",
            "short": "Political party",
            "type": "`$STRING`",
          },
          {
            "name": "startPeriodDate",
            "short": "Start date of presidency",
            "type": "`$STRING`",
          },
        ],
        "name": "president",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/President",
                "parts": [
                  "President",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/President/{id}",
                "parts": [
                  "President",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "radio": {
        "fields": [
          {
            "name": "band",
            "short": "Broadcasting band (AM/FM)",
            "type": "`$STRING`",
          },
          {
            "name": "frequency",
            "short": "Broadcasting frequency",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Radio station ID",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "short": "Radio station name",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "short": "Station URL",
            "type": "`$STRING`",
          },
        ],
        "name": "radio",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/Radio",
                "parts": [
                  "Radio",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/Radio/{id}",
                "parts": [
                  "Radio",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "region": {
        "fields": [
          {
            "name": "departments",
            "short": "List of departments in the region",
            "type": "`$ARRAY`",
          },
          {
            "name": "description",
            "short": "Region description",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Region ID",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "short": "Region name",
            "type": "`$STRING`",
          },
        ],
        "name": "region",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/Region",
                "parts": [
                  "Region",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/Region/{id}",
                "parts": [
                  "Region",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "touristic_attraction": {
        "fields": [
          {
            "name": "city",
            "short": "City where the attraction is located",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "short": "Attraction description",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Touristic attraction ID",
            "type": "`$INTEGER`",
          },
          {
            "name": "images",
            "short": "List of image URLs",
            "type": "`$ARRAY`",
          },
          {
            "name": "latitude",
            "short": "Latitude coordinate",
            "type": "`$NUMBER`",
          },
          {
            "name": "longitude",
            "short": "Longitude coordinate",
            "type": "`$NUMBER`",
          },
          {
            "name": "name",
            "short": "Attraction name",
            "type": "`$STRING`",
          },
        ],
        "name": "touristic_attraction",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/TouristicAttraction",
                "parts": [
                  "TouristicAttraction",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/TouristicAttraction/{id}",
                "parts": [
                  "TouristicAttraction",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "typical_dish": {
        "fields": [
          {
            "name": "departmentId",
            "short": "Department ID",
            "type": "`$INTEGER`",
          },
          {
            "name": "description",
            "short": "Dish description",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Typical dish ID",
            "type": "`$INTEGER`",
          },
          {
            "name": "ingredients",
            "short": "List of ingredients",
            "type": "`$ARRAY`",
          },
          {
            "name": "name",
            "short": "Dish name",
            "type": "`$STRING`",
          },
          {
            "name": "urlImage",
            "short": "URL to dish image",
            "type": "`$STRING`",
          },
        ],
        "name": "typical_dish",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/TypicalDish",
                "parts": [
                  "TypicalDish",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/TypicalDish/{id}",
                "parts": [
                  "TypicalDish",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
