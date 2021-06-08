<template>
    <button class="myBtn spartan py-2 px-3 border rounded-2x1">
        {{text}} 
    </button>
</template>

<script>
    export default {
        name: 'Button',
        props:{
            text:String,
        }
    }

</script>
<style>
.myBtn:focus{
    outline: none;
}
</style>