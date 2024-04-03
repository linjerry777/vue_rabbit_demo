import request from '@/utils/http';

//加入購物車
export const insertCartAPI = ({skuId,count}) =>{
    return request({
        url:'/member/cart',
        method: 'POST',
        data:{
            skuId,
            count
        }
    })
}
export const findNewCartAPI = () =>{
    return request({
        url:'/member/cart',
       
    })
}
//刪除購物車
export const deleteCartAPI = (ids) =>{
    return request({
        url:'/member/cart',
        method:'DELETE',
        data:{
            ids
        }
       
    })
}
export const mergeCartAPI = (data) =>{
    return request({
        url:'/member/cart/merge',
        method:'POST',
        data
       
    })
}


