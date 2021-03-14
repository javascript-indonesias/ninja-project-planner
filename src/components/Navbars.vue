<template>
    <nav class="main-nav">
        <router-link :to="{ name: 'Homepage' }">Daftar Project</router-link>
        <router-link :to="{ name: 'AddPlanner' }">Tambah Project</router-link>
    </nav>
</template>

<script>
export default {
    name: 'NavbarComponent',
    setup() {
        return {};
    },
};
</script>

<style lang="scss">
.main-nav {
    text-align: center;
    margin: 40px auto;
}

.main-nav a {
    display: inline-block;
    text-decoration: none;
    margin: 0 10px;
    color: #999;
    font-size: 18px;
}

a.router-link-active {
    border-bottom: 2px solid #00ce89;
    padding-bottom: 4px;
    color: #222;
}
</style>
