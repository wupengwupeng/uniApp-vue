<template>
	<view :class="{'my-tabs':true,'space-between':formatBe}">
		<view  v-for="(item,index) in getModelData" :key="index" :class="{'tab-item':true,'active':activeIndex==index}" @tap="tap(index)">
			{{item.label}}
		</view>
	</view>
</template>

<script>
	export default {
		props:['modelData','initIndex'],
		data() {
			return {
				defaultInfo:{
					data:[
						{label:"测试",},
						{label:"测试"},
						{label:"测试"},
					],
				},
				activeIndex:0,//默认索引
			}
		},
		computed:{
			getModelData(){
				return this.modelData||this.defaultInfo.data
			},
			formatBe(){
				return this.modelData
						?this.modelData.length>4?true:false
						:false
			}
		},
		methods: {
			tap(index){
				if(index!==this.activeIndex)this.$emit("change",index);
				this.activeIndex=index;
			},
			/**
			 * @name 初始化activeIndex
			 */
			initActive(){
				this.activeIndex=this.initIndex||this.activeIndex
			}
		},
		created() {
			this.initActive()
		},
	}
</script>
<style lang='scss'>
	.my-tabs {
		height: 88upx;
		font-size: 28upx;
		display: flex;
		justify-content: space-around;
		box-sizing: border-box;
		border-top: 2upx solid #dddddd;
		border-bottom: 2upx solid #dddddd;
		min-width: 100%;
		overflow-x: auto;
		
		.tab-item{
			line-height: 48upx;
			padding: 20upx;
			min-width: 100upx;
			text-align: center;
		}
		.tab-item.active{
			position: relative;
			color: #3682FF;
		}
		.tab-item.active::after{
			content: "";
			position: absolute;
			bottom: 0;
			left:50%;
			transform: translateX(-50%);
			width: 100%;
			border-bottom: 4upx solid #3682FF;
			animation: test ease 1 1.5s;
		}
	}
	.my-tabs.space-between{
		justify-content: space-between;
	}
	@keyframes test{
		0%{width: 100%}
		50%{width: 150%}
		100%{width: 100%}
	}
</style>
