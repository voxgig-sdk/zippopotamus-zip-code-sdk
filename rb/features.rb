# ZippopotamusZipCode SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module ZippopotamusZipCodeFeatures
  def self.make_feature(name)
    case name
    when "base"
      ZippopotamusZipCodeBaseFeature.new
    when "ratelimit"
      ZippopotamusZipCodeRatelimitFeature.new
    when "retry"
      ZippopotamusZipCodeRetryFeature.new
    when "test"
      ZippopotamusZipCodeTestFeature.new
    when "timeout"
      ZippopotamusZipCodeTimeoutFeature.new
    else
      ZippopotamusZipCodeBaseFeature.new
    end
  end
end
