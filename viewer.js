// Netlify Function — Facebook Image Link Generator
// Dynamically generates HTML with correct OG meta tags for Facebook sharing

exports.handler = async (event) => {
    const params = event.queryStringParameters || {};
    const img = params.img;
    const redirectUrl = params.url;

    if (!img || !redirectUrl) {
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
            body: getErrorHTML()
        };
    }

    const decodedImg = decodeURIComponent(img);
    const decodedUrl = decodeURIComponent(redirectUrl);

    const html = `<!DOCTYPE html>
<html lang="ur">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Facebook / Social Media OG Tags — dynamically set -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="Image Link">
    <meta property="og:description" content="Click to view image and visit link">
    <meta property="og:image" content="${escapeHtml(decodedImg)}">
    <meta property="og:image:width" content="800">
    <meta property="og:image:height" content="600">
    <meta property="og:url" content="${escapeHtml(decodedUrl)}">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Image Link">
    <meta name="twitter:image" content="${escapeHtml(decodedImg)}">
    
    <title>Image Link</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            background: white;
            border-radius: 24px;
            padding: 40px;
            max-width: 700px;
            width: 100%;
            text-align: center;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
            animation: slideUp 0.6s ease-out;
        }
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .image-wrapper {
            position: relative;
            display: inline-block;
            max-width: 100%;
        }
        .clickable-image {
            max-width: 100%;
            height: auto;
            border-radius: 16px;
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            display: block;
        }
        .clickable-image:hover {
            transform: scale(1.03);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }
        .click-indicator {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(99, 102, 241, 0.9);
            color: white;
            padding: 20px 30px;
            border-radius: 16px;
            font-size: 18px;
            font-weight: 600;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }
        .image-wrapper:hover .click-indicator { opacity: 1; }
        .message { margin-top: 30px; color: #64748b; font-size: 16px; line-height: 1.6; }
        .redirect-btn {
            margin-top: 20px;
            padding: 16px 40px;
            background: linear-gradient(135deg, #6366f1, #ec4899);
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 18px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
        }
        .redirect-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 28px rgba(99, 102, 241, 0.4);
        }
        @media (max-width: 640px) {
            .container { padding: 30px 20px; }
            .click-indicator { font-size: 16px; padding: 15px 25px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="image-wrapper">
            <img id="mainImage" class="clickable-image" src="${escapeHtml(decodedImg)}" alt="Click to visit">
            <div class="click-indicator">👆 Click karein</div>
        </div>
        <div class="message">Image par click karein ya niche button dabayein</div>
        <button class="redirect-btn" id="redirectBtn">🚀 Visit Link</button>
    </div>
    <script>
        function redirect() { window.location.href = ${JSON.stringify(decodedUrl)}; }
        document.getElementById('mainImage').addEventListener('click', redirect);
        document.getElementById('redirectBtn').addEventListener('click', redirect);
    </script>
</body>
</html>`;

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=86400'
        },
        body: html
    };
};

function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function getErrorHTML() {
    return `<!DOCTYPE html>
<html>
<head><title>Error</title></head>
<body style="display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:sans-serif;background:#667eea;">
    <div style="text-align:center;color:white;padding:40px;">
        <h1>❌ Invalid Link</h1>
        <p>Link mein data nahi mila. Link sahi hai?</p>
    </div>
</body>
</html>`;
}
