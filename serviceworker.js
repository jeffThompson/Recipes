'use strict'

const cacheName = 'pwa-v100' // change when cached content is updated
const pathRoot = '/cookbook/'
const urlsToCache = [
	'images/cookbook-48.png',
	'images/cookbook-96.png',
	'images/cookbook-144.png',
	'images/cookbook-192.png',
	'index.js',
	'stylesheet.css',
	'manifest.json'
]

self.addEventListener('install', ev => {
	ev.waitUntil(
		caches
		.open(cacheName)
		.then(cache => {
			cache.addAll(urlsToCache.map(url => new Request(pathRoot + url, {credentials: 'same-origin'})))
		})
	)
})

self.addEventListener('activate', ev => {
	ev.waitUntil(
		caches
		.keys()
		.then(keyList => {
			keyList.forEach(key => {
				if (key !== cacheName)
					caches.delete(key)
			})
		})
	)
	return self.clients.claim();
})

self.addEventListener('fetch', ev => {
	ev.respondWith(
		caches
		.match(ev.request)
		.then(response => {
			if (response) return response
			return fetch(ev.request)
		})
	)
})
