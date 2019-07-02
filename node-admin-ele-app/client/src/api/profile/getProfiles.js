import axios from '@/api/index'
export default () => axios.request({
  url: '/api/profile',
  method: 'GET'
})
