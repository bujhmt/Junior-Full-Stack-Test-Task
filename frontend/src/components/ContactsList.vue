<template>
    <div
        class="main"
    >
        <div>Contacts:</div>
        <ul>
            <li
                v-for="contact in handleSearch()"
                :key="contact._id"
            >
                {{ `${contact.user.username} online: ${contact.user.isOnline} lastMsg: ${contact.lastMsg}` }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import IUser from '@/interfaces/user'
import IContact from '@/interfaces/contact'

const Auth = namespace('Auth')
const Contacts = namespace('Contacts')
const Inputs = namespace('Inputs')
@Component
export default class ContactsList extends Vue {

    @Inputs.State
    public searchInput!: string

    @Auth.Getter
    public user!: IUser

    @Contacts.State
    public contacts!: IContact[]

    public handleSearch() {
        return this.contacts.filter(contact =>
            contact.user.username?.toLowerCase().startsWith(this.searchInput.toLowerCase())
        )
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.main {
    margin: auto;
}

</style>
