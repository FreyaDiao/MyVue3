const BindAccount = () => import('../pages/mobile/BindAccount.vue');
const MainPage = () => import('../pages/mobile/MainPage.vue');
const BillList = () => import('../pages/mobile/BillList.vue');
const BillDetail = () => import('../pages/mobile/BillDetail.vue');

export default [
    { path: '/BindAccount', name: 'BindAccount', component: BindAccount, meta: { fullScreen: true } },
    { path: '/MainPage', name: 'MainPage', component: MainPage, meta: { fullScreen: true } },
    { path: '/BillList', name: 'BillList', component: BillList, meta: { fullScreen: true } },
    { path: '/BillDetail', name: 'BillDetail', component: BillDetail, meta: { fullScreen: true } },
]