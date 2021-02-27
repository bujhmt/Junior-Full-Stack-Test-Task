<template>
    <div>
        <input v-model="SearchInput" placeholder="Search..."/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const Inputs = namespace('Inputs')
@Component
export default class SearchInput extends Vue {
    @Inputs.State
    public searchInput!: string

    @Inputs.Action
    public setSearchInput!: (value: string) => void

    get SearchInput(): string {
        return this.searchInput
    }

    set SearchInput(value: string) {
        this.setSearchInput(value)
    }
}
</script>

<style scoped>

</style>