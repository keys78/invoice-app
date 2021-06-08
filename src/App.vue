<template>
  <div class="bg-gray-200">
    
      <div v-if="showModal" class="animate">
      <Modal @close="toggleModal"/>
      </div>
 

    <div class="sidebar fixed left-0 px rounded-r-2xl h-screen">
      <div class="logo-holder w-full py-10 rounded-r-2xl">
        <img class="mx-auto" src="./assets/images/logo.svg" alt="sidepanel" />
      </div>
    </div>

      <div class="main w-6/12 h-screen mx-auto border border-current">

        <div class="flex justify-between">

          <div class="text-3xl font-bold">Invoice</div>

          <button @click="toggleModal" class="flex gap-5 rounded-2xl ">
            <img src="./assets/images/icon-plus.svg" alt="plus-icon" />
            <Button text="New Invoice" class=""/>
          </button>

        </div>
   
      </div>

  </div>
</template>


<script >
import Modal from './Modal.vue'
import Button from './components/Button.vue'

  export default {
    name: 'App',
    components: {
      Modal,
      Button
    },
    data() {
      return {
        showModal: true,
      }
    },
    methods: {
      toggleModal() {
        this.showModal = !this.showModal
      }
    }
  }
</script>


<style >
  .spartan{
    font-family: 'Spartan', sans-serif;
  }
  .sidebar{
    background: #373b53;
    width: 100px;
  }
  .logo-holder{
    background: #7c5dfa;
  }
  
  .animate{
    animation: slide linear 0.3s;
  }
  @keyframes slide {
    from{
      width:0;
      transform:  translateX(-200px);
    }
    to{
      width: 100%;
      transition: all 500ms;
    }
  }
</style>
