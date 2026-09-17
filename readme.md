# Ela Alibi — Portfolio Site

A clean, hand-coded portfolio (no Framer, no build step) with a self-serve
admin panel powered by Decap CMS, so Ela can add new projects herself.

## What's in here

- `index.html`, `style.css`, `script.js` — the site itself
- `content/projects.json` — the Landscape and Vertical project lists (editable via admin)
- `content/settings.json` — name, tagline, bio, email, tools (editable via admin)
- `admin/` — the Decap CMS admin panel (lives at `yoursite.com/admin`)

## One-time setup (you do this once)

1. **Create a GitHub repo** and push this whole folder to it.
2. **Netlify → Add new site → Import an existing project**, connect the repo.
   - Build command: leave blank
   - Publish directory: `/` (root)
   - Deploy.
3. **Site settings → Identity → Enable Identity.**
4. Under Identity settings, set **Registration → Invite only** (so random
   people can't sign themselves up as editors).
5. Under Identity settings, scroll to **Services → Git Gateway → Enable Git Gateway.**
   This is what lets the admin panel save changes back to GitHub, which
   triggers Netlify to rebuild the site automatically.
6. Go to the **Identity** tab → **Invite users** → enter Ela's email.
   She'll get an email invite, set a password, and land on the site logged in.

## What Ela does from here on (no code, ever)

1. Go to `yoursite.com/admin`
2. Log in with the email/password from her invite
3. Click **Projects** to add/edit/remove videos (just paste the YouTube link),
   or **Site Settings** to update her bio, tagline, email, or tools
4. Click **Publish** — the live site updates automatically within about a minute

## Notes

- Videos are linked from YouTube, not uploaded to the site, so there's no
  file-size limit. Unlisted YouTube videos work fine and won't show up in
  search or on her channel.
- The pixel-styled font is "Pixelify Sans" (Google Fonts) paired with
  "Space Grotesk" for body text — both load automatically, no local font
  files needed.
- To change colors, edit the `:root` section at the top of `style.css`.
