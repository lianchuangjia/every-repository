<template lang="html">
    <div :class="$style.index">
        <as/>
        <islider/>
        <welfare/>
        <service/>
        <nas/>
    </div>
</template>

<script>
    import header from '../public/header'
    import navbar from '../public/navbar'
    import islider from './islider'
    import welfare from './welfare'
    import service from './service'



    export default {
        components:{
            as:header,
            nas:navbar,
            islider,
            welfare,
            service




        }
    }
</script>


<style lang="scss" module>
    .index{
        background-color:#EDEDED;
    }



</style>
