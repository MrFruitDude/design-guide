# Lumo Design Guide (GitHub Pages)

This folder is a static site suitable for GitHub Pages.

Deploy steps:
1. Commit and push to `main` (or `master`).
2. In repository settings → Pages, select `Deploy from branch` and choose `main`/`master`, folder `/docs`.
3. Save. Your site will build automatically.

Local preview:
- Open `docs/index.html` in a browser, or use a local static server if you prefer. No build step required.

Custom domain:
- Add a `CNAME` file containing your domain. Example:
```
example.yourdomain.com
```
