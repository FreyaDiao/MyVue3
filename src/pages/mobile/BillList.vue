<template>
	<div class="mobilePage">
		<div class="container bill-list-box">
			<n-date-picker v-model:value="billMonth" :is-date-disabled="isMonthDisabled" :actions="['confirm']" type="month" />
			<ul class="mt-10 bill-list" @scroll="hansleScroll">
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
</template>

<script setup>
import { ref, watchEffect} from 'vue';
import { useRouter } from 'vue-router';
import { ChevronForward } from "@vicons/ionicons5";

	const Router = useRouter()
	const billMonth = ref(new Date().getTime())
	const isMonthDisabled = (current) => {
		return current > new Date()
	}
	
	let pageIndex = 1, pageSize = 10
	const hasMore = ref(true)
	const billList = ref([])
	const sleep = (time = 1000) => {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve()
			}, time);
		})
	}
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
			}, 1000);
		})
	}
	const LoadMore = async () => {
		const resp = await getBillList({pageIndex, pageSize})
		hasMore.value = resp.totalPage > pageIndex
		billList.value = [...billList.value, ...resp.rows]
		pageIndex += 1;
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
		.bill-list {
			overflow-y: auto;
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