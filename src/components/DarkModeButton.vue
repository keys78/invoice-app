<template>
  <div class="darkPadding">
      <label class="toggle">
          <img class="cursor-pointer" :src="(mode === 'dark') ?  Sun  : Moon " @click="$emit('nightMode')"/>
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
    }

}
</script>

<style>
 
</style>