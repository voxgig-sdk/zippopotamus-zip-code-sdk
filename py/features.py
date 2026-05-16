# ZippopotamusZipCode SDK feature factory

from feature.base_feature import ZippopotamusZipCodeBaseFeature
from feature.test_feature import ZippopotamusZipCodeTestFeature


def _make_feature(name):
    features = {
        "base": lambda: ZippopotamusZipCodeBaseFeature(),
        "test": lambda: ZippopotamusZipCodeTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
