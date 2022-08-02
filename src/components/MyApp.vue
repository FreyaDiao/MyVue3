<template>
  <FullScreen v-if="currentRoute.meta.fullScreen" />
  <SubScreen v-else />
</template>

<script setup>
import { useRouter } from 'vue-router';
import FullScreen from './FullScreen.vue';
import SubScreen from './SubScreen.vue';

const router = useRouter();
const currentRoute = router.currentRoute;

</script>

<style lang="scss" scoped>

</style>