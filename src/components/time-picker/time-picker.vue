<template>
  <view>
    <uni-popup ref="popcash" type="bottom" @change="popChange">
      <view class="pop_phone pop-container">
        <view class="popup-title">
          <view class="u-popup-cancel-btn" @click="closepop">清空</view>
          <view class="u-title">{{ title }}</view>
          <view class="u-popup-sure-btn" @click="handleSelectSure">确定</view>
        </view>
        <view class="m-select-time">
          <view @click="timeChose(0)" class="u-time-label" :style="{ color: timeIndex == 0 ? '#55aaff' : '#666' }">{{ startTimeDisplay }}</view>
          <view @click="timeChose(1)" class="u-time-label" :style="{ color: timeIndex == 1 ? '#55aaff' : '#666' }">{{ endTimeDisplay }}</view>
        </view>
        <view class="picker-height">
          <picker-view v-if="visible" class="mpvue-picker-view" :indicator-style="indicatorStyle" :value.async="curData" @change="bindChange">
            <picker-view-column>
              <view class="item" v-for="(item, index) in years" :key="index">{{ item }}年</view>
            </picker-view-column>
            <picker-view-column>
              <view class="item" v-for="(item, index) in months" :key="index">{{ item }}月</view>
            </picker-view-column>
            <picker-view-column>
              <view class="item" v-for="(item, index) in days" :key="index">{{ item }}日</view>
            </picker-view-column>
          </picker-view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import { dateToZeroTime, dateToFinalTime, parseTime } from "@monkey.do/utils";

