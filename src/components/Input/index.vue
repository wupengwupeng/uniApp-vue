<template>
	<view class="sitset-server">
		<slot name="prevSlot"></slot>
		<input @input="handleChange" type="text" v-model="value"  />
		<img v-if="value" @click="handleClick" class="del" src="../../static/img/del.png"></img>
		<uni-popup ref="popup" type="center">
			<uni-popup-dialog mode="base" :content="content" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>	
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'

	export default{
		name: "Input",
		components:{
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
    }, 
		data() {
			return {
				value:"",
				show:false,
			};
		},
		props:{
			modality:{
				type: String,
				default: 'normal' // popup
			},
			content: {
				type: String,
				default: '',
      }
		},
		methods:{
			clear(){
				this.value = "";
				this.$emit("update:inputValue", '');
			},
			handleClick(){
				if (this.modality === 'normal') {
					this.clear();
				} else {
					this.$refs.popup.open()
				}
			},
			handleChange(val) {
				this.$emit("update:inputValue", val.detail.value);
				this.$emit("change", val);
			},
			close(done){
					done()
			},
			confirm(done,value){
					// 输入框的值
					this.value = '';
					this.$emit("delete", this.value);
					// TODO 做一些其他的事情，手动执行 done 才会关闭对话框
					done()
			}
		},
			
	}
</script>
<style lang="scss" scoped>
	 @import "./input.scss";
</style>