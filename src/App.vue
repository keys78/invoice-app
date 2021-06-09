<template>
  <div>
    <router-view/>
  </div>
</template>


<script >
import Modal from './Modal.vue'
import Button from './components/Button.vue'
import Invoice from './Invoice.vue'

  export default {
    name: 'App',
    components: {
      Modal,
      Button,
      Invoice
    },
    data() {
      return {
        showModal: false,
      }
    },
    methods: {
      toggleModal() {
        this.showModal = !this.showModal
      },
      statusToggle(){
        console.log('Yes')
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
