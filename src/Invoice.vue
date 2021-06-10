<template>
<div>
    <div v-if="invoices.length">
        <div v-for="invoice in invoices" :key="invoice.id" class="invoice">
            <router-link :to="{name: 'InvoiceDetails', params: { id: invoice.id }}">
            <div class="flex gap-5">
                <h1>#{{ invoice.id }}</h1>
                <h1>{{ invoice.clientEmail }}</h1>
                
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
        markAsPaid(invoice) {
            this.invoice.pending = !this.invoice.pending
        }
    }
 }

</script>

<style>
.status{
    background: orange;
    color:orange;
}
</style>