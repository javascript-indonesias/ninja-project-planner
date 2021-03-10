<template>
    <div class="project">
        <div class="action"></div>
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
    setup() {
        return {};
    },
};
</script>

<style lang="scss"></style>
