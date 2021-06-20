let loading = 0
export default (isLoading, countModifier, nuxtContext) => {
  loading += countModifier
  // eslint-disable-next-line no-console
  console.log('Global loading', loading, countModifier)
}
