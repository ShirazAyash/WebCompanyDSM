<template> 

<div class="pb-8 pl-2">
<a @click="infoOrder('buttonTrigger',orderdata._id)" class="cursor-pointer">
<div class="basis-1/2 h-flex bg-gray-100 rounded-xl shadow-lg">
<table class="table-auto">
  <div id="parent"> <!-- This is the main container, to mouse over -->
<div id="popup" style="display: none">description text here</div>
</div>
   <tr>

      <td class="text-left pl-3">
        <span v-if="orderdata.status==='collected'"  class='material-icons green-point'>route</span>
        <span v-else-if="orderdata.status=='on the way'" class="material-icons">route</span>
        <span v-else-if="orderdata.status=='assigned'" class="material-icons">how_to_reg</span>
        <span v-else-if="orderdata.status=='arrived'" class="material-icons green-point">check</span>
        <span v-else class='material-icons '>pending</span>
      </td>
      <td class="px-2 py-5  border-gray-200 bg-gray text-sm">
         {{orderdata.src_address}} 
      </td>
      <td class="text-center text-sm">
        <span class='material-icons blue-point'>send</span>
      </td>
      <td class="px-2 py-5  border-gray-200 bg-gray text-sm">
          {{orderdata.dest_address}}
      </td>
      <td>
            <!-- <a @click="infoOrder('buttonTrigger',orderdata._id)">
				<i class="transition duration-200 ease-in-out material-icons-round text-gray-500 hover:text-blue-500 md:text-md cursor-pointer">arrow_forward_ios</i>
            </a> -->
            
            <!-- <router-link :to="{name:'OrderEdit', params: {id: orderdata._id }} " class="text-gray-500  hover:text-blue-500  mx-2">
				<i class="font-bold transition duration-200 ease-in-out material-icons-outlined md:text-md">manage_accounts</i>
			</router-link> -->
            
      </td>
    </tr>
</table>
    <!-- <div class="grid-cols-4">
        <td class="left">
        <span v-if="orderdata.status==='idle'" class='material-icons green-point'>fiber_manual_record</span>
        <span v-else-if="orderdata.status=='busy'" class="material-icons">pedal_bike</span>
        <span v-else-if="orderdata.status=='offline'" class="material-icons red-point">fiber_manual_record</span>
        <span v-else class='material-icons '>pending</span>
        </td>
          <td>
            <p class="test-xs">
                {{orderdata.src_address}}
            </p>
          </td>
            <td>
            <p >
                {{orderdata.dest_address}}
            </p>
        </td>
         <td>
            <a @click="deleteOrder(orderdata._id)">
				<i class="transition duration-200 ease-in-out material-icons-round text-gray-500 hover:text-blue-500 md:text-md">person_remove</i>
            </a>
        </td> 
    </div> -->
</div>
</a>
</div>

<OrderInfo v-if="popupTriggers.buttonTrigger" 
                :id="orderdata._id" :infoOrder="() => infoOrder('buttonTrigger')">
                <h2>{{orderdata._id}}</h2>
            </OrderInfo>
</template>

<script>
//import useOrder from '../../composables/Orders';
import { ref} from 'vue'
import OrderInfo from './OrderInfo.vue'

export default {
    name:'Order',
    props:{
        orderdata:{
            type:Object,
            require:true,
        },
    },
    components:{
        OrderInfo
    },
   setup(){
    const popupTriggers = ref({
      buttonTrigger: false,
    });
    const infoOrder = (trigger)=>{
      popupTriggers.value[trigger]= !popupTriggers.value[trigger]
      console.log("infun")
    }
    return{
      OrderInfo,
      popupTriggers,
      infoOrder
    }
  },
    
    }
</script>

<style scoped>
    td{
        width: 8%;
    };
 
</style>