# ColombiaPublic SDK utility: prepare_body
require_relative 'media'
module ColombiaPublicUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return ColombiaPublicUtilities.raw_body(ctx.reqdata) if ColombiaPublicUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
