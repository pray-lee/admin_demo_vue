import axios from '@/api/index'
export const register = user => axios.request({
  url: '/api/user/register',
  method: 'POST',
  data: user
})
