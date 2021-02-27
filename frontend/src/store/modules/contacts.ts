import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import IChat from '@/interfaces/chat'
import IContact from '@/interfaces/contact'
import { Vue } from 'vue-property-decorator'

@Module({ namespaced: true })
export default class Contacts extends VuexModule {
    public contacts: IContact[] = []
    public openedChat: IChat | undefined

    @Mutation
    public _setContacts(contacts: IContact[]): void {
        this.contacts = contacts
    }

    @Mutation _addOrUpdateContact(contact: IContact): void {
        const matchedIdx = this.contacts.findIndex(_contact => _contact.user._id === contact.user._id)
        if (matchedIdx === -1) {
            this.contacts.unshift(contact)
        } else {
            Vue.set(this.contacts, matchedIdx, { ...this.contacts[matchedIdx], user: contact.user })
        }
    }

    @Mutation _openChat(chat: IChat): void {
        this.openedChat = chat
    }

    @Action({rawError: true})
    public setContacts(contacts: IContact[]): void {
        this.context.commit('_setContacts', contacts)
    }

    @Action({rawError: true})
    public addContact(contact: IContact): void {
        this.context.commit('_addContact', contact)
    }

    @Action({rawError: true})
    public openChat(chat: IChat): void {
        this.context.commit('_openChat', chat)
    }

    @Action({rawError: true})
    public SOCKET_CONTACT_LOGIN(newContact: IContact) {
        this.context.commit('_addOrUpdateContact', newContact)
    }

    @Action({rawError: true})
    public SOCKET_CONTACT_LOGOUT(contact: IContact) {
        this.context.commit('_addOrUpdateContact', contact)
    }
}
