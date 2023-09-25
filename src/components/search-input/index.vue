<template>
  <view class="search-input-box">
    <text class="iconfont icon-search"></text>
    <input
      v-model="value"
      type="text"
      :placeholder="placeholder"
      :maxlength="32"
      class="search-input"
      confirm-type="搜索"
      @input="debounceInput"
      @focus="handleFocus"
    />
  </view>
</template>

<script>
import { debounce } from "@monkey.do/utils";
export default {
  name: "SearchInput",

  props: {
    placeholder: {
      type: String,
      default: "请输入"
    },
  },

  created() {
    this.fn = debounce(this.handleOnInput, 500, this, false);
  },

  data() {
    return {
      value: "",
      fn: () => { },
    };
  },

  methods: {
    debounceInput(event) {
      this.fn(event);
    },

    handleOnInput(event) {
      this.$emit("input", event.target.value);
    },
    handleFocus(event) {
      this.$emit("focus", event);
    },
    reset() {
      this.value = "";
    },
  },
}
</script>

<style lang="scss" scoped>
.search-input-box {
  width: 100%;
  height: 80rpx;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  margin: 0 auto;
  border-radius: 12rpx;
  font-size: 24rpx;
  color: #999999;
  text {
    font-size: 40rpx;
    margin-left: 28rpx;
    padding-right: 16rpx;
  }
  .search-input {
    font-size: 30rpx;
    outline: none;
    border: none;
    width: 80%;
  }
}
</style>
