import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { IUser } from '@/interfaces/user'

@Module({ namespaced: true })
export default class Auth extends VuexModule {
    public currentUser: IUser | undefined

    @Mutation
    public _setUser(user: IUser): void {
        this.currentUser = user
    }

    @Action({rawError: true})
    public setUser(user: IUser): void {
        this.context.commit('_setUser', user)
    }

    get user() {
        return this.currentUser
    }
}
