package = "voxgig-sdk-zippopotamus-zip-code"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/zippopotamus-zip-code-sdk.git"
}
description = {
  summary = "ZippopotamusZipCode SDK for Lua",
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
    ["zippopotamus-zip-code_sdk"] = "zippopotamus-zip-code_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
