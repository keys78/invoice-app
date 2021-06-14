<template>
<div>
    <div @click="statusToggle" class="w-3/12">
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
    <div class="absolute w-3/12 rounded pl-6 pt-3 bg-white shadow spartan">
        <div>
            <input  type="checkbox" name="status" v-model="paid"/>
            <label class="font-bold text-xs pl-3" for="Paid">Paid</label>
        </div>
        <div class="py-2">
            <input type="checkbox" name="status" v-model="unpaid"/>
            <label class="font-bold text-xs pl-3" for="Pending">Pending</label>
        </div>
        <div>
            <input type="checkbox" name="status"/>
            <label class="font-bold text-xs pl-3" for="Draft">Draft</label>
        </div>
    </div>
    </div>



    <div v-if="invoices.length">
        <span>{{ invoices.length}}</span>
        <div v-for="invoice in filteredInvoices" :key="invoice.id" class="invoice">
            <router-link :to="{name: 'InvoiceDetails', params: { id: invoice.id }}">
            <div class="grid grid-cols-12 items-center">
                <h1 class="col-span-2"><span class="text-sm font-bold">#</span><span class="id-style">{{ invoice.id }}</span></h1>
                <h1 class="col-span-2">Due{{invoice.invoiceDate}}</h1>
                <h1 class="col-span-3">{{ invoice.clientName }}</h1>
                <h1 id="newData" class="col-span-2 font-bold">&#163;</h1>

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
        Loading....
    </div>
            <p class="pb-96"></p>
</div>
</template>

<script>
import InvoiceDetails from './InvoiceDetails.vue'

 export default {
     props:['sumOfTotals'],
     name:'Invoice',
     components: {
        InvoiceDetails,

     },
     data() {
         return {
             invoices: [],
            //  invoice:[{
            //      addItems:{
            //         //  subTotal:'',
            //      }
            //  }],
             statusBar: false,
            paid: false,
            unpaid: false,
            
         }
     },
      mounted() {

             fetch('http://localhost:3000/invoices') 
            .then(res => {
                return res.json();
                })
            .then(data => {
            this.invoices = data
            
            });
            
    },
    updated() {
            const myLog = document.querySelector('#newData');
            const total = localStorage.getItem('myTotal');
            myLog.appendChild(document.createTextNode(total));
    },

    methods: {
        statusToggle(){
             this.statusBar = !this.statusBar
      },
    },
    computed: {
       filteredInvoices() {
           if(this.paid) {
               return this.invoices.filter((invoice) => invoice.status)
           } 
           if(this.unpaid) {
                return this.invoices.filter((invoice) => !invoice.status)
           }
           else
           return this.invoices
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
</style>