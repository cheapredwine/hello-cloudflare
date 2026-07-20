// Paste this into: dash.cloudflare.com → Workers & Pages → Create → Create Worker
//
// Every HTTP request to your worker calls fetch().
// Return a Response — that's it. No framework, no server setup.

// ─── Step 1: Paste your R2 public URL here ───────────────────────────────────
//   dash.cloudflare.com → R2 → your-bucket → Settings → Public Access
//   It looks like: https://pub-abc123.r2.dev
const R2_PUBLIC_URL = "https://pub-REPLACE-ME.r2.dev";
// ─────────────────────────────────────────────────────────────────────────────

export default {
  // `env` gives your worker access to the bindings you set up in the
  // dashboard — like the KV namespace below.
  async fetch(request, env) {
    const url = new URL(request.url);

    // Open the Logs tab in the Workers dashboard to see these in real time.
    // Refresh your browser tab and watch them appear.
    console.log(request.method, url.pathname, request.headers.get("user-agent"));

    if (url.pathname === "/") {
      // ─── Module 2: read-and-increment a counter stored in KV ───────────────
      //   dash.cloudflare.com → Workers & Pages → KV → Create a namespace
      //   Then bind it to this worker as COUNTER (see MODULE-2.md).
      const current = Number((await env.COUNTER.get("visits")) ?? "0");
      const visits = current + 1;
      await env.COUNTER.put("visits", String(visits));
      // ─────────────────────────────────────────────────────────────────────

      return new Response(page(R2_PUBLIC_URL, visits), {
        headers: { "Content-Type": "text/html;charset=UTF-8" },
      });
    }

    return new Response("Not found", { status: 404 });
  },
};

function page(r2, visits) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Hello World</title>
    <style>
      body {
        font-family: sans-serif;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        margin: 0;
        background: #f97316;
        gap: 1rem;
      }
      h1  { color: white; font-size: 4rem; margin: 0; }
      p   { color: white; font-size: 1.25rem; margin: 0; opacity: 0.9; }
      img { width: 320px; }
    </style>
  </head>
  <body>
    <img src="${r2}/cloud.svg" alt="cloud" />
    <h1>Hello, World!</h1>
    <p>You are visitor #${visits}</p>
  </body>
</html>`;
}
