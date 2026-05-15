# ColombiaPublic SDK utility: feature_add
module ColombiaPublicUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
