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
				"transport": "base",
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
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/Airport",
								"segments": []any{
									map[string]any{
										"lit": "Airport",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"Airport",
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
								"segments": []any{
									map[string]any{
										"lit": "Airport",
									},
									map[string]any{
										"var": "id",
									},
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
								"parts": []any{
									"Airport",
									"{id}",
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
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/CategoryNaturalArea",
								"segments": []any{
									map[string]any{
										"lit": "CategoryNaturalArea",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"CategoryNaturalArea",
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
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/ConstitutionArticle",
								"segments": []any{
									map[string]any{
										"lit": "ConstitutionArticle",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"ConstitutionArticle",
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
								"segments": []any{
									map[string]any{
										"lit": "ConstitutionArticle",
									},
									map[string]any{
										"var": "id",
									},
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
								"parts": []any{
									"ConstitutionArticle",
									"{id}",
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
								"args": map[string]any{},
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
								"select": map[string]any{
									"$action": "colombia",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.languages`",
								},
								"parts": []any{
									"Country",
									"Colombia",
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
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/Department",
								"segments": []any{
									map[string]any{
										"lit": "Department",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"Department",
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
								"segments": []any{
									map[string]any{
										"lit": "Department",
									},
									map[string]any{
										"var": "id",
									},
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
								"parts": []any{
									"Department",
									"{id}",
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
						"format": "date",
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
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/Holiday",
								"segments": []any{
									map[string]any{
										"lit": "Holiday",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"Holiday",
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
								"segments": []any{
									map[string]any{
										"lit": "Holiday",
									},
									map[string]any{
										"var": "id",
									},
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
								"parts": []any{
									"Holiday",
									"{id}",
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
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/InvasiveSpecie",
								"segments": []any{
									map[string]any{
										"lit": "InvasiveSpecie",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"InvasiveSpecie",
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
								"segments": []any{
									map[string]any{
										"lit": "InvasiveSpecie",
									},
									map[string]any{
										"var": "id",
									},
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
								"parts": []any{
									"InvasiveSpecie",
									"{id}",
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
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/Map",
								"segments": []any{
									map[string]any{
										"lit": "Map",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"Map",
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
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/NativeCommunity",
								"segments": []any{
									map[string]any{
										"lit": "NativeCommunity",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"NativeCommunity",
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
								"segments": []any{
									map[string]any{
										"lit": "NativeCommunity",
									},
									map[string]any{
										"var": "id",
									},
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
								"parts": []any{
									"NativeCommunity",
									"{id}",
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
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/NaturalArea",
								"segments": []any{
									map[string]any{
										"lit": "NaturalArea",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"NaturalArea",
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
								"segments": []any{
									map[string]any{
										"lit": "NaturalArea",
									},
									map[string]any{
										"var": "id",
									},
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
								"parts": []any{
									"NaturalArea",
									"{id}",
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
						"format": "date",
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
						"format": "date",
						"name": "startPeriodDate",
						"short": "Start date of presidency",
						"type": "`$STRING`",
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
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/President",
								"segments": []any{
									map[string]any{
										"lit": "President",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"President",
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
								"segments": []any{
									map[string]any{
										"lit": "President",
									},
									map[string]any{
										"var": "id",
									},
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
								"parts": []any{
									"President",
									"{id}",
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
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/Radio",
								"segments": []any{
									map[string]any{
										"lit": "Radio",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"Radio",
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
								"segments": []any{
									map[string]any{
										"lit": "Radio",
									},
									map[string]any{
										"var": "id",
									},
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
								"parts": []any{
									"Radio",
									"{id}",
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
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/Region",
								"segments": []any{
									map[string]any{
										"lit": "Region",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"Region",
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
								"segments": []any{
									map[string]any{
										"lit": "Region",
									},
									map[string]any{
										"var": "id",
									},
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
								"parts": []any{
									"Region",
									"{id}",
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
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/TouristicAttraction",
								"segments": []any{
									map[string]any{
										"lit": "TouristicAttraction",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"TouristicAttraction",
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
								"segments": []any{
									map[string]any{
										"lit": "TouristicAttraction",
									},
									map[string]any{
										"var": "id",
									},
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
								"parts": []any{
									"TouristicAttraction",
									"{id}",
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
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/TypicalDish",
								"segments": []any{
									map[string]any{
										"lit": "TypicalDish",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"TypicalDish",
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
								"segments": []any{
									map[string]any{
										"lit": "TypicalDish",
									},
									map[string]any{
										"var": "id",
									},
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
								"parts": []any{
									"TypicalDish",
									"{id}",
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
