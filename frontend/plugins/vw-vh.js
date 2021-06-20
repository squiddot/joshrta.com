const vw = () => Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = () => Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

export default (context, inject) => {
  inject('vw', vw)
  inject('vh', vh)
}
