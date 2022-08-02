<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <my-app />
  </n-config-provider>
</template>

<script setup>
import { zhCN, dateZhCN } from 'naive-ui'
import MyApp from './components/MyApp.vue'

</script>

<style lang="less" scoped>
	.n-config-provider {
		height: 100vh;
		width: 100vw;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}
</style>