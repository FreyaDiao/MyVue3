<template>
  <n-layout-header bordered class="my-header">
    <div class="header-left">
		<img src="../assets/images/logo.png" height="25" width="25" alt="">
		<span>My Vue3 App</span>
	</div>
    <div class="header-center">
		<n-button v-if="showHomeEntery" text class="text-btn">首页</n-button>
			<n-input v-if="showSearch" :value="searchText" placeholder="搜索" class="search-input" :on-input="handleInput">
			<template #suffix>
				<n-icon :component="SearchOutline" />
			</template>
		</n-input>
	</div>
    <div class="header-right">
		<n-dropdown
			:options="langOptions"
			:render-label="renderLang"
			trigger="hover"
			@select="handleSelectLang">
			<n-button quaternary class="text-btn">选择语言</n-button>
		</n-dropdown>
		<n-dropdown
			:options="themeOptions"
			:render-label="renderTheme"
			trigger="hover"
			@select="handleSelectTheme">
			<n-button quaternary class="text-btn">选择主题</n-button>
		</n-dropdown>
	</div>
  </n-layout-header>
</template>

<script setup>
import { SearchOutline } from '@vicons/ionicons5'
import { NButton } from 'naive-ui';
import { ref, watch, h } from 'vue';

const props = defineProps({
  showHomeEntery: Boolean,
  showSearch: Boolean,
})
// console.log(props.showHomeEntery, 999)

const emit = defineEmits([
	'changeLang',
	'changeTheme',
])

/* 搜索 */
const searchText = ref(null);
const handleInput = function(val) {
	searchText.value = val;
}
watch(searchText, (val) => {
	console.log('searchText====', val)
})

/* 选择语言 */
const lastSelectedLang = localStorage.getItem('my-lang') || 'zh'
const currentLang = ref(lastSelectedLang)
const langOptions = [
	{ key: 'zh', label: '简体中文' },
	{ key: 'en', label: 'Egnlish' },
]
const renderLang = function(option) {
	return h(
		NButton,
		{
			text: true,
			type: currentLang.value === option.key ? 'primary' : 'default',
		},
		{
			default: () => option.label
		}
	)
}
const handleSelectLang = function(key) {
	currentLang.value = langOptions.find(one => one.key === key).key
	localStorage.setItem('my-lang', key)
	emit('changeLang', key)
}

/* 选择主题 */
const lastSelectedTheme = localStorage.getItem('my-theme') || 'light'
const currentTheme = ref(lastSelectedTheme)
const themeOptions = [
	{ key: 'light', label: '浅色' },
	{ key: 'dark', label: '深色' },
]
const renderTheme = function(option) {
	return h(
		NButton,
		{
			text: true,
			type: currentTheme.value === option.key ? 'primary' : 'default',
		},
		{
			default: () => option.label
		}
	)
}
const handleSelectTheme = function(key) {
	currentTheme.value = themeOptions.find(one => one.key === key).key
	localStorage.setItem('my-theme', key)
	emit('changeTheme', key)
}

defineExpose({
	currentLang,
	currentTheme
})

</script>

<style lang="less" scoped>
	.my-header {
		height: 50px;
		display: flex;
		align-items: center;
		padding: 0px 15px;
		
		.header-left, .header-content, .header-right {
			display: flex;
			align-items: center;
			flex-shrink: 0;
		}
		.header-left {
			width: 240px;
		}
		.header-center {
			flex: 1;
		}
		.search-input {
			width: 240px;
			margin-left: 10px;
		}
		.text-btn {
			padding: 10px;
		}
	}
</style>