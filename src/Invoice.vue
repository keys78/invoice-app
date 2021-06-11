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

    <div v-if="statusBar" class="w-3/12 rounded pl-6 py-3 bg-white shadow spartan">
        <!-- <div>
            <input @click="paidInvoice" type="radio" name="status"/>
            <label class="font-bold text-xs pl-3" for="Paid">Paid</label>
        </div> -->
        <button v-on:click="userFilterKey = 'all'" :class="{ active: userFilterKey == 'all' }">paid</button>
        <!-- <div class="py-2">
            <input type="radio" name="status"/>
            <label class="font-bold text-xs pl-3" for="Pending">Pending</label>
        </div> -->
         <button class="pl-5" v-on:click="userFilterKey = 'nearby'" :class="{ active: userFilterKey == 'nearby' }">pending</button>
        <!-- <div>
            <input type="radio" name="status"/>
            <label class="font-bold text-xs pl-3" for="Draft">Draft</label>
        </div> -->
    </div>

     <div v-for="invoice in paidInvoice" :key="invoice.id" class="invoice">
            <router-link :to="{name: 'InvoiceDetails', params: { id: invoice.id }}">
            <div class="flex gap-5">
                <h1>#{{ invoice.id }}</h1>
                <h1>{{ invoice.clientEmail }}</h1>
                <div class="myStatus py-3 border px-6" :class="{'status': invoice.status}">{{ invoice.statusText }}</div>       
            </div>
            </router-link>
        </div>



    <div v-if="invoices.length">
        <div v-for="invoice in invoices" :key="invoice.id" class="invoice">
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
             statusBar: false
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
    //    paidInvoice() {
    //         console.log('checking')
    //         return this.invoices.filter((invoice) => invoice.status)
    //     }
    }
    
 }

</script>

<style>

</style>