//封裝banner
import { onMounted, ref } from 'vue'
import { getBannerAPI } from '@/apis/home.js'


export function useBanner(){

    const bannerList = ref([])
    const getBanner = async () => {
        const { data: { result } } = await getBannerAPI({ distributionSite: '2' })
        console.log(result);
        bannerList.value = result
    }
    onMounted(() => {
        getBanner()
    });
    return {bannerList}
}
