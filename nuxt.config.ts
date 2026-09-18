// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: false },

  app: {
    head: {
      titleTemplate: '%s | D20 Warhammering',
      htmlAttrs: {
        lang: 'it',
      },
      bodyAttrs: {
        class: 'h-svh',
      },
      meta: [{ name: 'robots', content: 'noindex, nofollow' }],
    },
  },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/image',
    '@nuxt/ui',
    'nuxt-auth-utils',
  ],

  colorMode: {
    preference: 'dark',
  },

  ui: {
    theme: {
      colors: [
        'primary',
        'secondary',
        'dark',
        'night',
        'abyss',
        'info',
        'success',
        'warning',
        'error',
      ],
    },
  },

  nitro: {
    storage: {
      // Backed by the Openship volume declared in openship.json. Locally this
      // resolves to the gitignored .data directory.
      uploads: {
        driver: 'fs',
        base: './.data/uploads',
      },
    },

    experimental: {
      tasks: true,
    },
    // Runs in-process under the node-server preset, so it needs no cron wiring
    // from the host: Openship has instance-level cron Jobs, but nothing that can
    // be declared in openship.json. Assumes a single replica - scale past one
    // and the task fires once per copy.
    scheduledTasks: {
      // Every Sunday at 03:00.
      '0 3 * * 0': ['cleanup:uploads'],
    },
  },
});
