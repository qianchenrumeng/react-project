import {
    Dashboard,
    Article,
    Settings,
    ArticleEdit,
    SettingsEdit
} from './pages'

const routes = [{
    path: '/admin/dashboard',
    components: Dashboard,
    title: '信息概览',
    inNav: true,
    iconType: 'user'
}, {
    path: '/admin/article',
    components: Article,
    title: '账号信息管理',
    inNav: true,
    isExact: true,
    iconType: 'laptop'
}, {
    path: '/admin/settings',
    components: Settings,
    title: '资讯管理',
    inNav: true,
    isExact: true,
    iconType: 'notification'
}, {
    path: '/admin/article/edit/:id',
    components: ArticleEdit,
    inNav: false,
}, {
    path: '/admin/settings/edit/:id',
    components: SettingsEdit,
    inNav: false,
}
]


export default routes
