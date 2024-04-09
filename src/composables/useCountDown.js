
import {computed, onUnmounted, ref} from 'vue'
import dayjs from 'dayjs'
export const useCountDown = () => {
    let timer = null
    const formatTime = ref(0)

    const time =  computed(()=>dayjs.unix(formatTime.value).format('mm分ss秒'))

    const start = (currentTime)=>{
        formatTime.value = currentTime
        timer= setInterval(()=>{
            formatTime.value--
        },1000)
    }
    onUnmounted(()=>{
        timer&& clearInterval(timer)
    })
    return{formatTime,start,time}
}