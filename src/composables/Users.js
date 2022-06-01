//import  User  from '../api/UserApi';
import {getc}  from '../api/UserApi';
// import {postc}  from '../api/UserApi';
import {deletec}  from '../api/UserApi';
// import { useRouter} from 'vue-router'
import { ref } from '@vue/reactivity';

export default function useUser(){
    const data= ref([])
    const usersdata=ref([])
    const user= ref([])
    // const router = useRouter()
    const EntireUserList = ref([])

    const getAllData = async (params) => {
        let response = await getc(params)
        //console.log(response.length)
        data.value = response.length;
        usersdata.value=response
        return response
    }
    
    
    // const getPageData = async()=>{
    //     // let response = await getc('users',{params:params})
    //     // return response
    //     return ""
    // }
    //Get all user's data from Paginated Api with recursion     
    
    const getEntireUserList = async (pageNo=1)=>{
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

    // const getUser = async (id) => {
    //     let response = await getc({id})
    //     user.value = response;
    // }
    
    // const storeUser = async (data) => {
    //   console.log("inn")
    //       let response = await postc(data)
    //       console.log(response)
    //       if(response.data.status == 'SUCCESS'){
    //         await router.push({name: 'user.index'})
    //       }
    //       console.log(response.data.message)
    //       return response  
    // }

    // const updateUser = async (id) => {
    //       await User.put(`users/${id}` , user.value)
    //       await router.push({name:'user.index'})
    //     }
    
    const deleteUser = async (id) => {
        let confirm=window.confirm('Want to delete this user ?')
        if(confirm) { 
            await deletec(id)
            alert('the courier had been deleted.\nRefresh the page to view the changes')
        }
   }
    
      return {
            data,
            user,
            usersdata,
            EntireUserList,
            getAllData,
            //getUser,
            deleteUser,
            // updateUser,
            //storeUser,
            getEntireUserList,
      }
  
 }
