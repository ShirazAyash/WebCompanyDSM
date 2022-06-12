
<template>
<div class=" delay-75 duration-500 ease-in-out  z-30 bg-blue-100  uppercase font-semibold rounded-lg flex xl:flex-col  shadow-lg border-gray-600 justify-around  xl:h-16 fixed w-screen top-0">
    <transition>
        <span  @click="pressProfile()" class="font-md  md:text-5xl mt-2 absolute right-7  material-icons-outlined cursor-pointer  hover:text-blue-300">
            account_circle
        </span>
    </transition>
    <transition name="dropdown">
        <div v-show="isPressed" class="z-20  relative">
            <ul class="text-sm md:text-base  bg-white shadow absolute right-5  top-10 smd:right-9 w-40 text-center rounded-md  md:py-5  md:space-y-2 cursor-pointer">
                <li @click="profilePage()" class="transition duration-200  ease-in-out py-2   ">hello {{name}}</li>
                <li @click="profilePage()" class="transition duration-200  ease-in-out  hover:bg-blue-200 py-2  font-md ">Your profile</li>
                <li @click="logout()" class="transition duration-200  ease-in-out  hover:bg-blue-200 py-2  font-md">Sign out</li>
            </ul>
        </div>
    </transition>
</div>

</template>

<script>
import {
    ref
} from '@vue/runtime-core'
export default {
    name: 'ProfileTetting',
    data(){
       return{
           name:''
       }
   },
    mounted(){
      let user = localStorage.getItem('user-info');
      if(!user){
          this.$router.push({name:'login'});
      }else{
          this.name = JSON.parse(user).company_name;
      }
      
  },
    setup(props, {emit}) {
        const isPressed = ref(false)
        const filtertype = ref('')

        const setFilter = (type) => {
            filtertype.value = type
            emit('setFilter', type)
        }

        return {
            isPressed,
            filtertype,
            setFilter
        }
    },
    methods:{
        async pressProfile(){
            this.isPressed=!this.isPressed;
        },
        async profilePage(){
            this.$router.push({name:'profile'});
            this.isPressed=false
        },
        async logout(){
            localStorage.clear();
            this.$router.push({name:'signup'});
        }
    }
}
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
    transition: all 1s;
}

.dropdown-enter,
.dropdown-leave-to {
    opacity: 0;
    transform: translateY(-30px);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all .8s;
}

.slide-fade-enter,
.slide-fade-leave-active {
    opacity: 0;
}

.slide-fade-enter {
    transform: translateX(-31px);
}

.slide-fade-leave-active {
    transform: translateX(31px);
}
</style>
