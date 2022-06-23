<template>
<div>
    <transition name='slide-fade'>
        <span v-if="!isfilterOrder" @click="isfilterOrder=true" class="font-md text-2xl md:text-3xl mt-2 md:mt-8 md:mr-5 material-icons-outlined cursor-pointer transition duration-200  ease-in-out hover:text-blue-300">
            filter_list
        </span>
        <span v-else @click="isfilterOrder=false" class="font-md text-2xl md:text-3xl mt-2 md:mt-8 md:mr-5 material-icons-outlined cursor-pointer  transition duration-200  ease-in-out hover:text-blue-300">
            close
        </span>
    </transition>
    <transition name="dropdown">
        <div v-show="isfilterOrder" class="z-20  relative">
            <ul class="text-sm md:text-base  bg-white shadow absolute right-5  md:right-9 w-40 text-center rounded-md  md:py-5  md:space-y-2 cursor-pointer  ">
                <li @click="setFilter('arrived')" :class="{'bg-blue-200':filtertype=='arrived'}" class="transition duration-200  ease-in-out  hover:bg-blue-200 py-2  font-md">arrived</li>
                <li @click="setFilter('collected')" :class="{'bg-blue-200':filtertype=='collected'}" class="transition duration-200  ease-in-out  hover:bg-blue-200 py-2  font-md">Status : collected</li>
                <li @click="setFilter('on the way')" :class="{'bg-blue-200':filtertype=='on the way'}" class="transition duration-200  ease-in-out  hover:bg-blue-200 py-2  font-md">Status : on the way</li>
                <li @click="setFilter('pending')" :class="{'bg-blue-200':filtertype=='pending'}" class="transition duration-200  ease-in-out  hover:bg-blue-200  py-2     font-md">Status: Pending</li>
                <li @click="setFilter('assigned')" :class="{'bg-blue-200':filtertype=='assigned'}" class="transition duration-200  ease-in-out  hover:bg-blue-200 py-2 font-md">Status : assigned</li>
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
    name: 'FilterOrder',
    setup(props, {emit}) {
        const isfilterOrder = ref(false)
        const filtertype = ref('')

        const setFilter = (type) => {
            filtertype.value = type
            emit('setFilter', type)
        }

        return {
            isfilterOrder,
            filtertype,
            setFilter
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
