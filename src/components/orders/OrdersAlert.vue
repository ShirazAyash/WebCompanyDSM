<template>
  <div class="popup rounded-xl">
      <div class="popup-inner">
         <button @click="PopupAlert()"  class="transition duration-200  ease-in-out mb-2 md:mb-0 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-black rounded-full hover:shadow-lg hover:bg-white-600" >
             <span class="material-icons">close</span>
          </button>
           <slot />
      </div>
  </div>
</template>

<script>
export default {
   props: ['PopupAlert']
}
</script>
<style scoped>
.popup{
    position: fixed;
    width: 20%;
    height: 25%;
    bottom: 10%;
    right:10%;
    z-index: 99;
    /* background-color: rgba(92, 173, 227, 0.359);  */

    display: flex;
    align-items: center;
    justify-content: center;
}
.popup-inner{
    /* position: fixed; */
    right: 10%;
    /* //background-color: rgba(235, 0, 0, 0.598); */
}


</style>
