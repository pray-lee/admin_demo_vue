import axios from '@/api/index'
export const login = user => axios.request({
    method: 'POST',
    url: '/api/user/login?id=1',
    data: user
})