<template>
    <div class="home">
        <filter-nav
            @filterChangeEvent="handleFilterChange"
            :paramSortData="paramSortData"
        ></filter-nav>
        <div v-if="listPlanner.length > 0">
            <div v-for="planner in filteredProjects" :key="planner.id">
                <single-project
                    :project="planner"
                    @delete-event="handleDeleteEvent"
                    @complete-event="handleUpdatePatchEvent"
                ></single-project>
            </div>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

const SingleProjectComponent = defineAsyncComponent(() =>
    import('../components/SingleProject.vue'),
);

const FilterComponent = defineAsyncComponent(() => import('../components/FilterNav.vue'));

export default {
    name: 'HomepageComponent',
    components: {
        'single-project': SingleProjectComponent,
        'filter-nav': FilterComponent,
    },
    setup() {
        return {};
    },
    data() {
        return {
            listPlanner: [],
            paramSortData: 'all',
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
        handleDeleteEvent(data) {
            const idProject = data.id;
            const newListPlanner = this.listPlanner.reduce((accum, currentval) => {
                const idCurrent = currentval.id;
                if (idProject !== idCurrent) {
                    accum.push(currentval);
                }
                return accum;
            }, []);

            this.listPlanner = newListPlanner;
        },
        handleDelete(data) {
            this.listPlanner = this.listPlanner.filter((planner) => {
                return planner.id !== data.id;
            });
        },
        handleUpdatePatchEvent(data) {
            // Melakukan update pada komponen array yang ditemukan
            const plannerPatch = this.listPlanner.find((planner) => {
                return planner.id === data.id;
            });

            plannerPatch.complete = !plannerPatch.complete;
        },
        handleFilterChange(filterchangedata) {
            this.paramSortData = filterchangedata.paramfilter;
        },
    },
    computed: {
        filteredProjects() {
            if (this.paramSortData === 'completed') {
                return this.listPlanner.filter((planner) => {
                    return planner.complete === true;
                });
            }

            if (this.paramSortData === 'ongoing') {
                return this.listPlanner.filter((planner) => {
                    return planner.complete === false;
                });
            }

            return this.listPlanner;
        },
    },
    mounted() {
        this.getDataStarterProjectPlanner();
    },
};
</script>

<style lang="scss"></style>
