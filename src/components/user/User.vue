<template> 
    <tr>
        <td class="px-8 border-gray-200 bg-white">
            <div class="flex items-center ">
        <span v-if="userdata.status==='idle'" class='material-icons green-point'>fiber_manual_record</span>
        <span v-else-if="userdata.status=='busy'" class="material-icons">pedal_bike</span>
        <span v-else-if="userdata.status=='offline'" class="material-icons red-point">fiber_manual_record</span>
        <span v-else class='material-icons '>pending</span>
            </div>
        </td>
        <td class="px-5 py-5  border-gray-200 bg-white text-sm  ">
            <div class="flex items-center ">
                <div class="flex-shrink-0 w-10 h-10">
                    <img src="../../assets/user.png" alt="user icon">
                </div>
                <div class="ml-2 text-sm">
                    <p class="md:text-base text-gray-900 whitespace-pre">
                        {{`${userdata.first_name} ${userdata.last_name}`}}
                    </p>
                </div>
            </div>
        </td>

          <td class=" px-8  bg-white text-sm">
              <div class="flex items-center ">
            <p class=" md:text-base text-gray-900 whitespace-no-wrap">
                {{userdata.user_name}}
            </p>
              </div>
          </td>
            <td class="py-8  bg-white text-sm">
                <div class="flex items-center ">
            <p class=" md:text-base text-gray-900 whitespace-no-wrap">
                {{userdata.first_name}}
            </p>
                </div>
        </td>
        <td class="hidden xl:table-cell py-8  bg-white text-sm">
            <div class="flex items-center ">
            <p class="text-center pr-16 md:text-base text-gray-900 whitespace-no-wrap">
                {{userdata.last_name}}
            </p>
            </div>
        </td> 
        <td class="hidden xl:table-cell py-5  bg-white text-sm">
            <p class="text-center pr-16 md:text-base text-gray-900 whitespace-no-wrap">
                {{userdata.phone_number}}
            </p>
        </td> 
        <td class="hidden xl:table-cell py-5  bg-white text-sm">
            <p class="text-center pr-16 md:text-base text-gray-900 whitespace-no-wrap">
                {{userdata.Vehicle_type}}
            </p>
        </td> 
    
         <td class="hidden md:table-cell text-center md:pl-1 md:py-5  bg-white text-sm">
            <a @click="deleteUser(userdata._id)" class="text-gray-500 cursor-pointer ml-2">
				<i class="transition duration-200 ease-in-out material-icons-round text-gray-500 hover:text-blue-500 md:text-md">person_remove</i>
            </a>
        </td> 
        <td class="hidden md:table-cell text-center md:pl-1 md:py-5  bg-white text-sm">
            <a @click="showId(userdata._id)" class="text-gray-500 cursor-pointer ml-2">
				<i class="transition duration-200 ease-in-out material-icons-round text-gray-500 hover:text-blue-500 md:text-md">content_copy</i>
            </a>
        </td> 
       
    </tr>
   
</template>

<script>
import useUser from '../../composables/Users';
export default {
    name:'User',
    props:{
        userdata:{
            type:Object,
            require:true,
        },
    },
    setup(){
        const {deleteUser} = useUser()
        return{
            deleteUser
        }
    },
    methods:{
        async showId(id){
            alert("the courier id: "+id)
        }
    }
    }
</script>

<style scoped>
    td{
        width: 8%;
    };
 
</style>