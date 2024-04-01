import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { loginAPI } from '@/apis/user.js'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({})
  const getUserInfo =  async({ account, password })=>{
    const res = await loginAPI({ account, password })
    console.log(res);
    userInfo.value = res.data.result
  }

  const cleatUserInfo = ()=>{
    userInfo.value = {}
  }

  return {userInfo,getUserInfo ,cleatUserInfo }
},{
    persist: true
})
