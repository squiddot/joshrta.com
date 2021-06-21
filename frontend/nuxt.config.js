require('events').EventEmitter.defaultMaxListeners = 20

// if we're in dev mode, let's not worry about SSL checks
const isDev = process.env.DEV_MODE === '1'
if (isDev) {
  // eslint-disable-next-line
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
}

const headLink = [
  { rel: 'dns-prefetch', href: 'https://polyfill.io' },
  { rel: 'dns-prefetch', href: process.env.CLOUDFRONT_URL },
  { rel: 'dns-prefetch', href: process.env.SHARP_DISTRIBUTION_ID },
  { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
]

export default {
  buildDir: `.nuxt`,
  server: {
    timing: true,
  },
  dir: {
    pages: 'pages',
  },
  /*
   ** Headers of the page
   */
  head: {
    title: '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
      {
        hid: 'themeColor',
        name: 'theme-color',
        content: '#007cff',
      },
    ],
    link: headLink,
    script: [
      {
        src: 'https://polyfill.io/v3/polyfill.min.js?features=CustomEvent',
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#007cff',
    height: '3px',
    continuous: true,
    duration: 1000,
  },
  /*
   ** Global CSS
   */
  css: ['normalize.css', 'aos/dist/aos.css', `~/scss/styles.scss`],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/additional-scripts',
    { src: '~/plugins/aos', ssr: false }, // No need to run animations on the server
    '~/plugins/card-helpers',
    '~/plugins/choices.client',
    '~/plugins/cloak',
    '~/plugins/craftcms',
    { src: '~/plugins/el-observers', ssr: false },
    '~/plugins/helpers',
    '~/plugins/humanize',
    '~/plugins/metric-timers.client',
    '~/plugins/metric-timers.server',
    { src: '~/plugins/polyfills', ssr: false }, // The server runs a modern browser for rendering and doesn't need any polyfills
    { src: '~/plugins/resizeobserver', ssr: false }, // The server doesn't need to listen to screen resizing.
    '~/plugins/vue-change-case',
    '~/plugins/vue-formulate',
    '~/plugins/vue-observe-visibility',
    // '~/plugins/vue-sanitize',
    '~plugins/vue-vimeo-player',
    '~plugins/vw-vh',
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt/components
    '@nuxt/components',
    // Doc: https://github.com/nuxt-community/router-module
    '@nuxtjs/router-extras',
    // Doc: https://github.com/nuxt-community/svg-module
    '@nuxtjs/svg',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    //  https://codesandbox.io/s/github/nuxt-community/svg-sprite-module/
    '@nuxtjs/svg-sprite',
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/toast
    '@nuxtjs/toast',
    // Doc: https://github.com/nuxt-community/redirect-module
    '@nuxtjs/redirect-module',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://axios.nuxtjs.org/options.html
    // '@nuxtjs/proxy',
    // Doc: https://pwa.nuxtjs.org/setup.html
    // '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/apollo-module
    '@nuxtjs/apollo',
    // Doc: https://github.com/nuxt-community/device-module
    '@nuxtjs/device',
    // Doc: https://github.com/nicolasbeauvais/vue-social-sharing
    'vue-social-sharing/nuxt',
    // Doc: https://sentry.nuxtjs.org/
    '@nuxtjs/sentry',
    // Doc: https://gitlab.com/broj42/nuxt-cookie-control
    [
      'nuxt-cookie-control',
      {
        controlButton: false,
        colors: {
          barButtonHoverColor: '#000000',
          barButtonBackground: '#007cff',
          barButtonHoverBackground: '#ffffff',
        },
        text: {
          acceptAll: 'Accept',
        },
      },
    ],
    // Custom Modules
    '~/modules/pm2-io',
  ],
  components: true,
  seomaticMeta: {
    // debug: true,
    routeRemap: [
      {
        path: '/',
        getFrom: 'homepage',
      },
    ],
  },
  toast: {
    position: 'bottom-right',
    duration: 5000,
    keepOnHover: true,
    register: [
      {
        name: 'myError',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error',
        },
      },
    ],
  },
  svgSprite: {
    input: `~/assets/sprite/svg/`,
    output: `~/assets/sprite/gen/`,
    iconsPath: null,
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
  },
  env: {
    CLOUDFRONT_URL: process.env.CLOUDFRONT_URL,
    CLOUDFRONT_ID: process.env.CLOUDFRONT_ID,
  },
  proxy: {
    '/api': {
      target: process.env.GRAPHQL_URL,
      pathRewrite: {
        '^/api': process.env.GRAPHQL_PATH,
      },
      secure: !isDev,
      headers: {
        Authorization: `Bearer ${process.env.GRAPHQL_TOKEN}`,
      },
    },
    '/get-csrf': {
      target: process.env.BACKEND_URL,
      secure: !isDev,
    },
    '/get-gql-token': {
      target: process.env.BACKEND_URL,
      secure: !isDev,
    },
    '/get-field-options': {
      target: process.env.BACKEND_URL,
      secure: !isDev,
    },
    '/get-form-layout': {
      target: process.env.BACKEND_URL,
      secure: !isDev,
    },
    '/form': {
      target: process.env.BACKEND_URL,
      secure: !isDev,
    },
    [`/${process.env.CLOUDFRONT_ID}`]: {
      target: process.env.CLOUDFRONT_URL,
      pathRewrite: {
        [`^/${process.env.CLOUDFRONT_ID}`]: '/',
      },
      secure: !isDev,
    },
    '/sitemap.xml': {
      target: process.env.BACKEND_URL,
      secure: !isDev,
    },
    '/sitemap*': {
      target: process.env.BACKEND_URL,
      secure: !isDev,
    },
    '/robots.txt': {
      target: process.env.BACKEND_URL,
      secure: !isDev,
    },
    '/humans.txt': {
      target: process.env.BACKEND_URL,
      secure: !isDev,
    },
  },
  // Give apollo module options
  apollo: {
    includeNodeModules: true,
    defaultOptions: {
      $query: {
        loadingKey: 'loading',
        fetchPolicy: 'no-cache',
      },
    },
    // optional
    // watchLoading: '~/apollo/apollo-watch-loading-handler.js',
    // optional
    // errorHandler: '~/apollo/apollo-error-handler.js',
    clientConfigs: {
      default: '~/apollo/apollo-config.js',
    },
  },
  /*
   ** Build configuration
   */
  build: {
    // NOTE: Please do not deploy bundles built with "analyze" mode, they're for analysis purposes only.
    // analyze: true,
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
  layoutTransition: {
    duration: 250,
  },
  pageTransition: {
    duration: 250,
  },
  // Router middleware (https://nuxtjs.org/guides/directory-structure/middleware)
  router: {
    middleware: ['updateStoreState'],
    linkActiveClass: 'selected',
  },
}
