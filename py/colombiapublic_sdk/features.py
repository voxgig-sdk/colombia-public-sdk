# ColombiaPublic SDK feature factory

from colombiapublic_sdk.feature.base_feature import ColombiaPublicBaseFeature
from colombiapublic_sdk.feature.ratelimit_feature import ColombiaPublicRatelimitFeature
from colombiapublic_sdk.feature.retry_feature import ColombiaPublicRetryFeature
from colombiapublic_sdk.feature.test_feature import ColombiaPublicTestFeature
from colombiapublic_sdk.feature.timeout_feature import ColombiaPublicTimeoutFeature


_FEATURES = {
    "base": lambda: ColombiaPublicBaseFeature(),
    "ratelimit": lambda: ColombiaPublicRatelimitFeature(),
    "retry": lambda: ColombiaPublicRetryFeature(),
    "test": lambda: ColombiaPublicTestFeature(),
    "timeout": lambda: ColombiaPublicTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
