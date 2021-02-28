<template>
    <div
        class="list-main"
    >
        <ul class="contacts-wrapper">
            <li
                class="contact"
                v-for="contact in handleSearch()"
                :key="contact._id"
                @click.prevent="handleChatOpen(contact.user)"
            >
                <div class="contact-info">
                    <img :src="contact.user.imageUrl" alt="user ava" class="ava">
                </div>
                <div class="username-wrapper">
                    <div class="username">
                        {{ contact.user.username }}
                    </div>
                    <div class="last-msg" v-if="contact.lastMsg">
                        {{ contact.lastMsg.text }}
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import IUser from '@/interfaces/user'
import IContact from '@/interfaces/contact'
import IMessage from '@/interfaces/message'
import IChat from '@/interfaces/chat'

const Auth = namespace('Auth')
const Contacts = namespace('Contacts')
const Inputs = namespace('Inputs')
const Chat = namespace('Chat')
@Component
export default class ContactsList extends Vue {

    @Inputs.State
    public searchInput!: string

    @Auth.Getter
    public user!: IUser

    @Contacts.State
    public contacts!: IContact[]

    @Chat.Action
    public setChat!: (chat: IChat) => void

    public handleSearch(): IContact[] {
        return this.contacts.filter(contact =>
            contact.user.username?.toLowerCase().startsWith(this.searchInput.toLowerCase()),
        )
    }

    public handleChatOpen(addressee: IUser) {
        this.$socket.emit('GET_MESSAGES', { owner: this.user, addressee }, (messages: IMessage[]) => {
            this.setChat({ user: addressee, messages })
        })
    }
}
</script>

<style scoped lang="scss">

.list-main {
    background: #ffffff;
}

.contacts-wrapper {
    display: flex;
    flex-direction: column;
    list-style-type: none;
    justify-content: flex-start;
    padding: 0;
}

.contact {
    height: 90px;
    width: 100%;
    display: flex;
    align-items: center;

    &:hover {
        background: #d7e0e7;
    }
}

.contact-info {
    display: flex;
    margin: 0 5px 0 5px;
}

.ava {
    width: 90px;
    height: 90px;
}

.username {
    color: #000
}

.last-msg {
    color: #beccd9;
}

.username-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

</style>
