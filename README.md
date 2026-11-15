# Fernlight Scramjet engine

This repository contains only the proxy-engine build source used by Fernlight. It is intentionally separate from the website and the Wisp server.

Included packages:
- `@mercuryworkshop/scramjet`
- `@mercuryworkshop/bare-mux`
- `@mercuryworkshop/epoxy-transport`

## Build

```sh
npm install
npm run setup
```

The setup script generates `public/scram/`, `public/baremux/`, `public/epoxy/` and `public/sw.js` by default.

Fernlight's website repository builds these assets from this repository and publishes them under the website's own origin. They must not be hosted on a separate origin because the Scramjet service worker needs to control Fernlight pages.
