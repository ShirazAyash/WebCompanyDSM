<template>
<div>    
    <div >
        <div class="container  mx-auto pb-6 px-4  sm:px-8">
        <div class="py-8 md:py-4  ">
            <div class="my-2 flex sm:flex-row flex-col">
        </div>
            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-6  ">
                <div class="flex justify-between ">
                    <div>
                        <p class="text-3xl font-bold ">USERS 
                            <span class="material-icons">
                                    people
                            </span>
                            <router-link to="/newCourier" class="hover:shadow-md p-3   md:p-1 rounded-full duration-1000 ease-in-out transform hover:scale-125 delay-200  hover:bg-blue-300 hover:text-3xl font-bold text-center bg-blue-200  cursor-pointer ">
                             <span class="p-3    xl:mr-7 material-icons-outlined">
                                person_add
                            </span>
                        </router-link>
                         </p>
                         
                        <p class="text-gray-400 mt-2 mb-5">{{data}} users</p>
                       <tr class="grid grid-cols-8 md:pl-5">
                           <td class="table_cell ">
                                <p class="text-center pr-4 w-4 md:text-base text-gray-900 whitespace-no-wrap">
                                    status
                                </p>
                            </td>
                            <td class="table_cell">
                                <p class="text-center pr-4 md:text-base text-gray-900 whitespace-no-wrap">
                                    Full Name
                                </p>
                            </td>
                            <td class="table_cell">
                                <p class="text-center pr-16 md:text-base text-gray-900 whitespace-no-wrap">
                                    Email
                                </p>
                            </td> 
                            <td class="table_cell">
                                <p class="text-center pr-16 md:text-base text-gray-900 whitespace-no-wrap">
                                    First Name
                                </p>
                            </td>
                            <td class="table_cell">
                                <p class="text-center pr-16 md:text-base text-gray-900 whitespace-no-wrap">
                                    Last Name
                                </p>
                            </td>
                            <td class="table_cell">
                                <p class="text-center pr-16 md:text-base text-gray-900 whitespace-no-wrap">
                                    Phone Number
                                </p>
                            </td>
                            <td class="table_cell">
                                <p class="text-center pr-16 md:text-base text-gray-900 whitespace-no-wrap">
                                    Vehicle
                                </p>
                            </td> 
                            <td class="table_cell">
                                <p class="text-center pr-16 md:text-base text-gray-900 whitespace-no-wrap">
                                    Remove   
                                </p>
                            </td> 
                        </tr>
                    </div>
                    <filter-user @setFilter="filterData" ></filter-user>
                
                </div>
                <div class="windowcontent">
                <div class="inline-block min-w-full shadow md:shadow-xl md:pl-4 pt-6 rounded-lg  ">
                  
                    <tbody>
                    
                        <transition-group name='list'>
                             
                                 <user  v-show="!isFilter" v-for="user in usersdata" :key="user.id+122" 
                                        :userdata='user' ></user>
                             
                                 <user   v-show="isFilter" v-for="user in filterbyPage" :key="user.id" 
                                        :userdata='user'   >
                                </user>
                             
                        
                        </transition-group>

                    </tbody> 
                    
                    <!-- <div
                        class="px-5 py-5 bg-white  flex flex-col xs:flex-row items-center xs:justify-between">
                       
                        <div class="flex items-center space-x-5">
                                <a 
                                    @click="retrieveList(page-1)"  class="flex items-center px-4 py-2 text-gray-800 cursor-pointer  rounded-md">
                                   <span 
                                        :class="{'text-gray-200':data.page==1}"  
                                         class="transition duration-200 ease-in-out material-icons text-base">
                                                arrow_back_ios
                                        </span>
                                </a>

                                <a   
                                    v-for="(singlePage,index) of pages" :key="index" @click="retrieveList(singlePage)" :class="{'border-t-2 border-blue-500':singlePage==data.page}" 
                                    class="transition duration-500 ease-in-out border-t-2 hover:border-blue-300 px-4 py-2 text-gray-700  cursor-pointer ">
                                     
                                     {{singlePage}}
                                </a>

                                <a 
                                    @click="retrieveList(page+1)" class="px-4 py-2 font-bold  cursor-pointer rounded-3xl "  >
                                    
                                    <span 
                                        :class="{'text-gray-200':data.page==data.total_pages}"
                                        class="transition duration-200 ease-in-out material-icons text-base font-bold"
                                       >
                                        arrow_forward_ios
                                    </span>
                                </a>
                         
                </div> -->
                                        <!-- <span class="text-sm font-md mt-5 font-bold xs:text-sm text-gray-400">
                                            Showing {{entries == 0 ? 1 : entries}} to  of {{totalEntries}} 
                                        </span> -->
                                        
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- </div> -->
</template>

<script>
import {   computed, onMounted,ref    } from '@vue/runtime-core'
import useUser from '../../composables/Users'
import User from '../user/User.vue'
//import paginateUserList from '../../composables/Paginate'
import FilterUser from '../../components/functionalities/FilterUser.vue'
//import Modal from '../functionalities/Modal.vue'
import { useRouter } from 'vue-router'
export default {
    name:'ListUser',
    components:{
        User,
        FilterUser,
        //Modal
        
    },
       
    setup(){
        
        //Get User data 
        
        const {usersdata,data,getAllData,deleteUser} = useUser() 
        
        
        //Pagination 
        
        //const {page,pages,entries,totalEntries,setPages} = paginateUserList(data)
        const filterbyPage=computed(()=>{
            console.log("in filterbyPage")
            return filteredData.value
        })
         
        //Filter User 
       
        const isFilter=ref(false)
        const filteredData=ref([])
        
        // const retrieveList = (page)=>{
        //     const params=setParam(page)
        //     getAllData(params)
        //     }

        const filterData=async(data)=>{
             const user = localStorage.getItem('user-info');
             console.log(isFilter.value)
            const id = JSON.parse(user)._id;
            isFilter.value=true
            switch(data){
                case 'all':
                    // filteredData.value = await getAllData({status:'no'})
                    filteredData.value = await getAllData({company_id:id})
                    break;
                case 'idle':
                    
                    filteredData.value = await getAllData({company_id:id,status:'idle'})
                    break;
                case 'offline':
                    filteredData.value = await getAllData({company_id:id,status:'offline'})
                    break;
                case 'busy':
                    filteredData.value = await getAllData({company_id:id,status:'busy'})
                    break;
                case 'pending':
                    filteredData.value = await getAllData({company_id:id,status:'pending'})
                    break;
                default:
                    isFilter.value=false
            }
        }
        
        
        //Modal for responsive design
            // const isOpenModal=ref(false)
            // const modalData=ref([])
            // const openModal=(data)=>{
            //     if(window.innerWidth < 820){
            //         isOpenModal.value=true
            //         modalData.value={...data}
            //     }
            // }
            
        const router = useRouter()
        let userLog = localStorage.getItem('user-info');
		if(!userLog){
			router.push({name:'home'});
		}
        onMounted(async ()=>{
             const user = localStorage.getItem('user-info');
            const id = JSON.parse(user)._id;
            await getAllData({company_id:id})
            //setPages(data)
            //getEntireUserList()
        })
        
        return{
            data,usersdata,deleteUser,
            //totalEntries,pages,page,entries,
            filteredData,isFilter,filterbyPage,filterData,
             //isOpenModal,modalData, openModal,
            //retrieveList,
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

