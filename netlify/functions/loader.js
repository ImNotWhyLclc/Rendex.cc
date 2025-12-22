// netlify/functions/loader.js
exports.handler = async (event) => {
  const headers = event.headers || {};
  const userAgent = headers['user-agent'] || headers['User-Agent'] || '';
  const referer = headers['referer'] || headers['Referer'] || '';
  
  // Security configuration
  const allowedUserAgents = ['Roblox', 'Roblox/WinInet', 'RobloxStudio', 'RobloxPlayer'];
  const allowedDomains = ['roblox.com', 'www.roblox.com'];
  const githubBase = "https://raw.githubusercontent.com/ImNotWhyLclc/Rendex/main/";
  
  // Security checks
  const isValidAgent = allowedUserAgents.some(agent => 
    userAgent.toLowerCase().includes(agent.toLowerCase()));
  
  const isValidReferer = allowedDomains.some(domain => 
    referer.toLowerCase().includes(domain.toLowerCase()));
  
  // Check for Roblox-specific headers
  const robloxHeaders = [
    'x-request-id', 'x-csrf-token', 'rbx-requester', 
    'roblox-browser-asset-request', 'roblox-version'
  ];
  
  const hasRobloxHeaders = robloxHeaders.some(header => 
    Object.keys(headers).some(h => h.toLowerCase() === header.toLowerCase()));
  
  // Final validation - allow if either condition is met
  if ((isValidAgent && isValidReferer) || hasRobloxHeaders) {
    const loaderScript = `-- Rendex Loader
-- Hosted on rendex-cc.netlify.app
-- Scripts fetched from GitHub repository

local base = "${githubBase}"
local hm = {
    [126371807511901] = "Games/Rendex99NITF.luau", -- 99nitf party update
    [126509999114328] = "Games/Rendex99NITF.luau", -- 99nitf normal
    [606849621] = "Games/RendexJB.luau", -- jb
    [17190407811] = "Games/RendexJB.luau", -- jb voice chat
    [127742093697776] = "Games/RendexPVB.luau" -- pvb
}
local file = hm[game.PlaceId]

if not file then
    warn("* Rendex * No script available for PlaceId:", game.PlaceId)
    return
end

local so, tuff = pcall(function()
    return loadstring(game:HttpGet(base..file))()
end)

if so then
    print("* Rendex * Loaded:", file, "- PlaceId:", game.PlaceId)
    print("* Rendex * Join our Discord: discord.gg/X4GW8N5GdW")
else
    warn("* Rendex * Failed to load", file, ":", tuff)
    warn("* Rendex * PlaceId:", game.PlaceId)
    warn("* Rendex * Join Discord for support: discord.gg/X4GW8N5GdW")
end`;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': 'https://www.roblox.com',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
      body: loaderScript
    };
  }
  
  // If validation fails
  return {
    statusCode: 403,
    headers: {
      'Content-Type': 'text/plain'
    },
    body: "Access denied - Invalid request source"
  };
};
