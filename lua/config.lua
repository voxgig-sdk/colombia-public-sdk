-- ColombiaPublic SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "ColombiaPublic",
      slug = "colombia-public",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://api-colombia.com/api/v1",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["airport"] = {},
        ["category_natural_area"] = {},
        ["constitution_article"] = {},
        ["country"] = {},
        ["department"] = {},
        ["holiday"] = {},
        ["invasive_specie"] = {},
        ["map"] = {},
        ["native_community"] = {},
        ["natural_area"] = {},
        ["president"] = {},
        ["radio"] = {},
        ["region"] = {},
        ["touristic_attraction"] = {},
        ["typical_dish"] = {},
      },
    },
    entity = {
      ["airport"] = {
        ["fields"] = {
          {
            ["name"] = "cityId",
            ["short"] = "City ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "code",
            ["short"] = "IATA code",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "departmentId",
            ["short"] = "Department ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "id",
            ["short"] = "Airport ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "latitude",
            ["short"] = "Latitude coordinate",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "longitude",
            ["short"] = "Longitude coordinate",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "name",
            ["short"] = "Airport name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "type",
            ["short"] = "Airport type",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "airport",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/Airport",
                ["segments"] = {
                  {
                    ["lit"] = "Airport",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "Airport",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/Airport/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "Airport",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "Airport",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["category_natural_area"] = {
        ["fields"] = {
          {
            ["name"] = "description",
            ["short"] = "Category description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "Category ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "name",
            ["short"] = "Category name",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "category_natural_area",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/CategoryNaturalArea",
                ["segments"] = {
                  {
                    ["lit"] = "CategoryNaturalArea",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "CategoryNaturalArea",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["constitution_article"] = {
        ["fields"] = {
          {
            ["name"] = "articleNumber",
            ["short"] = "Article number",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "chapter",
            ["short"] = "Constitution chapter",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "description",
            ["short"] = "Article content",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "Article ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "title",
            ["short"] = "Article title",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "constitution_article",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/ConstitutionArticle",
                ["segments"] = {
                  {
                    ["lit"] = "ConstitutionArticle",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "ConstitutionArticle",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/ConstitutionArticle/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "ConstitutionArticle",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "ConstitutionArticle",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["country"] = {
        ["fields"] = {
          {
            ["name"] = "capital",
            ["short"] = "Capital city",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "currency",
            ["short"] = "Currency",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "flag",
            ["short"] = "URL to flag image",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "Country ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "languages",
            ["short"] = "Official languages",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "name",
            ["short"] = "Country name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "population",
            ["short"] = "Total population",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "surface",
            ["short"] = "Surface area in square kilometers",
            ["type"] = "`$NUMBER`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "country",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/Country/Colombia",
                ["segments"] = {
                  {
                    ["lit"] = "Country",
                  },
                  {
                    ["lit"] = "Colombia",
                  },
                },
                ["select"] = {
                  ["$action"] = "colombia",
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.languages`",
                },
                ["parts"] = {
                  "Country",
                  "Colombia",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["department"] = {
        ["fields"] = {
          {
            ["name"] = "cityCapital",
            ["short"] = "Capital city of the department",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "description",
            ["short"] = "Department description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "Department ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "municipalities",
            ["short"] = "Number of municipalities",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "name",
            ["short"] = "Department name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "population",
            ["short"] = "Population",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "regionId",
            ["short"] = "Region ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "surface",
            ["short"] = "Surface area",
            ["type"] = "`$NUMBER`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "department",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/Department",
                ["segments"] = {
                  {
                    ["lit"] = "Department",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "Department",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/Department/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "Department",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "Department",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["holiday"] = {
        ["fields"] = {
          {
            ["format"] = "date",
            ["name"] = "date",
            ["short"] = "Holiday date",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "description",
            ["short"] = "Holiday description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "Holiday ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "name",
            ["short"] = "Holiday name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "type",
            ["short"] = "Holiday type (religious, civic, etc.)",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "holiday",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/Holiday",
                ["segments"] = {
                  {
                    ["lit"] = "Holiday",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "Holiday",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/Holiday/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "Holiday",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "Holiday",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["invasive_specie"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["short"] = "Invasive species ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "impact",
            ["short"] = "Environmental impact",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "manage",
            ["short"] = "Management strategies",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["short"] = "Species name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "scientificName",
            ["short"] = "Scientific name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "urlImage",
            ["short"] = "URL to species image",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "invasive_specie",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/InvasiveSpecie",
                ["segments"] = {
                  {
                    ["lit"] = "InvasiveSpecie",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "InvasiveSpecie",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/InvasiveSpecie/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "InvasiveSpecie",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "InvasiveSpecie",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["map"] = {
        ["fields"] = {
          {
            ["name"] = "departmentId",
            ["short"] = "Department ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "description",
            ["short"] = "Map description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "Map ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "name",
            ["short"] = "Map name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "urlImages",
            ["short"] = "URLs to map images",
            ["type"] = "`$ARRAY`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "map",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/Map",
                ["segments"] = {
                  {
                    ["lit"] = "Map",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "Map",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["native_community"] = {
        ["fields"] = {
          {
            ["name"] = "departmentId",
            ["short"] = "Department ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "description",
            ["short"] = "Community description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "Native community ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "name",
            ["short"] = "Community name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "population",
            ["short"] = "Population",
            ["type"] = "`$INTEGER`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "native_community",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/NativeCommunity",
                ["segments"] = {
                  {
                    ["lit"] = "NativeCommunity",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "NativeCommunity",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/NativeCommunity/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "NativeCommunity",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "NativeCommunity",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["natural_area"] = {
        ["fields"] = {
          {
            ["name"] = "areaGroupId",
            ["short"] = "Area group ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "categoryNaturalAreaId",
            ["short"] = "Category ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "departmentId",
            ["short"] = "Department ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "description",
            ["short"] = "Natural area description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "Natural area ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "landArea",
            ["short"] = "Land area in hectares",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "maritimeArea",
            ["short"] = "Maritime area in hectares",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "name",
            ["short"] = "Natural area name",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "natural_area",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/NaturalArea",
                ["segments"] = {
                  {
                    ["lit"] = "NaturalArea",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "NaturalArea",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/NaturalArea/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "NaturalArea",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "NaturalArea",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["president"] = {
        ["fields"] = {
          {
            ["name"] = "description",
            ["short"] = "Biography and description",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "date",
            ["name"] = "endPeriodDate",
            ["short"] = "End date of presidency",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "President ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "image",
            ["short"] = "URL to president image",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["short"] = "President name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "politicalParty",
            ["short"] = "Political party",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "date",
            ["name"] = "startPeriodDate",
            ["short"] = "Start date of presidency",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "president",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/President",
                ["segments"] = {
                  {
                    ["lit"] = "President",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "President",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/President/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "President",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "President",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["radio"] = {
        ["fields"] = {
          {
            ["name"] = "band",
            ["short"] = "Broadcasting band (AM/FM)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "frequency",
            ["short"] = "Broadcasting frequency",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "Radio station ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "name",
            ["short"] = "Radio station name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "url",
            ["short"] = "Station URL",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "radio",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/Radio",
                ["segments"] = {
                  {
                    ["lit"] = "Radio",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "Radio",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/Radio/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "Radio",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "Radio",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["region"] = {
        ["fields"] = {
          {
            ["name"] = "departments",
            ["short"] = "List of departments in the region",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "description",
            ["short"] = "Region description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "Region ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "name",
            ["short"] = "Region name",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "region",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/Region",
                ["segments"] = {
                  {
                    ["lit"] = "Region",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "Region",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/Region/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "Region",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "Region",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["touristic_attraction"] = {
        ["fields"] = {
          {
            ["name"] = "city",
            ["short"] = "City where the attraction is located",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "description",
            ["short"] = "Attraction description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "Touristic attraction ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "images",
            ["short"] = "List of image URLs",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "latitude",
            ["short"] = "Latitude coordinate",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "longitude",
            ["short"] = "Longitude coordinate",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "name",
            ["short"] = "Attraction name",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "touristic_attraction",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/TouristicAttraction",
                ["segments"] = {
                  {
                    ["lit"] = "TouristicAttraction",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "TouristicAttraction",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/TouristicAttraction/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "TouristicAttraction",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "TouristicAttraction",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["typical_dish"] = {
        ["fields"] = {
          {
            ["name"] = "departmentId",
            ["short"] = "Department ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "description",
            ["short"] = "Dish description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "Typical dish ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "ingredients",
            ["short"] = "List of ingredients",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "name",
            ["short"] = "Dish name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "urlImage",
            ["short"] = "URL to dish image",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "typical_dish",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/TypicalDish",
                ["segments"] = {
                  {
                    ["lit"] = "TypicalDish",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "TypicalDish",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/TypicalDish/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "TypicalDish",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "TypicalDish",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
