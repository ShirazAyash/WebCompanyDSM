<template>
   <div class=" w-1/2 flex  items-center justify-center mb-8 py-7 md:py-12 px-4 sm:px-6 lg:px-8  items-left">
	<div class="max-w-md w-full space-y-8 p-4 bg-gray-100 rounded-xl shadow-lg z-10">
		<div class="grid  gap-8 grid-cols-1">
				<div class="flex flex-col ">
					<label class=" font-semibold text-gray-600">{{userdata.deadline}}</label>
						<div class="flex flex-col sm:flex-row items-center">
							<h2  class="font-semibold text-lg mr-auto">Edit order</h2>
							<div class="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
						</div>
										<div class="form">
						<div class="text-left mb-3 space-y-2 w-full text-xs">
							<label class=" font-semibold text-gray-600">source info:</label>
							<div class="flex flex-wrap items-stretch w-full space-x-4 mb-4 relative">
                <vue-google-autocomplete
                
                id="src"
                class="flex-shrink flex-grow flex-auto leading-normal flex-1 border border-l-0 h-10 border-grey-light rounded-lg  px-3 relative focus:border-blue focus:shadow"
                placeholder="Please type src address"
                v-on:placechanged="getSrcAddressData"
                required
                country="il"
              >
              </vue-google-autocomplete>
							</div>

							<div class="flex flex-wrap items-stretch w-full mb-4 space-x-4 relative">
								<input type="src_name" name="src_name" v-model="userdata.src_contact.name" class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border border-l-0 h-10 border-grey-light rounded-lg  px-3 relative focus:border-blue focus:shadow" placeholder="Contact Name" required>
								<input type="src_phone" name="src_phone" v-model="userdata.src_contact.phone" class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border border-l-0 h-10 border-grey-light rounded-lg  px-3 relative focus:border-blue focus:shadow" placeholder="Phone" required>

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
							</div>
							<div class="flex flex-wrap items-stretch w-full mb-4 space-x-4 relative">
								<input type="dst_name" name="dst_name" v-model="userdata.dst_contact.name" class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border border-l-0 h-10 border-grey-light rounded-lg  px-3 relative focus:border-blue focus:shadow" placeholder="Contact Name" required>
								<input type="dst_phone" name="dst_phone" v-model="userdata.dst_contact.phone" class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border border-l-0 h-10 border-grey-light rounded-lg  px-3 relative focus:border-blue focus:shadow" placeholder="Phone" required>
              </div>
              <br>
              <br>
     <label class=" font-semibold text-gray-600 py-2">courier: {{courier_name}}
			</label>
						<div class="flex flex-wrap items-stretch w-full mb-4 space-x-4 relative">
								<input type="dst_name" name="dst_name" v-model="userdata.courier_id" class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border border-l-0 h-10 border-grey-light rounded-lg  px-3 relative focus:border-blue focus:shadow" placeholder="Courier Id">
								<button @click="findCourier(userdata.courier_id,userdata)" class="bg-white px-5 py-2 h-10 text-sm shadow-s tracking-wider border rounded-lg hover:shadow-lg hover:bg-gray-100">
							<span class="material-icons">person_search</span>
						</button>		
              </div>
		<br>
              <br>
               <label class=" font-semibold text-gray-600 py-2">Vehicle type</label>
              <div class="flex flex-wrap items-stretch w-full mb-4 space-x-4 relative">
                <input type="checkbox" id="car" value="car" v-model="userdata.Vehicle_type" >
                <label>Car</label>
                <input type="checkbox" id="bike" value="bike" v-model="userdata.Vehicle_type">
                <label> Bike</label>
                <input type="checkbox" id="van" value="van" v-model="userdata.Vehicle_type">
                <label>Van</label>
                <input type="checkbox" id="scooter" value="scooter" v-model="userdata.Vehicle_type">
                <label>Scooter</label>
              </div>
              <br>
              <br>
              <input type="checkbox" v-model="express" />
              <label class=" font-semibold text-gray-600 py-2">Express
              </label>
			
			
							</div>
								
                                    <div class="text">
                        {{messagetouser}}
                        </div>
								<div class="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
									<button @click="infoOrder()" class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"> Cancel </button>
									<button @click="updateOrder(userdata)" class="transition duration-200  ease-in-out mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-600"> Update </button>
								</div>
							</div>
					</div>
				</div>
			</div>
   </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import {getCourierName,putUpdateOrder} from '../../composables/UserService'
import useUser from '../../composables/Orders'
import VueGoogleAutocomplete from "vue-google-autocomplete";
export default {
	name:'UserForm',
	components: { VueGoogleAutocomplete },
	props:['id','infoOrder'],
	data() {
    return {
		courier_name:'',
		messagetouser: ''
      }
    },
	setup(props){
		let userdata=reactive({
    'src_contact': '',
    'dst_contact': '',
	'courier_id':'',
	'Vehicle_type':[],
	'express':'',
	'deadline':''
})
		

		const {getOrder}=useUser()


		if(props.id){
			onMounted( getOrder(props.id).then(response=>{
				userdata.dst_contact = response.dst_contact
				userdata.src_contact = response.src_contact
				userdata.courier_id = response.courier_id
				userdata.Vehicle_type=response.Vehicle_type
				userdata.express = response.express
				userdata.status = response.status
				userdata.deadline = response.deadline
			}))
			
		}
	
		return{
			userdata,
		}
	
	},
	methods:{
		getSrcAddressData: function (addressData,id) {
        this.userdata.src_address = id.formatted_address;
        this.userdata.src ={'lat':addressData.latitude, 'long':addressData.longitude}
    },
    getDstAddressData: function (addressData,id) {
        this.userdata.dest_address = id.formatted_address;
        this.userdata.dest ={'lat':addressData.latitude, 'long':addressData.longitude}
    },
	async findCourier(id){
		if(id && id.length==24){
			getCourierName({_id:id}).then(response => {
				if(response.data){
					this.courier_name = response.data.first_name +" "+response.data.last_name
				}else{
					this.courier_name = response.msg
				}
			console.log(this.courier_name)
            });
		}else{
			this.courier_name = "invalid input"
		}
			
		
		
	},
	async updateOrder(userdata){
		if(userdata.status=='on the way'||userdata.status=='collected'||userdata.status=='arrived'){
			this.messagetouser = 'this status cant be update';
		}else{
			putUpdateOrder(this.id,userdata).then(response => {
			userdata.courier_name = response.first_name +" "+response.last_name
            this.messagetouser = response.message;
                if(response.status == 'SUCCESS'){
                    this.infoOrder()
					alert('the order update successfuly')
                }else{
					alert(response.message)
				}
			console.log(response)
            });
		}
		
	}

  },
	
}
</script>

<style scoped>


</style>
