//import  User  from '../api/UserApi';
import {geto}  from '../api/OrderApi';
import {deleteo} from '../api/OrderApi';
import {getOrderById} from '../api/OrderApi';
// import {postc}  from '../api/UserApi';
// import { useRouter} from 'vue-router'
import { ref } from '@vue/reactivity';

export default function useOrder(){
    const data= ref([])
    const ordersdata=ref([])
    const order= ref([])
    // const router = useRouter()
    const EntireOrderList = ref([])

    const getAllData = async (params) => {
        let response = await geto(params)
        //console.log(response.length)
        data.value = response.length;
        ordersdata.value=response
        return response
    } 
    const getOrder  = async (id) => {
        let response = await getOrderById(id)
        order.value=response
        return response
    }

    
    
    const deleteOrder = async (id) => {
        let confirm=window.confirm('Want to delete this order ?')
        if(confirm) { 
            await deleteo(id)
            alert('the order had been deleted.\nRefresh the page to view the changes')
        }
   }
    
      return {
            data,
            order,
            ordersdata,
            EntireOrderList,
            getAllData,
            deleteOrder,
            getOrder
      }
  
 }
