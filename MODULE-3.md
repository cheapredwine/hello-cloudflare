# Module 3 — A real address, and a security switch

So far your site has lived at a `*.workers.dev` address. Here, you'll put it
on a domain name of your own, and flip on **"I'm Under Attack Mode"** — a
security switch that shows every visitor a quick "Checking your browser..."
challenge before letting them through.

> **Before you start:** unlike Modules 1 and 2, this one needs an actual
> domain name — something like `yourname.com`. Domains aren't free (usually
> $9–15/year). If you don't have one yet, this module can wait.
>
> Also, DNS changes can take anywhere from a few minutes to 24 hours to
> fully activate. Part 1 is a good place to stop and come back later if
> you're waiting on that.

---

## Part 1 — Get a domain onto Cloudflare

**If you don't have a domain yet — buy one through Cloudflare directly.**
This is the simplest path because everything stays in one dashboard, no
juggling a second company:

1. In the Cloudflare dashboard, click **Domain Registration** in the left
   sidebar.
2. Click **Register a domain**, search for one you like, and buy it.
3. It's added to your account automatically — skip to Part 2.

**If you already own a domain somewhere else** (Namecheap, GoDaddy, etc.):

1. Click **Add a site** in the Cloudflare dashboard and enter your domain.
2. Cloudflare scans your existing DNS records and shows you a plan. Click
   **Continue**.
3. Cloudflare gives you two **nameservers** (they look like
   `alice.ns.cloudflare.com`). Copy both.
4. Go to whichever site you registered the domain with, find the
   **nameservers** setting, and replace the existing ones with the two
   Cloudflare gave you. Save.
5. Wait for Cloudflare to email you that the domain is active. This is the
   part that can take a few minutes to 24 hours.

---

## Part 2 — Point your domain at the worker

1. Click **Workers & Pages** → your worker's name.
2. Click the **Settings** tab, then **Domains & Routes**.
3. Click **Add** → **Custom Domain**.
4. Type your domain (or a subdomain, like `hello.yourdomain.com`) and click
   **Add Custom Domain**. Cloudflare creates the DNS record and SSL
   certificate for you — no extra steps.
5. Wait about a minute, then visit your domain in a browser.

   > You should see the same Hello World page and visit counter from
   > Modules 1 and 2 — now loading from your own domain instead of
   > `.workers.dev`.

---

## Part 3 — Flip on "I'm Under Attack Mode"

This setting applies to your whole domain, not just the worker — it's a
zone-level switch.

1. Click your domain's name from the Cloudflare dashboard home (not the
   worker — the domain itself).
2. On the **Overview** page, find **Quick Actions** in the right-hand panel
   and click **I'm Under Attack Mode** to turn it on. (If you don't see it
   there, it's also under **Security** → **Settings**.)
3. Open your domain in a new **private/incognito** browser window (a
   regular tab may already have a "verified" cookie and skip the check).

   > You'll see a page that says "Checking your browser before accessing
   > yourdomain.com..." with a few seconds' delay, before your Hello World
   > page finally loads.

4. Turn the switch back off once you're done demoing it. It adds a delay
   for every single visitor, which isn't something you want left on
   permanently for a normal site — it's meant for when you're actively
   being attacked.

---

## What you built

| Piece | What it does |
|---|---|
| Domain added to Cloudflare | Puts your site's DNS under Cloudflare's control |
| Custom Domain on the worker | Routes real traffic on your domain to your worker code |
| I'm Under Attack Mode | A zone-level switch that JS-challenges every visitor before letting them through |

Your worker is now reachable at a real address, and you've seen the same
security layer that protects large sites during actual attacks — just
dialed up to always-on for a moment, on purpose.
