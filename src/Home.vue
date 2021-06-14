<template>
  <div class="apple" :class="mode">
    
      <div v-if="showModal" class="animate">
      <Modal :mode="mode" @close="toggleModal" />
      </div>
 

    <div class="sidebar fixed left-0 px rounded-r-2xl h-screen">
      <div class="logo-holder w-full py-10 rounded-r-2xl">
        <img class="mx-auto" src="./assets/images/logo.svg" alt="sidepanel" />
      </div>
      <DarkModeButton :mode="mode"  @nightMode="nightModeToggle"/>
    </div>

      <div class="main spartan xl:w-6/12 w-8/12 mx-auto pt-16">
        <!--top-->
        <div class="flex justify-between items-center">

          <div >
            <h1 class="text-4xl font-bold pb-1 tracking-wide">Invoices</h1>
            <p class="text-xs">There are Total of 0 Invoices</p>
          </div>

          <!-- <div class="w-6/12 flex justify-between"> -->

              <!-- <div @click="statusToggle" class="flex gap-4 items-center cursor-pointer">
                <p class="text-sm font-bold">Filter by status</p>
                <img class="mx-auto" src="./assets/images/icon-arrow-down.svg" alt="sideArrow" />
              </div> -->

              <div @click="toggleModal" class="flex save-button gap-2 px-1 py-2 w-2/12 rounded-3xl items-center justify-center">
                <h1 class="p-2 rounded-full bg-white"><img src="./assets/images/icon-plus.svg" alt="plus-icon" /></h1>
                <Button text="New Invoice" class="border-none text-white text-xs font-bold"/>
              </div>

          <!-- </div> -->
        </div>

            <Invoice />

      </div>

  </div>
</template>


<script >
import Modal from './Modal.vue'
import Button from './components/Button.vue'
import DarkModeButton from './components/DarkModeButton.vue'
import Invoice from './Invoice.vue'

  export default {
    name: 'App',
    components: {
      Modal,
      Button,
      Invoice,
      DarkModeButton
    },
    data() {
      return {
        showModal: false,
        mode: 'light'
      }
    },
    methods: {
      toggleModal() {
        this.showModal = !this.showModal
      },
      // statusToggle(){
      //   console.log('Yes')
      // },
    
     nightModeToggle() {
       this.mode === 'dark' ? this.mode = 'light' : this.mode = 'dark'
      }
    }
  }
</script>


<style >
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
  .spartan{
    font-family: 'Spartan', sans-serif;
  }
  .sidebar{
    background: #1E2139;
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
      width: 50%;
      transition: all 500ms;
    }
  }

  .apple{
    /* background:rgb(154, 219, 245); */
    background:rgb(247, 247, 250);;
    background-size:cover;
    transition: background 0.5s ease-in-out;
  }
  .dark{
    background: rgb(20, 22, 37);
    color:white;
    transition: background 0.5s ease-in-out;
  }
</style>
