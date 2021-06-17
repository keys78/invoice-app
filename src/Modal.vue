<template>
    <div class="backdrop " @click.self="$emit('close')">
        
        <div class="modal xl:w-6/12 w-8/12 spartan rounded-r-2xl animate__animated animate__bounceInLeft " >
            <h1>{{ mode }}</h1>
            <h1 class="py-12 md:w-9/12 w-full pl-6 mx-auto text-2xl font-semibold">Create Invoice</h1>

                <form @submit="saveInvoice" class="mx-4">
                 <div class="form-holder md:w-9/12 w-full md:pl-6 pl-2 mx-auto overflow-y-scroll"  style="z-index:99999999999999;">
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

                    <div class="flex justify-between mt-10 md:w-8/12 w-full mx-auto">
                        <div class="">
                            <button @click.self="$emit('close')" class="discard-button py-4 sm:px-4 px-2 text-center rounded-2xl text-xs font-bold focus:outline-none text-white">Discard</button>
                        </div>

                        <div class="flex gap-4">
                            <div>
                                <button class="draft-button py-4 sm:px-4 px-2 text-center rounded-2xl text-xs font-bold focus:outline-none bg-black text-white">Save as Draft</button>
                            </div>

                            <div>
                                <button type="submit" @submit="formVal" class="save-button py-4 sm:px-4 px-2 text-center rounded-2xl text-xs font-bold focus:outline-none text-white">Send & Save</button>
                            </div>
                        </div>

                    </div>


                </form>
               

            

        </div>

    </div>
</template>

<script>
import AddItem from './components/AddItem.vue'


export default {
    props:['mode', 'sumOfTotal'],
    name: 'Modal',
    components:{
        AddItem,
    },
    data() {
        return {
            invoice: {
                id:'',
                streetAddress:'',
                city: '',
                postCode: '',
                country:'',
                clientName:'',
                clientEmail: '',
                clientStreetAddress:'',
                clientCity:'',
                clientCountry:'',
                clientPostCode:'',
                invoiceDate:'',
                description:'',
                statusText:'Pending',
                draft: 'draft',
                showMarkBtn: true,
                netTotal:'',
                 addItems:[
                    {
                        itemname: '',
                        quantity:'',
                        price:'',
                        subTotal:'',
                
                    }
            ],
                
            },
             
        }
    },


    methods: {
        saveInvoice() {
            const characters = 'ABCDEF123GHIJKLMN456OPQRSTUVWXYZ7890'
            const uniqueId = (() => { let text = '';for (let i = 0; i < 6; i++) {text += characters.charAt(Math.floor(Math.random() * characters.length));   }
            const myId = text ; this.invoice.id = myId})
            return uniqueId(),
 
            fetch('./invoices.json', {
                method: 'POST',
                headers: {'Accept': 'application/json, text/plain, */*','Content-Type': 'application/json'},
                body: JSON.stringify(this.invoice)
            })
           .then(res => {return res.json();})
            .then(data => {
                console.log(data)
                 
            })
       .catch(() => {
        })

        },
        formVal() {
            if(this.saveInvoice.input === ''){
                console.log('fill in details')
            }
        }
   
    }

    
}
</script>

<style>
.backdrop{
    width: 100%;
    height: 100%;
    position: fixed;
    top:0;
    background: rgba(0,0,0,0.4);
    animation: switch 1.5s linear;
    
}
@keyframes switch{
    from {
         background: rgba(0,0,0,0.01);
    }
    to{
         background: rgba(0,0,0,0.4);
    }
}
.input-group{
    padding:11px 7px;
    border:1px solid #d9d0ff;
    font-size: 16px;
    width: 100%;
    background: transparent;
    font-family: 'Source Serif Pro', serif;
    border-radius: 7px;
    color:#5d5386;
}
.input-group:focus{
    outline:none;
    border: 1px solid #7c5ef3;
}
::placeholder{
    color:#929596;
}
.mini-headers{
    color:#7c5dfa;
}.form-holder{
    height:500px;
}

.save-button{
     background:#7c5dfa;
     transition: 0.3s linear all;
}.save-button:hover{
    opacity: 0.7;
    transition: 0.3s linear all;

}
.draft-button{
     background:#363b53;
     transition: 0.3s linear all;
}
.draft-button:hover {
     background:#000000;
     transition: 0.3s linear all;
}
.discard-button{
    background: #f1f4fd;
    color:#7c5dfa;
     transition: 0.3s linear all;
}
.discard-button:hover{
    background: #ced7f7;
    color:#7c5dfa;
     transition: 0.3s linear all;
}
.delete-button{
    background: rgb(235, 73, 73);
    color:#f5f7ff;
     transition: 0.3s linear all;
}
.delete-button:hover{
    background: #f10e0e;
    color:#f1f4ff;
     transition: 0.3s linear all;
}
.modal{
    background: white;
    color:black;
    transition: background 0.5s ease-in-out;
}
 .dark .modal{
     background:rgb(20, 22, 37);
     color:#DFE3FA;
     transition: background 0.5s ease-in-out;
 }
 .dark .input-group{
    background: #1e2139;
    font-family: 'Source Serif Pro', serif;
    color:#DFE3FA;
    border:none;
    transition: background 0.5s ease-in-out;
}
</style>