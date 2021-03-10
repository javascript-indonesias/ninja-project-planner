<template>
    <div class="project">
        <div class="action">
            <h3 @click="showDetails()">{{ dataProject.title }}</h3>
        </div>

        <div class="details" v-if="isDetailShow">
            <p>{{ dataProject.details }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SingleProjectComponent',
    props: {
        project: {
            type: Object,
            default() {
                return {
                    id: 1,
                    title: 'Empty project',
                    details: 'empty project not available',
                    complete: false,
                };
            },
        },
    },
    data() {
        return {
            dataProject: this.project,
            isDetailShow: false,
        };
    },
    setup() {
        return {};
    },
    methods: {
        showDetails() {
            this.isDetailShow = !this.isDetailShow;
        },
    },
    watch: {
        project(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.dataProject = newValue;
            }
        },
    },
};
</script>

<style lang="scss">
.project {
    margin: 20px auto;
    background: #fff;
    padding: 10px 20px;
    border-radius: 4px;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
    border-left: 4px solid #e90074;
}
h3 {
    cursor: pointer;
}
</style>
