// Create observer object.
import { Observer } from './_lib/observer'
const observer = new Observer()

// Doesn't work with vue.
observer.addCustom('h1,h2,h3,h4,h5,h6,p,li', (el, matches) => {
  if (matches) {
    // Attach/Do stuff
    if (el.innerHTML.match(/®(?!<\/sup>)/)) {
      el.innerHTML = el.innerHTML.replace(/®(?!<\/sup>)/g, '<sup>$&</sup>')
    }
  } else {
    // Remove/Undo stuff
  }
})

setInterval(() => {
  const els = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6,li,p,a')]
  for (const el of els) {
    if (el.innerHTML.match(/®(?!<\/sup>)/)) {
      el.innerHTML = el.innerHTML.replace(/®(?!<\/sup>)/g, '<sup>$&</sup>')
    }
  }
}, 5000)
