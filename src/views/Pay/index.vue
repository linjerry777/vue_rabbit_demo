<script setup>
import { getOrderAPI } from '@/apis/pay.js'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {useCountDown}from '@/composables/useCountDown.js'
const {start,time} = useCountDown();
const route = useRoute();
const payInfo = ref({});
const getPayInfo = async()=>{
  const {data:{result}} = await getOrderAPI(route.query.id)
  payInfo.value = result
  start(result.countdown)
};
onMounted(()=>getPayInfo());
//跳轉支付
// 支付地址
const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const backURL = 'http://127.0.0.1:5173/paycallback'
const redirectUrl = encodeURIComponent(backURL)
const payUrl = `${baseURL}pay/aliPay?orderId=${route.query.id}&redirect=${redirectUrl}`
</script>


<template>
  
  <div class="xtx-pay-page">
    <div class="container">
      <!-- 付款信息 -->
      <div class="pay-info">
        <span class="icon iconfont icon-queren2"></span>
        <div class="tip">
          <p>訂單提交成功！請盡快完成付款。</p>
          <p>還剩 <span>{{time}}</span>, 超時後將取消訂單</p>
        </div>
        <div class="amount">
          <span>應付總額：</span>
          <span>¥{{ payInfo.payMoney?.toFixed(2) }}</span>
        </div>
      </div>
      <!-- 付款方式 -->
      <div class="pay-type">
        <p class="head">選擇以下支付方式付款</p>
  
        <div class="item">
          <p>支付方式</p>
          <a class="btn" href="javascript:;">台灣銀行</a>
          <a class="btn" href="javascript:;">LINE PAY</a>
          <a class="btn" href="javascript:;">APPLE PAY</a>
          <a class="btn" href="javascript:;">上海銀行</a>
          <a class="btn" href="javascript:;">台新銀行</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.xtx-pay-page {
  margin-top: 20px;
  .container {
    width: 1240px;
    margin: 0 auto;
  }
}

.pay-info {

  background: #fff;
  display: flex;
  align-items: center;
  height: 240px;
  padding: 0 80px;

  .icon {
    font-size: 80px;
    color: #1dc779;
  }

  .tip {
    padding-left: 10px;
    flex: 1;

    p {
      &:first-child {
        font-size: 20px;
        margin-bottom: 5px;
      }

      &:last-child {
        color: #999;
        font-size: 16px;
      }
    }
  }

  .amount {
    span {
      &:first-child {
        font-size: 16px;
        color: #999;
      }

      &:last-child {
        color: $priceColor;
        font-size: 20px;
      }
    }
  }
}

.pay-type {
  margin-top: 20px;
  background-color: #fff;
  padding-bottom: 70px;

  p {
    line-height: 70px;
    height: 70px;
    padding-left: 30px;
    font-size: 16px;

    &.head {
      border-bottom: 1px solid #f5f5f5;
    }
  }

  .btn {
    width: 150px;
    height: 50px;
    border: 1px solid #e4e4e4;
    text-align: center;
    line-height: 48px;
    margin-left: 30px;
    color: #666666;
    display: inline-block;

    &.active,
    &:hover {
      border-color: $xtxColor;
    }

   
  }
}
</style>