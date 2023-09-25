<template>
	<view>
		<uni-nav-bar class="ycx" title="我的任务" left-icon="back" fixed statusBar>
			<template slot="right">
				<view class="right">进入</view>
			</template>
		</uni-nav-bar>

		<mescroll-body @init="mescrollInit" :down="{auto: false}" :up="{auto: false}" @down="downCallback" @up="upCallback">
			<u-button type="primary" @click="changeCurType">普通用户</u-button>
			<u-button type="primary">仲裁员</u-button>
			<view class="u-flex">
				<text>你还是地方</text>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js'
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				curType: 1
			}
		},
		methods: {
			changeCurType() {
				let tabBarOptions = {
					index: 0, //要修改的下标
					text: '首页二', //文字
					iconPath: 'static/img/index.png',
					selectedIconPath: 'static/img/index-light.png'
				}
				//uniapp的api，传入上面写好的对象
				uni.setTabBarItem(tabBarOptions)
			},
			downCallback() {
				setTimeout(() => {
					this.mescroll.endSuccess(40, 1)
				}, 3000)
			},
			upCallback() {
				setTimeout(() => {
					this.mescroll.endSuccess(40, 1)
				}, 3000)
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>