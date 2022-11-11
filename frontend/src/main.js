import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueMask from 'v-mask'
import AOS from 'aos'
import 'aos/dist/aos.css'

Vue.use(VueMask);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  mounted() {
    AOS.init({
        duration: 1000,  // Deixa a animação mais lenta (suave)
        once: true      // Anima somente quando a pagina é carregada, sem isso, anima também no scroll
    })
  },
  render: h => h(App)
}).$mount('#app')
