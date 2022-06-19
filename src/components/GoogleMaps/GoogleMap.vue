<template>
<button @click="getorders()">refresh</button>
  <GMapMap
    :center="center"
    :zoom="10"
    map-type-id="terrain"
    style="width: 100vw; height: 50rem"
  >
    <GMapCluster :zoomOnClick="true">
      <GMapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        @click="TogglePopup('buttonTrigger',orders[index])"
      />
    </GMapCluster>
  </GMapMap>
  <LocationInfo v-if="popupTriggers.buttonTrigger" 
                :TogglePopup="() => TogglePopup('buttonTrigger','')">
                <h2>{{popupTriggers.description}}</h2>
  </LocationInfo>
</template>

<script>
import {ref} from 'vue'
//import {  onMounted } from '@vue/runtime-core'
import LocationInfo from './LocationInfo.vue'
import useOrder from '../../composables/Orders'
export default {
  components:{
    LocationInfo
  },
  data() {
    return {
      
      center: { lat: 32.099800, lng: 34.898320 },
      markers: [],
      orders:[]
    };
  },
  setup(){

    // const {ordersdata,data,getAllData} = useOrder()

    const popupTriggers = ref({
      buttonTrigger: false,
      description: '',
    });
    const TogglePopup = (trigger,data)=>{
      popupTriggers.value[trigger]= !popupTriggers.value[trigger]
      popupTriggers.value['description']=data
    }
    //const markerss=[]
    // onMounted(async (markerss)=>{
    //          const user = localStorage.getItem('user-info');
    //         const id = JSON.parse(user)._id;
    //         await getAllData({company_id:id})
    //         console.log(data.value)
    //         for (let index = 0; index < data.value; index++) {
    //           var order = {}
    //           order= {position:
    //             {
    //               lat:ordersdata.value[index].src.lat,
    //               lng:ordersdata.value[index].src.long
    //             }
    //           }
    //           markerss[index]=order;
    //       }
          
    //       //console.log(order)
    // })
              //console.log(markerss)

    return{
      LocationInfo,
      popupTriggers,
      TogglePopup,
      //markerss,
    }
  },
  methods:{
    async getorders(){
      const {ordersdata,data,getAllData} = useOrder()
      const user = localStorage.getItem('user-info');
            const id = JSON.parse(user)._id;
            await getAllData({company_id:id})
            console.log(data.value)
            for (let index = 0; index < data.value; index++) {
              var order = {}
              order= {position:
                {
                  lat:parseFloat(ordersdata.value[index].src.lat),
                  lng:parseFloat(ordersdata.value[index].src.long)
                }
              }
              this.markers[index]=order;
              this.orders[index]=ordersdata.value[index];
              
          }
        
    }
  }
};
</script>

<style>
body {
  margin: 0;
}
</style>
