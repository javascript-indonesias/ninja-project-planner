<template>
    <div class="home">
        <div v-if="listPlanner.length > 0">
            <div v-for="planner in listPlanner" :key="planner.id">
                <single-project :project="planner"></single-project>
            </div>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

const SingleProjectComponent = defineAsyncComponent(() =>
    import('../components/SingleProject.vue'),
);

export default {
    name: 'HomepageComponent',
    components: {
        'single-project': SingleProjectComponent,
    },
    setup() {
        return {};
    },
    data() {
        return {
            listPlanner: [],
        };
    },
    methods: {
        getDataStarterProjectPlanner() {
            fetch('http://localhost:3000/projects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
            })
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    }
                    return Promise.resolve(
                        new Error(`Response gagal dengan status ${response.text}`),
                    );
                })
                .then((result) => {
                    console.log(result);
                    this.listPlanner = result;
                })
                .catch((error) => {
                    console.warn(error);
                });
        },
    },
    mounted() {
        this.getDataStarterProjectPlanner();
    },
};
</script>

<style lang="scss"></style>
