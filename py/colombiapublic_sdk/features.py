# ColombiaPublic SDK feature factory

from colombiapublic_sdk.feature.base_feature import ColombiaPublicBaseFeature
from colombiapublic_sdk.feature.test_feature import ColombiaPublicTestFeature


def _make_feature(name):
    features = {
        "base": lambda: ColombiaPublicBaseFeature(),
        "test": lambda: ColombiaPublicTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
