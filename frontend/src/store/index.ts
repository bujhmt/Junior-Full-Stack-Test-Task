import Vue from 'vue'
import Vuex from 'vuex'
import Auth from '@/store/modules/auth'
import Contacts from '@/store/modules/contacts'
import Inputs from '@/store/modules/inputs'
import Chat from '@/store/modules/chat'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        Auth,
        Contacts,
        Inputs,
        Chat
    }
})
export default store