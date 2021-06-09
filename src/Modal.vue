<template>
    <div class="backdrop" @click.self="closeModal">
        <div class="modal w-6/12 bg-white spartan h-screen rounded-r-2xl">
            <h1 class="py-10 w-9/12 pl-6 mx-auto text-2xl font-semibold">Create Invoice</h1>

            <div class="form-holder w-9/12 pl-6 mx-auto overflow-y-scroll">
                <form action="mx-4">
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
                            <input type="text" class="input-group mb-4">
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
                          
                </form>
               
            </div>

            <div class="flex justify-between mt-10 w-8/12 mx-auto">
                <div class="">
                    <button @click="closeModal" class="discard-button py-4 px-4 text-center rounded-2xl text-xs font-bold focus:outline-none text-white">Discard</button>
                </div>

                <div class="flex gap-4">
                     <div class="">
                        <button class="draft-button py-4 px-4 text-center rounded-2xl text-xs font-bold focus:outline-none bg-black text-white">Save as Draft</button>
                    </div>

                    <div class="">
                        <button class="save-button py-4 px-4 text-center rounded-2xl text-xs font-bold focus:outline-none text-white">Send & Save</button>
                    </div>

                </div>

            </div>

        </div>

    </div>
</template>

<script>
import AddItem from './components/AddItem.vue'


export default {

    name: 'Modal',
    components:{
        AddItem,
    },

    methods: {
        closeModal() {
            this.$emit('close')
        },

        
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
</style>