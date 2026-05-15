# ProjectName SDK exists test

import pytest
from colombiapublic_sdk import ColombiaPublicSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = ColombiaPublicSDK.test(None, None)
        assert testsdk is not None
