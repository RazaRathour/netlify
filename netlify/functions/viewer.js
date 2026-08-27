exports.handler = async (event) => {
    const p = event.queryStringParameters || {};
    if (!p.img || !p.url) {
        return { statusCode: 200, headers: { 'Content-Type': 'text/html' },
            body: '<html><body style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:#667eea;font-family:sans-serif"><div style="text-align:center;color:white"><h1>Invalid Link</h1></div></body></html>' };
    }
    const img = decodeURIComponent(p.img);
    const url = decodeURIComponent(p.url);
    const h = '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta property="og:type" content="website"><meta property="og:title" content="Check this out!"><meta property="og:description" content="Click to view"><meta property="og:image" content="' + img + '"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:url" content="' + url + '"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="Check this out!"><meta name="twitter:image" content="' + img + '"><title>Image Link</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:sans-serif;background:linear-gradient(135deg,#667eea,#764ba2);min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}.c{background:#fff;border-radius:24px;padding:40px;max-width:700px;width:100%;text-align:center;box-shadow:0 25px 50px rgba(0,0,0,.25)}img{max-width:100%;height:auto;border-radius:16px;cursor:pointer;box-shadow:0 10px 30px rgba(0,0,0,.2)}.m{margin-top:30px;color:#64748b;font-size:16px}button{margin-top:20px;padding:16px 40px;background:linear-gradient(135deg,#6366f1,#ec4899);color:#fff;border:none;border-radius:12px;font-size:18px;font-weight:700;cursor:pointer}</style></head><body><div class="c"><img src="' + img + '" onclick="location.href=\'' + url + '\'"><div class="m">Video</div><button onclick="location.href=\'' + url + '\'">Play Video</button></div></body></html>';
    return { statusCode: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' }, body: h };
};
