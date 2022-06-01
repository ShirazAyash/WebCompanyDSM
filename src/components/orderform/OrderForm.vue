<template>
  <div class=" z-0  flex items-center justify-center  mb-8 py-7 md:py-12 px-4 sm:px-6 lg:px-8  items-center">
	<div class="max-w-md w-full   space-y-8 p-4 bg-gray-100 rounded-xl shadow-lg z-10">
		<div class="grid  gap-8 grid-cols-1">
				<div class="flex flex-col ">
						<div class="flex flex-col sm:flex-row items-center">
							<h2  class="font-semibold text-lg mr-auto">Add New Order</h2>
							<div class="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
						</div>
			<form class="mt-5">
				<div class="form">
						<div class="mb-3 space-y-2 w-full text-xs">
							<label class=" font-semibold text-gray-600 py-2">Source Address<abbr title="required">*</abbr></label>
							<div class="flex flex-wrap items-stretch w-full mb-4 relative">
								<input type="src_address" name="src_address" v-model="src_address" class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border border-l-0 h-10 border-grey-light rounded-lg  px-3 relative focus:border-blue focus:shadow" required>
							</div>
              <label class=" font-semibold text-gray-600 py-2">Destination Address<abbr title="required">*</abbr></label>
							<div class="flex flex-wrap items-stretch w-full mb-4 relative">
								<input type="dst_address" name="dst_address" v-model="dst_address" class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border border-l-0 h-10 border-grey-light rounded-lg  px-3 relative focus:border-blue focus:shadow" required>
							</div>
              <label class=" font-semibold text-gray-600 py-2">Source contact<abbr title="required">*</abbr></label>
							<div class="flex flex-wrap items-stretch w-full mb-4 space-x-4 relative">
								<input type="src_name" name="src_name" v-model="src_contact.name" class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border border-l-0 h-10 border-grey-light rounded-lg  px-3 relative focus:border-blue focus:shadow" placeholder="Name" required>
								<input type="src_phone" name="src_phone" v-model="src_contact.phone" class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border border-l-0 h-10 border-grey-light rounded-lg  px-3 relative focus:border-blue focus:shadow" placeholder="Phone" required>

              </div>
              <label class=" font-semibold text-gray-600 py-2">Destination contact<abbr title="required">*</abbr></label>
							<div class="flex flex-wrap items-stretch w-full mb-4 space-x-4 relative">
								<input type="dst_name" name="dst_name" v-model="dst_address.name" class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border border-l-0 h-10 border-grey-light rounded-lg  px-3 relative focus:border-blue focus:shadow" placeholder="Name" required>
								<input type="dst_phone" name="dst_phone" v-model="dst_address.phone" class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border border-l-0 h-10 border-grey-light rounded-lg  px-3 relative focus:border-blue focus:shadow" placeholder="Phone" required>

              </div>
               <label class=" font-semibold text-gray-600 py-2">Vehicle type<abbr title="required">*</abbr></label>
              <div class="flex flex-wrap items-stretch w-full mb-4 space-x-4 relative">
                <input type="checkbox" id="car" value="car" v-model="Vehicle_type" >
                <label>Car</label>
                <input type="checkbox" id="bike" value="bike" v-model="Vehicle_type">
                <label> Bike</label>
                <input type="checkbox" id="van" value="van" v-model="Vehicle_type">
                <label>Van</label>
                <input type="checkbox" id="scooter" value="van" v-model="Vehicle_type">
                <label>Scooter</label>
              </div>
              <p>
              <label class=" font-semibold text-gray-600 py-2">Express?<abbr title="required">*</abbr>
              <input type="checkbox" v-model="express" />
              </label>
              </p>
							</div>
              
              
                                <p class="text-xs text-red-500 text-left my-3">
                        Required fields are marked with an
									asterisk <abbr title="Required field">*</abbr></p>
								
                                    <div class="text">
                        {{messagetouser}}
                        </div>
								<div class="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
									<button @click="createOrder()" class="transition duration-200  ease-in-out mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-600"> Add order </button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
   </div>
</template>

<script>
import {addOrder} from '../../composables/UserService'//UserService'
//import Header from './HeaderSign.vue'
export default {
  name: 'OrderForm',
  components: {
    //Header
  },
//   props: ['messagetouser'],
  data() {
    
    return {
      express: false,
      company_id: '',
      src_address: '',
      dst_address: '',
      src_contact:{
        name:'',
        phone:''
      },
      status:'',
      Vehicle_type:[],
      dst_contact:{
        name:'',
        phone:''
      }
    }
  },
  methods: {
    createOrder() {
		let user = localStorage.getItem('user-info');
        let id = JSON.parse(user)._id;
        const payload = {
            express: this.express,
            company_id: id,
            src_address: this.src_address,
            dst_address: this.dst_address,
            src_contact:{
              name:this.src_contact.name,
              phone:this.src_contact.phone
            },
            status:'pending',
            Vehicle_type:this.Vehicle_type,
            dst_contact:{
              name:this.dst_contact.name,
              phone:this.dst_contact.phone
            }
        }
        if(this.validInput()){
            addOrder(payload).then(response => {
            
                if(response.status=='ERROR'){
					this.messagetouser = response.message;
                    // localStorage.setItem("user-info",JSON.stringify(response.user));
                    // this.$router.push({name:'home'});
                }else{
					this.$router.push({name:'orders'});
					alert('the order added successfuly')
				}
            });
            // this.clearForm();
        }else{
            this.messagetouser = 'please enter valid input';
        }
        
    },
    clearForm() {
        this.src_address = "";
    },
    validInput(){
        if(this.src_address.length>1){
            return true;
        }
        return false;
	}
  },
//   mounted(){
//       let user = localStorage.getItem('user-info');
//       if(user){
//           this.$router.push({name:'home'});
//       }
//   }
}
</script>