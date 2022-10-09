<template>
	<my-header
		ref="headerDom"
		:show-home-entery="showHomeEntery"
		:show-search="showSearch"
		@changeLang="langChanged"
		@changeTheme="themeChanged" />
	<main class="login-main">
		<img :src="loginBG" class="login-bg" alt="">
		<div class="login-form-box">
			<n-form ref="formRef" :model="loginInfo" :rules="rules" >
				<n-form-item path="name" label="用户名">
					<n-input v-model:value="loginInfo.name" />
				</n-form-item>
				<n-form-item path="password" label="密码">
					<n-input v-model:value="loginInfo.password" type="password" />
				</n-form-item>
				<n-form-item path="validateCode" label="验证码">
					<n-input v-model:value="loginInfo.validateCode" />
				</n-form-item>
				<n-button :disabled="disableLoginBtn" block type="primary" @click="handleValidateClick">登录</n-button>
			</n-form>
		</div>
	</main>
	<my-footer />
</template>

<script>
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMessage } from 'naive-ui';
import MyFooter from '../components/MyFooter.vue'
import MyHeader from '../components/MyHeader.vue'
import lightBG from '../assets/images/light-bg.png'
import darkBG from '../assets/images/dark-bg.png'

export default {
	components: { MyHeader, MyFooter },
	setup(props) {
		window.$message = useMessage();
		const Router = useRouter();
		const headerDom = ref(null);
		const langChanged = (lang) => {
			console.log('lang===', lang)
		}

		const themeMap = {
			'light': lightBG,
			'dark': darkBG,
		}
		const loginBG = ref('');
		const themeChanged = (theme) => {
			loginBG.value = themeMap[theme]
		}
		onMounted(() => {
			loginBG.value = themeMap[headerDom.value.currentTheme]
		})

		const loginInfo = reactive({
			name: '',
			password: '',
			validateCode: '',
		})
		const rules = {
			name: [{required: true, message: "请输入用户名", trigger: 'blur'}],
			password: [{required: true, message: "请输入密码", trigger: 'blur'}],
			validateCode: [{required: true, message: "请输入验证码", trigger: 'blur'}],
		}
		const handleValidateClick = () => {
			console.log('loginInfo===', loginInfo);
			// fake validate
			if (loginInfo.name === '99999' && loginInfo.password === '123456' && loginInfo.validateCode === '666666') {
				$message.success('登录成功')
				Router.push('/Home')
				return;
			}
			$message.error('登录失败')
		}


		return {
			showHomeEntery: false,
			showSearch: false,

			headerDom,
			langChanged,
			themeChanged,

			loginBG,
			loginInfo,
			rules,
			disableLoginBtn: computed(() => !loginInfo.name || !loginInfo.password || !loginInfo.validateCode),
			handleValidateClick
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
		.login-form-box {
			background-color: #fff;
			width: 300px;
			border: 1px solid #d6d6d6;
			border-radius: 10px;
			padding: 30px 20px;
			position: absolute;
			right: 80px;
			top: 40%;
			transform: translateY(-50%);
		}
	}
</style>