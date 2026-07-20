# Hello World on Cloudflare

You'll end up with a webpage served from Cloudflare's global network, with an
image stored in R2 cloud storage. No installs, no command line — just a browser
and two files.

**Files you'll need:**
- `cloud.svg` — the image
- `worker.js` — the code that serves your page

---

## Part 1 — Store your image in R2

R2 is Cloudflare's file storage. You'll upload `cloud.svg` here and get a
public URL you can link to from anywhere.

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) and sign in
   (create a free account if you don't have one).

2. Click **R2** in the left sidebar.

3. Click **Create bucket**. Name it anything — `hello-world` works fine.
   Click **Create bucket** to confirm.

4. You're now inside your bucket. Click the **Settings** tab.

5. Scroll to **Public Access** and click **Allow Access**. A URL will appear
   that looks like `https://pub-abc123.r2.dev`. **Copy it — you'll need it
   in Part 2.**

6. Click the **Objects** tab, then **Upload**. Drag in `cloud.svg`.

   > You should see `cloud.svg` listed in the bucket when it's done.

---

## Part 2 — Create your Worker

A Worker is a small piece of code that runs on Cloudflare's network and
responds to requests. Yours will serve an HTML page with the image from Part 1.

1. Click **Workers & Pages** in the left sidebar.

2. Click **Create**, then **Create Worker**.

3. Give your worker a name (e.g. `hello-world`) and click **Deploy**.
   Cloudflare deploys a placeholder — that's fine, you'll replace it next.

4. Click **Edit code**. You'll see a code editor.

5. Select everything in the editor (`Ctrl+A` or `Cmd+A`) and delete it.

6. Open `worker.js` in a text editor, select all, copy, and paste it into
   the Cloudflare editor.

7. Find this line near the top:
   ```
   const R2_PUBLIC_URL = "https://pub-REPLACE-ME.r2.dev";
   ```
   Replace `https://pub-REPLACE-ME.r2.dev` with the URL you copied in step 5
   of Part 1.

8. Click **Deploy** in the top right.

9. Click the URL shown under your worker's name — it ends in `.workers.dev`.
   Your page should appear.

   > You should see an orange page with a smiling cloud and "Hello, World!"

---

## Part 3 — Watch your code run

This is the part where it gets interesting. You can see your worker respond
to every request in real time.

1. In the Workers dashboard, click the **Logs** tab on your worker.

2. In another browser tab, open your `.workers.dev` URL and refresh a few
   times.

3. Switch back to the Logs tab. You'll see a line for each request, showing
   the HTTP method, the path, and the browser that made it — logged by the
   `console.log` line in your code.

4. Try typing a made-up path into the address bar, like
   `your-worker.workers.dev/banana`. Refresh and watch a new log line appear
   showing `/banana` — and your worker returning a 404.

---

## What you built

| Piece | What it does |
|---|---|
| `cloud.svg` in R2 | A file stored in the cloud, served globally |
| `worker.js` | Code that runs on Cloudflare's edge on every request |
| `console.log` | A window into your running code |

The whole thing costs nothing and handles millions of requests per month on
the free tier.

---

**Next:** [Module 2 — give your worker a memory](MODULE-2.md) with a
KV-backed visit counter.
