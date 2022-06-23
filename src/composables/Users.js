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
            deleteUser,
      }
  
 }
