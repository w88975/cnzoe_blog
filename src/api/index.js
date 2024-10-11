import axios from 'axios'
import { $User } from '@/store/user'

const instance = axios.create({
    baseURL: '/',
    headers: {
        'Authorization': `${$User.password}`
    }
})

instance.interceptors.request.use(config => {
    config.headers['Authorization'] = `${$User.password}`
    return config
})

export default instance