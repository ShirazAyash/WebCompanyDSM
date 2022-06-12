<template>
  <div class=" z-0  flex items-center justify-center  mb-8 py-7 md:py-12 px-4 sm:px-6 lg:px-8  items-center">
	<div class="max-w-md w-full   space-y-8 p-4 bg-gray-100 rounded-xl shadow-lg z-10">
		<div class="grid  gap-8 grid-cols-1">
				<div class="flex flex-col ">
						<div class="flex flex-col sm:flex-row items-center">
							<h2  class="font-semibold text-lg mr-auto">Add New Order</h2>
							<div class="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
						</div>
			<!-- <form class="mt-5"> -->
				<div class="form">
						<div class="text-left mb-3 space-y-2 w-full text-xs">
							<label class=" font-semibold text-gray-600">source info:</label>
							<div class="flex flex-wrap items-stretch w-full space-x-4 mb-4 relative">
                <vue-google-autocomplete
                ref="src_address"
                id="src"
                class="flex-shrink flex-grow flex-auto leading-normal flex-1 border border-l-0 h-10 border-grey-light rounded-lg  px-3 relative focus:border-blue focus:shadow"
                placeholder="Please type src address"
                v-on:placechanged="getSrcAddressData"
                required
                country="il"
              >
              </vue-google-autocomplete>
								<!-- <input name="src_city" v-model="src_city" class="flex-shrink flex-grow flex-auto leading-normal flex-1 border border-l-0 h-10 border-grey-light rounded-lg  px-3 relative focus:border-blue focus:shadow" placeholder="City" required>
                <input name="src_street" v-model="src_street" class="flex-shrink flex-grow flex-auto leading-normal  flex-1 border border-l-0 h-10 border-grey-light rounded-lg  px-3 relative focus:border-blue focus:shadow" placeholder="Street" required>
                <input name="src_number" v-model="src_number" class="flex-shrink flex-grow flex-auto leading-normal w-10 border border-l-0 h-10 border-grey-light rounded-lg  px-3 relative focus:border-blue focus:shadow" placeholder="Num." required> -->
							</div>

							<div class="flex flex-wrap items-stretch w-full mb-4 space-x-4 relative">
								<input type="src_name" name="src_name" v-model="src_name" class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border border-l-0 h-10 border-grey-light rounded-lg  px-3 relative focus:border-blue focus:shadow" placeholder="Contact Name" required>
								<input type="src_phone" name="src_phone" v-model="src_phone" class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border border-l-0 h-10 border-grey-light rounded-lg  px-3 relative focus:border-blue focus:shadow" placeholder="Phone" required>

              </div>
              <br>
              <br>
              <label class=" font-semibold text-gray-600 py-2">destination info:</label>
							<div class="flex flex-wrap items-stretch w-full space-x-4 mb-4 relative">
                <vue-google-autocomplete
                ref="dst_address"
                id="dst"
                class="flex-shrink flex-grow flex-auto leading-normal flex-1 border border-l-0 h-10 border-grey-light rounded-lg  px-3 relative focus:border-blue focus:shadow"
                placeholder="Please type dst address"
                v-on:placechanged="getDstAddressData"
                required
                country="il"
              >
              </vue-google-autocomplete>
								<!-- <input name="dst_city" v-model="dst_city" class="flex-shrink flex-grow flex-auto leading-normal flex-1 border border-l-0 h-10 border-grey-light rounded-lg  px-3 relative focus:border-blue focus:shadow" placeholder="City" required>
                <input name="dst_street" v-model="dst_street" class="flex-shrink flex-grow flex-auto leading-normal  flex-1 border border-l-0 h-10 border-grey-light rounded-lg  px-3 relative focus:border-blue focus:shadow" placeholder="Street" required>
                <input name="dst_number" v-model="dst_number" class="flex-shrink flex-grow flex-auto leading-normal w-10 border border-l-0 h-10 border-grey-light rounded-lg  px-3 relative focus:border-blue focus:shadow" placeholder="Num." required> -->
							</div>
							<div class="flex flex-wrap items-stretch w-full mb-4 space-x-4 relative">
								<input type="dst_name" name="dst_name" v-model="dst_name" class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border border-l-0 h-10 border-grey-light rounded-lg  px-3 relative focus:border-blue focus:shadow" placeholder="Contact Name" required>
								<input type="dst_phone" name="dst_phone" v-model="dst_phone" class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border border-l-0 h-10 border-grey-light rounded-lg  px-3 relative focus:border-blue focus:shadow" placeholder="Phone" required>
              </div>
              <br>
              <br>
     
               <label class=" font-semibold text-gray-600 py-2">Vehicle type</label>
              <div class="flex flex-wrap items-stretch w-full mb-4 space-x-4 relative">
                <input type="checkbox" id="car" value="car" v-model="Vehicle_type" >
                <label>Car</label>
                <input type="checkbox" id="bike" value="bike" v-model="Vehicle_type">
                <label> Bike</label>
                <input type="checkbox" id="van" value="van" v-model="Vehicle_type">
                <label>Van</label>
                <input type="checkbox" id="scooter" value="scooter" v-model="Vehicle_type">
                <label>Scooter</label>
              </div>
              <br>
              <br>
              <input type="checkbox" v-model="express" />
              <label class=" font-semibold text-gray-600 py-2">Express
              </label>
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
						<!-- </form> -->
					</div>
				</div>
			</div>
   </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import {addOrder} from '../../composables/UserService'//UserService'
