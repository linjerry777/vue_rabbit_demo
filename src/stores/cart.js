import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useCartStore = defineStore('cart', () => {
  const cartList = ref([])
  const addCart = (goods)=>{
    //添加過
    const item =  cartList.value.find((item)=> goods.skuId === item.skuId)
    if(item){
      item.count++
    }else{
      cartList.value.push(goods)
    }
    //沒添加過
  }
  const delCart =(skuId)=>{
    const idx = cartList.value.findIndex(item=> item.skuId === skuId)
    cartList.value.splice(idx,1)
  }

  const allCount =computed(()=>cartList.value.reduce((a,c)=>a+c.count,0))
  const allPrice =computed(()=>cartList.value.reduce((a,c)=>a+c.count * c.price,0))

  return {cartList,addCart,delCart,allCount,allPrice }
},{
    persist: true
})
