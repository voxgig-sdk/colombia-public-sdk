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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
						"title": "City Id",
						"type": "`$INTEGER`",
						"short": "City ID",
					},
					map[string]any{
						"name": "code",
						"title": "Code",
						"type": "`$STRING`",
						"short": "IATA code",
					},
					map[string]any{
						"name": "departmentId",
						"title": "Department Id",
						"type": "`$INTEGER`",
						"short": "Department ID",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Airport ID",
					},
					map[string]any{
						"name": "latitude",
						"title": "Latitude",
						"type": "`$NUMBER`",
						"short": "Latitude coordinate",
					},
					map[string]any{
						"name": "longitude",
						"title": "Longitude",
						"type": "`$NUMBER`",
						"short": "Longitude coordinate",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Airport name",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "Airport type",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "airport",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/Airport",
								"segments": []any{
									map[string]any{
										"lit": "Airport",
									},
								},
								"parts": []any{
									"Airport",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/Airport/{id}",
								"segments": []any{
									map[string]any{
										"lit": "Airport",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"Airport",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Description",
						"type": "`$STRING`",
						"short": "Category description",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Category ID",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Category name",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "category_natural_area",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/CategoryNaturalArea",
								"segments": []any{
									map[string]any{
										"lit": "CategoryNaturalArea",
									},
								},
								"parts": []any{
									"CategoryNaturalArea",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Article Number",
						"type": "`$INTEGER`",
						"short": "Article number",
					},
					map[string]any{
						"name": "chapter",
						"title": "Chapter",
						"type": "`$STRING`",
						"short": "Constitution chapter",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Article content",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Article ID",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"short": "Article title",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "constitution_article",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/ConstitutionArticle",
								"segments": []any{
									map[string]any{
										"lit": "ConstitutionArticle",
									},
								},
								"parts": []any{
									"ConstitutionArticle",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/ConstitutionArticle/{id}",
								"segments": []any{
									map[string]any{
										"lit": "ConstitutionArticle",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"ConstitutionArticle",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Capital",
						"type": "`$STRING`",
						"short": "Capital city",
					},
					map[string]any{
						"name": "currency",
						"title": "Currency",
						"type": "`$STRING`",
						"short": "Currency",
					},
					map[string]any{
						"name": "flag",
						"title": "Flag",
						"type": "`$STRING`",
						"short": "URL to flag image",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Country ID",
					},
					map[string]any{
						"name": "languages",
						"title": "Languages",
						"type": "`$ARRAY`",
						"short": "Official languages",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Country name",
					},
					map[string]any{
						"name": "population",
						"title": "Population",
						"type": "`$INTEGER`",
						"short": "Total population",
					},
					map[string]any{
						"name": "surface",
						"title": "Surface",
						"type": "`$NUMBER`",
						"short": "Surface area in square kilometers",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "country",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/Country/Colombia",
								"segments": []any{
									map[string]any{
										"lit": "Country",
									},
									map[string]any{
										"lit": "Colombia",
									},
								},
								"parts": []any{
									"Country",
									"Colombia",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.languages`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "colombia",
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
						"title": "City Capital",
						"type": "`$STRING`",
						"short": "Capital city of the department",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Department description",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Department ID",
					},
					map[string]any{
						"name": "municipalities",
						"title": "Municipalities",
						"type": "`$INTEGER`",
						"short": "Number of municipalities",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Department name",
					},
					map[string]any{
						"name": "population",
						"title": "Population",
						"type": "`$INTEGER`",
						"short": "Population",
					},
					map[string]any{
						"name": "regionId",
						"title": "Region Id",
						"type": "`$INTEGER`",
						"short": "Region ID",
					},
					map[string]any{
						"name": "surface",
						"title": "Surface",
						"type": "`$NUMBER`",
						"short": "Surface area",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "department",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/Department",
								"segments": []any{
									map[string]any{
										"lit": "Department",
									},
								},
								"parts": []any{
									"Department",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/Department/{id}",
								"segments": []any{
									map[string]any{
										"lit": "Department",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"Department",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Date",
						"type": "`$STRING`",
						"short": "Holiday date",
						"format": "date",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Holiday description",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Holiday ID",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Holiday name",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "Holiday type (religious, civic, etc.)",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "holiday",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/Holiday",
								"segments": []any{
									map[string]any{
										"lit": "Holiday",
									},
								},
								"parts": []any{
									"Holiday",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/Holiday/{id}",
								"segments": []any{
									map[string]any{
										"lit": "Holiday",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"Holiday",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Invasive species ID",
					},
					map[string]any{
						"name": "impact",
						"title": "Impact",
						"type": "`$STRING`",
						"short": "Environmental impact",
					},
					map[string]any{
						"name": "manage",
						"title": "Manage",
						"type": "`$STRING`",
						"short": "Management strategies",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Species name",
					},
					map[string]any{
						"name": "scientificName",
						"title": "Scientific Name",
						"type": "`$STRING`",
						"short": "Scientific name",
					},
					map[string]any{
						"name": "urlImage",
						"title": "Url Image",
						"type": "`$STRING`",
						"short": "URL to species image",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "invasive_specie",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/InvasiveSpecie",
								"segments": []any{
									map[string]any{
										"lit": "InvasiveSpecie",
									},
								},
								"parts": []any{
									"InvasiveSpecie",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/InvasiveSpecie/{id}",
								"segments": []any{
									map[string]any{
										"lit": "InvasiveSpecie",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"InvasiveSpecie",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Department Id",
						"type": "`$INTEGER`",
						"short": "Department ID",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Map description",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Map ID",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Map name",
					},
					map[string]any{
						"name": "urlImages",
						"title": "Url Images",
						"type": "`$ARRAY`",
						"short": "URLs to map images",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "map",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/Map",
								"segments": []any{
									map[string]any{
										"lit": "Map",
									},
								},
								"parts": []any{
									"Map",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Department Id",
						"type": "`$INTEGER`",
						"short": "Department ID",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Community description",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Native community ID",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Community name",
					},
					map[string]any{
						"name": "population",
						"title": "Population",
						"type": "`$INTEGER`",
						"short": "Population",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "native_community",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/NativeCommunity",
								"segments": []any{
									map[string]any{
										"lit": "NativeCommunity",
									},
								},
								"parts": []any{
									"NativeCommunity",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/NativeCommunity/{id}",
								"segments": []any{
									map[string]any{
										"lit": "NativeCommunity",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"NativeCommunity",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Area Group Id",
						"type": "`$INTEGER`",
						"short": "Area group ID",
					},
					map[string]any{
						"name": "categoryNaturalAreaId",
						"title": "Category Natural Area Id",
						"type": "`$INTEGER`",
						"short": "Category ID",
					},
					map[string]any{
						"name": "departmentId",
						"title": "Department Id",
						"type": "`$INTEGER`",
						"short": "Department ID",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Natural area description",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Natural area ID",
					},
					map[string]any{
						"name": "landArea",
						"title": "Land Area",
						"type": "`$NUMBER`",
						"short": "Land area in hectares",
					},
					map[string]any{
						"name": "maritimeArea",
						"title": "Maritime Area",
						"type": "`$NUMBER`",
						"short": "Maritime area in hectares",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Natural area name",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "natural_area",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/NaturalArea",
								"segments": []any{
									map[string]any{
										"lit": "NaturalArea",
									},
								},
								"parts": []any{
									"NaturalArea",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/NaturalArea/{id}",
								"segments": []any{
									map[string]any{
										"lit": "NaturalArea",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"NaturalArea",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Description",
						"type": "`$STRING`",
						"short": "Biography and description",
					},
					map[string]any{
						"name": "endPeriodDate",
						"title": "End Period Date",
						"type": "`$STRING`",
						"short": "End date of presidency",
						"format": "date",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "President ID",
					},
					map[string]any{
						"name": "image",
						"title": "Image",
						"type": "`$STRING`",
						"short": "URL to president image",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "President name",
					},
					map[string]any{
						"name": "politicalParty",
						"title": "Political Party",
						"type": "`$STRING`",
						"short": "Political party",
					},
					map[string]any{
						"name": "startPeriodDate",
						"title": "Start Period Date",
						"type": "`$STRING`",
						"short": "Start date of presidency",
						"format": "date",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "president",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/President",
								"segments": []any{
									map[string]any{
										"lit": "President",
									},
								},
								"parts": []any{
									"President",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/President/{id}",
								"segments": []any{
									map[string]any{
										"lit": "President",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"President",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Band",
						"type": "`$STRING`",
						"short": "Broadcasting band (AM/FM)",
					},
					map[string]any{
						"name": "frequency",
						"title": "Frequency",
						"type": "`$STRING`",
						"short": "Broadcasting frequency",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Radio station ID",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Radio station name",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"short": "Station URL",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "radio",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/Radio",
								"segments": []any{
									map[string]any{
										"lit": "Radio",
									},
								},
								"parts": []any{
									"Radio",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/Radio/{id}",
								"segments": []any{
									map[string]any{
										"lit": "Radio",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"Radio",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Departments",
						"type": "`$ARRAY`",
						"short": "List of departments in the region",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Region description",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Region ID",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Region name",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "region",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/Region",
								"segments": []any{
									map[string]any{
										"lit": "Region",
									},
								},
								"parts": []any{
									"Region",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/Region/{id}",
								"segments": []any{
									map[string]any{
										"lit": "Region",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"Region",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "City",
						"type": "`$STRING`",
						"short": "City where the attraction is located",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Attraction description",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Touristic attraction ID",
					},
					map[string]any{
						"name": "images",
						"title": "Images",
						"type": "`$ARRAY`",
						"short": "List of image URLs",
					},
					map[string]any{
						"name": "latitude",
						"title": "Latitude",
						"type": "`$NUMBER`",
						"short": "Latitude coordinate",
					},
					map[string]any{
						"name": "longitude",
						"title": "Longitude",
						"type": "`$NUMBER`",
						"short": "Longitude coordinate",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Attraction name",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "touristic_attraction",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/TouristicAttraction",
								"segments": []any{
									map[string]any{
										"lit": "TouristicAttraction",
									},
								},
								"parts": []any{
									"TouristicAttraction",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/TouristicAttraction/{id}",
								"segments": []any{
									map[string]any{
										"lit": "TouristicAttraction",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"TouristicAttraction",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Department Id",
						"type": "`$INTEGER`",
						"short": "Department ID",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Dish description",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Typical dish ID",
					},
					map[string]any{
						"name": "ingredients",
						"title": "Ingredients",
						"type": "`$ARRAY`",
						"short": "List of ingredients",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Dish name",
					},
					map[string]any{
						"name": "urlImage",
						"title": "Url Image",
						"type": "`$STRING`",
						"short": "URL to dish image",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "typical_dish",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/TypicalDish",
								"segments": []any{
									map[string]any{
										"lit": "TypicalDish",
									},
								},
								"parts": []any{
									"TypicalDish",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/TypicalDish/{id}",
								"segments": []any{
									map[string]any{
										"lit": "TypicalDish",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"TypicalDish",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
