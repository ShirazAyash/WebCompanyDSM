<template>
<button @click="getorders()" class="transition duration-200  ease-in-out mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-600"> Show orders </button>
<button @click="hideOrders()" class="transition duration-200  ease-in-out mb-2 md:mb-0 bg-gray-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-gray-600"> Hide orders </button>

  <br>
  <br>
  <GMapMap
    :center="center"
    :zoom="13"
    map-type-id="terrain"
    style=" width: 96vw; height: 57rem"
  >
    <GMapCluster :zoomOnClick="true">
      <GMapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        :icon="{ url:'http://maps.google.com/mapfiles/ms/icons/red-dot.png'}"
        @click="TogglePopup('buttonTrigger','user',m.person)"
      />
    </GMapCluster>
    <GMapCluster :zoomOnClick="true">
      <GMapMarker
        :key="index"
        v-for="(m, index) in ordersArr"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        :icon="{ url:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}"
        @click="TogglePopup('buttonTrigger','order',orders[index])"
      />
    </GMapCluster>
  </GMapMap>
  <LocationInfo v-if="popupTriggers.buttonTrigger==='order'" 
                :TogglePopup="() => TogglePopup('buttonTrigger','')">
                <div class=" z-0  flex items-center justify-center  mb-8 py-7 md:py-12 px-4 sm:px-6 lg:px-8  items-left">
	<div class="max-w-md w-full   space-y-8 p-4 bg-gray-100 rounded-xl shadow-lg z-10">
		<div class="grid  gap-8 grid-cols-1">
				<div class="flex flex-col ">
          <div class="flex flex-col sm:flex-row items-left">
							<h2  class="font-semibold text-blue-500 text-xl mr-auto">Order Info:</h2>
						</div>
            <br>
						<div class="flex flex-col sm:flex-row items-left">
							<h2  class="font-semibold text-lg mr-auto">Src Address: {{popupTriggers.description.src_address}}</h2>
						</div>
            <div class="flex flex-col sm:flex-row items-left">
						<h2  class="font-semibold text-lg mr-auto">Dest Address: {{popupTriggers.description.dest_address}}</h2>
						</div>
            <div class="flex flex-col sm:flex-row items-left">
						<h2  class="font-semibold text-lg mr-auto">Status: {{popupTriggers.description.status}}</h2>
						</div>
					</div>
				</div>
			</div>
   </div>
  </LocationInfo>
   <LocationInfo v-if="popupTriggers.buttonTrigger==='user'" 
                :TogglePopup="() => TogglePopup('buttonTrigger','')">
                <div class=" z-0  flex items-center justify-center  mb-8 py-7 md:py-12 px-4 sm:px-6 lg:px-8  items-left">
	<div class="max-w-md w-full   space-y-8 p-4 bg-gray-100 rounded-xl shadow-lg z-10">
		<div class="grid  gap-8 grid-cols-1">
				<div class="flex flex-col ">
          <div class="flex flex-col sm:flex-row items-left">
							<h2  class="font-semibold text-blue-500 text-xl mr-auto">Courier Info:</h2>
						</div>
            <br>
            <div class="flex flex-col sm:flex-row items-left">
							<h2  class="font-semibold text-lg mr-auto">Status: {{popupTriggers.description.status}}</h2>
               <span v-if="popupTriggers.description.status==='idle'" class='material-icons green-point'>fiber_manual_record</span>
              <span v-else-if="popupTriggers.description.status=='busy'" class="material-icons">pedal_bike</span>
              <span v-else-if="popupTriggers.description.status=='offline'" class="material-icons red-point">fiber_manual_record</span>
              <span v-else class='material-icons '>pending</span>
						</div>
						<div class="flex flex-col sm:flex-row items-left">
							<h2  class="font-semibold text-lg mr-auto">Id: {{popupTriggers.description._id}}</h2>
						</div>
            <div class="flex flex-col sm:flex-row items-left">
							<h2  class="font-semibold text-lg mr-auto">Name: {{popupTriggers.description.first_name+" "+popupTriggers.description.last_name}}</h2>
						</div>
            <div class="flex flex-col sm:flex-row items-left">
							<h2  class="font-semibold text-lg mr-auto">Phone: {{popupTriggers.description.phone_number}}</h2>
						</div>
            <div class="flex flex-col sm:flex-row items-left">
							<h2  class="font-semibold text-lg mr-auto">Vehicle: {{popupTriggers.description.Vehicle_type}}</h2>
						</div>
					</div>
				</div>
			</div>
   </div>
  </LocationInfo>
