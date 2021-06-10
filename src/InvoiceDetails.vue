<template>
<div class="p-40">
    
    <button @click="deleteInvoice" class="draft-button text-white m-20">Delete</button>
    <!-- <button @click="editInvoice" class="draft-button text-white m-20">Edit</button> -->
    <router-link to="/"><button class="draft-button text-white mt-10">Back</button></router-link>
    <div v-if="invoice">

        <h1>{{invoice.clientEmail}}</h1>
        <p>{{id}}</p>
        <p>{{ invoice.status }}</p>
        <div class="flex gap-6 mt-">
            <div class="py-3 border px-6" :class="{status: invoice.pending}">pending</div>
            <button @click="markAsPaid(invoice)" class="save-button">Mark as Paid</button>
        </div>

        <form @submit.prevent="saveChanges">
        <input type="text" v-model="invoice.clientEmail" class="border border-black py-2 w-full"/>
        <button  class="draft-button py-2 px-4 text-white m-20">save</button>
        </form>
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
             invoice: {
               clientEmail:'',
             }
         }
     },
     mounted() {

             fetch('http://localhost:3000/invoices/' + this.id) 
            .then(res => {
                return res.json();
                })
            .then(data => {
            // console.log(data)
            this.invoice = data
            
            })
    },

    methods: {
    deleteInvoice() {
 
            fetch('http://localhost:3000/invoices/' + this.id, {
                method: 'DELETE',
                headers: {'Accept': 'application/json, text/plain, */*','Content-Type': 'application/json'},
                body: JSON.stringify(this.invoice)
            })
           .then(res => {return res.json();})
            .then(data => {
                // console.log(data)
                 this.$router.push({ name: 'Home' })
            })
       .catch(() => {
        })

        },

    // editInvoice() {
 
    //         fetch('http://localhost:3000/invoices/' + this.id, {
    //             method: 'PUT',
    //             headers: {'Accept': 'application/json, text/plain, */*','Content-Type': 'application/json'},
    //             body: JSON.stringify(this.invoice)
    //         })
    //        .then(res => {return res.json();})
    //         .then(data => {
    //             console.log(data)
    //             // this.invoice.clientEmail = data.clientEmail
    //         })
    //    .catch(() => {
    //     })

    //     },

        saveChanges() {
             fetch('http://localhost:3000/invoices/' + this.id, {
                method: 'PATCH',
                headers: {'Accept': 'application/json, text/plain, */*','Content-Type': 'application/json'},
                body: JSON.stringify(this.invoice)
            })
           .then(res => {return res.json();})
            .then(data => {
                console.log(data)
                // this.invoice = data
                 
            })
       .catch(() => {
        })
        }

    }



 }

</script>