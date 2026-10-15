# Setup and Deployment

Serve the repository as static files:

```sh
python3 -m http.server 8080
```

Open http://127.0.0.1:8080/index.html and inspect `Budget-Buddy.html` for the wider budgeting layout. The source uses a Tailwind CDN, so styling may require network access. There is no package manifest or documented server/database setup in the reviewed tree.
