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
    
    bottom: 20%;
    right: 10%;
    align-items: right;
    justify-content: right;
    align-items: right;
    justify-content:right;
}



</style>
