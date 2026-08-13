# ZippopotamusZipCode SDK exists test

import pytest
from zippopotamuszipcode_sdk import ZippopotamusZipCodeSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = ZippopotamusZipCodeSDK.test(None, None)
        assert testsdk is not None
