<template>
	<div @click='openPage'>
		<slot></slot>
	</div>
</template>

<script>
import { throttle } from "@/utils/index.js";
	
	// 需要完善所有 navigate 方法
	export default {
		props:{
			url: {
				type: String,
				default: ''
			}
		},
		mounted(){
			this.open = throttle(() => {
				uni.navigateTo({
					url: this.url,
				});
			},300);
		},
		methods:{
			openPage() {
				this.open();
			}
		} 
	}
</script>

