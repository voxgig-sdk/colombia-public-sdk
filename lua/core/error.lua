-- ColombiaPublic SDK error

local ColombiaPublicError = {}
ColombiaPublicError.__index = ColombiaPublicError


function ColombiaPublicError.new(code, msg, ctx)
  local self = setmetatable({}, ColombiaPublicError)
  self.is_sdk_error = true
  self.sdk = "ColombiaPublic"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function ColombiaPublicError:error()
  return self.msg
end


function ColombiaPublicError:__tostring()
  return self.msg
end


return ColombiaPublicError
