import axios from '@/api/index'

// type: add, edit
export default (data, type, id) => {
    const url = type === 'add' ? '/api/profile/add' : `/api/profile/update/${data.id}`
    return axios.request({
        method: "POST",
        url: url,
        data
    })
}