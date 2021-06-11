<template>
<div class="invoiceDetails mx-auto">
  <div class="w-6/12 mx-auto">
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

    <div v-if="showModalEdit">
    <div class="backdrop" @click.self="closeModalEdit">
    <div class="fixed modal top-0 left-0 w-6/12 spartan h-screen rounded-r-2xl">
            <h1>{{ mode }}</h1>
            <h1 class="py-10 w-9/12 pl-6 mx-auto text-2xl font-semibold">Edit Invoice</h1>

                <form @submit.prevent="saveInvoice" class="mx-4 ">
                 <div class="form-holder w-9/12 pl-6 mx-auto overflow-y-scroll">
                    <h2 class="text-sm font-bold mini-headers pb-6">Bill from</h2>

                    <label class="text-sm">Street Address</label>
                    <input type="text" class="input-group">

                    <div class="flex justify-between gap-4 mt-5">
                        <div>
                            <label class="text-sm">City</label>
                            <input type="text" class="input-group">
                        </div>
                        <div>
                            <label class="text-sm">Postcode</label>
                            <input type="text" class="input-group">
                        </div>
                        <div>
                            <label class="text-sm">Country</label>
                            <input type="text" class="input-group">
                        </div>
                    </div>
                        <!--from-->
                        <h2 class="mt-8 text-sm font-bold mini-headers pb-6">Bill from</h2>

                        <label class="text-sm">Client's Name</label>
                        <input type="text" class="input-group">

                        <div class="py-4">
                            <label class="text-sm pt-4">Client's Email</label>
                            <input v-model="invoice.clientEmail" type="text" class="input-group mb-4">
                        </div>

                        <label class="text-sm">Street Address</label>
                        <input type="text" class="input-group">

                        <div class="flex justify-between gap-4 mt-5">
                            <div>
                                <label class="text-sm">City</label>
                                <input type="text" class="input-group">
                            </div>
                            <div>
                                <label class="text-sm">Postcode</label>
                                <input type="text" class="input-group">
                            </div>
                            <div>
                                <label class="text-sm">Country</label>
                                <input type="text" class="input-group">
                            </div>
                    </div>

                        <div class="flex justify-between gap-4 mt-5">
                            <div>
                                <label class="text-sm">Invoice Date</label>
                                <input type="date" class="input-group">
                            </div>
                            <div>
                                <label class="text-sm">Payment Terms</label>
                                <select type="text" class="input-group">
                                <option value="Net 1 Day">Net 1 Day</option>
                                <option value="Net 7 Days">Net 7 Days</option>
                                <option value="Net 21 Days">Net 21 Days</option>
                                <option value="Net 30 Days">Net 30 Days</option>
                                </select>
                            </div>

                    </div>

                            <div class="py-6">
                                <label class="text-sm">Description</label>
                                <input type="text" class="input-group " placeholder="eg:crypto vendor services">
                            </div>

                            <h1 class="text-gray-400 font-bold py-5 text-xl">items List</h1>

                           <AddItem />

                            
                 </div>      

                    <div class="flex justify-between mt-10 w-8/12 mx-auto">
                        <div>
                            <button class="discard-button py-4 px-4 text-center rounded-2xl text-xs font-bold focus:outline-none text-white">Discard</button>
                        </div>

                        <div>
                            <button type="submit"  class="save-button py-4 px-4 text-center rounded-2xl text-xs font-bold focus:outline-none text-white">Send & Save</button>
                        </div>

                    </div>


                </form>
               

            

        </div>
    </div>
  </div>




    
</div>
</template>

<script>
import DarkModeButton from './components/DarkModeButton.vue'
import AddItem from './components/AddItem.vue'

 export default {
     props: ['id','mode'],

    components: {
        DarkModeButton,
        AddItem
    },

     data() {
         return {
             invoice: {
               clientEmail:'',
             },
            showMarkBtn: true,
            showModalEdit: false
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
       this.showModalEdit = !this.showModalEdit
        },
        closeModalEdit() {
            this.showModalEdit = !this.showModalEdit 
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