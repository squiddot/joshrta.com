// iOS Safari Fix 10.x.x to make iterable
if (typeof HTMLCollection.prototype[Symbol.iterator] === 'undefined') {
  HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator]
}

if (!window.crypto) {
  window.crypto = window.msCrypto
}

// Check for Passive Support
const passiveSupported = () => {
  let supported = false
  try {
    const options = Object.defineProperty({}, 'passive', {
      get: () => {
        supported = true
      },
    })
    window.addEventListener('test', null, options)
  } catch (err) {}
  return supported
}

/**
 * What browser is being used?
 */
navigator.sayswho = (() => {
  const ua = navigator.userAgent
  let tem
  let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
  const N = ua.match(/(?:nt|os\sx)\/?\s*(?:[\d._]+)/i) || []
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || []
    M = ['IE ' + (tem[1] || '')]
  } else if (M[1] === 'Chrome') {
    tem = ua.match(/\b(OPR|Edge)\/(\d+)/)
    if (tem != null)
      M = [
        tem
          .slice(1)
          .join(' ')
          .replace('OPR', 'Opera'),
      ]
    else M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?']
  } else {
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?']
  }
  if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1])
  if (N.length > 0) {
    N[0] = N[0].replace(/\s/g, '-')
    N[0] = N[0].replace(/[.]/g, '_')
  }
  return [...M, ...[N[0]]].join(' ')
})()

/**
 * Pad a string to a set length by adding to the left
 *
 * @param {string} str - The string to pad
 * @param {number} n - The padding length
 * @param {string} pad - The string to use as padding
 *
 * @returns {string}
 */
const padLeft = (str, n, pad) => {
  return Array(n - str.length + 1).join(pad || '0') + str
}

/**
 * Pad a string to a set length by adding to the right
 *
 * @param {string} str - The string to pad
 * @param {number} n - The padding length
 * @param {string} pad - The string to use as padding
 *
 * @returns {string}
 */
const padRight = (str, n, pad) => {
  return str + Array(n - str.length + 1).join(pad || '0')
}

/**
 * Remove a HTML node element.
 *
 * @param {object} node
 */
const remove = node => {
  if (node && node.parentNode) {
    node.parentNode.removeChild(node)
  }
}

/**
 * Toggle Class `name` on `element(s)`.
 *
 * @param {string} className - The class to add to the element.
 * @param {object} el - The element to add the class to.
 */
const toggleClass = (className, el) => {
  if (typeof el === 'object' && el.tagName) {
    if (el.classList) {
      el.classList.toggle(className)
    } else {
      const classes = el.className.split(' ')
      const existingIndex = classes.indexOf(className)

      if (existingIndex >= 0) classes.splice(existingIndex, 1)
      else classes.push(className)

      el.className = classes.join(' ')
    }
  } else if (typeof el === 'object') {
    Object.values(el).forEach(element => {
      toggleClass(className, element)
    })
  }
}

/**
 * Add Class `name` to `element(s)`.
 *
 * @param {string} className - The class to add to the element.
 * @param {object} el - The element to add the class to.
 */
const addClass = (className, el) => {
  if (typeof el === 'object' && el.tagName) {
    if (el.classList) el.classList.add(className)
    else el.className += ' ' + className
  } else if (typeof el === 'object') {
    Object.values(el).forEach(element => {
      addClass(className, element)
    })
  }
}

/**
 * Remove Class `name` from `element(s)`.
 *
 * @param {string} className - The class to add to the element.
 * @param {object} el - The element to add the class to.
 */
const removeClass = (className, el) => {
  if (typeof el === 'object' && el.tagName) {
    if (el.classList) el.classList.remove(className)
    else
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
  } else if (typeof el === 'object') {
    Object.values(el).forEach(element => {
      removeClass(className, element)
    })
  }
}

/**
 * Has Class `name` on `element`?
 *
 * @param {string} className - The class to add to the element.
 * @param {object} el - The element to add the class to.
 *
 * @returns {boolean} - True if the element has the class
 */
