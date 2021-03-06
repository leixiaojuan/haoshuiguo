import Taro from '@tarojs/taro'
import { getHomeSwiperReq, getHomeCategoryReq, getHomeNewProductReq, getRecommendProductReq,getHotProductReq } from './api'

// Actions
const UPDATE = 'HOME_UPDATE'

// Reducer
const initState = {
  init: false,
  swiperData: [],       //轮播图
  categoryData: [],     //分类
  newProductData: [],   //新品上市
  recommendProductData: [],   //新品上市
  hotProductData: [],   //热门产品
}

export const home = (state = initState, action) => {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

// Action Creators
export const homeUpdate = params => ({
  payload: params,
  type: UPDATE,
})

export const homeInit = (isRefresh,callback) => async (dispatch, getState) => {
  const { init } = getState().home
  if (init && !isRefresh) return
  Taro.showLoading({title: '加载中'})
  const [swiperReq, categoryReq, newProductReq, recommendProductReq,hotProductReq] = await Promise.all([
    getHomeSwiperReq(),
    getHomeCategoryReq(),
    getHomeNewProductReq(),
    getRecommendProductReq(),
    getHotProductReq()
  ])
  dispatch(homeUpdate({
    init: true,
    swiperData: swiperReq.data,
    categoryData: categoryReq.data,
    newProductData: newProductReq.data,
    recommendProductData: recommendProductReq.data,
    hotProductData:hotProductReq.data
  }))
  if(typeof callback === 'function'){
    callback()
  }
  Taro.hideLoading()
}
