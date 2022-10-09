<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme-overrides="themeOverrides">
	<n-loading-bar-provider>
		<n-message-provider>
			<my-app />
		</n-message-provider>
	</n-loading-bar-provider>
  </n-config-provider>
</template>

<script>
import { zhCN, dateZhCN } from 'naive-ui'
import MyApp from './components/MyApp.vue'
import themeOverrides from './common/themeOverrides'

export default {
	components: { MyApp },
	setup() {
		return {
			zhCN,
			dateZhCN,
			themeOverrides
		}
	}
}

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

<style lang="less">
@import url('./assets/less/variable.less');
	.mobilePage {
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		.container {
			width: 100%;
			max-width: 750px;
			background-color: #F6F6F6;
			position: relative;
			font-size: 14px;
			color: @font-dark;
		}
	}
</style>