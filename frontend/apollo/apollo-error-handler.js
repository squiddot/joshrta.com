export default ({ graphQLErrors, networkError, operation, forward }, nuxtContext) => {
  // eslint-disable-next-line no-console
  console.error('Global error handler')
  // eslint-disable-next-line no-console
  console.error(graphQLErrors, networkError, operation, forward)
}
