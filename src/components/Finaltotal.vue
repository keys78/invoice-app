<template>
<div>
        <div v-if="invoice">

                <div style="background:#1E2139;" class="rounded-b-2xl">
                    <div class="p-8 flex justify-between items-center ">
                        <p class="text-lg text-gray-100">Amount Due</p>
                        <p class="text-8xl font-bold text-white">&#163;{{ sumOfTotals }}</p>
                    </div>
                </div>
        </div>
        
        <div v-else>
            Loading....
        </div>
  </div>
</template>

<script>
// import AddItem from './components/AddItem.vue'
// import Invoice from './Invoice.vue'

 export default {
     name: 'Finaltotal',
     props: ['id',],

    components: {
        // AddItem,
        // Invoice
    },

     data() {
         return {
             invoice: {
            
             },
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
    
    
    },
   computed: {
    sumOfTotals () {
        return this.invoice.addItems.reduce((sum, addItem) => {
            return sum += addItem.subTotal;
        }, 0);
    }
}

 }

</script>