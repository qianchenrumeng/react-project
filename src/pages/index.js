import Loadable from 'react-loadable'

import Loading from './Loading'

const Dashboard = Loadable({
    loader: () => import('./Dashboard'),
    loading: Loading
})

const Article = Loadable({
    loader: () => import('./Article'),
    loading: Loading
})

const Settings = Loadable({
    loader: () => import('./Settings'),
    loading: Loading
})

const NotFound = Loadable({
    loader: () => import('./NotFound'),
    loading: Loading
})





export {
    Dashboard,
    Article,
    Settings,
    NotFound
}