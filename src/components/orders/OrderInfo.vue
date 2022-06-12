<template>
  <div class="popup">
      <!-- <div class="popup-inner"> -->
          <!-- <slot /> -->
          <edit-order :id="id" :infoOrder="infoOrder"></edit-order>
          <!-- <button @click="infoOrder()"  class="popup-close" >
              close
          </button> -->
      <!-- </div> -->
  </div>
</template>

<script>
import EditOrder from '../orderform/EditOrder.vue'
export default {
   props: ['id','infoOrder'],
   components: { EditOrder },
}


</script>
<style scoped>
.popup{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: right;
    justify-content: right;
    padding-right: 20%;
    padding-top: 3%;
    display: flex;
    align-items: right;
    justify-content:right;
}
.popup-inner{
    background: white;
    padding: 40px;
}

</style>
