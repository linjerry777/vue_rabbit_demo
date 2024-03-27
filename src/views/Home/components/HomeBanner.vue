<script setup>
import { getBannerAPI } from '@/apis/home.js'
import { ref, onMounted } from 'vue'

const bannerList = ref([])
const getBanner = async () => {
    const { data: { result } } = await getBannerAPI()
    console.log(result);
    bannerList.value = result
}
onMounted(() => {
    getBanner()
});
</script>



<template>
    <div class="home-banner">
        <el-carousel height="500px">
            <el-carousel-item v-for="item in bannerList" :key="item">
                <img :src="item.imgUrl" alt="">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>



<style scoped lang='scss'>
.home-banner {
    width: 1240px;
    height: 500px;
    img {
        width: 100%;
        height: 500px;
    }
}
</style>