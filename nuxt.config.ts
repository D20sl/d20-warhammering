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
    experimental: {
      tasks: true,
    },
    // Dev/preview scheduler. In production each host needs its own cron wiring:
    //   - Netlify: add a Netlify Scheduled Function with the same cron.
    scheduledTasks: {
      // Every Sunday at 03:00.
      '0 3 * * 0': ['cleanup:uploads'],
    },
  },
});
