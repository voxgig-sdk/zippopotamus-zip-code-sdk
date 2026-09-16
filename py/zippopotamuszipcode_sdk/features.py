# ZippopotamusZipCode SDK feature factory

from zippopotamuszipcode_sdk.feature.base_feature import ZippopotamusZipCodeBaseFeature
from zippopotamuszipcode_sdk.feature.ratelimit_feature import ZippopotamusZipCodeRatelimitFeature
from zippopotamuszipcode_sdk.feature.retry_feature import ZippopotamusZipCodeRetryFeature
from zippopotamuszipcode_sdk.feature.test_feature import ZippopotamusZipCodeTestFeature
from zippopotamuszipcode_sdk.feature.timeout_feature import ZippopotamusZipCodeTimeoutFeature


_FEATURES = {
    "base": lambda: ZippopotamusZipCodeBaseFeature(),
    "ratelimit": lambda: ZippopotamusZipCodeRatelimitFeature(),
    "retry": lambda: ZippopotamusZipCodeRetryFeature(),
    "test": lambda: ZippopotamusZipCodeTestFeature(),
    "timeout": lambda: ZippopotamusZipCodeTimeoutFeature(),
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
