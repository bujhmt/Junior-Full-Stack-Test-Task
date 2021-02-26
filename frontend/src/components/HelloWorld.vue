<template>
    <div
        class="main"
    >
        <ul>
            <li
                v-for="user in Users"
                :key="user.email"
            >
                {{ user.username }}
            </li>
        </ul>
        <button
            @click="handleClick"
        >
            Add User
        </button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IUser } from '@/models/user'
import { namespace } from 'vuex-class'

const Users = namespace('users')

@Component
export default class HelloWorld extends Vue {
    @Prop() private msg!: string

    @Users.Getter
    public users!: IUser[]

    @Users.Action
    public addUser!: (user: IUser) => void

    public handleClick() {
        console.log('Click')
        this.addUser({email: new Date().toString(), username: 'tmp name'})
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.main {
    margin: auto;
}

</style>