const hasClass = (className, el) => {
  if (el.classList) return el.classList.contains(className)
  else return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className)
}

/**
 * Set Class `name` on `element` if `true`?
 *
 * @param {string} className - The class to add to the element.
 * @param {object} el - The element to add the class to.
 * @param {bool} condition - Set the class if this evaluates to true.
 */
const setClass = (className, el, condition) => {
  if (condition) addClass(className, el)
  else removeClass(className, el)
}

/**
 * Create an element from a string
 *
 * @param {string} elementString - A {string} containing one or more selectors to match against. This string must be a valid CSS selector string.
 * @returns {HTMLElement} - The created element.
 */
const createElementString = elementString => {
  const div = document.createElement('div')
  div.innerHTML = elementString
  return div.firstElementChild
}

/**
 * Set the height on all elements in the same row to the largest height in that row.
 *
 * @param {string} selector - A {string} containing one or more selectors to match against. This string must be a valid CSS selector string.
 */
const matchHeight = selector => {
  const heights = {}
  let elements
  if (typeof selector === 'string') {
    elements = query(selector)
  } else if (typeof selector === 'object') {
    elements = selector
  }
  elements.forEach(el => {
    const top = el.getBoundingClientRect().top
    el.style.height = ''
    if (heights[top] === undefined || el.offsetHeight > heights[top]) {
      heights[top] = el.offsetHeight
    }
  })
  elements.forEach(el => {
    const top = el.getBoundingClientRect().top
    el.style.height = heights[top] + 'px'
  })
}

/**
 * Align items in a masonry fashion.
 *
 * @param {string} wrapper - A {string} containing one or more selectors to match against. This string must be a valid CSS selector string.
 * @param {string} item - A {string} containing one or more selectors to match against. This string must be a valid CSS selector string
 */
const masonry = (wrapper, item) => {
  const cardsEls = query(wrapper)
  cardsEls.forEach(cardsEl => {
    const cards = query(item, cardsEl)
    const parentRect = cardsEl.getBoundingClientRect()
    const cardsX = {}
    cards.forEach(card => {
      card.style.marginTop = ''
      const left = card.getBoundingClientRect().left
      if (!(left in cardsX)) cardsX[left] = []
      cardsX[left].push(card)
    })
    Object.values(cardsX).forEach(columnCards => {
      let currentHeight = 0
      Object.values(columnCards).forEach(card => {
        const computedStyle = window.getComputedStyle(card)
        const rect = card.getBoundingClientRect()
        const marginFix = rect.top - parentRect.top - currentHeight
        if (marginFix > 0) card.style.marginTop = -marginFix + 'px'
        currentHeight += rect.height + parseInt(computedStyle.marginBottom)
      })
    })
  })
}

/**
 * Throttle a function to only run once every `XX` milliseconds.
 *
 * @param {number} delay - The delay to use.
 * @param {Function} callback - The function to call.
 *
 * @returns {Function} - The new delayed function
 */
