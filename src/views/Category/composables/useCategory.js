//封裝分類
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { onMounted, ref } from "vue";
import { getCategoryAPI } from "@/apis/category";

export function useCategory() {
  const categoryData = ref({});
  const route = useRoute();

  //如果一開始沒id 就用route.params.id
  const getCategory = async (id = route.params.id) => {
    const {
      data: { result },
    } = await getCategoryAPI(id);
    categoryData.value = result;
  };
  onMounted(() => getCategory());

  onBeforeRouteUpdate((to) => {
    // console.log(to);
    getCategory(to.params.id);
  });
  return { categoryData };
}
