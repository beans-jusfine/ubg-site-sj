// Run once after `npm install`:  npm run setup
// Builds the ./public folder that you deploy to Cloudflare Pages.
// index.html lives inside ./public and is left untouched.

import { cpSync, rmSync, mkdirSync, writeFileSync } from 'node:fs';
import { scramjetPath } from '@mercuryworkshop/scramjet/path';
import { baremuxPath } from '@mercuryworkshop/bare-mux/node';
import { epoxyPath } from '@mercuryworkshop/epoxy-transport';

const OUT = process.env.OUT_DIR || 'public';
mkdirSync(OUT, { recursive: true });

for (const [from, name] of [[scramjetPath, 'scram'], [baremuxPath, 'baremux'], [epoxyPath, 'epoxy']]) {
  const dest = OUT + '/' + name;
  rmSync(dest, { recursive: true, force: true });
  cpSync(from, dest, { recursive: true });
  console.log('copied', dest);
}

const SW = `importScripts('/scram/scramjet.all.js');

const { ScramjetServiceWorker } = $scramjetLoadWorker();
const scramjet = new ScramjetServiceWorker();

async function handleRequest(event) {
  await scramjet.loadConfig();
  if (scramjet.route(event)) return scramjet.fetch(event);
  return fetch(event.request);
}

self.addEventListener('fetch', (event) => event.respondWith(handleRequest(event)));
`;

writeFileSync(OUT + '/sw.js', SW);
console.log('wrote public/sw.js');
console.log('Scramjet assets generated in', OUT);
