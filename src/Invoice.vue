<template>
<div>
    <div @click="statusToggle" class="flex gap-4 items-center cursor-pointer">
        <div v-if="!statusBar">
            <p class="text-sm font-bold">Filter by status</p>
            <img class="mx-auto" src="./assets/images/icon-arrow-down.svg" alt="sideArrow" />
        </div>
        <div v-if="statusBar">
            <p class="text-sm font-bold">Filter by status</p>
            <img class="mx-auto" src="./assets/images/icon-arrow-down.svg" alt="sideArrow" />
        </div>
    </div>
    
    <div v-if="statusBar" class="w-3/12 rounded pl-6 pt-3 bg-white shadow spartan">
        <div>
            <input type="checkbox" name="status"/>
            <label class="font-bold text-xs pl-3" for="Paid">Paid</label>
        </div>
        <div class="py-2">
            <input type="checkbox" name="status"/>
            <label class="font-bold text-xs pl-3" for="Paid">Paid</label>
        </div>
        <div>
            <input type="checkbox" name="status"/>
            <label class="font-bold text-xs pl-3" for="Paid">Paid</label>
        </div>
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
             invoices: []
         }
     },
      mounted() {

             fetch('http://localhost:3000/invoices') 
            .then(res => {
                return res.json();
                })
            .then(data => {
            // console.log(data)
            this.invoices = data
            
            })
    },
    methods: {
        statusToggle(){
             console.log('Yes')
      },
    }
    
 }

</script>

<style>

</style>