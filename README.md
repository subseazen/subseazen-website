# Subseazen Engineering Services — Website

A fast, SEO-friendly, fully static multi-page website (plus one optional PHP form handler).

---

## 1. What's inside

```
index.html            Home
about.html            About · Mission · Vision · Values
services.html         12 capabilities + API standards table
products.html         Fire & safety catalogue (search + filter)
projects.html         Project history + major clients
certifications.html   ISO 9001 · API 20E · product standards
contact.html          Offices · quote form · map
css/style.css         Design system (one stylesheet)
js/main.js            Nav, animations, form
js/products.js        Catalogue data + search/filter
assets/favicon.svg    Icon / logo mark
contact-handler.php   Optional server-side form handler (Hostinger)
.htaccess             HTTPS, clean URLs, caching, gzip, security headers
robots.txt            Search-engine directives
sitemap.xml           Sitemap
```

Ignore anything in `partials/`, `body/`, `build.py`, `shot.py` — those are source
files used to generate the pages and are **not needed on the server**. (They're not
in the deploy zip.)

---

## 2. Deploy to Hostinger (2 minutes)

1. Log in to **hPanel → Files → File Manager**.
2. Open **`public_html`** and delete any default `index.html` placeholder.
3. Upload **every file and folder** from this package into `public_html`
   (upload the zip and use "Extract" — fastest).
4. Visit your domain. Done.

> Keep the folder structure intact — `css/`, `js/` and `assets/` must stay as folders.

If you're using a subfolder instead of the root domain, everything still works
because all links are **relative**.

---

## 3. Things to customise (search & replace)

| What | Where | Current value |
|------|-------|---------------|
| WhatsApp number | `partials/footer.html` → rebuilt into every page's `.wa` link | `447587261490` |
| Enquiry email | `contact-handler.php` (`$TO`) and form `data-email` in `contact.html` | `Ravikumar@subseazen.com` |
| Phone numbers / offices | `contact.html` and footer | as per your documents |
| Google Map location | `contact.html` iframe `src` | 86–90 Paul Street, London |

Because the WhatsApp link is baked into each finished page, the quickest way to
change the number is a **global find-and-replace of `447587261490`** across all
`*.html` files (File Manager → search, or your code editor).

---

## 4. Make the quote form actually email you

The form works out of the box in **fallback mode**: clicking *Send request* opens the
visitor's email app with everything pre-filled. To receive submissions **server-side**
instead:

1. In hPanel, create an email account (e.g. `sales@subseazen.com`).
2. Open `contact-handler.php`, set `$TO` to that address.
3. In `contact.html`, add `data-live="true"` to the form tag:
   ```html
   <form class="form" id="quote-form" data-live="true" ...>
   ```
4. Upload both files. Submissions now POST to `contact-handler.php` and show an
   inline success message.

Prefer a no-server option? Swap the form `action` to a free service like
**Web3Forms** or **Formspree** and set `data-live="true"` — the JS handles the rest.

---

## 5. Adding real photos (optional, recommended)

The design is intentionally strong without photography (SVG product icons, colour-coded
bands, spec tables). To add real imagery:

- Drop optimised images (WebP/JPG) into `assets/`.
- Hero / banner: add a background image to `.hero` or `.pbanner` in `css/style.css`.
- Products: replace the `ICON[...]` SVG in `js/products.js` with `<img>` tags pointing
  to `assets/your-photo.webp`.
- Client logos: on `index.html` / `projects.html`, swap the text in `.clients div`
  for `<img>` logos.

Keep images under ~200 KB each for the fast-loading target.

---

## 6. Notes

- **Founded 2017** is used throughout (any 2006 reference in older material was ignored, as requested).
- **UK English** spelling throughout.
- Accessibility: keyboard focus states, reduced-motion support, semantic landmarks, alt/labels.
- SEO: unique title + meta description + canonical per page, Open Graph tags,
  Organization structured data (home + contact), sitemap and robots.
- No cookies, no trackers, no external JS except Google Fonts. Add analytics if you want it.
