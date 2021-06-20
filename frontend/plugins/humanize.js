import humanizeDuration from 'humanize-duration'

const shortEnglishHumanizer = humanizeDuration.humanizer({
  language: 'shortEn',
  languages: {
    shortEn: {
      y: () => 'yr',
      mo: () => 'mo',
      w: () => 'wk',
      d: () => 'day',
      h: () => 'hr',
      m: () => 'min',
      s: () => 'sec',
      ms: () => 'ms',
    },
  },
})

const humanizeMinutes = minutes => {
  const milliseconds = minutes * 60 * 1000
  return shortEnglishHumanizer(milliseconds, { delimiter: ' and ' })
}

export default (context, inject) => {
  inject('humanizeMinutes', humanizeMinutes)
}
