<template>
    <div
        class="list-main contacts-list-size"
    >
        <div class="online-search">
            <div
                :class="IsOnlyOnline ? 'box box-active' : 'box box-disabled'"
                @click="IsOnlyOnline = true"
            >
                Online
            </div>
            <div
                :class="IsOnlyOnline ? 'box box-disabled' : 'box box-active'"
                @click="IsOnlyOnline = false"
            >
                All
            </div>
        </div>
        <div class="find-list-wrapper">
            <ul class="contacts-wrapper">
                <li
                    class="contact"
                    v-for="contact in handleSearch()"
                    v-if="IsOnlyOnline ? contact.user.isOnline: true"
                    :key="contact._id"
                    @click.prevent="handleChatOpen(contact.user)"
                >
                    <div class="contact-info">
                        <img
                            :src="contact.user.imageUrl"
                            alt="user ava"
                            class="ava"
                        >
                        <div v-if="contact.user.isOnline" class="online-circle"/>
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
            <SearchInput />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import IUser from '@/interfaces/user'
import IContact from '@/interfaces/contact'
import IMessage from '@/interfaces/message'
import IChat from '@/interfaces/chat'
import SearchInput from '@/components/SearchInput.vue'

const Auth = namespace('Auth')
const Contacts = namespace('Contacts')
const Inputs = namespace('Inputs')
const Chat = namespace('Chat')
@Component({
    components: { SearchInput },
})
export default class ContactsList extends Vue {
    public IsOnlyOnline = false

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
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
}

.contacts-wrapper {
    display: flex;
    flex-direction: column;
    list-style-type: none;
    justify-content: flex-start;
    padding: 0;
    margin-bottom: 5%;

    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;

    ::-webkit-scrollbar-button {
        display: none;
    }

    ::-webkit-scrollbar {
        width: 12px;
    }

    ::-webkit-scrollbar-track {
        -webkit-border-radius: 10px;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px;
        border-radius: 10px;
        background: rgba(69, 72, 76, 0.8);
    }
}

.contact {
    height: 90px;
    width: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 10px;

    &:hover {
        background: #f8f8f8;
    }
}

.contact-info {
    position: relative;
    margin: 0 5px 0 5px;
}

.ava {
    width: 90px;
    height: 90px;
}

.username {
    color: #000;
    margin-left: 15%;
}

.last-msg {
    color: #beccd9;
    margin-left: 15%;
}

.username-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: calc(100% - 130px);
    white-space: nowrap;
    overflow: hidden;
}

.find-list-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100% - 80px);
}

.online-search {
    display: flex;
}

.box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    color: #000;
    height: 80px;
}

.box-active {
    background: #fff;
}

.box-disabled {
    background: #f8f8f8;
}

.online-circle {
    border-radius: 50%;
    background: #34F079;
    min-width: 15px;
    height: 15px;
    position: absolute;
    right: -5px;
    bottom: 1px;
}
</style>
