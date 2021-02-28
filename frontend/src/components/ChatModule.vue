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
                <ul class="messages-wrapper" id="scroll" ref="scroll">
                    <li
                        v-for="message in chat.messages"
                        :key="message._id"
                        :class="String(message.owner) === user._id ? 'message from-me' : 'message to-me'"
                    >
                        <div class="message-content">
                            <div
                                :class="String(message.owner) === user._id ? 'message-info from-me-color' : 'message-info'">
                                <span> {{ String(message.owner) === user._id ? user.username : openedChat.user.username
                                    }} </span>
                                <span> {{ moment(message.sent).format('HH:mm') }}</span>
                            </div>
                            <div class="message-text">
                                {{ message.text }}
                            </div>
                        </div>
                    </li>
                </ul>
                <MessageInput />
            </div>
        </div>
        <div v-else class="app-start">
            <h1>Hi!</h1>
            <h2>Choose your chat =)</h2>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import IUser from '@/interfaces/user'
import IChat from '@/interfaces/chat'
import { getTimeFromNow } from '@/utils/date'
import MessageInput from '@/components/MessageInput.vue'
import moment from 'moment'

const Auth = namespace('Auth')
const Chat = namespace('Chat')

@Component({
    components: { MessageInput },
    methods: { getTimeFromNow, moment },
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

        // const scroll = this.$el.querySelector('#scroll')
        // if (scroll)
        //     scroll.scrollIntoView({ behavior: 'smooth' })
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

.guard {
    width: 100%;
    height: calc(100% - 130px);
}

.messages-wrapper {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    max-height: calc(100% - 150px);
    overflow: hidden;
    overflow-y: scroll;
    position: relative;
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

.message {
    width: 100%;
    margin-bottom: 15px;
}

.message-content {
    display: flex;
    width: 80%;
    flex-direction: column;
    border-radius: 10px;
}

.message-info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #beccd9;
    padding: 10px 20px 10px 20px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
}

.message-text {
    margin-right: 5%;
    width: 100%;
    background: #fff;
    padding: 10px 20px 10px 20px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    box-shadow: 10px 10px 25px rgba(112, 124, 151, 0.05),
    15px 15px 35px rgba(112, 124, 151, 0.05);
    word-break: break-all;
}

.from-me {
    margin-left: calc(100% - 80% - 60px);
}

.from-me-color {
    background: #efcab2;
}

.app-start {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex-direction: column;
}

</style>