import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { insertCartAPI, findNewCartAPI,deleteCartAPI } from '@/apis/cart.js'
export const useCartStore = defineStore('cart', () => {

  const userStore = useUserStore();
  const isLogin = computed(() => userStore.userInfo.token)
  const cartList = ref([])
  const updateNewList = async()=>{
    const res = await findNewCartAPI()
    cartList.value = res.data.result
  }
  const addCart = async(goods) => {

    const {skuId,count} = goods

    if (isLogin.value) {
      //123
      await insertCartAPI({skuId,count})
      updateNewList()
    } else {

      //添加過
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if (item) {
        item.count++
      } else {
        cartList.value.push(goods)
      }
    }


  }
  const delCart = async (skuId) => {
    if (isLogin.value) {
      //123
      await deleteCartAPI([skuId])
      updateNewList()
    }else{
      
      const idx = cartList.value.findIndex(item => item.skuId === skuId)
      cartList.value.splice(idx, 1)
    }

  }

  const clearCart = ()=>{
    cartList.value = []
  }

  

  //總數
  const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
  //總價
  const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
  //已選擇數量
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))

  //已選擇商品價錢合計
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))
  const singleCheck = (skuId, selected) => {
    const item = cartList.value.find(item => item.skuId === skuId)
    item.selected = selected
  }

  const isAll = computed(() => cartList.value.every(item => item.selected))

  const allCheck = (selected) => {
    cartList.value.forEach(item => item.selected = selected)
  }

  return { cartList, addCart, delCart, allCount, allPrice, singleCheck, isAll, allCheck, selectedCount, selectedPrice ,clearCart,updateNewList}
}, {
  persist: true
})
