import DefaultTheme from 'vitepress/theme'
import Einsatzplan from './Einsatzplan.vue'
import MediaObject from './MediaObject.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Einsatzplan', Einsatzplan)
    app.component('MediaObject', MediaObject)
  }
}
