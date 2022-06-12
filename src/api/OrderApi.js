import axios from 'axios'

export async function geto(params) {
    const response = await axios.get(`/api/order_by_company`,{ params: { params }});
    return response.data
}
export async function getOrderById(id) {
    const response = await axios.get(`/api/findOrder`,{params:{_id:id}});
    return response.data
}
export async function deleteo(id) {
    const response = await axios.delete(`/api/delete_order_by_company`,{params:{collection:"Orders",_id:id}});
    return response
}
// export async function postc(data) {
//     const response = await axios.post(`/api/add`,data);
//     return response
// }
