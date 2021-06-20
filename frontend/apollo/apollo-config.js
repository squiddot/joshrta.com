// import { sha256 } from 'hash.js'

import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [], // no types provided
    },
  },
})

export default function(context) {
  // if (process.server) {
  //   context.beforeNuxtRender(({ nuxtState }) => {
  //     console.log(nuxtState)
  //     nuxtState.MyTest = 'test'
  //   })
  // } else {
  //   console.log('nuxtState', context.nuxtState)
  // }

  let httpEndpoint = process.server ? process.env.GRAPHQL_URL : '/api'

  // add the craft live preview token if applicable
  if (process.server) {
    const token = context.route.query.token
    if (token) {
      httpEndpoint += `?token=${token}`
    }
  }

  return {
    httpEndpoint,
    getAuth: () => (process.server ? `Bearer ${process.env.GRAPHQL_TOKEN}` : ''),
    // persisting: query => {
    //   sha256.update(JSON.stringify(query)).digest('hex')
    // },
    cache: new InMemoryCache({
      fragmentMatcher,
    }),
  }
}
