<template>
  <div class="apple" :class="mode">
    
    <div class="sidebar fixed left-0 rounded-r-2xl" style="z-index:1;">
      <div class="logo-holder rounded-r-2xl">
        <img class="mx-auto" src="./assets/images/logo.svg" alt="sidepanel" />
      </div>
      <div class="navHolders ">
        <DarkModeButton :mode="mode" class="md:border-b border-r border-gray-700" @nightMode="nightMode"/>
        <div class="avatar cursor-pointer">
          <img class="mx-auto rounded-full w-10" src="https://images.pexels.com/photos/371168/pexels-photo-371168.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb" alt="sideArrow" />
        </div>
      </div>
    </div>

    <div class="main spartan">
      <Invoice />
    </div>

  </div>
</template>


<script >
import DarkModeButton from './components/DarkModeButton.vue'
import Invoice from './Invoice.vue'


  export default {
    name: 'App',
    components: {
      Invoice,
      DarkModeButton,

    },
    data() {
      return {
        mode: 'light'
      }
    },

    methods: {
     nightMode() {
       this.mode === 'dark' ? this.mode = 'light' : this.mode = 'dark'
      }
    }
  }
</script>


<style >

</style>
