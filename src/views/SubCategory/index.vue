<script setup>
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category'
import { ref, onMounted } from 'vue'
import { useRoute } from "vue-router";
import GoodsItem from '@/views/Home/components/GoodsItem.vue'

const categoryData = ref({});
const route = useRoute()
const getCategoryData = async () => {
    const { data: { result } } = await getCategoryFilterAPI(route.params.id)
    categoryData.value = result
}
onMounted(() => getCategoryData());


const goodList = ref([]);
const reqData = ref({
    categoryId: route.params.id,
    page: 1,
    pageSize: 20,
    sortField: 'publishTime'
})
const getGoodList = async () => {
    const { data: { result } } = await getSubCategoryAPI(reqData.value)
    goodList.value = result.items
}
onMounted(() => getGoodList());

//tab切換資料
const tabChange = () => {
    
    reqData.value.page = 1
    getGoodList()
};

//無限加載
const disabled = ref(false)
const load = async () => {
    

    //獲取下一頁資料
    reqData.value.page++
    const { data: { result } } = await getSubCategoryAPI(reqData.value)
    goodList.value = [...goodList.value, ...result.items]

    //加載完
    if(result.items.length === 0){
        disabled.value = true
    }

};

</script>

<template>
    <div class="container ">
        <!-- 面包屑 -->
        <div class="bread-container">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">{{ categoryData.parentName }}
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="sub-container">
            <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
                <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
                <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
                <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
            </el-tabs>
            <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
                <!-- 商品列表-->
                <GoodsItem v-for="goods in goodList" :goods="goods" :key="goods.id" />
            </div>
        </div>
    </div>

</template>



<style lang="scss" scoped>
.bread-container {
    padding: 25px 0;
    color: #666;
    width: 1290px;
    margin: 0 auto;
    padding-left: 10px;
}

.sub-container {
    padding: 20px 10px;
    background-color: #fff;
    width: 1280px;
    margin: 0 auto;
    .body {
        display: flex;
        flex-wrap: wrap;
        padding: 0 10px;
        justify-content: center;
    }

    .goods-item {
        display: block;
        width: 220px;
        margin-right: 20px;
        padding: 20px 30px;
        text-align: center;

        img {
            width: 160px;
            height: 160px;
        }

        p {
            padding-top: 10px;
        }

        .name {
            font-size: 16px;
        }

        .desc {
            color: #999;
            height: 29px;
        }

        .price {
            color: $priceColor;
            font-size: 20px;
        }
    }

    .pagination-container {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }


}
</style>