export default function({ store }) {
  if (process.browser) {
    store.commit('set404State', false)
    store.commit('setLoadingState', true)
  }
}
