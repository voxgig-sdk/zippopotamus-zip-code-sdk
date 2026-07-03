# GetLocationByPostalCode direct test

import json
import pytest

from utility.voxgig_struct import voxgig_struct as vs
from zippopotamuszipcode_sdk import ZippopotamusZipCodeSDK
from core import helpers
from test import runner


class TestGetLocationByPostalCodeDirect:

    def test_should_direct_list_get_location_by_postal_code(self):
        setup = _get_location_by_postal_code_direct_setup([
            {"id": "direct01"},
            {"id": "direct02"},
        ])
        _skip, _reason = runner.is_control_skipped("direct", "direct-list-get_location_by_postal_code", "live" if setup["live"] else "unit")
        if _skip:
            # pytest already imported at module scope
            pytest.skip(_reason or "skipped via sdk-test-control.json")
            return
        if setup["live"]:
            for _live_key in ["country01", "postal_code01"]:
                if setup["idmap"].get(_live_key) is None:
                    # pytest already imported at module scope
                    pytest.skip(f"live test needs {_live_key} via *_ENTID env var (synthetic IDs only)")
                    return

        client = setup["client"]

        params = {}
        if setup["live"]:
            params["country"] = setup["idmap"]["country01"]
        else:
            params["country"] = "direct01"
        if setup["live"]:
            params["postal_code"] = setup["idmap"]["postal_code01"]
        else:
            params["postal_code"] = "direct01"

        result, err = client.direct({
            "path": "{country}/{postal_code}",
            "method": "GET",
            "params": params,
        })
        if setup["live"]:
            # Live mode is lenient: synthetic IDs frequently 4xx and the
            # list-response shape varies wildly across public APIs. Skip
            # rather than fail when the call doesn't return a usable list.
            if err is not None:
                pytest.skip(f"list call failed (likely synthetic IDs against live API): {err}")
                return
            if not result.get("ok"):
                pytest.skip("list call not ok (likely synthetic IDs against live API)")
                return
            status = helpers.to_int(result["status"])
            if status < 200 or status >= 300:
                pytest.skip(f"expected 2xx status, got {status}")
                return
        else:
            assert err is None
            assert result["ok"] is True
            assert helpers.to_int(result["status"]) == 200
            assert isinstance(result["data"], list)
            assert len(result["data"]) == 2
            assert len(setup["calls"]) == 1



def _get_location_by_postal_code_direct_setup(mockres):
    runner.load_env_local()

    calls = []

    env = runner.env_override({
        "ZIPPOPOTAMUSZIPCODE_TEST_GET_LOCATION_BY_POSTAL_CODE_ENTID": {},
        "ZIPPOPOTAMUSZIPCODE_TEST_LIVE": "FALSE",
        "ZIPPOPOTAMUSZIPCODE_APIKEY": "NONE",
    })

    live = env.get("ZIPPOPOTAMUSZIPCODE_TEST_LIVE") == "TRUE"

    if live:
        merged_opts = {
            "apikey": env.get("ZIPPOPOTAMUSZIPCODE_APIKEY"),
        }
        client = ZippopotamusZipCodeSDK(merged_opts)
        return {
            "client": client,
            "calls": calls,
            "live": True,
            "idmap": {},
        }

    def mock_fetch(url, init):
        calls.append({"url": url, "init": init})
        return {
            "status": 200,
            "statusText": "OK",
            "headers": {},
            "json": lambda: mockres if mockres is not None else {"id": "direct01"},
            "body": "mock",
        }, None

    client = ZippopotamusZipCodeSDK({
        "base": "http://localhost:8080",
        "system": {
            "fetch": mock_fetch,
        },
    })

    return {
        "client": client,
        "calls": calls,
        "live": False,
        "idmap": {},
    }
