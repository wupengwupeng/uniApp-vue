<template>
  <view v-if="visible" class="bottom-bar">
    <view class="bottom-bar-item" v-for="(item, index) in data" :key="index" :class="{disabled: !!item.disabled}" @click="handleClick(item)">
      <text class="bottom-bar-text">
        <text v-show="item.label==='全选'">1212</text>
        {{ item.label }}
      </text>
    </view>
  </view>
</template>

<script>
export default {
  name: "BottomBar",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    visible: {
      type: Boolean,
      default: true,
    }
  },
  methods: {
    handleClick(value) {
      if (value.disabled) return;
      if (value.click && typeof value.click === "function") {
        value.click();
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import "./bottom-bar.scss";
</style>