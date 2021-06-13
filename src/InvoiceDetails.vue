<template>
<div class="apple h-full">
     <div class="sidebar fixed left-0 top-0 px rounded-r-2xl h-screen" style="z-index:9;">
                <div class="logo-holder w-full py-10 rounded-r-2xl">
                    <img class="mx-auto" src="./assets/images/logo.svg" alt="sidepanel" />
                </div>
             <DarkModeButton :mode="mode"  @nightMode="nightModeToggle"/>
     </div>


  <div class="w-5/12 mx-auto">
        <button class="py-3 mt-12 rounded-2xl px-6"><router-link class="flex items-center gap-4" to="/">
            <img class="mx-auto" src="./assets/images/icon-arrow-left.svg" alt="sideArrow" />
            <p class="text-black">Go Back</p>
        </router-link></button>

        <div class="flex justify-between items-center invoice-inherit">
            <div class="flex gap-5 items-center">
                <h1>Status</h1>
                <div class="relative flex">
                        <div class="myStatus w-28 h-9 text-center border-none rounded py-2 opacity-50 border px-3 " :class="{'status': invoice.status}">
                        </div>
                        <div class="absolute top-2 left-5 flex gap-1 items-center">
                            <p class="myStatus rounded-full w-2 h-2" :class="{'status': invoice.status}"></p>
                            <h1 class="font-bold myStatu" :class="{'statu': invoice.status}">{{ invoice.statusText }}</h1>
                        </div>
                </div>
            </div>
            <div>
                <button @click="editInvoice" class="discard-button focus:outline-none rounded-2xl text-white py-3 px-6">Edit</button>
                <button @click="deleteInvoice" class="delete-button focus:outline-none mx-6 rounded-2xl text-white py-3 px-6">Delete</button>
                <button v-if="invoice.showMarkBtn" @click="markAsPaid(invoice)" class="save-button focus:outline-none rounded-2xl text-white py-3 px-6">Mark as Paid</button>
            </div>
        </div>

        <div v-if="invoice" class="invoice-inherit2 openColor">
            <div class="">
            <div class="flex justify-between items-start">
                <div class="openColor">
                    <p class="thickHeaders"><span class="text-gray-600">#</span>{{ id }}</p>
                    <p>{{ invoice.description }}</p>
                </div>
                <div class="text-right">
                    <p>{{ invoice.streetAddress }}</p>
                    <p>{{ invoice.city }}</p>
                    <p>{{ invoice.postCode }}</p>
                    <p>{{ invoice.country }}</p>
                </div>
            </div>

            <div class="grid grid-cols-3 py-12">
                <div>
                    <p class="billTops">Invoice Date</p>
                    <p class="thickHeaders">{{ invoice.invoiceDate }}</p>
                    
                    <p clais="billTops">Payment Due</p>
                    <p  class="thickHeaders">{{ invoice.paymentTerms}}</p>
                </div>

                <div>
                    <p clais="billTops">Bill To</p>
                    <p class="thickHeaders">{{ invoice.clientName }}</p>
                    <p>{{ invoice.clientStreetAddress }}</p>
                    <p>{{ invoice.clientCity }}</p>
                    <p>{{ invoice.clientPostCode }}</p>
                    <p>{{ invoice.clientCountry }}</p>

                </div>
                <div>
                    <p clais="billTops">Sent To</p>
                    <p class="thickHeaders">{{ invoice.clientEmail }}</p>

                </div>
            </div>

            <div style="background:#F9FAFE;" class=" rounded-2xl">
                <div class="pt-8 pl-8">
                <div class="grid grid-cols-8 w-full">
                    <p class="billTops col-span-3">Item Name</p>
                    <p class="billTops col-span-2">QTY.</p>
                    <p class="billTops col-span-2">Price</p>
                    <p class="billTops col-span-1">Total</p>
                </div>

                <div v-for="(addItems, index) in invoice.addItems" :key="index" class="grid grid-cols-8 w-full py-4">
                    <p class="billTops col-span-3">{{ addItems.itemname }}</p>
                    <p class="billTops col-span-2">{{ addItems.quantity }}</p>
                    <p class="billTops col-span-2">{{ addItems.price }}</p>
                    <p class="col-span-1">&#163;{{ invoice.total }}</p>
                </div>
                </div>

                <div style="background:#1E2139;" class="rounded-b-2xl">
                    <div class="p-8 flex justify-between items-center ">
                        <p class="text-lg text-gray-100">Amount Due</p>
                        <p class="text-3xl font-bold text-white">&#163;{{ invoice.total }}</p>
                    </div>
                </div>
            </div>

          </div>
        </div>
        
        <div v-else>
            Loading....
        </div>
  </div>



     






    <div v-if="showModalEdit">
    <div class="backdrop" @click.self="closeModalEdit">
    <div class="absolute modalEdit top-0 left-0 w-6/12 animative spartan h-screen rounded-r-2xl">

          
            <h1 class="py-10 w-9/12 pl-6 mx-auto text-2xl font-semibold">Edit #{{ id }}</h1>

                <form @submit.prevent="saveChanges" class="mx-4 ">
                  <div class="form-holder w-9/12 pl-6 mx-auto overflow-y-scroll">
                    <h2 class="text-sm font-bold mini-headers pb-6">Bill from</h2>

                    <label class="text-sm">Street Address</label>
                    <input v-model="invoice.streetAddress" type="text" class="input-group">

                    <div class="flex justify-between gap-4 mt-5">
                        <div>
                            <label class="text-sm">City</label>
                            <input v-model="invoice.city" type="text" class="input-group">
                        </div>
                        <div>
                            <label class="text-sm">Postcode</label>
                            <input v-model="invoice.postCode" type="text" class="input-group">
                        </div>
                        <div>
                            <label class="text-sm">Country</label>
                            <input v-model="invoice.country" type="text" class="input-group">
                        </div>
                    </div>
                        <!--from-->
                        <h2 class="mt-8 text-sm font-bold mini-headers pb-6">Bill from</h2>

                        <label class="text-sm">Client's Name</label>
                        <input v-model="invoice.clientName" type="text" class="input-group">

                        <div class="py-4">
                            <label class="text-sm pt-4">Client's Email</label>
                            <input v-model="invoice.clientEmail" type="text" class="input-group mb-4">
                        </div>

                        <label class="text-sm">Street Address</label>
                        <input v-model="invoice.clientStreetAddress" type="text" class="input-group">

                        <div class="flex justify-between gap-4 mt-5">
                            <div>
                                <label class="text-sm">City</label>
                                <input v-model="invoice.clientCity" type="text" class="input-group">
                            </div>
                            <div>
                                <label class="text-sm">Postcode</label>
                                <input v-model="invoice.clientPostCode" type="text" class="input-group">
                            </div>
                            <div>
                                <label class="text-sm">Country</label>
                                <input v-model="invoice.clientCountry" type="text" class="input-group">
                            </div>
                    </div>

                        <div class="flex justify-between gap-4 mt-5">
                            <div>
                                <label class="text-sm">Invoice Date</label>
                                <input v-model="invoice.invoiceDate" type="date" class="input-group">
                            </div>
                            <div>
                                <label class="text-sm">Payment Terms</label>
                                <select v-model="invoice.paymentTerms" type="text" class="input-group">
                                <option value="Net 1 Day">Net 1 Day</option>
                                <option value="Net 7 Days">Net 7 Days</option>
                                <option value="Net 21 Days">Net 21 Days</option>
                                <option value="Net 30 Days">Net 30 Days</option>
                                </select>
                            </div>

                    </div>

                            <div class="py-6">
                                <label class="text-sm">Description</label>
                                <input v-model="invoice.description" type="text" class="input-group " placeholder="eg:crypto vendor services">
                            </div>

                            <h1 class="text-gray-400 font-bold py-5 text-xl">items List</h1>

                           <AddItem :addItems="invoice.addItems"/>

                            
                 </div>      

                    <div class="flex justify-between mt-10 w-8/12 mx-auto">
                        <div>
                            <button @click="closeModalEdi" class="discard-button py-4 px-4 text-center rounded-2xl text-xs font-bold focus:outline-none text-white">Cancel</button>
                        </div>

                        <div>
                            <button type="submit"  class="save-button py-4 px-4 text-center rounded-2xl text-xs font-bold focus:outline-none text-white">Save Changes</button>
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
     props: ['id',],

    components: {
        DarkModeButton,
        AddItem,
    },

     data() {
         return {
             invoice: {
            
             },
            showModalEdit: false,
            mode: "light",
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
        closeModalEdi() {
            this.showModalEdit = !this.showModalEdit 
        },


        markAsPaid(invoice) {
            invoice.status = true
            this.invoice.showMarkBtn = false
            this.invoice.statusText = "Paid"
          
              fetch('http://localhost:3000/invoices/' + this.id, {
                method: 'PATCH',headers: {'Accept': 'application/json, text/plain, */*','Content-Type': 'application/json'},body: JSON.stringify(this.invoice)}).then(res => {return res.json();}).then(data => {})
        },

        nightModeToggle() {
        this.mode === 'dark' ? this.mode = 'light' : this.mode = 'dark'
        },

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

    },



 }

