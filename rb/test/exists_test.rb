# ZippopotamusZipCode SDK exists test

require "minitest/autorun"
require_relative "../ZippopotamusZipCode_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = ZippopotamusZipCodeSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
