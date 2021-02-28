<template>
    <div class="input-wrapper">
        <input
            class="input"
            v-model="input"
            placeholder="Type here..."
            @keypress.enter.prevent="handleInput"
        >
        <button
            @click="handleInput"
            class="submit-button"
        >
            Send Message
        </button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import IUser from '@/interfaces/user'
import IChat from '@/interfaces/chat'
import IMessage from '@/interfaces/message'

const Auth = namespace('Auth')
const Chat = namespace('Chat')
const Contacts = namespace('Contacts')

@Component
export default class MessageInput extends Vue {
    public input: string = ''

    @Auth.Getter
    public user!: IUser

    @Chat.State
    public openedChat!: IChat

    @Chat.Action
    public pushMessage!: (message: IMessage) => void

    @Contacts.Action
    public setLastMessage!: (message: IMessage) => void

    public handleInput() {
        if (this.input.trim().length > 0) {
            this.$socket.emit('NEW_MESSAGE',
                { owner: this.user, addressee: this.openedChat.user, text: this.input },
                (message: IMessage) => {
                    this.pushMessage(message)
                    this.setLastMessage({ ...message, owner: this.openedChat.user })
                })
            this.input = ''
        }
    }

}
</script>

<style scoped lang="scss">
.input-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 3%;
}

.input {
    width: 65%;
    margin-right: 3%;
    height: 50px;
}

.submit-button {
    background: #418bca;
    color: #fff;
    border: none;
    box-shadow: none;
    border-radius: 15px;
    width: 200px;
    height: 50px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
}

</style>