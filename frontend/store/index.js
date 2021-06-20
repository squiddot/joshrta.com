export const state = () => ({
  isLoading: false,
  is404: false,
  isCraftLivePreview: false,
  isMenuOpen: false,
  additionalScripts: [],
})

export const mutations = {
  setLoadingState(state, isLoading) {
    state.isLoading = isLoading
  },
  set404State(state, is404) {
    state.is404 = is404
  },
  setCraftLivePreviewState(state, isLivePreview) {
    state.isCraftLivePreview = isLivePreview
  },
  setMenuOpenState(state, isMenuOpen) {
    state.isMenuOpen = isMenuOpen
  },
  addAdditionalScripts(state, script) {
    if (!state.additionalScripts.includes(script)) {
      state.additionalScripts.push(script)
    }
  },
}

export const actions = {
  // called by nuxt on the server
  async nuxtServerInit({ dispatch }) {
    // populate the globals
    await dispatch('globals/populate')

    // populate the navigation
    await dispatch('navigation/populate')

    // populate the seo
    await dispatch('seo/populate')
  },
}
