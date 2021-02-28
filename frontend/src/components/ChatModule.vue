<template>
    <div class="chat" v-if="chat">
        <h3>To: {{chat.user.username}}</h3>
        <ul>
            <li
                v-for="message in chat.messages"
                :key="message._id"
            >
                {{ message.text }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import IUser from '@/interfaces/user'
import IChat from '@/interfaces/chat'

const Auth = namespace('Auth')
const Chat = namespace('Chat')

@Component
export default class ChatModule extends Vue {
    public input: string = ''
    public chat: IChat | null = null

    @Auth.Getter
    public user!: IUser

    @Chat.State
    public openedChat!: IChat

    created() {
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'Chat/_setChat') {
                if (state.Chat && state.Chat.openedChat)
                    this.chat = state.Chat.openedChat
            }
        })

    }

}
</script>

<style scoped lang="scss">
    .chat {
        background: #d7e0e7;
    }
</style>