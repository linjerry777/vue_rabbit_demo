<script setup>
defineProps({
  title: {
    type: String,
  },
  subTitle: {
    type: String,
  },
});
</script>

<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
        <!-- 主標題和副標題 -->
        <h3>
          {{ title }}<small>{{ subTitle }}</small>
        </h3>
      </div>
      <!-- 主體內容區域 -->
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-panel {
  background-color: #fff;
  width: 1280px;
  margin: 0 auto;
  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;
    ul{
      padding: 0;
    }
    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;

      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>
