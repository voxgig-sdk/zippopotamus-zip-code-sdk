# ZippopotamusZipCode SDK utility: make_context
require_relative '../core/context'
module ZippopotamusZipCodeUtilities
  MakeContext = ->(ctxmap, basectx) {
    ZippopotamusZipCodeContext.new(ctxmap, basectx)
  }
end
