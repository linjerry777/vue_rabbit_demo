<script setup>

import { getHotGoodsAPI } from '@/apis/detail'
import { ref, onMounted } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";

const props = defineProps({
    hotType: {
        type: Number,
    }
})


const HotList = ref([])
const route = useRoute()
const getHotList = async () => {
    const { data: { result } } = await getHotGoodsAPI({
        id: route.params.id,
        type: props.hotType
    })
    HotList.value = result
}
onMounted(() => getHotList());
</script>


<template>
    <div class="goods-hot">
        <h3>{{ hotType == 1 ? '24小時熱榜' : '周熱榜' }}</h3>
        <!-- 商品区块 -->
        <RouterLink :to="`/detail/${item.id}`" class="goods-item" v-for="item in HotList" :key="item.id">
            <img :src="item.picture" alt="" />
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="desc ellipsis">{{ item.desc }}</p>
            <p class="price">&yen;{{ item.price }}</p>
        </RouterLink>
    </div>
</template>


<style scoped lang="scss">
.goods-hot {
    h3 {
        height: 70px;
        background: $helpColor;
        color: #fff;
        font-size: 18px;
        line-height: 70px;
        padding-left: 25px;
        margin-bottom: 10px;
        font-weight: normal;
    }

    .goods-item {
        display: block;
        padding: 20px 30px;
        text-align: center;
        background: #fff;

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
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .price {
            color: $priceColor;
            font-size: 20px;
        }
    }
}
</style>