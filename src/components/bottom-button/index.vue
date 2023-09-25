<template>
  <view class="bottom-btn">
  	<button v-if="disabled" type="default":disabled="disabled">确定</button>
  	<button v-else type="primary" >确定</button>
  </view>
</template>

<script>
  export default {
    name: "BottomButton",
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
    },
  }
</script>
