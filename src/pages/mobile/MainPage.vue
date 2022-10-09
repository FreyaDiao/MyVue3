<template>
  <div class="mobilePage">
    <div class="container">
      <div class="card flex align-center">
        <div class="flex-col align-center mr-10 flex-none">
           <img :src="userInfo.avatar || defaultAvatar" alt="" width="50">
           <p :class="statusMap[userInfo.status].class">{{statusMap[userInfo.status].label}}</p>
        </div>
        <div class="flex-1">
          <div class="name-and-id font-bold">
            <p class="name">{{userInfo.name}}</p>
            <p class="id ml-5">{{userInfo.idNumber}}</p>
          </div>
          <p class="mb-5">{{userInfo.school}}</p>
          <p class="text-right text-primary">校内身份认证 ></p>
        </div>
      </div>
      <div class="card personal-box ml-5">
        <div class="border-bottom-1 pb-10 flex align-center">
          <n-icon size="20" :component="ScanOutline" class="text-primary mr-5" />校园码
        </div>
        <div class="flex-col-center-center pb-10 border-bottom-1" @click="refresh">
          <div style="height: 200px">
            <img :src="qrCode" alt="">
          </div>
          <div class="text-primary flex align-center">
            <n-icon size="20" :component="RefreshOutline" class="mr-5" />每5分钟自动更新
          </div>
        </div>
        <div class="flex align-center pt-10">
          <n-icon :component="payWayIconMap[currentPayWay.id]" size="20" />
          <n-popselect v-model:value="currentPayWay.id" :options="signedPayways" trigger="click" width="trigger">
            <div class="flex-1 ml-10">
              <p class="flex-space-between align-center">
                <span :class="currentPayWay.name ? '' : 'text-danger'">{{currentPayWay.name || '无可用的支付渠道,仅可用于校园认证'}}</span>
                <n-icon :component="ChevronDown" size="20" class="text-light" />
              </p>
              <p v-if="currentPayWay.name"  class="font-mini">优先使用此渠道付款(包括校园码、校园卡)</p>
            </div>
            <template #empty>
              <div>
                <p class="text-center text-warning"><n-icon :component="InformationCircleOutline" size="60" /></p>
                <p class="text-center text-warning mb-10">当前无可用的支付渠道</p>
                <p v-for="(item, index) in payways" :key="item.value" class="mb-10">
                  {{index + 1}}、点击下方{{item.label}}，完成{{item.value === 'eWallet' ? '激活': '签约'}}，即可正常消费
                </p>
              </div>
            </template>
          </n-popselect>
        </div>
      </div>
      <ul class="card list">
        <li class="flex align-center border-bottom-1" @click="()=>{Router.push('/BillList')}">
          <n-icon :component="ListOutline" size="20" />
          <p class="flex-1 ml-10">交易记录</p>
          <n-icon :component="ChevronForward" size="20" class="text-light" />
        </li>
        <li v-for="item in payways" :key="item.value" class="flex align-center border-bottom-1" @click="signPayWay(item.value)">
          <n-icon :component="payWayIconMap[item.value]" size="20" />
          <p class="flex-1 ml-10">{{item.label}}</p>
          <n-icon :component="ChevronForward" size="20" class="text-light" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import QRCode from 'qrcode';
import { reactive, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useLoadingBar, useMessage } from 'naive-ui';
import { ListOutline, ScanOutline, InformationCircleOutline, WalletOutline, CardOutline, RefreshOutline, ChevronDown, ChevronForward } from "@vicons/ionicons5";
import defaultAvatar from '../../assets/images/default_avatar.png'

const Router = useRouter()
const message = useMessage()
const loading = useLoadingBar()
const statusMap = {
  '0': { label: '未认证', class: 'text-danger'},
  '1': { label: '已认证', class: 'text-success'},
}
const payWayIconMap = {
  'eWallet': WalletOutline,
  'unionPay': CardOutline,
}
const userInfo = reactive({
  cid: '111222333444555666',
  avatar: '',
  status: Math.random() > 0.5 ? '0' : '1', // 0-未认证  1-已认证
  name: '测试学生',
  idNumber: '200213200912299646',
  school: '测试高等技术职业学校测试分校'
})

const currentUrl = ref('')
const qrCode = ref('')
const isLoading = ref(false)
let timer = null;
// 定义绘制二维码基本配置
const QrCodeOptions = {
	type: "image/png", //类型
	quality: 0.5, //图片质量A Number between 0 and 1
	width: 200, //高度
	height: 200, //宽度
	errorCorrectionLevel: "L", //容错率
	margin: 1, //外边距
}
const getUrl = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      const timestamp = new Date().getTime()
      resolve(`https:www.baidu.com/${timestamp}`)
    }, 1000)
  })
}
const generateQR = async() => {
  loading.start()
  try {
    const _url = await getUrl()
    currentUrl.value = _url
    qrCode.value = await QRCode.toDataURL(_url, QrCodeOptions)
    loading.finish()
    isLoading.value = false
  } catch (err) {
    loading.error()
    isLoading.value = false
    message.error(`[generateQR]错误, ${err.message}`)
  }
}
const refresh = () => {
  isLoading.value = true
  qrCode.value = ''
  generateQR()
  clearInterval(timer)
  timer = setInterval(() => {
    console.log('isloading===', isLoading)
    console.log('qrCode===', qrCode)
    isLoading.value = true
    qrCode.value = ''
    generateQR()
  }, 1000 * 60 * 5)
}
refresh()

const payways = ref([])
const signedPayways = ref([])
const currentPayWay = reactive({
  name: '',
  id: ''
})
const getPayways = () => {
  isLoading.value = true
  setTimeout(() => {
      const list = [
        { label: '电子钱包', value: 'eWallet', isContract: true},
        { label: '银联一码付', value: 'unionPay', isContract: true},
      ]
      payways.value = list
      const signedList = list.filter(item => item.isContract)
      signedPayways.value = signedList
      currentPayWay.id = signedList.length ? signedList[0].value : ''
      currentPayWay.name = signedList.length ? signedList[0].label : ''
    }, 1000)
}
getPayways()
// 监听支付方式变化
watchEffect(() => {
  const selectedPayWay = signedPayways.value.find(one => one.value === currentPayWay.id) || {};
  currentPayWay.id = selectedPayWay.value
  currentPayWay.name = selectedPayWay.label
})
const signPayWay = (paywayId) => {
  console.log(paywayId)
}

</script>

<style lang="less" scoped>
  .card {
    box-sizing: border-box;
    margin: 15px 10px 0px;
    padding: 10px;
    border-radius: 8px;
    background: #fff;
  }

  .name-and-id {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    & > p{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .name {
      max-width: 45%;
      padding-right: 10px;
      box-sizing: border-box;
    }
    .id {
      flex: 1;
    }
  }

  .list {
    padding: 0px;
    li {
      padding: 10px;
    }
  }

</style>