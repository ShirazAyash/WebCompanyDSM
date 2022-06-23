<template>
<profile-setting></profile-setting>
   <div class=" z-0  flex items-center justify-center  mb-8 py-7 md:py-12 px-4 sm:px-6 lg:px-8  items-center">
	<div class="max-w-md w-full   space-y-8 p-4 bg-gray-100 rounded-xl shadow-lg z-10">
		<div class="grid  gap-8 grid-cols-1">
				<div class="flex flex-col ">
						<div class="flex flex-col sm:flex-row items-center">
							<h2  class="font-semibold text-lg mr-auto">Add New Courier</h2>
							<div class="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
						</div>
			<form class="mt-5">
				<div class="form">
						<div class="mb-3 space-y-2 w-full text-xs">
							<label class=" font-semibold text-gray-600 py-2">Your email<abbr title="required">*</abbr></label>
							<div class="flex flex-wrap items-stretch w-full mb-4 relative">
								<div class="flex">
									<span class=" flex items-center leading-normal bg-grey-lighter border-1 rounded-r-none border border-r-0 border-blue-300 px-3 whitespace-no-wrap text-grey-dark text-sm w-12 h-10 bg-blue-500 justify-center items-center  text-xl rounded-lg text-white">
										<span class="material-icons">
													mail
									</span>
                                   </span>
								</div>
								<input type="email" name="user_name" v-model="user_name" class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border border-l-0 h-10 border-grey-light rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow" placeholder="abcxy@abc.com" required>
							</div>
							</div>
                            <div class="md:flex flex-row md:space-x-4 w-full text-xs">
							<!-- <div class="mb-3 space-y-2 w-full text-xs"> -->
								<!-- <label  class="font-semibold text-gray-600 py-2">Password <abbr title="required">*</abbr></label> -->
								<!-- <input type="password" name="password" pattern=".{6,}"  required title="6 characters minimum" v-model="password" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" > -->
								<!-- <p class="text-red text-xs hidden">Please fill out this field.</p> -->
							<!-- </div> -->
						</div>
                                <p class="text-xs text-red-500 text-left my-3">
                        Required fields are marked with an
									asterisk <abbr title="Required field">*</abbr></p>
								
                                    <div class="text">
                        {{messagetouser}}
                        </div>
								<div class="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                                    <router-link to="/orders" class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"> Cancel </router-link>
									<button @click="createUser()" class="transition duration-200  ease-in-out mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-600"> Add courier </button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
   </div>
</template>

<script>
import {addCourier} from '../../composables/UserService'//UserService'
//import Header from './HeaderSign.vue'
import ProfileSetting from '../NavbarTop.vue'
export default {
  name: 'UserForm',
  components: {
    ProfileSetting
  },
//   props: ['messagetouser'],
  data() {
    return {
      user_name: '',
      messagetouser: '',
      isLogin: false,
    }
  },
  methods: {
    createUser() {
		let user = localStorage.getItem('user-info');
        let id = JSON.parse(user)._id;
        const payload = {
            user_name: this.user_name,
			company_id:id,
        }
        if(this.validInput()){
            addCourier(payload).then(response => {
            
                if(response.status=='ERROR'){
					this.messagetouser = response.message;
                    // localStorage.setItem("user-info",JSON.stringify(response.user));
                    // this.$router.push({name:'home'});
                }else{
					this.$router.push({name:'couriers'});
					alert('the courier added successfuly')
				}
            });
            this.clearForm();
        }else{
            this.messagetouser = 'please enter valid input';
        }
        
    },
    clearForm() {
        this.user_name = "";
    },
    validInput(){
       var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(this.user_name.length>1  && this.user_name.match(validRegex)){
            return true;
        }
        return false;
	}
  },
  mounted(){
      let user = localStorage.getItem('user-info');
      if(!user){
          this.$router.push({name:'login'});
      }
  }
}
</script>