import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'

@Module({ namespaced: true })
export default class Inputs extends VuexModule {
    public searchInput: string = ''

    @Mutation
    public _setSearchInput(value: string): void {
        this.searchInput = value
    }

    @Action({rawError: true})
    public setSearchInput(value: string): void {
        this.context.commit('_setSearchInput', value)
    }
}
