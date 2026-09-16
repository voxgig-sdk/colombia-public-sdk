# ColombiaPublic SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module ColombiaPublicFeatures
  def self.make_feature(name)
    case name
    when "base"
      ColombiaPublicBaseFeature.new
    when "ratelimit"
      ColombiaPublicRatelimitFeature.new
    when "retry"
      ColombiaPublicRetryFeature.new
    when "test"
      ColombiaPublicTestFeature.new
    when "timeout"
      ColombiaPublicTimeoutFeature.new
    else
      ColombiaPublicBaseFeature.new
    end
  end
end
