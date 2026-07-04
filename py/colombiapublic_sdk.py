# ColombiaPublic SDK

from utility.voxgig_struct import voxgig_struct as vs
from core.utility_type import ColombiaPublicUtility
from core.spec import ColombiaPublicSpec
from core import helpers

# Load utility registration (populates Utility._registrar)
from utility import register

# Load features
from feature.base_feature import ColombiaPublicBaseFeature
from features import _make_feature


class ColombiaPublicSDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = ColombiaPublicUtility()
        self._utility = utility

        from config import make_config
        config = make_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features from config.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            feature_items = vs.items(feature_opts)
            if feature_items is not None:
                for item in feature_items:
                    fname = item[0]
                    fopts = helpers.to_map(item[1])
                    if fopts is not None and fopts.get("active") is True:
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        extend = vs.getprop(self.options, "extend")
        if isinstance(extend, list):
            for f in extend:
                if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                    utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return ColombiaPublicUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = ColombiaPublicSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    def direct(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }


    def Airport(self, data=None) -> "AirportEntity":
        """Entity factory: client.Airport().list({}) / client.Airport().load({"id": ...})."""
        from entity.airport_entity import AirportEntity
        return AirportEntity(self, data)


    def CategoryNaturalArea(self, data=None) -> "CategoryNaturalAreaEntity":
        """Entity factory: client.CategoryNaturalArea().list({}) / client.CategoryNaturalArea().load({"id": ...})."""
        from entity.category_natural_area_entity import CategoryNaturalAreaEntity
        return CategoryNaturalAreaEntity(self, data)


    def ConstitutionArticle(self, data=None) -> "ConstitutionArticleEntity":
        """Entity factory: client.ConstitutionArticle().list({}) / client.ConstitutionArticle().load({"id": ...})."""
        from entity.constitution_article_entity import ConstitutionArticleEntity
        return ConstitutionArticleEntity(self, data)


    def Country(self, data=None) -> "CountryEntity":
        """Entity factory: client.Country().list({}) / client.Country().load({"id": ...})."""
        from entity.country_entity import CountryEntity
        return CountryEntity(self, data)


    def Department(self, data=None) -> "DepartmentEntity":
        """Entity factory: client.Department().list({}) / client.Department().load({"id": ...})."""
        from entity.department_entity import DepartmentEntity
        return DepartmentEntity(self, data)


    def Holiday(self, data=None) -> "HolidayEntity":
        """Entity factory: client.Holiday().list({}) / client.Holiday().load({"id": ...})."""
        from entity.holiday_entity import HolidayEntity
        return HolidayEntity(self, data)


    def InvasiveSpecie(self, data=None) -> "InvasiveSpecieEntity":
        """Entity factory: client.InvasiveSpecie().list({}) / client.InvasiveSpecie().load({"id": ...})."""
        from entity.invasive_specie_entity import InvasiveSpecieEntity
        return InvasiveSpecieEntity(self, data)


    def Map(self, data=None) -> "MapEntity":
        """Entity factory: client.Map().list({}) / client.Map().load({"id": ...})."""
        from entity.map_entity import MapEntity
        return MapEntity(self, data)


    def NativeCommunity(self, data=None) -> "NativeCommunityEntity":
        """Entity factory: client.NativeCommunity().list({}) / client.NativeCommunity().load({"id": ...})."""
        from entity.native_community_entity import NativeCommunityEntity
        return NativeCommunityEntity(self, data)


    def NaturalArea(self, data=None) -> "NaturalAreaEntity":
        """Entity factory: client.NaturalArea().list({}) / client.NaturalArea().load({"id": ...})."""
        from entity.natural_area_entity import NaturalAreaEntity
        return NaturalAreaEntity(self, data)


    def President(self, data=None) -> "PresidentEntity":
        """Entity factory: client.President().list({}) / client.President().load({"id": ...})."""
        from entity.president_entity import PresidentEntity
        return PresidentEntity(self, data)


    def Radio(self, data=None) -> "RadioEntity":
        """Entity factory: client.Radio().list({}) / client.Radio().load({"id": ...})."""
        from entity.radio_entity import RadioEntity
        return RadioEntity(self, data)


    def Region(self, data=None) -> "RegionEntity":
        """Entity factory: client.Region().list({}) / client.Region().load({"id": ...})."""
        from entity.region_entity import RegionEntity
        return RegionEntity(self, data)


    def TouristicAttraction(self, data=None) -> "TouristicAttractionEntity":
        """Entity factory: client.TouristicAttraction().list({}) / client.TouristicAttraction().load({"id": ...})."""
        from entity.touristic_attraction_entity import TouristicAttractionEntity
        return TouristicAttractionEntity(self, data)


    def TypicalDish(self, data=None) -> "TypicalDishEntity":
        """Entity factory: client.TypicalDish().list({}) / client.TypicalDish().load({"id": ...})."""
        from entity.typical_dish_entity import TypicalDishEntity
        return TypicalDishEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None) -> "ColombiaPublicSDK":
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk


from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from entity.airport_entity import AirportEntity
    from entity.category_natural_area_entity import CategoryNaturalAreaEntity
    from entity.constitution_article_entity import ConstitutionArticleEntity
    from entity.country_entity import CountryEntity
    from entity.department_entity import DepartmentEntity
    from entity.holiday_entity import HolidayEntity
    from entity.invasive_specie_entity import InvasiveSpecieEntity
    from entity.map_entity import MapEntity
    from entity.native_community_entity import NativeCommunityEntity
    from entity.natural_area_entity import NaturalAreaEntity
    from entity.president_entity import PresidentEntity
    from entity.radio_entity import RadioEntity
    from entity.region_entity import RegionEntity
    from entity.touristic_attraction_entity import TouristicAttractionEntity
    from entity.typical_dish_entity import TypicalDishEntity
