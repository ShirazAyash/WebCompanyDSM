<template>
  <GMapMap
    :center="center"
    :zoom="10"
    map-type-id="terrain"
    style="width: 100vw; height: 20rem"
  >
    <GMapCluster :zoomOnClick="true">
      <GMapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="TogglePopup('buttonTrigger',m.position)"
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
import LocationInfo from './LocationInfo.vue'
export default {
  components:{
    LocationInfo
  },
  data() {
    return {
      
      center: { lat: 32.099800, lng: 34.898320 },
      markers: [
        {
          position: {
            lat: 32.099800,
            lng: 34.898320,
          },
        },
        {
          position: {
            lat: 51.198429,
            lng: 6.69529,
          },
        },
        {
          position: {
            lat: 51.165218,
            lng: 7.067116,
          },
        },
        {
          position: {
            lat: 51.09256,
            lng: 6.84074,
          },
        },
      ],
    };
  },
  setup(){
    const popupTriggers = ref({
      buttonTrigger: false,
      description: '',
    });
    const TogglePopup = (trigger,data)=>{
      popupTriggers.value[trigger]= !popupTriggers.value[trigger]
      popupTriggers.value['description']=data
    }
    return{
      LocationInfo,
      popupTriggers,
      TogglePopup
    }
  }
};
</script>

<style>
body {
  margin: 0;
}
</style>
