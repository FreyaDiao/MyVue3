<template>
	<n-layout-sider content-style="padding: 24px;">
		<n-menu
			:options="menuOptions"
			:default-expanded-keys="defaultExpandedKeys"
			accordion
		/>
	</n-layout-sider>
</template>

<script setup lang="ts">
import type { MenuOption } from 'naive-ui'

const menuOptions: MenuOption[] = [
  {
    label: '鱼',
    key: 'fish',
    children: [
      {
        label: '红烧',
        key: 'braise',
        children: [
          {
            label: '加辣',
            key: 'spicy'
          }
        ]
      },
      {
        label: '清蒸',
        key: 'steamed',
        children: [
          {
            label: '不要葱',
            key: 'no-green-onion'
          }
        ]
      }
    ]
  },
  {
    label: '熊掌',
    key: 'bear-paw',
    children: [
      {
        label: '保护野生动物',
        key: 'protect-wild-animals'
      }
    ]
  },
  {
    label: '两个都要',
    key: 'both',
    children: [
      {
        label: '鱼和熊掌不可兼得',
        key: 'can-not'
      }
    ]
  }
]

const defaultExpandedKeys = ['fish', 'braise']

</script>

<style lang="scss" scoped>

</style>