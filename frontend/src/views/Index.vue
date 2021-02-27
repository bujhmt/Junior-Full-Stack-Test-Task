<template>
    <div class="main">
        <div>
            <ContactsList />
            <SearchInput />
        </div>
        <div>
            <Chat v-if="isChatOpen"/>
            <h1 v-else>Hi!</h1>
            <MessageInput/>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ContactsList from '@/components/ContactsList.vue'
import IUser from '@/interfaces/user'
import { namespace } from 'vuex-class'
import { first } from 'random-name'
import IContact from '@/interfaces/contact'
import SearchInput from '@/components/SearchInput.vue'
import MessageInput from '@/components/MessageInput.vue'
import IChat from '@/interfaces/chat'
import ChatModule from '@/components/ChatModule.vue'

const Auth = namespace('Auth')
const Contacts = namespace('Contacts')
const Chat = namespace('Chat')
const storageName = process.env.VUE_APP_STORAGE_NAME || 'token'

@Component({
    components: {
        ContactsList,
        SearchInput,
        MessageInput,
        ChatModule
    },
})
export default class Index extends Vue {
    @Auth.Action
    public setUser!: (user: IUser) => void

    @Contacts.Action
    public setContacts!: (_contacts: IContact[]) => void

    @Chat.Getter
    public currentChat!: IChat

    public getLocalStorageData() {
        return JSON.parse(String(localStorage.getItem(storageName)))
    }

    public setLocalStorageData(token: string) {
        localStorage.setItem(storageName, JSON.stringify({
            token,
        }, null, 4))
    }

    public login(token: string) {
        this.$socket.emit('JWT_RECEIVED', { token }, (user: IUser) => {
            if (user) {
                this.setUser(user)
            }

            this.$socket.emit('GET_CONTACTS', { userId: user._id }, (contacts: IContact[]) => {
                if (contacts) this.setContacts(contacts)
            })
        })
    }

    get isChatOpen() {
        return this.currentChat && this.currentChat.user
    }

    mounted() {
        const data = this.getLocalStorageData()
        if (!data || !data.token) {                                                              // user don't have jwt token => signUp => login
            this.$socket.emit('JWT_FAILED', { username: first() }, (token: string) => {
                this.setLocalStorageData(token)
                this.login(token)
            })
        } else {                                                                                 // user already have jwt token => login
            this.login(data.token)
        }
    }
}
</script>

<style scoped lang="scss">
.main {
    display: flex;
}
</style>