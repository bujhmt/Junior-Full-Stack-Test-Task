import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { IUser } from '@/models/user'

@Module({ namespaced: true, name: 'users' })
class Users extends VuexModule {
    public _users: IUser[] = []

    @Mutation
    public pushUser(user: IUser): void {
        this._users.push(user)
    }

    @Action({rawError: true })
    public addUser(user: IUser): void {
        this.context.commit('pushUser', user)
    }

    get users() {
        return this._users
    }

}

export default Users