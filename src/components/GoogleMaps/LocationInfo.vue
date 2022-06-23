<template>
  <div class="popup">
      <div class="popup-inner">
         <button @click="TogglePopup()"  class="transition duration-200  ease-in-out mb-2 md:mb-0 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-black rounded-full hover:shadow-lg hover:bg-blue-600" >
             <span class="material-icons">close</span>
          </button>
          <slot />
         
      </div>
  </div>
</template>

<script>
export default {
   props: ['TogglePopup']
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
    background-color: rgba(10, 9, 9, 0.254);

    display: flex;
    align-items: center;
    justify-content: center;
}


</style>
