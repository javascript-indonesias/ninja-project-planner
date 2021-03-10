import { createRouter, createWebHashHistory } from 'vue-router';

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const HomePageComponent = () => import(/* webpackChunkName: "homepage" */ '../views/Homepage.vue');
const HomeComponent = () => import(/* webpackChunkName: "home" */ '../views/About.vue');
const AboutComponent = () => import(/* webpackChunkName: "about" */ '../views/About.vue');

const routes = [
    {
        path: '/',
        name: 'Homepage',
        component: HomePageComponent,
    },
    {
        path: '/homes',
        name: 'Home',
        component: HomeComponent,
    },
    {
        path: '/about',
        name: 'About',
        component: AboutComponent,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
