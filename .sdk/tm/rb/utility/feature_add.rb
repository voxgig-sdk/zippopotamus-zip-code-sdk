# ZippopotamusZipCode SDK utility: feature_add
module ZippopotamusZipCodeUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
