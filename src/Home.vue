<template>
  <div class="apple" :class="mode">
    
      <!-- <div v-if="showModal" class="animate">
      <Modal :mode="mode" @close="toggleModal" />
      </div> -->
 

    <div class="sidebar fixed left-0 rounded-r-2xl" style="z-index:1;">
      <div class="logo-holder rounded-r-2xl">
        <img class="mx-auto" src="./assets/images/logo.svg" alt="sidepanel" />
      </div>
      <div class="navHolders ">
        <DarkModeButton :mode="mode" class="md:border-b border-r border-gray-700" @nightMode="nightModeToggle"/>
        <div class="avatar cursor-pointer">
          <img class="mx-auto rounded-full w-10" src="https://images.pexels.com/photos/371168/pexels-photo-371168.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb" alt="sideArrow" />
        </div>
      </div>
    </div>

      <div class="main spartan">
        <!--top-->
        <!-- <div class="flex justify-between items-center">

          <div >
            <h1 class="text-4xl font-bold pb-1 tracking-wide">Invoices</h1>
            <p class="text-xs">There are Total of 0 Invoices</p>
          </div> -->

          <!-- <div class="w-6/12 flex justify-between"> -->

              <!-- <div @click="statusToggle" class="flex gap-4 items-center cursor-pointer">
                <p class="text-sm font-bold">Filter by status</p>
                <img class="mx-auto" src="./assets/images/icon-arrow-down.svg" alt="sideArrow" />
              </div> -->

              <!-- <div @click="toggleModal" class="flex save-button gap-2 px-1 py-2 w-2/12 rounded-3xl items-center justify-center">
                <h1 class="p-2 rounded-full bg-white"><img src="./assets/images/icon-plus.svg" alt="plus-icon" /></h1>
                <Button text="New Invoice" class="border-none text-white text-xs font-bold"/>
              </div> -->

          <!-- </div> -->
        <!-- </div> -->

            <Invoice />

      </div>

  </div>
</template>


<script >
// import Modal from './Modal.vue'
// import Button from './components/Button.vue'
import DarkModeButton from './components/DarkModeButton.vue'
import Invoice from './Invoice.vue'

  export default {
    name: 'App',
    components: {
      // Modal,
      // Button,
      Invoice,
      DarkModeButton
    },
    data() {
      return {
        // showModal: true,
        mode: 'light'
      }
    },
    methods: {
      // toggleModal() {
      //   this.showModal = !this.showModal
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
    height:100vh;
  }
  .logo-holder{
    background: #7c5dfa;
    width: 100%;
    padding:35px;
  }
  .navHolders{
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom:40px;
  }
  .avatar{
    padding-top:25px;
    padding-left:20px;
  }
  .darkPadding{
    padding:40px;
  }
  .modal{
    height: 100vh;
  }
  
  /* .animate{
    animation: slide linear 0.3s;
  } */
  /* @keyframes slide {
    from{
      width:0;
      transform:  translateX(-200px);
    }
    to{
      width: 50%;
      transition: all 500ms;
    }
  } */

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

  @media screen and (max-width: 900px) {
 .sidebar{
    width: 100%;
    height: 86px;
    border-radius: 0px;

  }
   .logo-holder{
    width: 100px;
    padding:30px;
  }
   .navHolders{
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    right:20px;
    bottom: 0px;
  }
  .avatar{
    padding-top:5px;
  }
  .darkPadding{
    padding-bottom:30px;
  }
  .main{
    padding-top: 50px;
  }
  .modal{
    width:100%;
    padding-top:65px;
  }
  }.form-holder{
    height:410px;
}
</style>
