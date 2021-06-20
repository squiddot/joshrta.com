export default (context, inject) => {
  const timeStart = () => {}
  const timeEnd = () => {}
  inject('timeStart', timeStart)
  inject('timeEnd', timeEnd)
}
