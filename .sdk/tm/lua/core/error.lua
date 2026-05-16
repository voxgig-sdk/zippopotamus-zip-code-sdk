-- ZippopotamusZipCode SDK error

local ZippopotamusZipCodeError = {}
ZippopotamusZipCodeError.__index = ZippopotamusZipCodeError


function ZippopotamusZipCodeError.new(code, msg, ctx)
  local self = setmetatable({}, ZippopotamusZipCodeError)
  self.is_sdk_error = true
  self.sdk = "ZippopotamusZipCode"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function ZippopotamusZipCodeError:error()
  return self.msg
end


function ZippopotamusZipCodeError:__tostring()
  return self.msg
end


return ZippopotamusZipCodeError
