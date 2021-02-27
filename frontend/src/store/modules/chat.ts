import IChat from '@/interfaces/chat'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import IMessage from '@/interfaces/message'

@Module({ namespaced: true })
export default class Chat extends VuexModule {
    public openedChat: IChat | undefined

    @Mutation
    public _setChat(chat: IChat): void {
        this.openedChat = chat
    }

    @Mutation
    public _addMsg(message: IMessage): void {
        this.openedChat?.messages.push(message)
        //Vue.set(this.openedChat, 'messages', {...this.openedChat, messages: this.})
    }

    @Action({rawError: true})
    public setChat(chat: IChat): void {
        this.context.commit('_setChat', chat)
    }

    @Action({rawError: true})
    public pushMessage(message: IMessage): void {
        this.context.commit('_addMsg', message)
    }

    get currentChat() {
        return this.openedChat
    }
}