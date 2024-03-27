import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout.js'

export const useCategoryStore = defineStore('category', () => {
 
    const categoryList = ref([])
    const getCategory = async () => {
        const {data:{result}} = await getCategoryAPI()
        
        categoryList.value = result
    }
    return {categoryList,getCategory}
})
