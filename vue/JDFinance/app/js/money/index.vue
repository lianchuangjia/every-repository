<template lang="html">
    <div :class="$style.index">
        <as/>
        <mslider/>
        <ada/>
        <money/>
        <adb/>
        <finance/>
        <adc/>
        <fter :cname="$style.mfooter"/>
        <nas/>
    </div>
</template>

<script>
    import header from '../public/header'
    import navbar from '../public/navbar'
    import footer from '../public/footer'
    import mslider from './mslider'
    import money from './money'
    import ada from './ada'
    import adb from './ada'
    import finance from './finance'
    import adc from './adc'


    export default {
        components:{
            as:header,
            nas:navbar,
            mslider,
            ada,
            money,
            adb,
           fter:footer,
            finance,
            adc



        }
    }
</script>


<style lang="scss" module>
    .index{
        background-color:#EDEDED;
    }
    .mfooter{
        margin-top: 0!important;//上边距为0 ，强
        ul{
            li:first-child{
                display: none;
            }
        }
    }


</style>
