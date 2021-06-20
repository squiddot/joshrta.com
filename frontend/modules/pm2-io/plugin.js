export default (context, inject) => {
  if (process.server) {
    inject('updateMetric', process.updateMetric)
  } else {
    inject('updateMetric', () => {})
  }
}
