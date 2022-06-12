const axios = require('axios');

export async function createUser(data) {
    const response = await axios.post(`/api/register`, data);
    return response.data;
}
export async function loginUser(data) {
    const response = await axios.post(`/api/login`, data);
    return response.data;
}
export async function addCourier(data) {
    const response = await axios.post(`/api/add`, data);
    return response.data;
}
export async function addOrder(data) {
    const response = await axios.post(`/api/add_order`, data);
    return response.data;
}
export async function getCourierName(params) {
    console.log("in get courier")
    const response = await axios.get(`/api/courierId`,{ params: { params }});
    return response.data
}
export async function putUpdateOrder(id,info) {
    console.log(info)
    const response = await axios.put(`/api/update_order`,{ params: { id:id, update:info }});
    return response.data
}