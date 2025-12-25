// netlify/functions/loader.js
exports.handler = async (event) => {
  const headers = event.headers || {};
  const userAgent = headers['user-agent'] || headers['User-Agent'] || '';
  
  // Check if request is from Roblox
  const isRobloxRequest = 
    userAgent.includes('Roblox') || 
    headers['roblox-browser-asset-request'] ||
    headers['rbx-requester'] ||
    headers['x-csrf-token'];

  if (isRobloxRequest) {
    // Return actual script for Roblox requests
    const scriptContent = `loadstring(game:HttpGet("https://raw.githubusercontent.com/ImNotWhyLclc/Rendex/refs/heads/main/Loader.luau "))()`;
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
      body: scriptContent
    };
  }

  // Return access denied message for all other requests
  const accessDeniedHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Access Restricted</title>
    <style>
        body {
            background: #1e1e2e;
            color: #cdd6f4;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            text-align: center;
            padding: 40px;
            background: rgba(30, 30, 46, 0.8);
            border-radius: 16px;
            border: 1px solid rgba(100, 116, 139, 0.3);
            backdrop-filter: blur(10px);
        }
        h1 {
            color: #f38ba8;
            margin-bottom: 20px;
            font-size: 2.5rem;
        }
        p {
            margin: 15px 0;
            line-height: 1.6;
        }
        .footer {
            margin-top: 30px;
            color: #94e2d5;
            font-style: italic;
        }
        .icon {
            font-size: 3rem;
            margin-bottom: 20px;
            color: #cba6f7;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="icon">🔒</div>
        <h1>Access Restricted</h1>
        <p>This endpoint serves protected Lua content intended exclusively for authorized execution environments.</p>
        <p>Direct browser access or inspection is not permitted.</p>
        <p>Please contact the script owner if you believe this is an error.</p>
        <div class="footer">Rendex Security System</div>
    </div>
</body>
</html>
`;

  return {
    statusCode: 403,
    headers: {
      'Content-Type': 'text/html',
      'X-Roblox-Protected': 'true'
    },
    body: accessDeniedHtml
  };
};