export default {
  components: {
    uniPopup
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '请选择时间',
    },
    propBeginTime: {
      type: [String, Number],
    },
    propEndTime: {
      type: [String, Number],
    },
  },
  data() {
    const currentDate = this.getDate({
      format: true
    });
    const date = new Date();
    const years = [];
    const year = date.getFullYear();
    const months = [];
    const month = date.getMonth() + 1;
    const days = [];
    const day = date.getDate();
    for (let i = 1990; i <= date.getFullYear(); i++) {
      years.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      months.push(i);
    }
    for (let i = 1; i <= 31; i++) {
      days.push(i);
    }
    return {
      startTime: '',
      endTime: '',
      startTimeDisplay: '开始时间',
      endTimeDisplay: '结束时间',
      timeSelectActive: 1,
      currentDate: '',
      date: currentDate,
      timeIndex: 0,

      years,
      year,
      months,
      month,
      days,
      day,
      curData: [year, month - 1, day - 1],
      visible: false,
      indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth / (750 / 100))}px;`
    };
  },
  watch: {
    isShow(val) {
      if (val) {
        this.$refs.popcash.open();
        const date = new Date();
      }
    },
  },
  mounted() {
    console.log("monted");
    this.startTimeDisplay = this.getTodayTime();
    this.endTimeDisplay = this.getTodayTime();
    // this.startDate = this.getDate('start');
    // this.endDate = this.getDate('end');
    // this.$refs.popcash.open();
    this.visible = true;
    this.timeChose(0);

  },
  computed: {

  },
  methods: {
    //今天的时间
    getTodayTime() {
      var day2 = new Date();
      day2.setTime(day2.getTime());
      var time = day2.getFullYear() + '-' + this.check0((day2.getMonth() + 1)) + '-' + this.check0(day2.getDate());
      return time;
    },
    check0(num) {
      num = +num;
      return num > 9 ? num : ('0' + num);
    },
    bindChange(e) {
      const val = e.detail.value;
      this.curData = val;
      this.year = this.years[val[0]];
      this.month = this.months[val[1]];
      this.day = this.days[val[2]];

      //将选择的年月日变为number形式，便于比较之用
      var y = parseInt(this.year);
      var m = parseInt(this.month);
      var d = parseInt(this.day);

      //选择不同月份显示的天数不同
      if (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) {
        if (this.days.length != 31) {
          this.days = [];
          for (let i = 1; i <= 31; i++) {
            this.days.push(i);
          }
        }
      } else if (m == 4 || m == 6 || m == 9 || m == 11) {
        if (this.days.length != 30) {
          this.days = [];
          for (let i = 1; i <= 30; i++) {
            this.days.push(i);
          }
        }
      } else if (m == 2) {
        if ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0) {
          //闰年
          if (this.days.length != 29) {
            this.days = [];
            for (let i = 1; i <= 29; i++) {
              this.days.push(i);
            }
          }
        } else {
          //平年
          if (this.days.length != 28) {
            this.days = [];
            for (let i = 1; i <= 28; i++) {
              this.days.push(i);
            }
          }
        }
      }

      //处理选择今年的情况
      if (y == this.currentYear) {
        //最多显示到当前月份
        if (this.months.length != this.currentMonth) {
          this.months = [];
          for (let i = 1; i <= this.currentMonth; i++) {
            this.months.push(i);
          }
        }

        //如果选择的是当前月份，那么日最多显示到今天
        if (m == this.currentMonth) {
          if (this.days.length != this.currentDay) {
            this.days = [];
            for (let i = 1; i <= this.currentDay; i++) {
              this.days.push(i);
            }
          }
        }
      } else {
        this.months = [];
        for (let i = 1; i <= 12; i++) {
          this.months.push(i);
        }
      }

      //我的业务中是选择的孩子日期，根据选择的日期可以计算出孩子几岁了😄
      if (y >= this.currentYear) {
        this.babyAge = 0;
      } else {
        //选择的月份大于当前月份
        if (m > this.currentMonth) {
          this.babyAge = this.currentYear - y - 1;
        } else if (m == this.currentMonth) {
          if (d > this.currentDay) {
            this.babyAge = this.currentYear - y - 1;
          } else {
            this.babyAge = this.currentYear - y;
          }
        } else {
          this.babyAge = this.currentYear - y;
        }
      }

      this.month = this.check0(this.month);
      this.day = this.check0(this.day);

      if (this.timeIndex == 0) {
        this.startTimeDisplay = this.year.toString() + '-' + this.month.toString() + '-' + this.day.toString();
      } else {
        this.endTimeDisplay = this.year.toString() + '-' + this.month.toString() + '-' + this.day.toString()
      }
    },
    timeChose(index) {
      var that = this;
      this.timeIndex = index;
      // this.curData = [0,0,0];
      var date = index === 0 ? this.startTimeDisplay : this.endTimeDisplay;
      that.curData = that.getCurIndex(date);
    },
    getCurIndex(date) {
      var years = +date.split('-')[0];
      var months = +date.split('-')[1];
      var days = +date.split('-')[2];

      return [this.years.indexOf(years), this.months.indexOf(months), this.days.indexOf(days)]
    },
    popChange(e) {
      if (!e.show) {
        var obj = {
          isclose: true
        };
        this.$emit("cancel");
      }
    },
    closepop() {
      this.$refs.popcash.close();
      this.$emit('confirm', null);
      this.reset();
    },
    dateMinus(date1, date2) {
      var sdate = new Date(date1.replace(/-/g, "/"));
      var now = new Date(date2.replace(/-/g, "/"));
      var days = now.getTime() - sdate.getTime();
      var day = parseInt(days / (1000 * 60 * 60 * 24));
      return day;
    },
    startDateChange: function (e) {
      this.timeIndex = 0;
      this.startTimeDisplay = e.target.value;
    },
    endDateChange: function (e) {
      this.timeIndex = 1;
      this.endTimeDisplay = e.target.value;
    },
    getDate(type) {
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      if (type === 'start') {
        year = year - 50;
      } else if (type === 'end') {
        year = year + 2;
      }
      month = month > 9 ? month : '0' + month;
      day = day > 9 ? day : '0' + day;
      return `${year}-${month}-${day}`;
    },
    handleSetActive(active) {
      this.timeSelectActive = active;

      let time;
      if (active === 1) {
        time = this.startTimeDisplay.split('-');
      } else {
        time = this.endTimeDisplay.split('-');
      }

      this.currentDate = new Date(time[0], +time[1] - 1, time[2]);
    },
    timeSelectInput(evt) {
      if (this.timeSelectActive == 1) {
        this.startTimeDisplay = evt.getValues().join('-');
      } else if (this.timeSelectActive == 2) {
        this.endTimeDisplay = evt.getValues().join('-');
      }
    },
    handleSelectSure() {
      if (this.startTimeDisplay == '开始时间') {
        uni.showToast({
          title: '请选择开始时间',
          icon: 'none'
        });
        return;
      }
      if (this.endTimeDisplay == '结束时间') {
        uni.showToast({
          title: '请选择结束时间',
          icon: 'none'
        });
        return;
      }
      var start = this.startTimeDisplay.split('-');
      var end = this.endTimeDisplay.split('-');
      var totalDay = 0;
      if (new Date(start[0], +start[1] - 1, start[2]) > new Date(end[0], +end[1] - 1, end[2])) {
        this.startTime = this.endTimeDisplay;
        this.endTime = this.startTimeDisplay;
        totalDay = this.dateMinus(this.endTimeDisplay, this.startTimeDisplay);
      } else {
        this.startTime = this.startTimeDisplay;
        this.endTime = this.endTimeDisplay;
        totalDay = this.dateMinus(this.startTimeDisplay, this.endTimeDisplay);
      }

      // if (+totalDay > 31) {
      // 	uni.showToast({
      // 		title: '最多可查询31天内的数据',
      // 		icon: 'none'
      // 	});
      // 	return;
      // }

      var obj = {
        startTime: dateToZeroTime(this.startTime),
        endTime: dateToFinalTime(this.endTime),
        isclose: false
      };
      this.$emit('confirm', obj);
      this.$refs.popcash.close();
      // this.startTimeDisplay = this.getTodayTime();
      // this.endTimeDisplay = this.getTodayTime();
    },
    
    reset() {
      const date = new Date();
      this.curData = [date.getFullYear(), date.getMonth(), date.getDate() - 1];
      console.log(this.curData);
      this.startTimeDisplay = this.getTodayTime();
      this.endTimeDisplay = this.getTodayTime();
    },
  }
};
</script>

<style scoped lang="scss">
.pop-container {
  height: 700upx;
  background: #fff;
}

.picker-height {
  height: 400upx;
}

.popup-title {
  height: 90rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.u-title {
  font-size: 30rpx;
}

.u-popup-cancel-btn {
  color: #999;
  padding: 0 30rpx;
  height: 90rpx;
  line-height: 90rpx;
}

.u-popup-sure-btn {
  color: #007aff;
  padding: 0 30rpx;
  height: 90rpx;
  line-height: 90rpx;
}

.m-select-time {
  height: 160rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 34rpx;
}

.u-time-label {
  color: #ccc;
  width: 220rpx;
  height: 60rpx;
  line-height: 60rpx;
  border-bottom: 1px solid #ccc;
  text-align: center;
  margin: 0 40rpx;
}

.mpvue-picker-view {
  width: 100%;
  height: 100%;
  // height: 280upx;
  background-color: rgba(255, 255, 255, 1);

  .item {
    text-align: center;
    width: 100%;
    height: 100upx;
    line-height: 100upx;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 30upx;
  }
}
</style>