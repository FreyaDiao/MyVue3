import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../pages/Home.vue');
const Login = () => import('../pages/Login.vue');
const Detail = () => import('../pages/Detail.vue');
const NotFound = () => import('../pages/NotFound.vue');

const routes = [
    { path: '/', name: '/', component: Login, meta: { fullScreen: true } },
    { path: '/Home', name: 'Home', component: Home, meta: {} },
    { path: '/Login', name: 'Login', component: Login, meta: { fullScreen: true} },
    { path: '/Detail', name: 'Detail', component: Detail },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
]

const router = createRouter({
    history: createWebHistory('/base'),
    routes,
})

export default router