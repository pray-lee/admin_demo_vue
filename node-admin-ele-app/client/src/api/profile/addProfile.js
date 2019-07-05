import axios from '@/api/index'
export default data => axios.request({
    method: "POST",
    url: '/api/profile/add',
    data
})