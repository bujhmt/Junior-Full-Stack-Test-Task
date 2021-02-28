<template>
    <div class="main">
        <ChatModule />
        <ContactsList />
        <!--            <SearchInput />-->
        <!--        </div>-->
        <!--        <div>-->
        <!--            <ChatModule />-->
        <!--            <MessageInput/>-->
        <!--        </div>-->
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
import ChatModule from '@/components/ChatModule.vue'

const Auth = namespace('Auth')
const Contacts = namespace('Contacts')
const storageName = process.env.VUE_APP_STORAGE_NAME || 'token'

@Component({
    components: {
        ContactsList,
        SearchInput,
        MessageInput,
        ChatModule,
    },
})
export default class Index extends Vue {
    @Auth.Action
    public setUser!: (user: IUser) => void

    @Contacts.Action
    public setContacts!: (_contacts: IContact[]) => void

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
    align-items: center;
    justify-content: center;
    margin-top: 3%;
}

.list {

}

</style>