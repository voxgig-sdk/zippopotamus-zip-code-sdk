-- ZippopotamusZipCode SDK exists test

local sdk = require("zippopotamus-zip-code_sdk")

describe("ZippopotamusZipCodeSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
