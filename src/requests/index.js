import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'

const ajax = axios.create({
    baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/160897' : '真是的路径'
})


export const getArticleList = () => {
    return ajax.post('/reactUser')
}

export const deleteById = (id) => {
    return ajax.post(`/react/reactDelete`)
}

export const getNews = () => {
    return ajax.post(`/react/reactNews`)
}

export const getTable = () => {
    return ajax.post(`/react/newsTable`)
}