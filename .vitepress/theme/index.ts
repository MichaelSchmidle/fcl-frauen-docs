import DefaultTheme from 'vitepress/theme'
import Einsatzplan from './Einsatzplan.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Einsatzplan', Einsatzplan)
  }
}
