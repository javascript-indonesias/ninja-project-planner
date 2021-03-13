<template>
    <div class="project" :class="completeClassObject">
        <div class="actions">
            <h3 @click="showDetails()">{{ dataProject.title }}</h3>
            <div class="icons">
                <span class="material-icons">
                    edit
                </span>
                <span class="material-icons" @click="deleteProject()">
                    delete
                </span>
                <span class="material-icons tick" @click="toggleCompleteProject()">
                    done
                </span>
            </div>
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
            urlRequest: `http://localhost:3000/projects/${this.project.id}`,
        };
    },
    setup() {
        return {};
    },
    methods: {
        showDetails() {
            this.isDetailShow = !this.isDetailShow;
        },
        async deleteProject() {
            try {
                const response = await fetch(this.urlRequest, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                });

                if (response.status === 200) {
                    const result = await response.json();
                    console.log(result);
                    this.sendEventDeleteData();
                } else {
                    throw new Error(`Gagal melakukan request data ${response.status}`);
                }
            } catch (err) {
                console.warn(err);
            }
        },
        async toggleCompleteProject() {
            try {
                const response = await fetch(this.urlRequest, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify({
                        complete: !this.dataProject.complete,
                    }),
                });

                if (response.status === 200) {
                    const result = await response.json();
                    console.log(result);
                    this.sendEventCompleteData();
                } else {
                    throw new Error(`Gagal melakukan request data ${response.status}`);
                }
            } catch (err) {
                console.warn(err);
            }
        },
        sendEventDeleteData() {
            this.$emit('delete-event', { id: this.dataProject.id });
        },
        sendEventCompleteData() {
            this.$emit('complete-event', { id: this.dataProject.id });
        },
    },
    computed: {
        completeClassObject() {
            return {
                complete: this.dataProject.complete === true,
            };
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

.actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.material-icons {
    font-size: 24px;
    margin-left: 10px;
    color: #bbb;
    cursor: pointer;
}

.material-icons:hover {
    color: #777;
}

// Completed projects
.project.complete {
    border-left: 4px solid #00ce89;
}
.project.complete .tick {
    color: #00ce89;
}
</style>
