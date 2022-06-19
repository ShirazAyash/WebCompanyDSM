import axios from 'axios'
const User = axios.create({
    baseURL:process.env.VUE_APP_API_ENDPOINT
})

export async function geto(params) {
    const response = await User.get(`/api/order_by_company`,{ params: { params }});
    return response.data
}
export async function getOrderById(id) {
    const response = await User.get(`/api/findOrder`,{params:{_id:id}});
    return response.data
}
export async function uploadOrder(formData) {
    console.log(formData);
    User.post(  "/api/companyID/deliveries",
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        ).then(function(){
            console.log('SUCCESS!!');
    })
    .catch(function(){
        console.log('FAILURE!!');
    });
}
export async function deleteo(id) {
    const response = await User.delete(`/api/delete_order_by_company`,{params:{collection:"Orders",_id:id}});
    return response
}
// export async function postc(data) {
//     const response = await axios.post(`/api/add`,data);
//     return response
// }
