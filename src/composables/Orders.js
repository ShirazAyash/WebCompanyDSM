//import  User  from '../api/UserApi';
import {geto,deleteo,getOrderById}  from '../api/OrderApi';
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
        //console.log(response.length)
        //data.value = response.length;
        order.value=response
        return response
    }
    const getEntireOrderList = async (pageNo=1)=>{
        // let res = await getPageData();
        // if (res.length > 0) {
        //   EntireUserList.value= EntireUserList.value.concat(res)
        //   res.concat(await getEntireUserList(pageNo+1));
         
        // } else { 
        //     return 
        // }
        // return res
        console.log(pageNo)
        return
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
            getEntireOrderList,
            getOrder
      }
  
 }
