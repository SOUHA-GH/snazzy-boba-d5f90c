# Editing the site after it's live on Netlify

This site already has a built-in admin panel (no code, no Framer, no separate app).
Here's exactly how it works, split into what you (the builder) set up once, and
what Ela does forever after.

---

## Part 1 — One-time setup (you do this, ~15 minutes)

1. **Push this folder to a GitHub repo.** Create a new repo, upload all these
   files (keep the folder structure exactly as-is: `admin/`, `content/`,
   `index.html`, `style.css`, `script.js`).
2. **Netlify → Add new site → Import an existing project** → connect that repo.
   - Build command: leave blank
   - Publish directory: `/` (the root)
   - Deploy.
3. **Site configuration → Identity → Enable Identity.** This is Netlify's
   free login system — it's what lets Ela log into `/admin` securely.
4. In Identity settings, set **Registration → Invite only**, so random
   people can't sign themselves up as editors of her site.
5. Still in Identity settings, scroll to **Services → Git Gateway → Enable
   Git Gateway.** This is the piece that lets her admin panel save changes
   back to GitHub, which then triggers Netlify to automatically rebuild
   and republish the live site.
6. Go to the **Identity** tab → **Invite users** → enter Ela's email.
   She'll get an email invite, set her own password, and land on the
   site logged in.

That's it — from here on, you never need to touch code again either,
unless she wants a structural change (new section, different layout).

---

## Part 2 — What Ela does, forever, with zero code

1. Go to `hersite.com/admin` (swap in her real domain).
2. Log in with the email + password from her invite.
3. She'll see two sections in the left sidebar:
   - **Projects** — add, edit, reorder, or delete videos under Landscape
     or Vertical. She just pastes the YouTube link (unlisted videos work
     fine too — they won't show up in search or on her channel).
     - There's also an optional **Custom Cover Image** field per project —
       if she leaves it blank, the site automatically pulls the YouTube
       thumbnail. If she wants a different cover frame (say, a more
       flattering freeze-frame than YouTube picked), she uploads an image
       there instead.
   - **Site Settings** — her name, tagline, bio, email, LinkedIn URL,
     YouTube URL, spoken languages, and the list of tools/software she
     uses (Premiere Pro, DaVinci Resolve, CapCut are already in there —
     she can add more or remove any).
4. She clicks **Publish** (top right) after any change.
5. The live site updates automatically within about a minute — no
   redeploy button to press, no waiting on you.

**What she can't do without you:** change the color palette, fonts, or
layout structure. Those live in `style.css` and are a code-level change.
If she wants a new color mood or a different section entirely down the
line, that's a "come back to your designer" moment — which is normal and
fine, most portfolio sites work this way.

---

## Visual system reference (for you, if you touch the CSS later)

- **Colors** — all defined at the top of `style.css` under `:root`.
  Change `--bg`, `--fg`, `--accent` etc. there and it cascades everywhere.
- **Fonts** — "Pixelify Sans" (headings/pixel accents) + "Space Grotesk"
  (body text), both loaded free from Google Fonts, no local files needed.
- **The pixel corner-cursor effect** on project cards (the little bracket
  corners that appear on hover) is the main "pixel art" visual signature —
  it's a nod to retro game selection cursors. It's defined in the `.corner`
  rules in `style.css` if you ever want to adjust its size or color.
- Everything is a single unstyled-framework build (no Tailwind, no React) —
  just HTML/CSS/JS, so any web developer can pick it up later if needed.
