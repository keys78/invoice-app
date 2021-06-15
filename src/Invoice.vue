<template>
<div>
    <div>
        <div v-if="showModal" class="animate">
        <Modal :mode="mode" @close="toggleModal" />
        </div>

    </div>

    <div class="w-6/12 mx-auto pt-16">
        <div class="flex justify-between items-center pb-10">

            <div class="titleHolder">
                <h1 class="text-3xl font-bold pb-1 tracking-wide">Invoices</h1>
                <p class="text-sm">There are total of <span class="text-semibold">{{ invoices.length}}</span> Invoice(s)</p>
            </div>

            <div class="statusHolder">

                <div @click="statusToggle" class="">
                    <div v-if="!statusBar" class="flex gap-4 items-center cursor-pointer">
                        <p class="text-sm font-bold">Filter by status</p>
                        <img class="mx-auto" src="./assets/images/icon-arrow-down.svg" alt="sideArrow" />
                    </div>
                    <div v-if="statusBar" class="flex gap-4 items-center cursor-pointer">
                        <p class="text-sm font-bold">Filter by status</p>
                        <img class="mx-auto" src="./assets/images/icon-arrow-right.svg" alt="sideArrow" />
                    </div>
                </div>

                <div v-if="statusBar" class="relative statusDrop">
                    <div class="absolute rounded pl-6 pt-3 bg-white px-8 shadow spartan">
                            <div>
                                <input  type="checkbox" name="status" v-model="paid"/>
                                <label class="font-bold text-xs pl-3" for="Paid">Paid</label>
                            </div>
                            <div class="py-2">
                                <input type="checkbox" name="status" v-model="unpaid"/>
                                <label class="font-bold text-xs pl-3" for="Pending">Pending</label>
                            </div>
                    </div>
                </div>
                
            </div>



            <div @click="toggleModal" class="flex save-button gap-2 px-1 py-2 w-2/12 rounded-3xl items-center justify-center">
                <h1 class="p-2 rounded-full bg-white"><img src="./assets/images/icon-plus.svg" alt="plus-icon" /></h1>
                <Button text="New Invoice" class="border-none text-white text-xs font-bold"/>
            </div>

        </div>




        <div v-if="invoices.length">
            <div v-for="invoice in filteredInvoices" :key="invoice.id" class="invoice">
                <router-link :to="{name: 'InvoiceDetails', params: { id: invoice.id }}">
                <div class="grid grid-cols-12 items-center">
                    <h1 class="col-span-2"><span class="text-sm font-bold">#</span><span class="id-style">{{ invoice.id }}</span></h1>
                    <h1 class="col-span-2">Due {{invoice.invoiceDate}}</h1>
                    <h1 class="col-span-3 text-center">{{ invoice.clientName }}</h1>
                    <h1 class="col-span-2"> 
                        <span class="flex items-center">
                            <p class="pr-2">&#163;</p>
                            <i class="fas fa-asterisk"></i>
                            <i class="fas fa-asterisk"></i>
                            <i class="fas fa-asterisk"></i>
                            <i class="fas fa-asterisk"></i>
                            <i class="fas fa-asterisk"></i>
                            <i class="fas fa-asterisk"></i>
                        </span>
                    </h1>
                    
                    <div class="relative flex col-span-2">
                        <div class="myStatus w-28 h-9 text-center border-none rounded py-3 opacity-50 border px-3 " :class="{'status': invoice.status}">
                        </div>
                        <div class="absolute top-2 left-5 flex gap-1 items-center">
                            <p class="myStatus rounded-full w-2 h-2" :class="{'status': invoice.status}"></p>
                            <h1 class="font-bold myStatu" :class="{'statu': invoice.status}">{{ invoice.statusText }}</h1>
                        </div>
                    </div>
                    <img class="col-span-1" src="./assets/images/icon-arrow-right.svg" alt="sideArrow" />
                </div>
                </router-link>
            </div>
        </div>

        <div v-else>
            <p>Loading Invoice.....</p>
            <img class="h-40 -mt-16" src="https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif" alt="loadre">
            <div v-if="noInvoice" class="text-center">
                <img class="mx-auto" src="./assets/images/illustration-empty.svg" alt="sideArrow" />
                <h1 class="font-bold text-xl pt-8">There is nothing here</h1>
                <p class="invoice-inherit bg-transparent">Create an invoice by clicking the New button and get started.</p>
            </div>
        </div>
        
        <p class="py-72"></p>
    </div>
</div>
</template>

<script>
import InvoiceDetails from './InvoiceDetails.vue'
import Modal from './Modal.vue'
import Button from './components/Button.vue'

 export default {
     name:'Invoice',
     components: {
        InvoiceDetails,
        Modal,
        Button,
     },

     data() {
         return {
            invoices: [],
            statusBar: false,
            paid: false,
            unpaid: false,
            noInvoice: false,
            showModal: false
            
         }
     },
      mounted() {

        fetch('http://localhost:3000/invoices') 
        .then(res => {return res.json();})
        .then(data => {this.invoices = data})
        .catch((err) => {this.errMsg = "e don burst"}) 
        this.invoices.length > 0 ? this.noInvoice = false : this.noInvoice = true
    },

    methods: {
        toggleModal() {this.showModal = !this.showModal},
        statusToggle(){this.statusBar = !this.statusBar},
    },

    computed: {
       filteredInvoices() {
           if(this.paid) {return this.invoices.filter((invoice) => invoice.status)} 
           if(this.unpaid) {return this.invoices.filter((invoice) => !invoice.status)}
           else return this.invoices
        },  

    }
    
 }

</script>

<style>
.invoice{
    background: white;
    margin:10px 0px;
    padding: 17px 0px;
    padding-right:10px;
    padding-left:25px;
    font-size: 13px;
    font-weight: 400;
    color:#666ea0;
    border-radius: 5px;
    transition: background 0.5s ease-in-out;
    transition: 0.2s linear;
}
.invoice:hover{
   margin-left:-20px;
   transition: linear 0.2s;
}
.dark .invoice{
    background:#1E2139;
    color:#DFE3FA;
    transition: 0.2s linear;
    transition: background 0.5s ease-in-out;
}
.dark .invoice:hover{
   margin-left:-20px;
   transition: linear 0.2s;
}

.myStatu{
    color:rgb(255, 153, 0);
}
.statu{
    color:rgb(20, 184, 20);
}
.id-style{
    font-weight: 700;
}
.statusDrop{
    background: #fff;
}
.dark .statusDrop {
    background: #000;
}
.fa-asterisk{
    font-size: 8px;
}
</style>