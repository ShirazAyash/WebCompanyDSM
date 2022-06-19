<template>
   <div class=" z-0  flex items-center justify-center  mb-8 py-7 md:py-12 px-4 sm:px-6 lg:px-8  items-left">
	<div class="max-w-md w-full   space-y-8 p-4 bg-gray-100 rounded-xl shadow-lg z-10">
		<div class="grid  gap-8 grid-cols-1">
				<div class="flex flex-col ">
						<div class="flex flex-col sm:flex-row items-left">
							<h2  class="font-semibold text-lg mr-auto">Profile Information</h2>
							<div class="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
						</div>
                        <br>
                        <br>
			<!-- <form class="mt-5"> -->
				<div class="form">
                    <div class="mb-3 space-y-2 w-full text-xs text-left ">
							<label class="text-left font-semibold text-gray-600 py-2">Company Name</label>
							<div class="flex flex-wrap items-stretch w-full mb-4 relative">
								<div class="flex">
									<span class=" flex items-left leading-normal bg-grey-lighter border-1 rounded-r-none border border-r-0 border-blue-300 px-3 whitespace-no-wrap text-grey-dark text-sm w-12 h-10 bg-blue-500 justify-center items-center  text-xl rounded-lg text-white">
										<span class="material-icons">
													person
									</span>
                                   </span>
								</div>
								<input  name="user_name" v-model="company_name" class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border border-l-0 h-10 border-grey-light rounded-lg rounded-l-none px-3 grelative focus:border-blue focus:shadow" required>
							</div>
							</div>
						<div class="mb-3 space-y-2 w-full text-xs text-left ">
							<label class="text-left font-semibold text-gray-600 py-2">Your email</label>
							<div class="flex flex-wrap items-stretch w-full mb-4 relative">
								<div class="flex">
									<span class=" flex items-left leading-normal bg-grey-lighter border-1 rounded-r-none border border-r-0 border-blue-300 px-3 whitespace-no-wrap text-grey-dark text-sm w-12 h-10 bg-blue-500 justify-center items-center  text-xl rounded-lg text-white">
										<span class="material-icons">
													mail
									</span>
                                   </span>
								</div>
								<input type="email" name="user_name" v-model="user_name" class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border border-l-0 h-10 border-grey-light rounded-lg rounded-l-none px-3 grelative focus:border-blue focus:shadow" placeholder="abcxy@abc.com" required>
							</div>
							</div>
                            <div class="mb-3 space-y-2 w-full text-xs text-left ">
							<label class="text-left font-semibold text-gray-600 py-2">Couriers Number</label>
							<div class="flex flex-wrap items-stretch w-32 mb-4 relative">
								<div class="flex">
									<span class=" flex items-left leading-normal bg-grey-lighter border-1 rounded-r-none border border-r-0 border-blue-300 px-3 whitespace-no-wrap text-grey-dark text-sm w-12 h-10 bg-blue-500 justify-center items-center  text-xl rounded-lg text-white">
										<span class="material-icons">
													pedal_bike
									</span>
                                   </span>
								</div>
								<input v-model="couriers" class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border border-l-0 h-10 border-grey-light  text-gray-500 rounded-lg rounded-l-none px-3 grelative focus:border-blue focus:shadow" readonly>
							</div>
							</div>
								<br>
                                    <div class="text text-s">
                        {{messagetouser}}
                        </div>
                        <br>
								<div class="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
									<button @click="update()" class="transition duration-200  ease-in-out mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-600"> update </button>
								</div>
							</div>
						<!-- </form> -->
					</div>
				</div>
			</div>
   </div>
</template>

<script>
import {updateCompany} from '../../composables/UserService'
import useUser from '../../composables/Users'
export default {
  name: 'Profile',
  data() {
    return {
      user_name: '',
      company_name:'',
      couriers:'',
      messagetouser: '',
      company_id:'',
      isLogin: false,
    }
  },
  methods:{
    async update(){
        console.log(this.company_name)
        if(this.company_name.length>2&&this.user_name.length>2){
            updateCompany(this.company_id,{company_name:this.company_name,user_name:this.user_name}).then(response => {
            this.messagetouser = response.message;
            localStorage.setItem("user-info",JSON.stringify(response.user));
            
			console.log(response)
            });
        }else{
            this.messagetouser = "invalid input(company name length must be grater then 2)";
        }
        
    }
  },
  async mounted(){
    const {data,getAllData} = useUser() 
      let user = localStorage.getItem('user-info');
      if(!user){
          this.$router.push({name:'home'});
      }else{
        this.user_name = JSON.parse(user).user_name;
        this.company_name = JSON.parse(user).company_name;
        this.company_id = JSON.parse(user)._id;
        await getAllData({company_id:this.company_id})
        this.couriers = data;
      }
  }
}
</script>