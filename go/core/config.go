package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "ColombiaPublic",
			"slug": "colombia-public",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://api-colombia.com/api/v1",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"airport": map[string]any{},
				"category_natural_area": map[string]any{},
				"constitution_article": map[string]any{},
				"country": map[string]any{},
				"department": map[string]any{},
				"holiday": map[string]any{},
				"invasive_specie": map[string]any{},
				"map": map[string]any{},
				"native_community": map[string]any{},
				"natural_area": map[string]any{},
				"president": map[string]any{},
				"radio": map[string]any{},
				"region": map[string]any{},
				"touristic_attraction": map[string]any{},
				"typical_dish": map[string]any{},
			},
		},
		"entity": map[string]any{
			"airport": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "cityId",
						"short": "City ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "code",
						"short": "IATA code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "departmentId",
						"short": "Department ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"short": "Airport ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "latitude",
						"short": "Latitude coordinate",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "longitude",
						"short": "Longitude coordinate",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"short": "Airport name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"short": "Airport type",
						"type": "`$STRING`",
					},
				},
				"name": "airport",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/Airport",
								"parts": []any{
									"Airport",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/Airport/{id}",
								"parts": []any{
									"Airport",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"category_natural_area": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"short": "Category description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Category ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Category name",
						"type": "`$STRING`",
					},
				},
				"name": "category_natural_area",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/CategoryNaturalArea",
								"parts": []any{
									"CategoryNaturalArea",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"constitution_article": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "articleNumber",
						"short": "Article number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "chapter",
						"short": "Constitution chapter",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "Article content",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Article ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "title",
						"short": "Article title",
						"type": "`$STRING`",
					},
				},
				"name": "constitution_article",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/ConstitutionArticle",
								"parts": []any{
									"ConstitutionArticle",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/ConstitutionArticle/{id}",
								"parts": []any{
									"ConstitutionArticle",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"country": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "capital",
						"short": "Capital city",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "currency",
						"short": "Currency",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "flag",
						"short": "URL to flag image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Country ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "languages",
						"short": "Official languages",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "name",
						"short": "Country name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "population",
						"short": "Total population",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "surface",
						"short": "Surface area in square kilometers",
						"type": "`$NUMBER`",
					},
				},
				"name": "country",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/Country/Colombia",
								"parts": []any{
									"Country",
									"Colombia",
								},
								"select": map[string]any{
									"$action": "colombia",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.languages`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"department": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "cityCapital",
						"short": "Capital city of the department",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "Department description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Department ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "municipalities",
						"short": "Number of municipalities",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Department name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "population",
						"short": "Population",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "regionId",
						"short": "Region ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "surface",
						"short": "Surface area",
						"type": "`$NUMBER`",
					},
				},
				"name": "department",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/Department",
								"parts": []any{
									"Department",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/Department/{id}",
								"parts": []any{
									"Department",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"holiday": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "date",
						"short": "Holiday date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "Holiday description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Holiday ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Holiday name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"short": "Holiday type (religious, civic, etc.)",
						"type": "`$STRING`",
					},
				},
				"name": "holiday",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/Holiday",
								"parts": []any{
									"Holiday",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/Holiday/{id}",
								"parts": []any{
									"Holiday",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"invasive_specie": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"short": "Invasive species ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "impact",
						"short": "Environmental impact",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "manage",
						"short": "Management strategies",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Species name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "scientificName",
						"short": "Scientific name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "urlImage",
						"short": "URL to species image",
						"type": "`$STRING`",
					},
				},
				"name": "invasive_specie",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/InvasiveSpecie",
								"parts": []any{
									"InvasiveSpecie",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/InvasiveSpecie/{id}",
								"parts": []any{
									"InvasiveSpecie",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"map": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "departmentId",
						"short": "Department ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "description",
						"short": "Map description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Map ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Map name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "urlImages",
						"short": "URLs to map images",
						"type": "`$ARRAY`",
					},
				},
				"name": "map",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/Map",
								"parts": []any{
									"Map",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"native_community": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "departmentId",
						"short": "Department ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "description",
						"short": "Community description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Native community ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Community name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "population",
						"short": "Population",
						"type": "`$INTEGER`",
					},
				},
				"name": "native_community",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/NativeCommunity",
								"parts": []any{
									"NativeCommunity",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/NativeCommunity/{id}",
								"parts": []any{
									"NativeCommunity",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"natural_area": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "areaGroupId",
						"short": "Area group ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "categoryNaturalAreaId",
						"short": "Category ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "departmentId",
						"short": "Department ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "description",
						"short": "Natural area description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Natural area ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "landArea",
						"short": "Land area in hectares",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "maritimeArea",
						"short": "Maritime area in hectares",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"short": "Natural area name",
						"type": "`$STRING`",
					},
				},
				"name": "natural_area",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/NaturalArea",
								"parts": []any{
									"NaturalArea",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/NaturalArea/{id}",
								"parts": []any{
									"NaturalArea",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"president": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"short": "Biography and description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "endPeriodDate",
						"short": "End date of presidency",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "President ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "image",
						"short": "URL to president image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "President name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "politicalParty",
						"short": "Political party",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "startPeriodDate",
						"short": "Start date of presidency",
						"type": "`$STRING`",
					},
				},
				"name": "president",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/President",
								"parts": []any{
									"President",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/President/{id}",
								"parts": []any{
									"President",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"radio": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "band",
						"short": "Broadcasting band (AM/FM)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "frequency",
						"short": "Broadcasting frequency",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Radio station ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Radio station name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"short": "Station URL",
						"type": "`$STRING`",
					},
				},
				"name": "radio",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/Radio",
								"parts": []any{
									"Radio",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/Radio/{id}",
								"parts": []any{
									"Radio",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"region": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "departments",
						"short": "List of departments in the region",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "description",
						"short": "Region description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Region ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Region name",
						"type": "`$STRING`",
					},
				},
				"name": "region",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/Region",
								"parts": []any{
									"Region",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/Region/{id}",
								"parts": []any{
									"Region",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"touristic_attraction": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "city",
						"short": "City where the attraction is located",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "Attraction description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Touristic attraction ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "images",
						"short": "List of image URLs",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "latitude",
						"short": "Latitude coordinate",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "longitude",
						"short": "Longitude coordinate",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"short": "Attraction name",
						"type": "`$STRING`",
					},
				},
				"name": "touristic_attraction",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/TouristicAttraction",
								"parts": []any{
									"TouristicAttraction",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/TouristicAttraction/{id}",
								"parts": []any{
									"TouristicAttraction",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"typical_dish": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "departmentId",
						"short": "Department ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "description",
						"short": "Dish description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Typical dish ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "ingredients",
						"short": "List of ingredients",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "name",
						"short": "Dish name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "urlImage",
						"short": "URL to dish image",
						"type": "`$STRING`",
					},
				},
				"name": "typical_dish",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/TypicalDish",
								"parts": []any{
									"TypicalDish",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/TypicalDish/{id}",
								"parts": []any{
									"TypicalDish",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
