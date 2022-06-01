
<template>
  <div>
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
      }else{
          this.name = JSON.parse(user).company_name;
      }
      
  }
}
</script>
<style>
.travel-map {
  height: 400px;
}
</style>
