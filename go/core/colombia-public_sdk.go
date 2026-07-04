package core

import (
	"fmt"

	vs "github.com/voxgig-sdk/colombia-public-sdk/go/utility/struct"
)

type ColombiaPublicSDK struct {
	Mode     string
	options  map[string]any
	utility  *Utility
	Features []Feature
	rootctx  *Context
}

func NewColombiaPublicSDK(options map[string]any) *ColombiaPublicSDK {
	sdk := &ColombiaPublicSDK{
		Mode:     "live",
		Features: []Feature{},
	}

	sdk.utility = NewUtility()

	config := MakeConfig()

	sdk.rootctx = sdk.utility.MakeContext(map[string]any{
		"client":  sdk,
		"utility": sdk.utility,
		"config":  config,
		"options": options,
		"shared":  map[string]any{},
	}, nil)

	sdk.options = sdk.utility.MakeOptions(sdk.rootctx)

	if vs.GetPath([]any{"feature", "test", "active"}, sdk.options) == true {
		sdk.Mode = "test"
	}

	sdk.rootctx.Options = sdk.options

	// Add features from config.
	featureOpts := ToMapAny(vs.GetProp(sdk.options, "feature"))
	if featureOpts != nil {
		for _, item := range vs.Items(featureOpts) {
			fname, _ := item[0].(string)
			fopts := ToMapAny(item[1])
			if fopts != nil {
				if active, ok := fopts["active"]; ok {
					if ab, ok := active.(bool); ok && ab {
						sdk.utility.FeatureAdd(sdk.rootctx, makeFeature(fname))
					}
				}
			}
		}
	}

	// Add extension features.
	if extend := vs.GetProp(sdk.options, "extend"); extend != nil {
		if extList, ok := extend.([]any); ok {
			for _, f := range extList {
				if feat, ok := f.(Feature); ok {
					sdk.utility.FeatureAdd(sdk.rootctx, feat)
				}
			}
		}
	}

	// Initialize features.
	for _, f := range sdk.Features {
		sdk.utility.FeatureInit(sdk.rootctx, f)
	}

	sdk.utility.FeatureHook(sdk.rootctx, "PostConstruct")

	return sdk
}

func (sdk *ColombiaPublicSDK) OptionsMap() map[string]any {
	out := vs.Clone(sdk.options)
	if om, ok := out.(map[string]any); ok {
		return om
	}
	return map[string]any{}
}

func (sdk *ColombiaPublicSDK) GetUtility() *Utility {
	return CopyUtility(sdk.utility)
}

func (sdk *ColombiaPublicSDK) GetRootCtx() *Context {
	return sdk.rootctx
}

func (sdk *ColombiaPublicSDK) Prepare(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "prepare",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	options := sdk.options

	path, _ := vs.GetProp(fetchargs, "path").(string)
	method, _ := vs.GetProp(fetchargs, "method").(string)
	if method == "" {
		method = "GET"
	}

	params := ToMapAny(vs.GetProp(fetchargs, "params"))
	if params == nil {
		params = map[string]any{}
	}
	query := ToMapAny(vs.GetProp(fetchargs, "query"))
	if query == nil {
		query = map[string]any{}
	}

	headers := utility.PrepareHeaders(ctx)

	base, _ := vs.GetProp(options, "base").(string)
	prefix, _ := vs.GetProp(options, "prefix").(string)
	suffix, _ := vs.GetProp(options, "suffix").(string)

	ctx.Spec = NewSpec(map[string]any{
		"base":    base,
		"prefix":  prefix,
		"suffix":  suffix,
		"path":    path,
		"method":  method,
		"params":  params,
		"query":   query,
		"headers": headers,
		"body":    vs.GetProp(fetchargs, "body"),
		"step":    "start",
	})

	// Merge user-provided headers.
	if uh := vs.GetProp(fetchargs, "headers"); uh != nil {
		if uhm, ok := uh.(map[string]any); ok {
			for k, v := range uhm {
				ctx.Spec.Headers[k] = v
			}
		}
	}

	_, err := utility.PrepareAuth(ctx)
	if err != nil {
		return nil, err
	}

	return utility.MakeFetchDef(ctx)
}

func (sdk *ColombiaPublicSDK) Direct(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	fetchdef, err := sdk.Prepare(fetchargs)
	if err != nil {
		return map[string]any{"ok": false, "err": err}, nil
	}

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "direct",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	url, _ := fetchdef["url"].(string)
	fetched, fetchErr := utility.Fetcher(ctx, url, fetchdef)

	if fetchErr != nil {
		return map[string]any{"ok": false, "err": fetchErr}, nil
	}

	if fetched == nil {
		return map[string]any{
			"ok":  false,
			"err": ctx.MakeError("direct_no_response", "response: undefined"),
		}, nil
	}

	if fm, ok := fetched.(map[string]any); ok {
		status := ToInt(vs.GetProp(fm, "status"))
		headers := vs.GetProp(fm, "headers")

		// No-body responses (204, 304) and explicit zero content-length
		// must skip JSON parsing — calling json() on an empty body errors.
		var contentLength string
		if hm, ok := headers.(map[string]any); ok {
			if cl, ok := hm["content-length"]; ok {
				contentLength = fmt.Sprintf("%v", cl)
			}
		}
		noBody := status == 204 || status == 304 || contentLength == "0"

		var jsonData any
		if !noBody {
			if jf := vs.GetProp(fm, "json"); jf != nil {
				if f, ok := jf.(func() any); ok {
					// f() returns nil on parse error in our fetcher.
					jsonData = f()
				}
			}
		}

		return map[string]any{
			"ok":      status >= 200 && status < 300,
			"status":  status,
			"headers": headers,
			"data":    jsonData,
		}, nil
	}

	return map[string]any{"ok": false, "err": ctx.MakeError("direct_invalid", "invalid response type")}, nil
}


