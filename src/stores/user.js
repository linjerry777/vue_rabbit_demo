import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { loginAPI } from '@/apis/user.js'
import { mergeCartAPI } from '@/apis/cart.js'
import {useCartStore} from '@/stores/cart.js'
export const useUserStore = defineStore('user', () => {
  const userInfo = ref({})
  const cartStore = useCartStore();
  const getUserInfo =  async({ account, password })=>{
    const res = await loginAPI({ account, password })
    console.log(res);
    userInfo.value = res.data.result
    mergeCartAPI(cartStore.cartList.map(item=>{
      return{
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      }
    }))
    cartStore.updateNewList()
  }

  const cleatUserInfo = ()=>{
    userInfo.value = {}
    cartStore.clearCart()
  }

  return {userInfo,getUserInfo ,cleatUserInfo }
},{
    persist: true
})
