<template>
  <div ref="box" id="box">
    <p>count: {{ count }}</p>
    <p>doubleCount: {{ doubleCount }}</p>
    <button @click="increment">count加一</button>
    <p>loginStatus: {{loginStatus}}</p>
    <button @click="changeStatus">change status</button>
    <p>privateCount: <input v-model="privateCount" @change="changePrivateCount"></p>
    <p>storeInfo: {{storeInfo.name}} {{storeInfo.code}}</p>
    <p>amt: <input v-model="amt" @change="changeInput"></p>
    <p>testname: <input ref="testnameinput" v-model="testname"></p>
    <p class="test-job">testjob is 程序员</p>
    <p><button @click="jumpToLogin">jump to login</button></p>
    <n-input />
    <n-button>hahah</n-button>
  </div>
</template>

<script>
import {ref, toRefs, reactive, computed, watch, onMounted, createApp, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { getCurrentInstance } from "vue";

document.title = 'vue3-vite-test'
export default {
  setup(props) {
    // console.log('props', props)
    /* 获取vue实例 */
    const self = getCurrentInstance();
    /* 获取store */
    const store = useStore();
    /* 获取router */
    const router = useRouter();
    const route = useRoute();
    // console.log('store===', store, 'router===', router, 'route===', route);
    /* 可以使用ref或者toRefs自定义数据，类似vue2的data */
    const privateCount = ref(100)
    const changePrivateCount = function() {
      console.log('changePrivateCount===', privateCount.value);
      privateCount.value = Number(privateCount.value) + 1;
    }
    const data = reactive({
      testname: '张三',
      inputText: '默认值',
      isShow: false,
      amt: 1,
      storeInfo: {
        name: '支付宝',
        code: 'ALIPAY'
      }
    })
    // console.log('data===', data)
    // console.log('toRefs(data)===', toRefs(data))
    const changeInput = () => {
      console.log('change amt===', data.amt)
      data.amt = Number(data.amt).toFixed(2)
    }

    const storeList = ref([])
    const getStoreList = async function() {
      storeList.value =  await Promise.resolve([{}, {}, {}])
    }

    /* DOM元素获取 */
    const box = ref(null)

    /* 生命周期 */
    onMounted(getStoreList)
    onMounted(() => {
      console.log('ref box===', box.value)
      console.log('storeList===', storeList)
    })
    
    /* watch使用 */
    const { testname, amt } = toRefs(data)
    watch(testname, (newValue, oldValue) => {
      console.log('testname newValue: ' + newValue)
    })
    watch(amt, (newValue, oldValue) => {
      console.log('amt newValue: ' + newValue)
    })
    /* watchEffect使用 */
    watchEffect(
      () => {
        console.log('watchEffect name', data.name);
        console.log('watchEffect inputText', data.inputText);
        console.log('watchEffect amt', data.amt);
      }
    )

    console.log(createApp(), 888)

    return {
      count: computed(() => store.state.count),
      doubleCount: computed(() => store.getters.doubleCount),
      increment: () => store.commit('increment'),
      loginStatus: computed(() => store.state.loginStatus),
      changeStatus: () => store.dispatch('changeStatus', !store.state.loginStatus),
      jumpToLogin: () => router.push('/Login'),

      privateCount,
      ...toRefs(data),
      changePrivateCount,
      changeInput,
      getStoreList,
      box,

      color: ref('red'),
    }
  },
}
</script>

<style scoped>
  .test-job {
    color: v-bind('color');
  }
</style>