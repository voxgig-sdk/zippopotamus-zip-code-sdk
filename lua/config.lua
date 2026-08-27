-- ZippopotamusZipCode SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "ZippopotamusZipCode",
      slug = "zippopotamus-zip-code",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://api.zippopotam.us",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["get_location_by_postal_code"] = {},
        ["get_postal_codes_by_city"] = {},
      },
    },
    entity = {
      ["get_location_by_postal_code"] = {
        ["fields"] = {
          {
            ["name"] = "latitude",
            ["short"] = "Latitude coordinate",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "longitude",
            ["short"] = "Longitude coordinate",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "placename",
            ["short"] = "Name of the place/city",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "state",
            ["short"] = "Full state or province name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "stateabbreviation",
            ["short"] = "State or province abbreviation",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "get_location_by_postal_code",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "US",
                      ["kind"] = "param",
                      ["name"] = "country",
                      ["orig"] = "country",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "90210",
                      ["kind"] = "param",
                      ["name"] = "postal_code",
                      ["orig"] = "postal_code",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/{country}/{postal-code}",
                ["parts"] = {
                  "{country}",
                  "{postal_code}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["postal-code"] = "postal_code",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "country",
                    "postal_code",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.places`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["get_postal_codes_by_city"] = {
        ["fields"] = {
          {
            ["name"] = "latitude",
            ["short"] = "Latitude coordinate",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "longitude",
            ["short"] = "Longitude coordinate",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "placename",
            ["short"] = "Name of the place/city",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "postcode",
            ["short"] = "Postal code for this location",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "get_postal_codes_by_city",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "Beverly Hills",
                      ["kind"] = "param",
                      ["name"] = "city",
                      ["orig"] = "city",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "US",
                      ["kind"] = "param",
                      ["name"] = "country",
                      ["orig"] = "country",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "CA",
                      ["kind"] = "param",
                      ["name"] = "state",
                      ["orig"] = "state",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/{country}/{state}/{city}",
                ["parts"] = {
                  "{country}",
                  "{state}",
                  "{city}",
                },
                ["select"] = {
                  ["exist"] = {
                    "city",
                    "country",
                    "state",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.places`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
