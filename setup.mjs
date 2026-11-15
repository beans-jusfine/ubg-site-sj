// Build the Scramjet 2.x browser runtime assets consumed by Fernlight.
import { createRequire } from 'node:module';
import { cpSync, rmSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { scramjetPath } from '@mercuryworkshop/scramjet/path';

const require = createRequire(import.meta.url);
const dirOf = (specifier) => path.dirname(require.resolve(specifier));
const OUT = process.env.OUT_DIR || 'public';
mkdirSync(OUT, { recursive: true });

const packages = [
  [scramjetPath, 'scram'],
  [dirOf('@mercuryworkshop/scramjet-controller'), 'controller'],
  [dirOf('@mercuryworkshop/scramjet-utils'), 'utils'],
  [dirOf('@mercuryworkshop/epoxy-transport'), 'epoxy']
];

for (const [from, name] of packages) {
  const dest = path.join(OUT, name);
  rmSync(dest, { recursive: true, force: true });
  cpSync(from, dest, { recursive: true });
  console.log('copied', dest);
}

const SW = `importScripts('/controller/controller.sw.js');

self.addEventListener('fetch', (event) => {
  if ($scramjetController.shouldRoute(event)) {
    event.respondWith($scramjetController.route(event));
  }
});

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
`;
writeFileSync(path.join(OUT, 'sw.js'), SW);
console.log('wrote', path.join(OUT, 'sw.js'));
console.log('Scramjet 2.x assets generated in', OUT);