const throttle = (delay, callback) => {
  let previousCall = new Date().getTime()
  return function() {
    const time = new Date().getTime()
    if (time - previousCall >= delay) {
      const context = this
      previousCall = time
      callback.apply(context, arguments)
    }
  }
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
const debounce = (delay, callback) => {
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

/**
 * Load data from a url.
 *
 * @param {string} url - The url to load data from.
 * @param {Function} onload - The {Function} to call when the request is loaded.
 * @param {Function} [onerror] - The {Function} to call when the request runs into an error.
 */
const get = (url, onload, onerror = () => {}) => {
  const request = new XMLHttpRequest()
  request.open('GET', url, true)
  request.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  request.addEventListener('load', e => {
    onload(e, request)
  })
  request.addEventListener('error', onerror)
  request.send()
}

/**
 * Load json from url into an object.
 *
 * @param {string} url - The url to load json data from.
 * @param {Function} onload - The {Function} to call when the request is loaded.
 * @param {Function} [onerror] - The {Function} to call when the request runs into an error.
 */
const getJson = (url, onload, onerror = () => {}) => {
  get(
    url,
    (e, request) => {
      onload(JSON.parse(request.responseText))
    },
    onerror,
  )
}

/**
 * Ajax post request on a url.
 *
 * @param {string} url - The url to post data to.
 * @param {Object} postData - The data to post to the url
 * @param {Object} [headers] - An array of headers to set.
 * @param {Function} onload - The {Function} to call when the request is loaded.
 * @param {Function} [onerror] - The {Function} to call when the request runs into an error.
 */
const post = (url, postData, headers = {}, onload, onerror = () => {}) => {
  const request = new XMLHttpRequest()
  request.open('POST', url, true)
  request.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  Object.entries(headers).forEach(([name, value]) => {
    request.setRequestHeader(name, value)
  })
  request.addEventListener('load', e => {
    onload(e, request)
  })
  request.addEventListener('error', onerror)
  request.send(postData)
}

/**
 * Scroll `context` to the `element` location at the speed of `duration`.
 *
 * @param {Object} element - The element to scroll to.
 * @param {number} [duration] - The time it takes to complete the scroll.
 * @param {number} [offset] - Try to position the element at this position in the window.
 * @param {Object} [context] - This is the element that will be scrolling.
 * @param {Function} [callback] - This is the element that will be scrolling.
 */
const scrollToEl = (element, duration = 250, offset = 0, context = window, callback = () => {}) => {
  const contextOffset = context === window ? 0 : context.getBoundingClientRect().top
  if (duration <= 0) return
  let scrollY
  if (context === window) scrollY = window.scrollY ? window.scrollY : document.documentElement.scrollTop
  else scrollY = context.scrollY ? context.scrollY : context.scrollTop

  const scrollToY = scrollY + element.getBoundingClientRect().top + offset - contextOffset
  const difference = scrollToY - scrollY
  const perTick = (difference / duration) * 10

  if (context === window) {
    context.scrollBy(0, perTick)
  } else {
    context.scrollY ? (context.scrollY += perTick) : (context.scrollTop += perTick)
  }
  context.scrollY = context.scrollY + perTick
  if (scrollY === scrollToY) {
    callback()
    return
  }
  setTimeout(() => {
    scrollToEl(element, duration - 10, offset, context)
  }, 10)
}

/**
 * Does this `query selector` match this `element`
 *
 * @param {string} selector - A {string} containing one or more selectors to match against. This string must be a valid CSS selector string
 * @param {Object} el - The element to compare the selector with.
 *
 * @returns {bool}
 */
const matches = (selector, el) => {
  return (
    el.matches ||
    el.matchesSelector ||
    el.msMatchesSelector ||
    el.mozMatchesSelector ||
    el.webkitMatchesSelector ||
    el.oMatchesSelector
  ).call(el, selector)
}

/**
 * Get closest parent element matching `query` starting at `element`
 *
 * @param {string} query - A {string} containing one or more selectors to match against. This string must be a valid CSS selector string
 * @param {Object} el - The starting point element.
 *
 * @returns {HTMLElement}
 */
const closest = (query, el) => {
  if (matches(query, el)) {
    return el
  } else if (el && el.parentNode !== document) {
    if (matches(query, el.parentNode)) {
      return el.parentNode
    } else {
      return closest(query, el.parentNode)
    }
  }
}

/**
 * Document ready shorthand
 *
 * @param {Function} fn - The {Function} to call when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.
 */
const ready = fn => {
  if (document.readyState !== 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}

/**
 * Window on load shorthand
 *
 * @param {Function} fn - The {Function} to call when the window loads.
 */
const load = fn => {
  if (document.readyState === 'complete') {
    fn()
  } else {
    document.addEventListener('readystatechange', () => {
      if (document.readyState === 'complete') {
        fn()
      }
    })
  }
}

/**
 * Return the active index.
 * @param {object[]} els - An {array} of elements to search through to find the first element with the class `active`.
 *
 * @returns {number}
 */
const getActiveIndex = els => {
  let activeIndex = -1
  Object.entries(els).forEach(([i, el]) => {
    if (el.classList.contains('active')) {
      activeIndex = i
    }
  })
  return parseInt(activeIndex)
}

/**
 * Replacement for document.querySelectorAll that returns an array.
 * This contains some optimizations like calling getElementsByClassName when passing in a class selector such as `.red`,
 * or calling getElementsByTagName when passing in a tag selector such as `div`.
 *
 * TODO: Add nesting.
 *
 * @param {string} selector - A {string} containing one or more selectors to match against. This string must be a valid CSS selector string
 * @param {Object} context - The context to use when performing the selector matching.
 *
 * @returns {array}
 */
const query = (selector, context = document) => {
  // Redirect simple selectors to the more performant function
  if (/^(#?[\w-]+|\.[\w-.]+)$/.test(selector)) {
    let element, classes
    switch (selector.charAt(0)) {
      case '#':
        // Handle ID-based selectors
        element = context.getElementById(selector.substr(1))
        return element ? [...[element]] : []
      case '.':
        // Handle class-based selectors
        // Query by multiple classes by converting the selector
        // string into single spaced class names
        classes = selector.substr(1).replace(/\./g, ' ')
        return [...context.getElementsByClassName(classes)]
      default:
        // Handle tag-based selectors
        return [...context.getElementsByTagName(selector)]
    }
  }
  // Default to `querySelectorAll`
  return [...context.querySelectorAll(selector)]
}

/**
 * Gets an images overall brightness.
 *
 * @param {string} imageSrc - Location of image to be loaded.
 * @param {Function} callback - Once the image loads and is processed call this function
 */
const getImageBrightness = (imageSrc, callback) => {
  const img = document.createElement('img')
  img.src = imageSrc
  img.style.display = 'none'
  document.body.appendChild(img)

  let colorSum = 0

  img.onload = function() {
    // create canvas
    const canvas = document.createElement('canvas')
    canvas.width = this.width
    canvas.height = this.height

    const ctx = canvas.getContext('2d')
    ctx.drawImage(this, 0, 0)

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data
    let r, g, b, avg

    for (let x = 0; x < data.length; x += 4) {
      r = data[x]
      g = data[x + 1]
      b = data[x + 2]

      avg = Math.floor((r + g + b) / 3)
      colorSum += avg
    }

    const brightness = Math.floor(colorSum / (this.width * this.height))
    callback(brightness)
  }
}

/**
 * Add spans surrounding lines words or characters
 * @param {Object} el - The element containg the text to be processed.
 * @param {'line'|'word'|'char'} [type] - What should be wrapped in spans
 */
const lettering = (el, type = 'char') => {
  if (el && el.children.length === 0) {
    let delimiter
    switch (type) {
      case 'line':
        delimiter = /[\n\r]+/
        break
      case 'word':
        delimiter = ' '
        break
      case 'char':
      default:
        type = 'char'
        delimiter = ''
        break
    }
    const text = el.innerHTML
    el.innerHTML = ''
    el.setAttribute('aria-label', text.replace(/[\n\r]+/g, ' '))
    const parts = text.split(delimiter)
    let count = 0
    const span = document.createElement('span')
    span.setAttribute('aria-hidden', true)
    parts.forEach(part => {
      const piece = span.cloneNode()
      switch (type) {
        case 'line':
          addClass('line--' + count, piece)
          break
        case 'word':
          addClass('word--' + count, piece)
          break
        case 'char':
          addClass('char--' + count, piece)
          if (part.match(/[a-zA-Z0-9]/)) addClass('char--' + part, piece)
          break
      }
      piece.textContent = part
      el.appendChild(piece)
      count++
    })
  }
}

/**
 * Get all cookies
 *
 * @return {array}
 */
const getCookies = () => {
  const cookiesAry = document.cookie.split(';')
  const cookies = {}
  cookiesAry.forEach(item => {
    const cookie = item.split('=')
    cookies[cookie[0]] = decodeURI(cookie[1])
  })
  return cookies
}

/**
 * Get a cookie by name
 *
 * @param key - The name of the cookie
 *
 * @returns {*}
 */
const getCookie = key => {
  return getCookies()[key]
}

/**
 * @param key
 *
 * @returns {string}
 */
const getQueryStringValue = key => {
  return decodeURIComponent(
    window.location.search.replace(
      new RegExp('^(?:.*[&\\?]' + encodeURIComponent(key).replace(/[.+*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'),
      '$1',
    ),
  )
}

/**
 * Generate a compliant RFC4122 UUID v4
 *
 * @returns {string}
 */
const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16),
  )
}

/**
 * Add a random class to an element on every hover.
 *
 * @param {array} randomHoverEls - The elements to listen to hover events for.
 * @param {array} randomHoverClasses - List of classes to choose from.
 * @param {boolean} checkEl - Should check the random number against the elements last random number as well.
 *
 * @return boolean
 */
let lastRnd
const randomHover = (randomHoverEls, randomHoverClasses, checkEl = true) => {
  // There needs to be at least 2 random classes or 3 if checking the element as well.
  if ((checkEl && randomHoverClasses.length < 3) || randomHoverClasses.length < 2) return false

  randomHoverEls.forEach(randomHoverEl => {
    randomHoverEl.addEventListener('mouseenter', () => {
      randomHoverClasses.forEach(className => {
        removeClass(className, randomHoverEl)
      })
      const lastRndEl = parseInt(randomHoverEl.getAttribute('data-last-rnd'))
      let rnd
      // Random number repeat prevention
      do {
        rnd = Math.floor(randomHoverClasses.length * Math.random())
        // eslint-disable-next-line no-unmodified-loop-condition
      } while (rnd === lastRnd || (checkEl && rnd === lastRndEl))
      // Set last random numbers
      lastRnd = rnd
      randomHoverEl.setAttribute('data-last-rnd', rnd)
      addClass(randomHoverClasses[rnd], randomHoverEl)
    })
  })
  return true
}

const hhmmss = seconds => {
  return new Date(seconds * 1000)
    .toISOString()
    .substr(11, 8)
    .replace(/^[0:]{1,4}/, '')
}

/**
 * Checks if any element or parent element is scrollable but not the HTML element
 * @param {object} el - The element to start from
 * @param {string} [blacklist] - String of blacklist selectors separated by ,
 */
const canScrollNotHTML = (el, blacklist = '') => {
  if (el.tagName === 'HTML' || !el.parentNode) {
    return false
  }
  if ((!blacklist || !matches(blacklist, el)) && el.scrollHeight > el.offsetHeight) {
    return true
  } else {
    return canScrollNotHTML(el.parentNode, blacklist)
  }
}

const copyLink = (clipboard, text) => `<a href="#" class="card-link" data-clipboard="${clipboard}">${text}</a>`

const countRegEx = (str, re) => {
  return ((str || '').match(re) || []).length
}

export {
  passiveSupported,
  padLeft,
  padRight,
  remove,
  toggleClass,
  addClass,
  removeClass,
  hasClass,
  setClass,
  createElementString,
  matchHeight,
  masonry,
  throttle,
  debounce,
  get,
  getJson,
  post,
  scrollToEl,
  matches,
  closest,
  ready,
  load,
  getActiveIndex,
  query,
  getImageBrightness,
  lettering,
  getCookies,
  getCookie,
  getQueryStringValue,
  uuidv4,
  randomHover,
  hhmmss,
  canScrollNotHTML,
  copyLink,
  countRegEx,
}
