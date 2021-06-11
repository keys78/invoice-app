<template>
<div class="invoiceDetails w-6/12 mx-auto">

    <h1>{{ mode }}</h1>
    <!-- <DarkModeButton :mode="mode" @nightMode="nightModeToggle"/> -->
    <button @click="deleteInvoice" class="draft-button text-white py-2 px-4 m-20">Delete</button>
    <button @click="editInvoice" class="draft-button text-white py-2 px-4 m-20">Edit</button>
    <router-link to="/"><button class="draft-button text-white py-2 px-4 mt-10">Back</button></router-link>

    <div v-if="invoice">

        <h1>{{invoice.clientEmail}}</h1>
        <p>#{{id}}</p>
        <div class="flex gap-6 mt-4">
            <div class="myStatus py-3 border px-6" :class="{'status': invoice.status}">{{ invoice.statusText }}</div>
            <button v-if="showMarkBtn" @click="markAsPaid(invoice)" class="draft-button">Mark as Paid</button>
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
import DarkModeButton from './components/DarkModeButton.vue'

 export default {
     props: ['id','mode'],

    components: {
        DarkModeButton
    },

     data() {
         return {
             invoice: {
               clientEmail:'',
             },
            showMarkBtn: true
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

    editInvoice() {
        console.log('edit')
        },


        markAsPaid(invoice) {
            invoice.status = true
            this.showMarkBtn = false
            this.invoice.statusText = "Paid"
          
              fetch('http://localhost:3000/invoices/' + this.id, {
                method: 'PATCH',headers: {'Accept': 'application/json, text/plain, */*','Content-Type': 'application/json'},body: JSON.stringify(this.invoice)})
            .then(res => {return res.json();}).then(data => {
                this.invoice.status = true
                this.invoice.statusText = "Paid"
               console.log(data)
                 
            })
        },

    //     nightModeToggle() {
    //    this.mode === 'dark' ? this.mode = 'light' : this.mode = 'dark'
    //   },

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
<style>
.myStatus{
     background: rgb(250, 229, 191);
    color:rgb(243, 130, 0);
}
.myStatus.status{
    background: rgb(178, 248, 207);
    color:rgb(0, 92, 5);
}
.invoiceDetails{
    background: white;
    color:black;
}
 .dark .invoiceDetails{
     background: #000;
     color:blanchedalmond;
 }
</style>