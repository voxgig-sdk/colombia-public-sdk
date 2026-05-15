package = "voxgig-sdk-colombia-public"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/colombia-public-sdk.git"
}
description = {
  summary = "ColombiaPublic SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["colombia-public_sdk"] = "colombia-public_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
