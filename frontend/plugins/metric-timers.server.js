import { now } from './_lib/now'

export default (context, inject) => {
  const timers = new Map()
  const timeStart = name => {
    name = name.toLowerCase().replace(/\s/g, '_')
    if (!timers.has(name)) {
      timers.set(name, now())
    }
  }
  inject('timeStart', timeStart)
  const timeEnd = (name, description = '') => {
    name = name.toLowerCase().replace(/\s/g, '_')
    if (timers.has(name)) {
      const currentTimingHeader = context.res.getHeader('Server-Timing')
      const duration = now() - timers.get(name)
      context.$updateMetric(`timer_${name}`, 'histogram', duration)
      if (currentTimingHeader) {
        context.res.setHeader(
          'Server-Timing',
          `${currentTimingHeader},${name};dur=${duration};desc="${description || name}"`,
        )
      } else {
        context.res.setHeader('Server-Timing', `${name};dur=${duration};desc="${description || name}"`)
      }
      timers.delete(name)
    }
  }
  inject('timeEnd', timeEnd)
}
