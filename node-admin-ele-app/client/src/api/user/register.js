import axios from '@/api/index'
export default user => axios.request({
  url: '/api/user/register',
  method: 'POST',
  data: user
})