</template>

<script>
import {ref} from 'vue'
import { onMounted} from '@vue/runtime-core'
import LocationInfo from './LocationInfo.vue'
import useOrder from '../../composables/Orders'
import useUser from '../../composables/Users'
import firebase from 'firebase'
import { useRouter } from 'vue-router'
export default {
  components:{
    LocationInfo
  },
  data() {
    return {
      
      center: { lat: 32.099800, lng: 34.898320 },
      ordersArr: [],
      orders:[],      
    };
  },
  setup(){

    const {usersdata,getAllData} = useUser() 

    const popupTriggers = ref({
      buttonTrigger: '',
      description: '',
    });
    const TogglePopup = (trigger,type,data)=>{
      popupTriggers.value[trigger]= type;
      popupTriggers.value['description']=data
    }
      const database = firebase.database();
    const rootRef = database.ref('activeCouriers')
   
    const markers = ref(
      []
    );


    const handle = (snapshot)=>{

      snapshot.forEach((child) => {

         const person = usersdata.value.find(element => {
          if (element._id == child.key) {
            return true;
          }
          return false;
        });
    
        if(person){
          const order= {position:
                      {
                        lat:child.val().l[0],
                        lng:child.val().l[1]
                      },
                      key:child.key,
                      person:person
                    }
                    var isExist=false;
                    for (let index = 0; index < markers.value.length; index++) {
                      if(markers.value[index].key == child.key){
                        markers.value[index]=order
                        isExist=true;
                      }
                    }
                    if(!isExist){
                      markers.value[markers.value.length]=order
                    }
                    console.log("makers" + markers.value.length)
        }
    });
  }
  rootRef.on('value', snapshot=>{ 
    handle(snapshot)

    })

    const router = useRouter()
    onMounted(async ()=>{
      let user = localStorage.getItem('user-info');
      if(user){
        const user = localStorage.getItem('user-info');
        const id = JSON.parse(user)._id;
        await getAllData({company_id:id})
      }else{
        router.push({name:'login'});
      }
    })
    

    return{
      LocationInfo,
      popupTriggers,
      TogglePopup,
      markers,
    }
  },
  mounted(){
    let user = localStorage.getItem('user-info');
      if(!user){
        this.$router.push({name:'login'});
      }

  },
  methods:{
    async hideOrders(){
      this.ordersArr=[];
    },
    async getorders(){
      const {ordersdata,data,getAllData} = useOrder()
      const user = localStorage.getItem('user-info');
            const id = JSON.parse(user)._id;
            await getAllData({company_id:id})
            console.log(data.value)
            if(ordersdata.value[0]){
              this.center = {
                    lat:parseFloat(ordersdata.value[0].src.lat),
                    lng:parseFloat(ordersdata.value[0].src.long)
                  }
            }
            for (let index = 0; index < data.value; index++) {
              var order = {}
              order= {position:
                {
                  lat:parseFloat(ordersdata.value[index].src.lat),
                  lng:parseFloat(ordersdata.value[index].src.long)
                }
              }
              this.ordersArr[index]=order;
              this.orders[index]=ordersdata.value[index];
              
          }
        
    }
  },
  
};
</script>

<style>
body {
  margin: 0;
}
</style>