<template>
    <div class="chat chat-size">
        <div v-if="chat" class="guard">
            <div class="contact-data">
                <img :src="chat.user.imageUrl" alt="user ava" class="ava">
                <div class="username">
                    <h1>{{ chat.user.username }}</h1>
                    <div class="last-seen-info">
                        <span
                            class="user-online-span"
                            v-if="chat.user.isOnline"
                        >
                            Online
                        </span>
                        <span v-else>
                            Was online {{ getTimeFromNow(chat.user.lastSeen) }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="chat-input-wrapper">
                <ul>
                    <li
                        v-for="message in chat.messages"
                        :key="message._id"
                    >
                        {{ message.text }}
                    </li>
                </ul>
                <div class="send-msg-wrapper">
                    <MessageInput />
                    <button>Send Message</button>
                </div>
            </div>
        </div>
        <h2 v-else>Choose chat!</h2>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import IUser from '@/interfaces/user'
import IChat from '@/interfaces/chat'
import { getTimeFromNow } from '@/utils/date'
import MessageInput from '@/components/MessageInput.vue'

const Auth = namespace('Auth')
const Chat = namespace('Chat')

@Component({
    components: { MessageInput },
    methods: { getTimeFromNow },
})
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
    border-bottom-left-radius: 10px;
}

.contact-data {
    display: flex;
    background: #beccd9;
}

.ava {
    width: 130px;
    height: 130px;
}

.username {
    display: flex;
    flex-direction: column;
    margin-left: 3%;
}

.last-seen-info {
    color: #000;
}

.user-online-span {
    color: green;
}

.chat-input-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.send-msg-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 3%;
}

.guard {
    width: 100%;
    height: calc(100% - 130px);
}
</style>