<template lang="html">
    <div :class="$style.index">
        <as/>
        <asd/>
        <novice/>
        <borrow/>
        <money/>
        <product/>
        <life/>
        <foas/>
        <nas/>
    </div>
</template>

<script>
import header from '../public/header'
import footer from '../public/footer'
import navbar from '../public/navbar'
import hslider from  './hslider'
import novice from './novice'
import borrow from './borrow'
import money from './money'
import product from './product'
import life from './life'

export default {
    components:{
        as:header,
        asd:hslider,
        foas:footer,
        nas:navbar,
        novice,
        borrow,
        money,
        product,
        life,


    }
}
</script>

<style lang="scss" module>
    .index{
        background-color:#EDEDED;
    }

</style>
