<template>
  <div class="apple" :class="mode">
    
    <div class="sidebar fixed left-0 rounded-r-2xl" style="z-index:1;">
      <div class="logo-holder rounded-r-2xl">
        <img class="mx-auto" src="./assets/images/logo.svg" alt="sidepanel" />
      </div>
      <div class="navHolders ">
        <DarkModeButton :mode="mode" class="md:border-b border-r border-gray-700" @nightMode="nightMode"/>
        <div @click="openProfile" class="avatar cursor-pointer">
          <img class="mx-auto rounded-full w-10" src="https://images.pexels.com/photos/371168/pexels-photo-371168.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb" alt="sideArrow" />
        </div>
      </div>
    </div>

    <div class="main spartan">
      <Invoice />
    </div>
   
        <div v-if="showProfile" @click.self="closeProfile" class="mamalet w-full fixed top-0 left-0 h-screen p-10 mx-auto rounded-3xl animate__animated animate__zoomInDown">
            <div class="mt-40 xl:w-4/12 md:w-6/12 sm:w-8/12 w-11/12 mx-auto">
            <img class="mx-auto rounded-full w-40" src="https://images.pexels.com/photos/371168/pexels-photo-371168.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb" alt="sideArrow" />
            <h1 class="text-3xl py-4 text-center">Emcodes</h1>
            <div class="mx-auto text-center w-5/12">
             <div class="flex items-center hover:text-yellow-600 gap-5"><a class="pb-2" href="https://twitter.com/Emmy31087589">Connect with me</a><img class="w-4" src="./assets/images/icon-external-link.svg" alt="link" /></div>
             <div class="flex items-center hover:text-yellow-600 gap-5"><a href="https://github.com/Em-codes/invoice-app">Github Repo</a><img class="w-4" src="./assets/images/icon-external-link.svg" alt="link" /></div>
             </div>
            </div>
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
        mode: '',
        showProfile:false

      }
    },

    beforeMount() {
      this.currentmode = localStorage.getItem('mode')
      this.mode = this.currentmode
    },

    methods: {
     nightMode() {
       this.mode === 'dark' ? this.mode = 'light' : this.mode = 'dark'
       localStorage.setItem('mode', this.mode)
    
      },

      closeProfile() {
      this.showProfile = false
      },
      openProfile() {
       this.showProfile = !this.showProfile
      }
    },
   
  }
</script>


<style >
.mamalet{
  background: rgba(0, 0, 0, 0.671);
  color:white
}
</style>
