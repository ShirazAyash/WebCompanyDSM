
<template>
  <div class="pl-20 pr-50">
    <GoogleMap />
  </div>
</template>

<script>
import GoogleMap from './GoogleMaps/GoogleMap.vue'
export default {
  name:'Home',
  components:{
    GoogleMap
  },
    mounted(){
      let user = localStorage.getItem('user-info');
      if(!user){
          this.$router.push({name:'login'});
      }
  }
}
</script>
<style>
.travel-map {
  height: 400px;
}
</style>
