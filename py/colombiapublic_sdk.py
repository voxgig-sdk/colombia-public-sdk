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


    @property
    def airport(self):
        """Idiomatic facade: client.airport.list() / client.airport.load({"id": ...})."""
        from entity.airport_entity import AirportEntity
        cached = getattr(self, "_airport", None)
        if cached is None:
            cached = AirportEntity(self, None)
            self._airport = cached
        return cached

    def Airport(self, data=None):
        # Deprecated: use client.airport instead.
        from entity.airport_entity import AirportEntity
        return AirportEntity(self, data)


    @property
    def category_natural_area(self):
        """Idiomatic facade: client.category_natural_area.list() / client.category_natural_area.load({"id": ...})."""
        from entity.category_natural_area_entity import CategoryNaturalAreaEntity
        cached = getattr(self, "_category_natural_area", None)
        if cached is None:
            cached = CategoryNaturalAreaEntity(self, None)
            self._category_natural_area = cached
        return cached

    def CategoryNaturalArea(self, data=None):
        # Deprecated: use client.category_natural_area instead.
        from entity.category_natural_area_entity import CategoryNaturalAreaEntity
        return CategoryNaturalAreaEntity(self, data)


    @property
    def constitution_article(self):
        """Idiomatic facade: client.constitution_article.list() / client.constitution_article.load({"id": ...})."""
        from entity.constitution_article_entity import ConstitutionArticleEntity
        cached = getattr(self, "_constitution_article", None)
        if cached is None:
            cached = ConstitutionArticleEntity(self, None)
            self._constitution_article = cached
        return cached

    def ConstitutionArticle(self, data=None):
        # Deprecated: use client.constitution_article instead.
        from entity.constitution_article_entity import ConstitutionArticleEntity
        return ConstitutionArticleEntity(self, data)


    @property
    def country(self):
        """Idiomatic facade: client.country.list() / client.country.load({"id": ...})."""
        from entity.country_entity import CountryEntity
        cached = getattr(self, "_country", None)
        if cached is None:
            cached = CountryEntity(self, None)
            self._country = cached
        return cached

    def Country(self, data=None):
        # Deprecated: use client.country instead.
        from entity.country_entity import CountryEntity
        return CountryEntity(self, data)


    @property
    def department(self):
        """Idiomatic facade: client.department.list() / client.department.load({"id": ...})."""
        from entity.department_entity import DepartmentEntity
        cached = getattr(self, "_department", None)
        if cached is None:
            cached = DepartmentEntity(self, None)
            self._department = cached
        return cached

    def Department(self, data=None):
        # Deprecated: use client.department instead.
        from entity.department_entity import DepartmentEntity
        return DepartmentEntity(self, data)


    @property
    def holiday(self):
        """Idiomatic facade: client.holiday.list() / client.holiday.load({"id": ...})."""
        from entity.holiday_entity import HolidayEntity
        cached = getattr(self, "_holiday", None)
        if cached is None:
            cached = HolidayEntity(self, None)
            self._holiday = cached
        return cached

    def Holiday(self, data=None):
        # Deprecated: use client.holiday instead.
        from entity.holiday_entity import HolidayEntity
        return HolidayEntity(self, data)


    @property
    def invasive_specie(self):
        """Idiomatic facade: client.invasive_specie.list() / client.invasive_specie.load({"id": ...})."""
        from entity.invasive_specie_entity import InvasiveSpecieEntity
        cached = getattr(self, "_invasive_specie", None)
        if cached is None:
            cached = InvasiveSpecieEntity(self, None)
            self._invasive_specie = cached
        return cached

    def InvasiveSpecie(self, data=None):
        # Deprecated: use client.invasive_specie instead.
        from entity.invasive_specie_entity import InvasiveSpecieEntity
        return InvasiveSpecieEntity(self, data)


    @property
    def map(self):
        """Idiomatic facade: client.map.list() / client.map.load({"id": ...})."""
        from entity.map_entity import MapEntity
        cached = getattr(self, "_map", None)
        if cached is None:
            cached = MapEntity(self, None)
            self._map = cached
        return cached

    def Map(self, data=None):
        # Deprecated: use client.map instead.
        from entity.map_entity import MapEntity
        return MapEntity(self, data)


    @property
    def native_community(self):
        """Idiomatic facade: client.native_community.list() / client.native_community.load({"id": ...})."""
        from entity.native_community_entity import NativeCommunityEntity
        cached = getattr(self, "_native_community", None)
        if cached is None:
            cached = NativeCommunityEntity(self, None)
            self._native_community = cached
        return cached

    def NativeCommunity(self, data=None):
        # Deprecated: use client.native_community instead.
        from entity.native_community_entity import NativeCommunityEntity
        return NativeCommunityEntity(self, data)


    @property
    def natural_area(self):
        """Idiomatic facade: client.natural_area.list() / client.natural_area.load({"id": ...})."""
        from entity.natural_area_entity import NaturalAreaEntity
        cached = getattr(self, "_natural_area", None)
        if cached is None:
            cached = NaturalAreaEntity(self, None)
            self._natural_area = cached
        return cached

    def NaturalArea(self, data=None):
        # Deprecated: use client.natural_area instead.
        from entity.natural_area_entity import NaturalAreaEntity
        return NaturalAreaEntity(self, data)


    @property
    def president(self):
        """Idiomatic facade: client.president.list() / client.president.load({"id": ...})."""
        from entity.president_entity import PresidentEntity
        cached = getattr(self, "_president", None)
        if cached is None:
            cached = PresidentEntity(self, None)
            self._president = cached
        return cached

    def President(self, data=None):
        # Deprecated: use client.president instead.
        from entity.president_entity import PresidentEntity
        return PresidentEntity(self, data)


    @property
    def radio(self):
        """Idiomatic facade: client.radio.list() / client.radio.load({"id": ...})."""
        from entity.radio_entity import RadioEntity
        cached = getattr(self, "_radio", None)
        if cached is None:
            cached = RadioEntity(self, None)
            self._radio = cached
        return cached

    def Radio(self, data=None):
        # Deprecated: use client.radio instead.
        from entity.radio_entity import RadioEntity
        return RadioEntity(self, data)


    @property
    def region(self):
        """Idiomatic facade: client.region.list() / client.region.load({"id": ...})."""
        from entity.region_entity import RegionEntity
        cached = getattr(self, "_region", None)
        if cached is None:
            cached = RegionEntity(self, None)
            self._region = cached
        return cached

    def Region(self, data=None):
        # Deprecated: use client.region instead.
        from entity.region_entity import RegionEntity
        return RegionEntity(self, data)


    @property
    def touristic_attraction(self):
        """Idiomatic facade: client.touristic_attraction.list() / client.touristic_attraction.load({"id": ...})."""
        from entity.touristic_attraction_entity import TouristicAttractionEntity
        cached = getattr(self, "_touristic_attraction", None)
        if cached is None:
            cached = TouristicAttractionEntity(self, None)
            self._touristic_attraction = cached
        return cached

    def TouristicAttraction(self, data=None):
        # Deprecated: use client.touristic_attraction instead.
        from entity.touristic_attraction_entity import TouristicAttractionEntity
        return TouristicAttractionEntity(self, data)


    @property
    def typical_dish(self):
        """Idiomatic facade: client.typical_dish.list() / client.typical_dish.load({"id": ...})."""
        from entity.typical_dish_entity import TypicalDishEntity
        cached = getattr(self, "_typical_dish", None)
        if cached is None:
            cached = TypicalDishEntity(self, None)
            self._typical_dish = cached
        return cached

    def TypicalDish(self, data=None):
        # Deprecated: use client.typical_dish instead.
        from entity.typical_dish_entity import TypicalDishEntity
        return TypicalDishEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None):
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
