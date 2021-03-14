<template>
    <navbar></navbar>
    <router-view />
</template>

<script>
import { defineAsyncComponent } from 'vue';

const NavBarComponent = defineAsyncComponent(() => import('./components/Navbars.vue'));

export default {
    name: 'AppMain',
    components: {
        navbar: NavBarComponent,
    },
};
</script>

<style lang="scss">
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    max-width: 600px;
    margin: 0 auto;
    color: #555;
}
</style>