</script>
<style>
.myStatus{
     background: rgba(238, 184, 7, 0.473);
     color:rgb(248, 133, 2);
}
.myStatus.status{
    background: rgba(178, 248, 207, 0.733);
    color:rgb(5, 146, 12);
}


 .modalEdit{
     background: #fff;
 }
 .dark .modalEdit{
     background: #000;
 }
 .invoice-inherit{
    background: white;
    margin:15px 0px;
    padding: 25px;
    font-size: 13px;
    font-weight: 400;
    box-shadow: rgb(72 84 159 / 10%) 0px 10px 10px -10px;;
    border-radius: 5px;
}
 .invoice-inherit2{
    background: white;
    margin:15px 0px;
    padding: 25px;
    font-size: 13px;
    font-weight: 400;
    box-shadow: rgb(72 84 159 / 10%) 0px 10px 10px -10px;;
    border-radius: 5px;
}

.billTops{
    color:rgb(76, 100, 114);
    font-size: 14px;
}
.thickHeaders{
    color:rgb(12, 1, 34);
    font-size: 19px;
    font-weight: 700;
}
.openColor{
    color: #888EB0;
}
  .animative {
    animation: slide linear 0.3s;
  }
  @keyframes slide {
    from{
      width:0;
      transform:  translateX(-200px);
    }
    to{
      width: 50%;
      transition: all 500ms;
    }
  }

</style>