import VueGoogleAutocomplete from "vue-google-autocomplete";
import { onMounted } from '@vue/runtime-core'
import useUser from '../../composables/Orders'
//import Header from './HeaderSign.vue'
export default {
  name: 'OrderForm',
  components: { VueGoogleAutocomplete },
  props:['id']
	,
	setup(props){
		let orderdata=reactive({
			'src_address':'',
			'dest_address':'',
		})

		const {order,getOrder}=useUser()//,storeUser,updateUser} = useUser()


		if(props.id){
			onMounted(getOrder(props.id))
			orderdata = order
		}


		// const saveUser=async()=>{
		// 	props.userId ?
		// 	await updateUser(props.userId)
		// 	:await storeUser({...userdata})
		// }
	
		return{
			orderdata,
			//saveUser
		}
	
	},
//   props: ['messagetouser'],
  data() {
    
    return {
      express: false,
      company_id: '',
      src_address: '',
      src:{},
      dst_address: '',
      dst:{},
      src_name:'',
      src_phone:'',
      Vehicle_type:[],
      dst_name:'',
      dst_phone:'',
      messagetouser:'',
      }
    }
  ,
  methods: {
    createOrder() {
    
		let user = localStorage.getItem('user-info');
        let companyid = JSON.parse(user)._id;
        const order = {
            express: this.express,
            company_id: companyid,
            src_address:this.src_address,
            src:this.src,
            dest_address:this.dst_address,
            dest:this.dst,
            src_contact:{
              name:this.src_name,
              phone:this.src_phone
            },
            status:'pending',
            Vehicle_type:this.Vehicle_type,
            dst_contact:{
              name:this.dst_name,
              phone:this.dst_phone
            }
        }
        if(this.validInput()){
          console.log("in")
            addOrder(order).then(response => {
            
                if(response.status=='ERROR'){
				this.messagetouser = response.message;
                    // localStorage.setItem("user-info",JSON.stringify(response.user));
                    // this.$router.push({name:'home'});
                }else{
					this.$router.push({name:'orders'});
					alert('the order added successfuly')
				}
            });
        }else{
            this.messagetouser = 'please enter valid input';
        }
        
    },
    validInput(){
        if(this.src_address.length>1&&this.dst_address.length>1
        &&this.src_name.length>3&&this.dst_name.length>3
        &&this.Vehicle_type.length>0){
            return true;
        }
        return false;
	},
    getSrcAddressData: function (addressData,id) {
        this.src_address = id.formatted_address;
        this.src ={'lat':addressData.latitude.toString(), 'long':addressData.longitude.toString()}
    },
    getDstAddressData: function (addressData,id) {
        this.dst_address = id.formatted_address;
        this.dst ={'lat':addressData.latitude.toString(), 'long':addressData.longitude.toString()}
    },

  },
  mounted() {
      // To demonstrate functionality of exposed component functions
      // Here we make focus on the user input
      this.$refs.src_address.focus();
      this.$refs.dst_address.focus();
    },
//   mounted(){
//       let user = localStorage.getItem('user-info');
//       if(user){
//           this.$router.push({name:'home'});
//       }
//   }
}
</script>