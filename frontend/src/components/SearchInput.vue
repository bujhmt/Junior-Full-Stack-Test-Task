<template>
    <div class="input-wrapper">
        <input v-model="SearchInput" placeholder="Search..." class="input"/>
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

<style scoped lang="scss">

.input-wrapper {
    margin: auto;
    margin-bottom: 5%;
}

.input {
    width: calc(100% - 30px);
}

</style>