# ZippopotamusZipCode SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module ZippopotamusZipCodeFeatures
  def self.make_feature(name)
    case name
    when "base"
      ZippopotamusZipCodeBaseFeature.new
    when "test"
      ZippopotamusZipCodeTestFeature.new
    else
      ZippopotamusZipCodeBaseFeature.new
    end
  end
end
