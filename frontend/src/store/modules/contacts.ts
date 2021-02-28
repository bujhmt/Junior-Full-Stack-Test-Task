import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import IContact from '@/interfaces/contact'
import { Vue } from 'vue-property-decorator'
import IMessage from '@/interfaces/message'

@Module({ namespaced: true })
export default class Contacts extends VuexModule {
    public contacts: IContact[] = []

    @Mutation
    public _setContacts(contacts: IContact[]): void {
        this.contacts = contacts
    }

    @Mutation
    public _addOrUpdateContact(contact: IContact): void {
        const matchedIdx = this.contacts.findIndex(_contact => _contact.user._id === contact.user._id)
        if (matchedIdx === -1) {
            this.contacts.unshift(contact)
        } else {
            Vue.set(this.contacts, matchedIdx, { ...this.contacts[matchedIdx], user: contact.user })
        }
    }

    @Mutation
    _setLastMessage(message: IMessage): void {
        const matchedIdx = this.contacts.findIndex(_contact => message.owner._id === _contact.user._id)
        if (matchedIdx !== -1) {
            Vue.set(this.contacts, matchedIdx, {
                ...this.contacts[matchedIdx],
                lastMsg: message
            })
        }
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
    public setLastMessage(message: IMessage): void {
        this.context.commit('_setLastMessage', message)
    }

    @Action({rawError: true})
    public SOCKET_CONTACT_LOGIN(newContact: IContact) {
        this.context.commit('_addOrUpdateContact', newContact)
    }

    @Action({rawError: true})
    public SOCKET_CONTACT_LOGOUT(contact: IContact) {
        this.context.commit('_addOrUpdateContact', contact)
    }

    @Action({rawError: true})
    public SOCKET_MESSAGE(message: IMessage): void {
        this.context.commit('_setLastMessage', {...message, owner: {_id: message.owner._id ? message.owner._id: String(message.owner)}})
    }
}
