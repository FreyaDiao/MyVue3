<template>
	<div class="mobilePage">
		<div class="container bill-list-box">
			<n-date-picker v-model:value="billMonth" :is-date-disabled="isMonthDisabled" :actions="['confirm']" type="month" />
			<div class="list-wrapper mt-10" @scroll="hansleScroll">
				<ul class="bill-list">
					<li v-for="item in billList" :key="item" class="border-bottom-1 bg-white" @click="goDetail(item)">
						<p>{{item}}</p>
						<n-icon :component="ChevronForward" size="20" class="text-light" />
					</li>
					<div v-if="hasMore || billList.length">
						<p v-if="hasMore" class="pt-10 pb-10 text-center text-light">加载中...</p>
						<p v-else class="pt-10 pb-10 text-center text-light">--我也是有底线的--</p>
					</div>
					<p v-else class="pt-30 text-center text-light">暂无数据</p>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup>
import { nextTick, ref, watchEffect} from 'vue';
import { useRouter } from 'vue-router';
import { ChevronForward } from "@vicons/ionicons5";

	const Router = useRouter()
	const billMonth = ref(new Date().getTime())
	const isMonthDisabled = (current) => {
		return current > new Date()
	}
	
	let pageIndex = 1, pageSize = 10, isLoading = false, isFullScreen = false
	const hasMore = ref(true)
	const billList = ref([])
	const getBillList = (params = {}) => {
		const { pageIndex, pageSize } = params
		return new Promise(resolve => {
			setTimeout(() => {
				resolve({
					totalPage: 5,
					totalRows: 50,
					rows: [
						'A'+pageIndex,
						'B'+pageIndex,
						'C'+pageIndex,
						'D'+pageIndex,
						'E'+pageIndex,
						'F'+pageIndex,
						'G'+pageIndex,
						'H'+pageIndex,
						'I'+pageIndex,
						'J'+pageIndex,
					]
				})
			}, 1000)
		})
	}
	const LoadMore = async () => {
		if(isLoading) return
		isLoading = true
		const resp = await getBillList({pageIndex, pageSize})
		hasMore.value = resp.totalPage > pageIndex
		billList.value = [...billList.value, ...resp.rows]
		isLoading = false;
		pageIndex += 1
		keepLoad()
	}
	const keepLoad = () => {
		if (isFullScreen) return;
		nextTick(() => {
			const wrapperHeight = document.querySelector('.list-wrapper').clientHeight
			const listHeight = document.querySelector('.bill-list').clientHeight
			if (wrapperHeight > listHeight) {
				LoadMore()
			} else {
				isFullScreen = true
			}
		})
	}
	const hansleScroll = (e) => {
		// console.log('clientHeight===', e.target.clientHeight, 'scrollHeight', e.target.scrollHeight, 'scrollTop', e.target.scrollTop)
		// let gap = 50
		const clientHeight = e.target.clientHeight
		const scrollHeight = e.target.scrollHeight
		const scrollTop = e.target.scrollTop
		if (scrollTop >= scrollHeight - clientHeight && hasMore.value) {
			LoadMore()
		}
	}
	const handleReset = () => {
		hasMore.value = true
		billList.value = []
		pageIndex = 1
		isLoading = false
		isFullScreen = false
		LoadMore()
	}
	watchEffect(() => {
		if (billMonth.value) {
			handleReset()
		}
	})

	const goDetail = (item) => {
		Router.push({
			path: '/BillDetail',
			query: {
				item
			}
		})
	}


</script>

<style lang="less" scoped>
	.bill-list-box {
		height: 100vh;
		display: flex;
		flex-direction: column;
		.list-wrapper {
			flex: 1;
			overflow-y: auto;
		}
		.bill-list {
			li {
				height: 50px;
				padding: 10px;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}
	}
</style>