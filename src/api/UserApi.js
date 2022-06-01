import axios from 'axios'

export async function getc(params) {
    const response = await axios.get(`/api/courier`,{ params: { params }});
    return response.data
}
export async function deletec(id) {
    const response = await axios.delete(`/api/delete`,{params:{collection:"Couriers",_id:id}});
    return response
}
// export async function postc(data) {
//     const response = await axios.post(`/api/add`,data);
//     return response
// }
