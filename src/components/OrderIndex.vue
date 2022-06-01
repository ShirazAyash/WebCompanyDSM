<template>
<profile-setting></profile-setting>
<list-order ></list-order>
</template>

<script>
import ListOrder from '../components/orders/OrderList.vue'
import ProfileSetting from './NavbarTop.vue'

export default {
    name: 'UserIndex',
    components: {
        ListOrder,
        ProfileSetting

    }
  

}
</script>

<style>

</style>
