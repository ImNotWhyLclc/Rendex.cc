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

  // Return access denied page with Rendex branding
  const accessDeniedHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Access Restricted</title>
    <style>
        :root {
            --bg: #0a0a0c;
            --card-bg: #121215;
            --text: #ffffff;
            --grid: rgba(255, 255, 255, 0.05);
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background-color: var(--bg);
            background-image: 
                linear-gradient(var(--grid) 1px, transparent 1px),
                linear-gradient(90deg, var(--grid) 1px, transparent 1px);
            background-size: 20px 20px;
            color: var(--text);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .card {
            background: var(--card-bg);
            border-radius: 16px;
            padding: 40px;
            max-width: 600px;
            width: 90%;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
        }
        
        .icon {
            font-size: 3rem;
            margin-bottom: 25px;
            text-align: center;
            color: #64b5f6;
        }
        
        h1 {
            font-size: 2.2rem;
            margin-bottom: 20px;
            text-align: center;
            color: #e0e0e0;
        }
        
        p {
            margin: 15px 0;
            line-height: 1.6;
            color: #e0e0e0;
            font-size: 1.1rem;
        }
        
        .copyright {
            margin-top: 30px;
            text-align: center;
            color: #888;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="icon">🛡️</div>
        <h1>Access Restricted</h1>
        <p>This endpoint serves protected Lua content intended exclusively for authorized execution environments.</p>
        <p>Direct browser access or inspection is not permitted.</p>
        <p>Please contact the script owner if you believe this is an error.</p>
        <div class="copyright">© Rendex Secure Gateway</div>
    </div>
</body>
</html>
`;

  return {
    statusCode: 403,
    headers: {
      'Content-Type': 'text/html',
      'X-Rendex-Protected': 'true'
    },
    body: accessDeniedHtml
  };
};
