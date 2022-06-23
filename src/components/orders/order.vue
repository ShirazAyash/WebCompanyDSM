<template> 

<div class="pb-8 pl-2">
<a @click="infoOrder('buttonTrigger',orderdata._id)" class="cursor-pointer">
<div class="basis-1/2 h-20 w-70 bg-gray-100 rounded-xl shadow-lg">
<table class="table-auto">
   <tr>
      <td class="text-left px-2 py-5">
        <span v-if="orderdata.status==='collected'"  class='material-icons green-point'>route</span>
        <span v-else-if="orderdata.status=='on the way'" class="material-icons">route</span>
        <span v-else-if="orderdata.status=='assigned'" class="material-icons">how_to_reg</span>
        <span v-else-if="orderdata.status=='arrived'" class="material-icons green-point">check</span>
        <span v-else-if="orderdata.status=='issue'" class="material-icons red-point">fiber_manual_record</span>
        <span v-else class='material-icons '>pending</span>
         <span class='text-xs '>{{orderdata.status}}</span>
      </td>
      
      <td class="px-2 py-5 w-1/5 border-gray-200 bg-gray text-sm">
         {{orderdata.src_address}} 
      </td>
      <td class="px-2 py-5 w-1/5 border-gray-200 bg-gray text-sm">
        <span class='material-icons blue-point'>send</span>
      </td>
      <td class="px-2 py-5  border-gray-200 bg-gray text-sm">
          {{orderdata.dest_address}}
      </td>
      <td class="px-2 py-5  border-gray-200 bg-gray text-sm">
         <span v-if="orderdata.express">express</span>
            {{orderdata.deadline}}
      </td>
    </tr>
</table>
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