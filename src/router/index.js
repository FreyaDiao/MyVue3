import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../pages/Home.vue');
const Login = () => import('../pages/Login.vue');
const Detail = () => import('../pages/Detail.vue');

const BindAccount = () => import('../pages/mobile/BindAccount.vue');
const MainPage = () => import('../pages/mobile/MainPage.vue');
const BillList = () => import('../pages/mobile/BillList.vue');
const BillDetail = () => import('../pages/mobile/BillDetail.vue');

const NotFound = () => import('../pages/NotFound.vue');

const routes = [
    { path: '/', name: '/', component: Login, meta: { fullScreen: true } },
    { path: '/Home', name: 'Home', component: Home, meta: {} },
    { path: '/Login', name: 'Login', component: Login, meta: { fullScreen: true} },
    { path: '/Detail', name: 'Detail', component: Detail },
    { path: '/BindAccount', name: 'BindAccount', component: BindAccount, meta: { fullScreen: true } },
    { path: '/MainPage', name: 'MainPage', component: MainPage, meta: { fullScreen: true } },
    { path: '/BillList', name: 'BillList', component: BillList, meta: { fullScreen: true } },
    { path: '/BillDetail', name: 'BillDetail', component: BillDetail, meta: { fullScreen: true } },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound, meta: { fullScreen: true } },
]

const router = createRouter({
    history: createWebHistory('/base'),
    routes,
})

export default router