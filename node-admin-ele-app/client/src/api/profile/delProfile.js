import axios from '@/api/index'
export default id => axios.request({
    method: 'delete',
    url: `/api/profile/delete/${id}`
})