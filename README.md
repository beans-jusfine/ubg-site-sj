# Fernlight Scramjet engine

This repository contains only the proxy-engine build source used by Fernlight. It is intentionally separate from the website and the Wisp server.

## Compatible runtime generation

This project pins Scramjet **1.1.0** and the matching BareMux / Epoxy 2.x transport packages. Fernlight's website currently uses the Scramjet 1.x API:

- `$scramjetLoadController()`
- `ScramjetController`
- `ScramjetServiceWorker`
- `BareMux.BareMuxConnection`

Do not upgrade this dependency to Scramjet 2.x without migrating the website and service worker to the separate controller / transport architecture.

## Build

```sh
npm install
npm run setup
```

The setup script generates `public/scram/`, `public/baremux/`, `public/epoxy/` and `public/sw.js` by default.

Fernlight's website repository builds these assets from this repository and publishes them under the website's own origin. They must not be hosted on a separate origin because the Scramjet service worker needs to control Fernlight pages.
