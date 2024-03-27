<script setup>
import HomeCategory from "./components/HomeCategory.vue";
import HomeBanner from "./components/HomeBanner.vue";
import HomeNew from "./components/HomeNew.vue";
import HomeHot from "./components/HomeHot.vue";
import homeProduct from "./components/HomeProduct.vue";
import HomePanel from "./components/HomePanel.vue";
</script>

<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
  <HomeNew />
  <HomeHot />
  <homeProduct />
  <!-- 面板 -->
  <HomePanel title="新鮮好物" sub-title="新鮮好物 好多商品">
    <div>內容物</div>
  </HomePanel>
  <HomePanel title="人氣推薦" sub-title="人氣推薦 好多商品">
    <div>內容物</div>
  </HomePanel>
</template>
<style lang="scss" scoped>
.container {
  position: relative;
}
</style>
