# Module 2 — Give your Worker a memory

In Module 1, your worker had no memory — every request got the exact same
page. Here, you'll add **Workers KV**, a simple key-value store, so your
worker can remember something between requests: a visit counter.

**Files you'll need:**
- `worker.js` — updated with the counter logic (replaces your Module 1 code)

---

## Part 1 — Create a KV namespace

KV is Cloudflare's key-value database. You'll create one to hold your
counter.

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) and sign in.

2. Click **Workers & Pages** in the left sidebar, then the **KV** tab near
   the top.

3. Click **Create a namespace**. Name it `hello-world-counter` and click
   **Add**.

---

## Part 2 — Bind it to your worker

A "binding" is how a worker gets access to something like a KV namespace —
you attach it by name, and your code can then use that name to read and
write to it.

1. Click **Workers & Pages** → your worker's name (the one from Module 1).

2. Click the **Settings** tab, then **Variables and Bindings** (or
   **Bindings**, depending on what you see).

3. Click **Add binding** → **KV namespace**.

4. For **Variable name**, type `COUNTER` exactly (the code depends on this
   name). For **KV namespace**, select `hello-world-counter`.

5. Click **Save** (or **Deploy**, if prompted).

---

## Part 3 — Update your code

1. Click **Edit code** on your worker.

2. Select everything in the editor and delete it.

3. Open the updated `worker.js` in a text editor, select all, copy, and
   paste it into the Cloudflare editor.

4. Check that the R2 URL from Module 1 is still there near the top:
   ```
   const R2_PUBLIC_URL = "...";
   ```
   It should already have your real URL from last time — leave it as is.

5. Click **Deploy**.

---

## Part 4 — Watch it count

1. Open your `.workers.dev` URL. You should see the same orange page as
   before, plus a new line: **"You are visitor #1"**.

2. Refresh a few times. The number goes up each time.

3. Open the page on your phone, or send the link to someone else and have
   them load it — the count keeps climbing, because it's stored in KV, not
   in your browser.

   > This is the key idea: KV is shared, durable storage that any request
   > to your worker — from anywhere — can read and write.

---

## What you built

| Piece | What it does |
|---|---|
| KV namespace | A key-value store that persists between requests |
| `COUNTER` binding | Gives your worker code access to that store by name |
| `env.COUNTER.get` / `.put` | Reads and writes the count on every visit |

One caveat worth knowing: KV writes can take a moment to show up everywhere
in the world (it's "eventually consistent"), so if two people load the page
at the exact same instant in different countries, the count might briefly
look slightly off. For a visit counter, that's harmless.

---

**Next:** [Module 3 — a real address, and a security switch](MODULE-3.md)
(needs a domain name — read the note at the top before starting).
