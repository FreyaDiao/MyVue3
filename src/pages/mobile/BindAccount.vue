<template>
  <div class="mobilePage">
    <div class="container">
        <p className='text-center margin-10'>请先认证身份后才能消费</p>
			  <div className='flex-center mb-30'>
          <img src="../../assets/images/default_avatar.png" alt="" width="80">
        </div>
        <n-form
          ref="formRef"
          label-placement="left"
          label-width="auto"
          label-align="left"
          :model="model"
          :rules="rules">
          <n-form-item path="school" label="学校">
            <n-input v-model:value="model.school" @keydown.enter.prevent />
          </n-form-item>
          <n-form-item path="name" label="姓名">
            <n-input v-model:value="model.name" @keydown.enter.prevent />
          </n-form-item>
          <n-form-item path="idType" label="证件类型">
            <n-select
              v-model:value="model.idType"
              placeholder="请选择"
              :options="idTypeList"
            />
          </n-form-item>
          <n-form-item path="idNumber" label="证件号">
            <n-input v-model:value="model.idNumber" @keydown.enter.prevent />
          </n-form-item>
          <n-row>
            <n-button block type="primary" @click="handleConfirm">确定</n-button>
          </n-row>
        </n-form>
        <div className='hotline'>
          <p className='text-center'>更多帮助拨打<a href="tel:400-100-100X">400-XXX-XXXX</a></p>
          <p className='text-center'>或关注“就是不理你”微信公众号</p>
        </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { useLoadingBar, useMessage } from "naive-ui";
import { useRouter } from "vue-router";

  const Router = useRouter()
  const message = useMessage()
  const loading = useLoadingBar()
  const formRef = ref(null)
  const rules = {
    school: {
      required: true,
      message: '学校不能为空',
      trigger: ['blur']
    },
    name: {
      required: true,
      message: '姓名不能为空',
      trigger: ['blur']
    },
    idType: {
      required: true,
      message: '证件类型不能为空',
      trigger: ['blur']
    },
    idNumber: {
      required: true,
      message: '证件号不能为空',
      trigger: ['blur']
    }
  }

  const model = reactive({
    school: null,
    name: null,
    idType: null,
    idNumber: null
  })

  const idTypeList = ref([])
  const getIdTypeList = () => {
    return new Promise((resolve) => {
      setTimeout(() => { 
        const result = ['身份证', '护照', '学生证', '教职工证'].map(v => ({ label: v, value: v }))
        return resolve({result})
      }, 1000)
    })
  }
  getIdTypeList().then(res => {
    idTypeList.value = res.result || []
  })

  const handleConfirm  = (e) => {
    e.preventDefault()
    console.log(formRef.value)
    console.log(model)
    formRef.value?.validate((errors) => {
      if (!errors) {
        loading.start()
        const flag = Math.random() < 0.5
        bindAccount(flag).then(res => {
          loading.finish()
          Router.replace('/MainPage')
        }).catch( e => {
          loading.error()
          message.error(e.message)
        })
      } else {
        message.error('验证不通过')
      }
    })
  }

  const bindAccount = (flag) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (flag) {
          return resolve({})
        } 
        return reject(new Error('发生了一点错误'))
      }, 1000)
    })
  }

</script>

<style lang="less" scoped>
  #BindAccount {
    min-height: 100vh;
    position: relative;
  }
  .n-form {
    margin: 0px 20px;
  }
  .hotline {
    width: 100%;
    height: 42px;
    position: absolute;
    bottom: 10px;
    font-size: 12px;
  }
</style>