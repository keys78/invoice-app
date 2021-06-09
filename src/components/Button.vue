<template>
    <button class="myBtn spartan">
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