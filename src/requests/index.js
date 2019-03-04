import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'

const ajax = axios.create({
    baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/160897' : '真是的路径'
})


export const getArticleList = () => {
    return ajax.post('/reactUser')
}