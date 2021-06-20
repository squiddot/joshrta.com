import { now } from './_lib/now'
import { gqlRedirect } from '~/gql/redirect.graphql'

const domainRe = /https?:\/\/([A-Za-z0-9-.:]+)\/?/

export default (context, inject) => {
  const requestHost = process.server ? context.req.headers.host : window.location.host

  const thisDomain = url => {
    if (url) {
      const match = url.match(domainRe)
      if (match) {
        const host = match[1]
        if (host !== requestHost) {
          return false
        }
      }
    }
    return true
  }
  inject('thisDomain', thisDomain)

  const stripDomain = url => {
    if (url) {
      return `/${url.replace(domainRe, '')}`.replace(/\/\//, '/')
    }
    return ''
  }
  inject('stripDomain', stripDomain)

  inject('now', now)

  const checkRedirect = async (context, uri = false) => {
    if (uri === false) {
      uri = context.$route.fullPath
    }
    const client = context.$apolloProvider.defaultClient
    context.$timeStart('graphqlRedirect')
    const { data: redirectData } = await client.query({
      query: gqlRedirect,
      variables: { ...client.defaultOptions.$query.variables, uri },
    })
    context.$timeEnd('graphql Redirect', '[GQL] Redirect Query')

    if (redirectData.redirect) {
      const { httpCode, destUrl } = redirectData.redirect
      context.$nuxt.context.redirect(httpCode, destUrl)
      return true
    }

    return false
  }
  inject('checkRedirect', checkRedirect)
}
