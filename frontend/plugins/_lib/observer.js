import { uuidv4, matches, query } from './functions.js'

class Observer {
  constructor() {
    this.listeners = []
    this.handlers = []
    this.observer = new MutationObserver((mutations, observer) => {
      this.observerHandler(mutations)
    })
    this.observer.observe(document.body, {
      attributes: true,
      /* characterData: true, */ childList: true,
      subtree: true,
      attributeFilter: ['id', 'class'],
    })
  }

  updateNodeListeners(node) {
    this.listeners.forEach(listener => {
      if (matches(listener.selector, node)) {
        if (node[listener.id] !== true) {
          node.addEventListener(listener.event, listener.callback, listener.options, listener.capture)
          node[listener.id] = true
        }
      } else if (node[listener.id] === true) {
        node.removeEventListener(listener.event, listener.callback)
        node[listener.id] = false
      }
      const subNodes = query(listener.selector, node)
      subNodes.forEach(subNod => {
        if (subNod[listener.id] !== true) {
          subNod.addEventListener(listener.event, listener.callback, listener.options, listener.capture)
          subNod[listener.id] = true
        }
      })
    })
    this.handlers.forEach(handler => {
      handler.callback(node, matches(handler.selector, node))
      node[handler.id] = matches(handler.selector, node)
    })
  }

  observerHandler(mutations) {
    mutations.forEach(mutation => {
      switch (mutation.type) {
        case 'childList':
          ;[...mutation.addedNodes].forEach(node => {
            if (!node || node.nodeType !== 1) return // Verify is a Node
            this.updateNodeListeners(node)
          })
          break
        case 'attributes':
          if (!mutation.target || mutation.target.nodeType !== 1) return // Verify is a Node
          this.updateNodeListeners(mutation.target)
          break
      }
    })
  }

  addCustom(selector, callback) {
    const id = uuidv4()

    const els = query(selector)
    els.forEach(el => {
      callback(el, true)
      el[id] = true
    })

    this.handlers.push({
      id,
      selector,
      callback,
    })

    return id
  }

  removeCustom(id) {
    const newHandlers = []
    this.handlers.forEach(handler => {
      if (handler.id === id) {
        const nodes = query(handler.selector)
        nodes.forEach(node => {
          if (node[handler.id] === true) {
            handler.callback(node, false)
            node[id] = false
          }
        })
      } else {
        newHandlers.push(handler)
      }
    })
    this.handlers = newHandlers
  }

  add(selector, event, callback, options = {}, capture = false) {
    let id

    const els = query(selector)
    els.forEach(el => {
      el.addEventListener(event, callback, options, capture)
      el[id] = true
    })

    if (typeof event === 'object') {
      id = []
      ;[...event].forEach(event => {
        id.push(uuidv4())
        this.listeners.push({
          id,
          selector,
          event,
          callback,
          options,
          capture,
        })
      })
    } else {
      id = uuidv4()
      this.listeners.push({
        id,
        selector,
        event,
        callback,
        options,
        capture,
      })
    }
    return id
  }

  remove(id) {
    const newListeners = []
    this.listeners.forEach(listener => {
      if (listener.id === id) {
        const nodes = query(listener.selector)
        nodes.forEach(node => {
          if (node[listener.id] === true && listener.event) {
            node.removeEventListener(listener.event, listener.callback)
            node[listener.id] = false
          }
        })
      } else {
        newListeners.push(listener)
      }
    })
    this.listeners = newListeners
  }
}

export { Observer }
