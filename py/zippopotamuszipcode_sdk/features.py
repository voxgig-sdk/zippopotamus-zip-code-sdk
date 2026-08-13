# ZippopotamusZipCode SDK feature factory

from zippopotamuszipcode_sdk.feature.base_feature import ZippopotamusZipCodeBaseFeature
from zippopotamuszipcode_sdk.feature.test_feature import ZippopotamusZipCodeTestFeature


def _make_feature(name):
    features = {
        "base": lambda: ZippopotamusZipCodeBaseFeature(),
        "test": lambda: ZippopotamusZipCodeTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
