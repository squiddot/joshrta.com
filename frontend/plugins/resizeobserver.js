import ResizeObserver from 'resize-observer-polyfill'

const defaultBreakpoints = { SM: 384, MD: 576, LG: 768, XL: 960 }

const resizeObserver = new ResizeObserver(entries => {
  window.requestAnimationFrame(() => {
    if (!Array.isArray(entries) || !entries.length) {
      return
    }
    entries.forEach(entry => {
      const observeAxis = entry.target.observeAxis || ['x', 'y']
      // If the target has an `updateBreakpoints` property then it's
      // a <responsive-container> element.
      if (entry.target.updateBreakpoints) {
        const updatedSize = {}
        if (observeAxis.includes('x') && entry.target.lastWidth !== entry.contentRect.width) {
          updatedSize.width = entry.contentRect.width
          entry.target.lastWidth = entry.contentRect.width
        }
        if (observeAxis.includes('y') && entry.target.lastHeight !== entry.contentRect.height) {
          updatedSize.height = entry.contentRect.height
          entry.target.lastHeight = entry.contentRect.height
        }
        if (updatedSize.width || updatedSize.height) {
          entry.target.updateBreakpoints(updatedSize)
        }
      } else {
        const breakpoints = entry.target.dataset.breakpoints
          ? JSON.parse(entry.target.dataset.breakpoints)
          : defaultBreakpoints

        // For non-custom-elements, use the data-obsevering attribute
        // to target observed elements in CSS.
        if (entry.width === 0) {
          entry.target.dataset.observing = false
        } else {
          entry.target.dataset.observing = true
        }

        // Update the matching breakpoints on the target element.
        let maxWidth = 0
        let addClass = false
        Object.keys(breakpoints).forEach(function(breakpoint) {
          const minWidth = breakpoints[breakpoint]
          if (entry.contentRect.width >= minWidth && minWidth > maxWidth) {
            addClass = breakpoint
            maxWidth = minWidth
          }
        })
        Object.keys(breakpoints).forEach(function(breakpoint) {
          if (addClass === breakpoint) {
            entry.target.classList.add(breakpoint)
          } else {
            entry.target.classList.remove(breakpoint)
          }
        })
      }
    })
  })
})

export default (context, inject) => {
  inject('resizeObserver', resizeObserver)
}
