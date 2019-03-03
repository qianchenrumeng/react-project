import {
    Dashboard,
    Article,
    Settings
} from './pages'

const routes = [{
    path: '/admin/dashboard',
    components: Dashboard,
    title: '用户管理',
    inNav: true,
    iconType: 'user'
}, {
    path: '/admin/article',
    components: Article,
    title: '账号信息管理',
    inNav: true,
    iconType: 'laptop'
}, {
    path: '/admin/settings',
    components: Settings,
    title: '资讯管理',
    inNav: true,
    iconType: 'notification'
}]


export default routes
