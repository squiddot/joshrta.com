class IntClampEvent {
  constructor(eventName) {
    this.eventName = eventName
    this.callbacks = []
  }

  registerCallback(callback) {
    this.callbacks.push(callback)
  }

  unregisterCallback(callback) {
    const index = this.callbacks.indexOf(callback)
    if (index > -1) {
      this.callbacks.splice(index, 1)
    }
  }

  fire(data) {
    const callbacks = this.callbacks.slice(0)
    callbacks.forEach(callback => {
      callback(data)
    })
  }
}

class IntClamp {
  constructor(max, min = 0, opts = {}) {
    const tmpMin = parseInt(min)
    const tmpMax = parseInt(max)
    if (isNaN(tmpMin) || isNaN(tmpMax)) {
      return false
    }
    this._events = {}
    this._min = parseInt(min)
    this._max = parseInt(max)
    this._loop = opts.loop || false
    this._cur = this.min
  }

  get min() {
    return this._min
  }

  set min(val) {
    const tmpInt = parseInt(val)
    this._min = Math.min(isNaN(tmpInt) ? this._min : tmpInt, this._max)
    this.cur = this._cur
  }

  get max() {
    return this._max
  }

  set max(val) {
    const tmpInt = parseInt(val)
    this._max = Math.max(isNaN(tmpInt) ? this._max : tmpInt, this._min)
    this.cur = this._cur
  }

  get cur() {
    return this._cur
  }

  set cur(val) {
    const tmpInt = Math.min(Math.max(parseInt(val), this._min), this._max)
    this._cur = isNaN(tmpInt) ? this._cur : tmpInt
    this._dispatch('change', this._cur)
  }

  get loop() {
    return this._loop
  }

  set loop(val) {
    let loop = true
    if (
      val === false ||
      val === 0 ||
      val === 0.0 ||
      val === '' ||
      val === '0' ||
      (Array.isArray(val) && val.length === 0) ||
      val === null ||
      val === undefined
    ) {
      loop = false
    }
    this._loop = loop
  }

  get hasPrev() {
    return this.cur > this.min
  }

  get hasNext() {
    return this.cur < this.max
  }

  prev() {
    if (this.cur > this.min) {
      this.cur--
    } else if (this.loop) {
      this.cur = this.max
    }
  }

  next() {
    if (this.cur < this.max) {
      this.cur++
    } else if (this.loop) {
      this.cur = this.min
    }
  }

  _dispatch(eventName, data) {
    const event = this._events[eventName]
    if (event) {
      event.fire(data)
    }
  }

  addEventListener(eventName, callback) {
    let event = this._events[eventName]
    if (!event) {
      event = new IntClampEvent(eventName)
      this._events[eventName] = event
    }
    event.registerCallback(callback)
  }

  removeEventListener(eventName, callback) {
    const event = this._events[eventName]
    if (event && event.callbacks.includes(callback)) {
      event.unregisterCallback(callback)
      if (event.callbacks.length === 0) {
        delete this._events[eventName]
      }
    }
  }
}

export { IntClamp }
