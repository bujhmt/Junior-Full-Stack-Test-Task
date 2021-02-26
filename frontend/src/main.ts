import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import { SOCKET_PREFIX } from '@/constans'

Vue.config.productionTip = false

console.log('Base url:', process.env.VUE_APP_BASE_URL)

Vue.use(new VueSocketIO({
    connection: process.env.VUE_APP_BASE_URL,
    vuex: {
        store,
        actionPrefix: SOCKET_PREFIX,
        mutationPrefix: SOCKET_PREFIX,
    },
}))

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
