<?php
// loader.php - Secure script loader
header('Content-Type: text/plain');
header('Access-Control-Allow-Origin: https://www.roblox.com');

// Security configuration
$allowed_user_agents = ['Roblox', 'Roblox/WinInet'];
$allowed_domains = ['roblox.com', 'www.roblox.com'];
$script_file = 'Loader.luau'; // Your actual script file name

// Get request headers
$user_agent = $_SERVER['HTTP_USER_AGENT'] ?? '';
$referer = $_SERVER['HTTP_REFERER'] ?? '';

// Security checks
$is_valid_agent = false;
foreach ($allowed_user_agents as $agent) {
    if (stripos($user_agent, $agent) !== false) {
        $is_valid_agent = true;
        break;
    }
}

$is_valid_referer = false;
foreach ($allowed_domains as $domain) {
    if (stripos($referer, $domain) !== false) {
        $is_valid_referer = true;
        break;
    }
}

// Additional security: Check if Roblox-specific headers exist
$roblox_headers = [
    'X-Request-Id',
    'X-Csrf-Token',
    'RBX-Requester'
];

$has_roblox_headers = false;
foreach ($roblox_headers as $header) {
    if (isset($_SERVER[$header]) || isset($_SERVER['HTTP_'.str_replace('-', '_', strtoupper($header))])) {
        $has_roblox_headers = true;
        break;
    }
}

// Final validation
if (($is_valid_agent && $is_valid_referer) || $has_roblox_headers) {
    // Check if script file exists
    if (file_exists($script_file)) {
        echo file_get_contents($script_file);
        exit;
    } else {
        http_response_code(404);
        echo "Script file not found";
        exit;
    }
}

// If validation fails
http_response_code(403);
echo "Access denied - Invalid request source";
exit;
?>
