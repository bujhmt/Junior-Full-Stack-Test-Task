<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import { IUser } from '@/interfaces/user'
import { namespace } from 'vuex-class'
import { first } from 'random-name'

const Auth = namespace('Auth')
const storageName = process.env.VUE_APP_STORAGE_NAME || 'token'

@Component({
    components: {
        HelloWorld,
    }
})
export default class Index extends Vue {
    @Auth.Action
    public setUser!: (user: IUser) => void

    public getLocalStorageData() {
        return JSON.parse(String(localStorage.getItem(storageName)))
    }

    public setLocalStorageData(token: string) {
        localStorage.setItem(storageName, JSON.stringify({
            token,
        }, null, 4))
    }

    public login(token: string) {
        this.$socket.emit('JWT_RECEIVED', {token}, (user: IUser) => {
            if (user) {
                this.setUser(user)
            }
        })
    }

    mounted() {
        const data = this.getLocalStorageData()
        if (!data || !data.token) {                                                              // user don't have jwt token => signUp => login
            this.$socket.emit('JWT_FAILED', { username: first() }, (token: string) => {
                this.setLocalStorageData(token)
                this.login(token)
            })
        } else {                                                                                 // user already have jwt token => login
            this.login(data.token)
        }
    }
}
</script>
