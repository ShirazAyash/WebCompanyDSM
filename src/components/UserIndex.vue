<template>
<profile-setting></profile-setting>
<list-user ></list-user>
</template>

<script>
import ListUser from '../components/user/ListUser.vue'
//import SearchUser from './functionalities/SearchUser.vue'
import ProfileSetting from './NavbarTop.vue'

export default {
    name: 'UserIndex',
    components: {
        ListUser,
        ProfileSetting

    },
  

}
</script>

<style>

</style>
