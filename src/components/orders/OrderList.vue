<template>
<div>    
    <div >
        <div class="container  mx-auto pb-6 px-4  sm:px-8">
        <div class="py-8 md:py-4  ">
            
            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-6  ">
                <div class="flex justify-between ">
                    <div>
                        <p class="text-3xl text-left font-bold ">ORDERS 
                            <span class="material-icons">
                                    room_service
                            </span>    
                         </p>
                        <p class="text-gray-400 mt-2 text-left mb-5">{{data}} orders</p>
                    </div>
                    <div>
                        <router-link to="/csv" class="transition duration-200  ease-in-out mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-200">
                             <span class="material-icons-outlined">
                                post_add
                            </span>
                             import file
                        </router-link>
                        <br>
                        <br>
                         
                        <router-link to="/newOrder" class="transition duration-200  ease-in-out mb-2 md:mb-0 bg-blue-600 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-blue-400">
                             <span class="material-icons-outlined">
                                add_circle
                            </span>
                            add manualy
                        </router-link>
                    </div>
                    <!-- <filter-order @setFilter="filterData" ></filter-order> -->
            
                </div>
                <div class="windowcontent">
                <div class="inline-block min-w-full shadow md:shadow-xl pl-2 pt-5 rounded-lg  ">
                  
                    <tbody>
                    
                        <transition-group name='list'>
                             
                                 <order v-show="!isfilterOrder" v-for="order in ordersdata" :key="order.id+122" 
                                        :orderdata='order' >
                   
                                        </order>
                             
                                 <order   v-show="isfilterOrder" v-for="order in filteredDataOrder" :key="order.id" 
                                        :orderdata='order' >
                                        </order>
                             
                        
                        </transition-group>

                    </tbody>
                                        
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</div>
   <OrdersAlert v-if="popupTriggersAlert.buttonTrigger" 
                    
                :PopupAlert="() => PopupAlert('buttonTrigger','')">
                <div class=" z-0  flex items-center justify-center  mb-8 py-7 md:py-12 px-4 sm:px-6 lg:px-8  items-left">
	<div class="max-w-md w-full   space-y-8 p-4 bg-gray-100 rounded-xl shadow-lg z-10">
		<div class="grid  gap-8 grid-cols-1">
				<div class="flex flex-col ">
            <div class="flex flex-col text-red-500 sm:flex-row items-left">
                <span class="material-icons">error_outline</span>
							<h2  class="font-semibold text-lg mr-auto">attention: {{popupTriggersAlert.description}}</h2>
						</div>
					</div>
				</div>
			</div>
   </div>
  </OrdersAlert> 
<!-- </div> -->
</template>

<script>
import {   computed, onMounted,ref    } from '@vue/runtime-core'
import useOrder from '../../composables/Orders'
import Order from '../orders/order.vue'
import OrdersAlert from './OrdersAlert.vue'
//import FilterOrder from '../../components/functionalities/FilterOrder.vue'
import { useRouter } from 'vue-router'
export default {
    name:'ListOrder',
    components:{
        Order,
        OrdersAlert,
        //FilterOrder,
    },
       
    setup(){
        
        //Get User data 
        
        const {ordersdata,data,getAllData,deleteOrder} = useOrder() 

        const popupTriggersAlert = ref({
      buttonTrigger: false,
      description: 'hihi',
    });
    const PopupAlert = (trigger,data)=>{
      popupTriggersAlert.value[trigger]= !popupTriggersAlert.value[trigger];
      popupTriggersAlert.value['description']=data
      console.log(data)
    }
        
        const filterbyPageOrder=computed(()=>{
            
            return filteredDataOrder.value
        })
         
       
        const isfilterOrder=ref(false)
        const filteredDataOrder=ref([])

        const filterData=async(data)=>{
            console.log(isfilterOrder.value)
            const user = localStorage.getItem('user-info');
            const id = JSON.parse(user)._id;
            isfilterOrder.value=true
            console.log(isfilterOrder.value)
            switch(data){
                case 'pending':
                    filteredDataOrder.value = await getAllData({status:'no'})
                    filteredDataOrder.value = await getAllData({company_id:id,status:'pending'})
                    //isfilterOrder.value=true
                    console.log(ordersdata)
                    break;
                case 'assigned':
                    filteredDataOrder.value = await getAllData({company_id:id,status:'assigned'})
                    break;
                case 'on the way':
                    filteredDataOrder.value = await getAllData({company_id:id,status:'on the way'})
                    break;
                case 'collected':
                    filteredDataOrder.value = await getAllData({company_id:id,status:'collected'})
                    break;
                case 'arrived':
                    filteredDataOrder.value = await getAllData({company_id:id,status:'arrived'})
                    console.log(filteredDataOrder.value)
                    break;
                default:
                    isfilterOrder.value=false
            }
            isfilterOrder.value=false
        }
            
        const router = useRouter()
        onMounted(async ()=>{
            const user = localStorage.getItem('user-info');
            if(user){
                const id = JSON.parse(user)._id;
                await getAllData({company_id:id})
                //let flag = false;
                let count=0
                ordersdata.value.forEach(element => {
                    if(element.status=='issue'){
                        count++
                        popupTriggersAlert.value.buttonTrigger=true
                        popupTriggersAlert.value.description='there are '+count+ ' orders issue please find couriers'
                    }
                });
            }else{
                router.push({name:'login'});
            }
            
            
        })
        
        return{
            data,ordersdata,deleteOrder,
            filteredDataOrder,isfilterOrder,filterbyPageOrder,filterData,popupTriggersAlert,
            PopupAlert,
        }
    }
}
</script>

<style scoped>
 td{
        width: 1%;
    };
    th{
        text-align:center;
        padding-left:75px;
    }
    .list-enter-active{
        animation:changePage .8s   ;   
    }
    .list-leave-active{
        animation:changePage .8s reverse   ;
    }
    
    @keyframes changePage {
    0% {
        opacity: 0;
        transform: translate(20px, 0);
    }

    100% {
        opacity: 1;
        transform: translate(0, 0);
    }
    
}
    .modal-enter-active,.modal-leave-active {
        transition: opacity 0.5s
    }
    .modal-enter,.modal-leave-active {
        opacity: 0
    }
    .windowcontent{
       flex: 100%;
       overflow-y: auto;
       padding-bottom: 5%;
       border-radius: 25px;
       height: 600px;
    }
   

</style>

