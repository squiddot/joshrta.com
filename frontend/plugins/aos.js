import AOS from 'aos'

const AOSInit = AOS.init

export default ({ app }) => {
  app.AOS = new AOSInit()
}
