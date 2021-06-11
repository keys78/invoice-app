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

    <div v-if="statusBar" class="w-3/12 rounded pl-6 pt-3 bg-white shadow spartan">
        <div>
            <input  type="checkbox" name="status" v-model="paid"/>
            <label class="font-bold text-xs pl-3" for="Paid">Paid</label>
        </div>
        <div class="py-2">
            <input type="checkbox" name="status" v-model="unpaid"/>
            <label class="font-bold text-xs pl-3" for="Pending">Pending</label>
        </div>
        <!--<div>
            <input type="checkbox" name="status"/>
            <label class="font-bold text-xs pl-3" for="Draft">Draft</label>
        </div> -->
    </div>



    <div v-if="invoices.length">
        <div v-for="invoice in filteredInvoices" :key="invoice.id" class="invoice">
            <router-link :to="{name: 'InvoiceDetails', params: { id: invoice.id }}">
            <div class="flex gap-5">
                <h1>#{{ invoice.id }}</h1>
                <h1>{{ invoice.clientEmail }}</h1>
                <div class="myStatus py-3 border px-6" :class="{'status': invoice.status}">{{ invoice.statusText }}</div>
                
            </div>
            </router-link>
        </div>
    </div>

     <div v-else>
        Loading....
    </div>

</div>
</template>

<script>
 export default {
     name:'Invoice',
     data() {
         return {
             invoices: [],
             statusBar: false,
            paid: false,
            unpaid: false
         }
     },
      mounted() {

             fetch('http://localhost:3000/invoices') 
            .then(res => {
                return res.json();
                })
            .then(data => {
            this.invoices = data
            
            })
    },
    methods: {
        statusToggle(){
             this.statusBar = !this.statusBar
      },
    },
    computed: {
       filteredInvoices() {
           if(this.paid) {
            //    this.unpaid = false
               return this.invoices.filter((invoice) => invoice.status)
           } 
           if(this.unpaid) {
                // this.paid = false
                return this.invoices.filter((invoice) => !invoice.status)
           }
           else
           return this.invoices
        }
    }
    
 }

</script>

<style>

</style>