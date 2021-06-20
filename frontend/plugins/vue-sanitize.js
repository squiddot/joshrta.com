import sanitizeHtml from 'sanitize-html'

export default (context, inject) => {
  inject('sanitize', sanitizeHtml)
}
