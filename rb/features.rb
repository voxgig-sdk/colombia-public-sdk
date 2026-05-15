# ColombiaPublic SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module ColombiaPublicFeatures
  def self.make_feature(name)
    case name
    when "base"
      ColombiaPublicBaseFeature.new
    when "test"
      ColombiaPublicTestFeature.new
    else
      ColombiaPublicBaseFeature.new
    end
  end
end
