<template>
	<view class="dog-nav-bar clearfix">
		<view class="left-part fl">
			<view v-if="showBack"></view>
			<slot name="left"></slot>
		</view>
		<text class="title">{{ title }}</text>
		<view class="right-part fr">
			<slot name="right"></slot>
		</view>
	</view>
</template>

<script>
	// import "./index.scss";
	export default {
		name: "NavBar",
		props: {
			title: {
				type: String,
				default: "",
			},
			showBack: {
				type: Boolean,
				default: false,
			},
		},
	}
</script>
<style lang="scss" scoped>
	@import "./index.scss"
	</style>
