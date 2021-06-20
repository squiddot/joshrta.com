import path from 'path'
import io from '@pm2/io'

const customMetrics = new Map()
const updateMetric = (name, type, value) => {
  if (!customMetrics.has(name)) {
    switch (type) {
      case 'histogram':
        customMetrics.set(name, io.histogram({ name, measurement: 'mean' }))
        break
      case 'meter':
        customMetrics.set(name, io.meter({ name }))
        break
      case 'counter':
        customMetrics.set(name, io.counter({ name }))
        break
      default:
        customMetrics.set(name, io.metric({ name }))
    }
  }
  switch (type) {
    case 'histogram':
      customMetrics.get(name).update(value)
      break
    case 'meter':
      customMetrics.get(name).mark()
      break
    case 'counter':
      if (value === false || value === 'dec') {
        customMetrics.get(name).dec()
      } else {
        customMetrics.get(name).inc()
      }
      break
    case 'metric':
    default:
      customMetrics.get(name).set(value)
  }
}

process.updateMetric = updateMetric

export default function() {
  this.addPlugin({
    src: path.resolve(__dirname, 'pm2-io', 'plugin.js'),
    fileName: 'nuxt-pm2-io.js',
  })
}
