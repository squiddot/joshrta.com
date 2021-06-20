export default function({ route, store }) {
  // see if we have the Craft query param
  const isLivePreview = route.query['x-craft-live-preview'] ?? false

  // commit to the store
  store.commit('setCraftLivePreviewState', isLivePreview)

  // close the menu
  store.commit('setMenuOpenState', false)
}
