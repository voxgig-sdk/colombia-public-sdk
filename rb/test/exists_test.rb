# ColombiaPublic SDK exists test

require "minitest/autorun"
require_relative "../ColombiaPublic_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = ColombiaPublicSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
