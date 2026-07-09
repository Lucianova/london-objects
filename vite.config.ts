/// <reference types="vitest/config" />
import type { Connect, Plugin } from 'vite'
import { defineConfig } from 'vite'

// A pretend backend so the contact form works outside Cypress. It answers
// POST /api/contact in dev and preview with a short delay, roughly like a
// real server would. In Cypress tests we stub this route with cy.intercept()
// instead, so the tests never depend on it.
function fakeContactApi(): Plugin {
  const handler: Connect.NextHandleFunction = (req, res, next) => {
    if (req.method === 'POST' && req.url === '/api/contact') {
      setTimeout(() => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ ok: true }))
      }, 400)
      return
    }
    next()
  }

  return {
    name: 'fake-contact-api',
    configureServer(server) {
      server.middlewares.use(handler)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler)
    },
  }
}

export default defineConfig({
  plugins: [fakeContactApi()],
  build: {
    // The site has two pages; each one is its own entry point.
    rollupOptions: {
      input: {
        index: 'index.html',
        contact: 'contact.html',
      },
    },
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
})
