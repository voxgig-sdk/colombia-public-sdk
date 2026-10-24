package main

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/google/jsonschema-go/jsonschema"
	"github.com/modelcontextprotocol/go-sdk/mcp"
	sdk "github.com/voxgig-sdk/colombia-public-sdk/go"
)

// ListArgs is what an agent sends to colombia-public_list.
type ListArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: airport | category_natural_area | constitution_article | country | department | holiday | invasive_specie | map | native_community | natural_area | president | radio | region | touristic_attraction | typical_dish"`
	Query  map[string]any `json:"query,omitempty" jsonschema:"optional filter map; omit it for the first page"`
}

// LoadArgs is what an agent sends to colombia-public_load.
type LoadArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: airport | constitution_article | department | holiday | invasive_specie | native_community | natural_area | president | radio | region | touristic_attraction | typical_dish"`
	Query  map[string]any `json:"query" jsonschema:"match map naming the record, such as {\"id\":1}"`
}

func registerTools(server *mcp.Server, client *sdk.ColombiaPublicSDK) {
	mcp.AddTool(server, &mcp.Tool{
		Name:        "colombia-public_list",
		Description: "List records from ColombiaPublic. Args: entity, query (optional filter map; omit it for the first page). Returns the first page of records as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[ListArgs]("airport", "category_natural_area", "constitution_article", "country", "department", "holiday", "invasive_specie", "map", "native_community", "natural_area", "president", "radio", "region", "touristic_attraction", "typical_dish"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args ListArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "list", args.Entity, args.Query)
	})
	mcp.AddTool(server, &mcp.Tool{
		Name:        "colombia-public_load",
		Description: "Load one record from ColombiaPublic. Args: entity, query (match map naming the record, such as {\"id\":1}). Returns the record as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[LoadArgs]("airport", "constitution_article", "department", "holiday", "invasive_specie", "native_community", "natural_area", "president", "radio", "region", "touristic_attraction", "typical_dish"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args LoadArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "load", args.Entity, args.Query)
	})
}

// entitySchema is the schema inferred from In, its entity limited to the
// entities the tool serves.
func entitySchema[In any](names ...string) *jsonschema.Schema {
	schema, err := jsonschema.For[In](nil)
	if err != nil {
		panic(err)
	}
	enum := make([]any, len(names))
	for i, name := range names {
		enum[i] = name
	}
	schema.Properties["entity"].Enum = enum
	return schema
}

func runOp(_ context.Context, client *sdk.ColombiaPublicSDK, op string, entity string, input map[string]any) (*mcp.CallToolResult, any, error) {
	ent, err := entityFor(client, entity)
	if err != nil {
		return toolError(err.Error())
	}

	var result any
	switch op {
	case "list":
		result, err = ent.List(input, nil)
	case "load":
		result, err = ent.Load(input, nil)
	case "create":
		result, err = ent.Create(input, nil)
	case "update":
		result, err = ent.Update(input, nil)
	case "patch":
		result, err = ent.Patch(input, nil)
	case "remove":
		result, err = ent.Remove(input, nil)
	default:
		return toolError(fmt.Sprintf("unknown op %q", op))
	}
	if err != nil {
		return toolError(err.Error())
	}

	// SDK returns *Entity wrappers; unwrap each via .Data() to get a
	// plain map[string]any (or []any of maps for list) suitable for
	// JSON marshalling.
	data := extractData(result)
	body, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return toolError(fmt.Sprintf("marshal: %v", err))
	}
	return &mcp.CallToolResult{
		Content: []mcp.Content{
			&mcp.TextContent{Text: string(body)},
		},
	}, data, nil
}

// entityFor dispatches on the lowercase entity name. The generator
// emits one `case "<name>":` per entity defined in the SDK model.
func entityFor(client *sdk.ColombiaPublicSDK, name string) (sdk.ColombiaPublicEntity, error) {
	switch strings.ToLower(name) {
	case "airport":
		return client.Airport(nil), nil
	case "category_natural_area":
		return client.CategoryNaturalArea(nil), nil
	case "constitution_article":
		return client.ConstitutionArticle(nil), nil
	case "country":
		return client.Country(nil), nil
	case "department":
		return client.Department(nil), nil
	case "holiday":
		return client.Holiday(nil), nil
	case "invasive_specie":
		return client.InvasiveSpecie(nil), nil
	case "map":
		return client.Map(nil), nil
	case "native_community":
		return client.NativeCommunity(nil), nil
	case "natural_area":
		return client.NaturalArea(nil), nil
	case "president":
		return client.President(nil), nil
	case "radio":
		return client.Radio(nil), nil
	case "region":
		return client.Region(nil), nil
	case "touristic_attraction":
		return client.TouristicAttraction(nil), nil
	case "typical_dish":
		return client.TypicalDish(nil), nil
	}
	return nil, fmt.Errorf("unknown entity %q", name)
}

func extractData(x any) any {
	switch v := x.(type) {
	case sdk.Entity:
		return extractData(v.Data())
	case []any:
		out := make([]any, len(v))
		for i, e := range v {
			out[i] = extractData(e)
		}
		return out
	case map[string]any:
		out := make(map[string]any, len(v))
		for k, vv := range v {
			out[k] = extractData(vv)
		}
		return out
	}
	return x
}

func toolError(msg string) (*mcp.CallToolResult, any, error) {
	return &mcp.CallToolResult{
		IsError: true,
		Content: []mcp.Content{
			&mcp.TextContent{Text: msg},
		},
	}, nil, nil
}

// hint is an MCP annotation that defaults to true unless stated.
func hint(b bool) *bool {
	return &b
}
