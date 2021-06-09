<template>
<div class="p-40">
    <div v-if="invoice">

        <h1>{{invoice.clientEmail}}</h1>
        <p>{{id}}</p>
        <p>{{ invoice.status }}</p>
    </div>

    <div v-else>
        Loading....
    </div>
    
</div>
</template>

<script>
 export default {
     props: ['id'],
     data() {
         return {
             invoice: null
         }
     },
     mounted() {

             fetch('http://localhost:3000/invoices/' + this.id) 
            .then(res => {
                return res.json();
                })
            .then(data => {
            console.log(data)
            this.invoice = data
            
            })
    },





 }
//  <router-link to="/"><p>Back</p></router-link>
</script>