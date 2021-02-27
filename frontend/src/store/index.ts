import Vue from 'vue'
import Vuex from 'vuex'
import Auth from '@/store/modules/auth'
import Contacts from '@/store/modules/contacts'
import Inputs from '@/store/modules/inputs'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        Auth,
        Contacts,
        Inputs
    }
})
export default store