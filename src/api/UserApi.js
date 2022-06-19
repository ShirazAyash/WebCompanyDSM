import axios from 'axios'
const User = axios.create({
    baseURL:process.env.VUE_APP_API_ENDPOINT
})

export async function getc(params) {
    const response = await User.get(`/api/courier`,{ params: { params }});
    return response.data
}
export async function deletec(id) {
    const response = await User.delete(`/api/delete`,{params:{collection:"Couriers",_id:id}});
    return response
}
// export async function postc(data) {
//     const response = await axios.post(`/api/add`,data);
//     return response
// }
