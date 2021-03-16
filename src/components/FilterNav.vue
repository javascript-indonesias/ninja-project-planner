<template>
    <nav class="filter-nav">
        <button @click="updateFilterData('all')" :class="allClassObject">View All</button>
        <button @click="updateFilterData('completed')" :class="completedClassObject">
            Completed
        </button>
        <button @click="updateFilterData('ongoing')" :class="ongoingClassObject">Ongoing</button>
    </nav>
</template>

<script>
export default {
    name: 'FilterNavComponent',
    props: {
        paramSortData: {
            type: String,
            default: 'all',
        },
    },
    setup() {
        return {};
    },
    methods: {
        updateFilterData(paramFilter) {
            this.$emit('filterChangeEvent', { paramfilter: paramFilter });
        },
    },
    computed: {
        allClassObject() {
            return {
                active: this.paramSortData === 'all',
            };
        },
        completedClassObject() {
            return {
                active: this.paramSortData === 'completed',
            };
        },
        ongoingClassObject() {
            return {
                active: this.paramSortData === 'ongoing',
            };
        },
    },
};
</script>

<style lang="scss">
.filter-nav button {
    background: none;
    border: none;
    color: #bbb;
    outline: none;
    font-size: 12px;
    text-transform: uppercase;
    margin-right: 10px;
    letter-spacing: 1px;
    font-weight: bold;
    cursor: pointer;
}

.filter-nav button.active {
    color: #333;
}
</style>
