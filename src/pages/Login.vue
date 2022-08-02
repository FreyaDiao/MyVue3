<template>
	<my-header
		ref="headerDom"
		:show-home-entery="showHomeEntery"
		:show-search="showSearch"
		@changeLang="langChanged"
		@changeTheme="themeChanged" />
	<main class="login-main">
		<img :src="lightBG" class="login-bg" alt="">

		<div>
			<n-form ref="formRef" :model="loginInfo" :rules="rules">
				<n-form-item path="name" label="用户名">
					<n-input v-model:value="loginInfo.name" @keydown.enter.prevent />
				</n-form-item>
				<n-form-item path="password" label="密码">
					<n-input
						v-model:value="loginInfo.password"
						type="password"
						@input="handlePasswordInput"
						@keydown.enter.prevent
					/>
				</n-form-item>
			</n-form>
		</div>
	</main>
	<my-footer />
</template>

<script>
import { onMounted, reactive, ref } from 'vue';
import MyFooter from '../components/MyFooter.vue'
import MyHeader from '../components/MyHeader.vue'
import lightBG from '../assets/light-bg.png'
export default {
	components: { MyHeader, MyFooter },
	setup(props) {

		const headerDom = ref(null);
		const handleClick = () => {
			console.log(headerDom.value.currentLang)
			console.log(headerDom.value.currentTheme)

		}
		onMounted(() => {
			console.log('my header lang===', headerDom.value.currentLang)
			console.log('my header theme===', headerDom.value.currentTheme)
		})

		const langChanged = (lang) => {
			console.log('lang===', lang)
		}
		const themeChanged = (theme) => {
			console.log('theme===', theme)
		}

		const loginInfo = reactive({
			name: '',
			password: '',
			validateCode: '',
		})
		const handlePasswordInput = () => {}

		return {
			showHomeEntery: false,
			showSearch: false,
			headerDom,
			handleClick,
			langChanged,
			themeChanged,

			loginInfo,
			handlePasswordInput
		}
	}

}
</script>

<style lang="less" scoped>
	.login-main {
		flex: 1;
		overflow-y: auto;
		position: relative;
		.login-bg {
			height: 100%;
			vertical-align: middle;
		}
	}
</style>