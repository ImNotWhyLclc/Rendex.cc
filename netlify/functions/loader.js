exports.handler = async (event) => {
  const headers = event.headers || {};
  const userAgent = headers['user-agent'] || headers['User-Agent'] || '';
  
  const isRobloxRequest = 
    userAgent.includes('Roblox') || 
    headers['roblox-browser-asset-request'] ||
    headers['rbx-requester'] ||
    headers['x-csrf-token'];

  if (isRobloxRequest) {
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
            --accent: #009eff;
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
            padding: 50px;
            max-width: 700px;
            width: 90%;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        }
        
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
        }
        
        .icon-container {
            display: flex;
            justify-content: center;
            margin-bottom: 30px;
        }
        
        .icon {
            width: 60px;
            height: 60px;
            background: rgba(0, 158, 255, 0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(0, 158, 255, 0.3);
        }
        
        .icon svg {
            width: 32px;
            height: 32px;
            color: var(--accent);
        }
        
        h1 {
            font-size: 2.5rem;
            margin-bottom: 25px;
            text-align: center;
            color: var(--text);
            letter-spacing: -0.5px;
        }
        
        p {
            margin: 20px 0;
            line-height: 1.7;
            color: #e0e0e0;
            font-size: 1.2rem;
            text-align: center;
        }
        
        .copyright {
            margin-top: 40px;
            text-align: center;
            color: #888;
            font-size: 1.05rem;
            opacity: 0.8;
        }
        
        .footer {
            margin-top: 15px;
            text-align: center;
            color: #666;
            font-size: 0.95rem;
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="icon-container">
            <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2L4 5v11l8 6 8-6V5z"></path>
                </svg>
            </div>
        </div>
        <h1>Access Restricted</h1>
        <p>This endpoint serves protected Lua content intended exclusively for authorized execution environments.</p>
        <p>Direct browser access or inspection is not permitted.</p>
        <p>Please contact the script owner if you believe this is an error.</p>
        <div class="copyright">© Rendex Secure Gateway</div>
        <div class="footer">All rights reserved</div>
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
