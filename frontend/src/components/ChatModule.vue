<template>
    <div>
        <ul>
            <li
                v-for="message in openedChat.messages"
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
const Chat = namespace('ChatModule.vue')

@Component
export default class ChatModule extends Vue {
    public input: string = ''

    @Auth.Getter
    public user!: IUser

    @Chat.Getter
    public openedChat!: IChat

}
</script>

<style scoped>

</style>