// Airport returns a Airport entity bound to this client.
// Idiomatic usage: client.Airport(nil).List(nil, nil) or
// client.Airport(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ColombiaPublicSDK) Airport(data map[string]any) ColombiaPublicEntity {
	return NewAirportEntityFunc(sdk, data)
}


// CategoryNaturalArea returns a CategoryNaturalArea entity bound to this client.
// Idiomatic usage: client.CategoryNaturalArea(nil).List(nil, nil) or
// client.CategoryNaturalArea(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ColombiaPublicSDK) CategoryNaturalArea(data map[string]any) ColombiaPublicEntity {
	return NewCategoryNaturalAreaEntityFunc(sdk, data)
}


// ConstitutionArticle returns a ConstitutionArticle entity bound to this client.
// Idiomatic usage: client.ConstitutionArticle(nil).List(nil, nil) or
// client.ConstitutionArticle(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ColombiaPublicSDK) ConstitutionArticle(data map[string]any) ColombiaPublicEntity {
	return NewConstitutionArticleEntityFunc(sdk, data)
}


// Country returns a Country entity bound to this client.
// Idiomatic usage: client.Country(nil).List(nil, nil) or
// client.Country(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ColombiaPublicSDK) Country(data map[string]any) ColombiaPublicEntity {
	return NewCountryEntityFunc(sdk, data)
}


// Department returns a Department entity bound to this client.
// Idiomatic usage: client.Department(nil).List(nil, nil) or
// client.Department(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ColombiaPublicSDK) Department(data map[string]any) ColombiaPublicEntity {
	return NewDepartmentEntityFunc(sdk, data)
}


// Holiday returns a Holiday entity bound to this client.
// Idiomatic usage: client.Holiday(nil).List(nil, nil) or
// client.Holiday(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ColombiaPublicSDK) Holiday(data map[string]any) ColombiaPublicEntity {
	return NewHolidayEntityFunc(sdk, data)
}


// InvasiveSpecie returns a InvasiveSpecie entity bound to this client.
// Idiomatic usage: client.InvasiveSpecie(nil).List(nil, nil) or
// client.InvasiveSpecie(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ColombiaPublicSDK) InvasiveSpecie(data map[string]any) ColombiaPublicEntity {
	return NewInvasiveSpecieEntityFunc(sdk, data)
}


// Map returns a Map entity bound to this client.
// Idiomatic usage: client.Map(nil).List(nil, nil) or
// client.Map(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ColombiaPublicSDK) Map(data map[string]any) ColombiaPublicEntity {
	return NewMapEntityFunc(sdk, data)
}


// NativeCommunity returns a NativeCommunity entity bound to this client.
// Idiomatic usage: client.NativeCommunity(nil).List(nil, nil) or
// client.NativeCommunity(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ColombiaPublicSDK) NativeCommunity(data map[string]any) ColombiaPublicEntity {
	return NewNativeCommunityEntityFunc(sdk, data)
}


// NaturalArea returns a NaturalArea entity bound to this client.
// Idiomatic usage: client.NaturalArea(nil).List(nil, nil) or
// client.NaturalArea(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ColombiaPublicSDK) NaturalArea(data map[string]any) ColombiaPublicEntity {
	return NewNaturalAreaEntityFunc(sdk, data)
}


// President returns a President entity bound to this client.
// Idiomatic usage: client.President(nil).List(nil, nil) or
// client.President(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ColombiaPublicSDK) President(data map[string]any) ColombiaPublicEntity {
	return NewPresidentEntityFunc(sdk, data)
}


// Radio returns a Radio entity bound to this client.
// Idiomatic usage: client.Radio(nil).List(nil, nil) or
// client.Radio(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ColombiaPublicSDK) Radio(data map[string]any) ColombiaPublicEntity {
	return NewRadioEntityFunc(sdk, data)
}


// Region returns a Region entity bound to this client.
// Idiomatic usage: client.Region(nil).List(nil, nil) or
// client.Region(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ColombiaPublicSDK) Region(data map[string]any) ColombiaPublicEntity {
	return NewRegionEntityFunc(sdk, data)
}


// TouristicAttraction returns a TouristicAttraction entity bound to this client.
// Idiomatic usage: client.TouristicAttraction(nil).List(nil, nil) or
// client.TouristicAttraction(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ColombiaPublicSDK) TouristicAttraction(data map[string]any) ColombiaPublicEntity {
	return NewTouristicAttractionEntityFunc(sdk, data)
}


// TypicalDish returns a TypicalDish entity bound to this client.
// Idiomatic usage: client.TypicalDish(nil).List(nil, nil) or
// client.TypicalDish(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ColombiaPublicSDK) TypicalDish(data map[string]any) ColombiaPublicEntity {
	return NewTypicalDishEntityFunc(sdk, data)
}



func TestSDK(testopts map[string]any, sdkopts map[string]any) *ColombiaPublicSDK {
	if sdkopts == nil {
		sdkopts = map[string]any{}
	}
	sdkopts = vs.Clone(sdkopts).(map[string]any)

	if testopts == nil {
		testopts = map[string]any{}
	}
	testopts = vs.Clone(testopts).(map[string]any)
	testopts["active"] = true

	vs.SetPath(sdkopts, []any{"feature", "test"}, testopts)

	sdk := NewColombiaPublicSDK(sdkopts)
	sdk.Mode = "test"

	return sdk
}
