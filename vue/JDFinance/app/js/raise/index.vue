<template lang="html">
    <div :class="$style.index">
        <as/>
        <rslider/>
        <daily/>
        <In/>
        <More/>
        <nas/>
    </div>
</template>

<script>
    import header from '../public/header'
    import navbar from '../public/navbar'
    import rslider from './rslider'
    import daily from './daily'
    import In from './in'
    import More from './more'

    export default {
        components:{
            as:header,
            nas:navbar,
            rslider,
            daily,
            In,
            More




        }
    }
</script>


<style lang="scss" module>
    .index{
        background-color:#EDEDED;
    }



</style>
