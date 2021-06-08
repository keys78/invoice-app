<template>
  <div>

        <div v-for="(addItem, counter) in addItems" :key="counter" class="flex justify-between items-center gap-4">
            <div>
                <label class="text-sm">Item Name</label>
                <input type="text" class="input-group w-6/12" v-model="addItem.itemname">
            </div>
           <div>
                <label class="text-sm">Qty</label>
                <input type="number" class="input-group w-2/12" v-model="addItem.quantity">
            </div>
            <div>
                <label class="text-sm">Price</label>
                <input type="number" class="input-group w-4/12" v-model="addItem.price">
            </div>
            
            <div class="w-2/12">
                <label class="text-sm">Total</label>
                <input :value="addItem.quantity*addItem.price" class="px-1 py-2 focus:outline-none border-none w-9/12" >
            </div>
      
            <div class="w-2/12 cursor-pointer"  @click="deleteItem(counter)"><img class="mx-auto mt-5" src="../assets/images/icon-delete.svg" alt="plus-icon" /></div>

        </div>

    <button  @click.prevent="AddItem" class="mt-6 w-full hover:bg-gray-200 text-white rounded-2xl my-3 bg-blue-100 py-2 text-center "> + Add Items</button>

  </div>
</template>

<script>
export default {

    name: 'AddItem',
    components: {

    },

    data() {
        return {
             addItems:[
            {
                itemname: '',
                quantity:'',
                price:''
            }
            ],
            
        }
    },

    methods:{

      AddItem() {
      this.addItems.push({
        itemname: '',
        quantity:'',
        price:''
      })
      },

    deleteItem(counter){
      this.addItems.splice(counter,1);
    },

    },  
   


}

</script>