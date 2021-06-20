export const convertQuery = query => {
  if (query) {
    return query
      .split(' ')
      .map(v => (v ? `*${v}*` : ''))
      .join(' ')
  }
  return ''
}

/**
 * Bounce a function until calls have stopped for `XX` milliseconds
 * Good for window resize only call function once the user had stopped resizing the window.
 *
 * @param {number} delay - The delay to use.
 * @param {Function} callback - The function to call.
 *
 * @returns {Function} - The new debounced function
 */
export const debounce = (delay, callback) => {
  let timeout = null
  return function() {
    if (timeout) {
      clearTimeout(timeout)
    }
    const context = this
    const args = arguments
    timeout = setTimeout(() => {
      callback.apply(context, args)
      timeout = null
    }, delay)
  }
}
