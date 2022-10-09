<template>
    <div class="mobilePage">
        <div class="container">Bill detail for item {{Route.query.item}}</div>
    </div>
</template>

<script setup>
import { useRoute } from "vue-router";

    const Route = useRoute()
    console.log(Route.query)
</script>

<style lang="scss" scoped>

</style>