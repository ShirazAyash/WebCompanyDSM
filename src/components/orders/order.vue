<template> 
    <tr>
        <td class="px-8 border-gray-200 bg-white">
            <div class="flex items-center ">
        <span v-if="orderdata.status==='idle'" class='material-icons green-point'>fiber_manual_record</span>
        <span v-else-if="orderdata.status=='busy'" class="material-icons">pedal_bike</span>
        <span v-else-if="orderdata.status=='offline'" class="material-icons red-point">fiber_manual_record</span>
        <span v-else class='material-icons '>pending</span>
            </div>
        </td>

          <td class=" px-8  bg-white text-sm">
              <div class="flex items-center ">
            <p class=" md:text-base text-gray-900 whitespace-no-wrap">
                {{orderdata.src_address}}
            </p>
              </div>
          </td>
            <td class="py-8  bg-white text-sm">
                <div class="flex items-center ">
            <p class=" md:text-base text-gray-900 whitespace-no-wrap">
                {{orderdata.dest_address}}
            </p>
                </div>
        </td>
    
         <td class="hidden md:table-cell text-center md:pl-1 md:py-5  bg-white text-sm">
            <a @click="deleteOrder(orderdata._id)" class="text-gray-500 cursor-pointer ml-2">
				<i class="transition duration-200 ease-in-out material-icons-round text-gray-500 hover:text-blue-500 md:text-md">person_remove</i>
            </a>
        </td> 
        <td>   
   
        </td>
       
    </tr>
   
</template>

<script>
import useOrder from '../../composables/Orders';
export default {
    name:'Order',
    props:{
        orderdata:{
            type:Object,
            require:true,
        },
    },
    setup(){
        const {deleteOrder} = useOrder()
        return{
            deleteOrder
        }
    }
    }
</script>

<style scoped>
    td{
        width: 8%;
    };
 
</style>