export default (context, inject) => {
  if (process.browser) {
    if (window.MSInputMethodContext && document.documentMode) {
      // IE11
      context.store.commit(
        'addAdditionalScripts',
        'https://cdn.jsdelivr.net/gh/nuxodin/ie11CustomProperties@4.1.0/ie11CustomProperties.min.js',
      )
    }
  }
}
