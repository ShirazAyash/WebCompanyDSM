const axios = require('axios');
const User = axios.create({
    baseURL:process.env.VUE_APP_API_ENDPOINT
})

export async function createUser(data) {
    const response = await User.post(`/api/register`, data);
    return response.data;
}
export async function loginUser(data) {
    const response = await User.post(`/api/login`, data);
    return response.data;
}
export async function addCourier(data) {
    const response = await User.post(`/api/add`, data);
    return response.data;
}
export async function addOrder(data) {
    const response = await User.post(`/api/add_order`, data);
    return response.data;
}
export async function getCourierName(params) {
    console.log("in get courier")
    const response = await User.get(`/api/courierId`,{ params: { params }});
    return response.data
}
export async function putUpdateOrder(id,info) {
    console.log(info)
    const response = await User.put(`/api/update_order`,{ params: { id:id, update:info }});
    return response.data
}