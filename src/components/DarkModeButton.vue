<template>
  <div class="p-10">
      <label class="toggle">
          <img class="cursor-pointer" :src="(mode === 'dark') ?  Moon  : Sun " @click="toogleNightMode"/>
          <!-- <img :src="(mode === 'dark') ? '../assets/images/icon-moon.svg' : '../assets/images/icon-moon.sv'"/> -->
      </label>
  </div>
</template>

<script>
import Sun from '../assets/images/icon-sun.svg'
import Moon from '../assets/images/icon-moon.svg'
export default {
    props: ['mode'],
    name: 'DarkModeButton',
    data() {
        return{
            Sun,
            Moon,
        }
    },
    methods: {
        toogleNightMode() {
            this.$emit('nightMode')
           
        }
    }

}
</script>

<style>

</style>