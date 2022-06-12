<template>
    <order-form :id='id'> </order-form>
</template>

<script>
import OrderForm from './OrderAddForm.vue'
export default {
  name:'OrderEdit',
  components: { OrderForm },
  props:['id']
}
</script>

<style>

</style>