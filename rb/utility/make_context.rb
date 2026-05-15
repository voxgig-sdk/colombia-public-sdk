# ColombiaPublic SDK utility: make_context
require_relative '../core/context'
module ColombiaPublicUtilities
  MakeContext = ->(ctxmap, basectx) {
    ColombiaPublicContext.new(ctxmap, basectx)
  }
end
