<template> 

<div class="pb-8 pl-2"> 
<a @click="infoOrder('buttonTrigger',orderdata._id)" class="w-1/2 cursor-pointer"> 
<div class="w-1/2 h-20 w-70 bg-gray-100 rounded-xl shadow-lg">
<!-- <table class="table-auto"> -->
   <div class="grid grid-cols-5">
      <div class="col-2 text-left">
        <span v-if="orderdata.status==='collected'"  class='material-icons green-point'>route</span>
        <span v-else-if="orderdata.status=='on the way'" class="material-icons">route</span>
        <span v-else-if="orderdata.status=='assigned'" class="material-icons">how_to_reg</span>
        <span v-else-if="orderdata.status=='arrived'" class="material-icons green-point">check</span>
        <span v-else-if="orderdata.status=='issue'" class="material-icons red-point">fiber_manual_record</span>
        <span v-else class='material-icons '>pending</span>
         <span class='text-xs '>{{orderdata.status}}</span>
      </div>
      
      <div class="col-2 border-gray-200 bg-gray text-sm">
         {{orderdata.src_address}} 
      </div>
      <div class="col-2 border-gray-200 bg-gray text-sm">
        <span class='material-icons blue-point'>send</span>
      </div>
      <div class="col-2 border-gray-200 bg-gray text-sm">
          {{orderdata.dest_address}}
      </div>
      <div class="col-2 border-gray-200 bg-gray text-sm">
         <span v-if="orderdata.express">express</span>
            {{orderdata.deadline}}
      </div>
   </div>
<!-- </table> -->
</div>
 
</a>
</div>
<OrdersAlert v-if="popupTriggersAlert.buttonTrigger" 
                    
                :PopupAlert="() => PopupAlert('buttonTrigger','')">      
	<div class=" max-w-md space-y-8 p-4 bg-gray-100 rounded-xl shadow-lg z-10">
		<div class="grid gap-8 grid-cols-1">
				<div class="flex flex-col ">
            <div class="flex flex-col text-gray-500 sm:flex-row items-left">
                <span class="material-icons text-red-500">error_outline </span>
							<h2  class="font-semibold text-lg mr-auto">attention: {{popupTriggersAlert.description}}</h2>
						</div>
					</div>
				</div>
			</div>
  </OrdersAlert> 
<OrderInfo v-if="popupTriggers.buttonTrigger" 
                :id="orderdata._id" :infoOrder="() => infoOrder('buttonTrigger')">
                <h2>{{orderdata._id}}</h2>
            </OrderInfo>

</template>

<script>
//import useOrder from '../../composables/Orders';
import { onMounted } from '@vue/runtime-core'
import { ref} from 'vue'
import OrderInfo from './OrderInfo.vue'
import OrdersAlert from './OrdersAlert.vue'

export default {
    name:'Order',
    props:{
        orderdata:{
            type:Object,
            require:true,
        },
        OrdersAlert,
    },
    components:{
        OrderInfo,
        OrdersAlert
    },
   setup(props){
    const popupTriggers = ref({
      buttonTrigger: false,
    });
    const infoOrder = (trigger)=>{
      popupTriggers.value[trigger]= !popupTriggers.value[trigger]
      console.log("infun")
    }
     const popupTriggersAlert = ref({
      buttonTrigger: false,
      description: 'hihi',
    });
    const PopupAlert = (trigger,data)=>{
      popupTriggersAlert.value[trigger]= !popupTriggersAlert.value[trigger];
      popupTriggersAlert.value['description']=data
      console.log(data)
    }
     onMounted(async ()=>{
      if(props.orderdata.status=='issue'){
        popupTriggersAlert.value.buttonTrigger=true
        popupTriggersAlert.value.description='there is no available courier from '+props.orderdata.src_address +'to '  + props.orderdata.src_address; 
      }
            
    })
         
    return{
      OrderInfo,
      popupTriggers,
      infoOrder,
      popupTriggersAlert,
      PopupAlert
    }
  },
    
    }
</script>

<style scoped>
    td{
        width: 8%;
    };
 
</style>