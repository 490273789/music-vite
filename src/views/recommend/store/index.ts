import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Banners, RecommendItem } from '../type'
import { getBannerRequest, getRecommendListRequest } from '@/api/index'

//声明状态进行接收
export interface recommendState {
  bannerList: Banners[]
  recommendList: RecommendItem[]
  enterLoading: boolean
}

const initialState: recommendState = {
  bannerList: [],
  recommendList: [],
  enterLoading: false
}

export const getBannerData = createAsyncThunk(
  'recommend/getBanners',
  async () => await getBannerRequest()
)

export const getRecommendData = createAsyncThunk(
  'recommend/getRecommend',
  async () => await getRecommendListRequest()
)

export const stuSlice = createSlice({
  name: 'recommend', //类似于命名空间，（取个名字）
  initialState, //引用你写的状态
  //reducers 里面包裹的是同步的方法
  reducers: {
    changeBannerList: (state, { payload }: PayloadAction<[]>) => {
      state.bannerList = payload
    },
    changeRecommendList: (state, { payload }: PayloadAction<[]>) => {
      state.recommendList = payload
    },
    changeEnterLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.enterLoading = payload
    }
  },

  //我们在extraReducers中放入的是异步的方法，我们在action中声明的TT方法可以在此处使用
  //在此处我们可以监听创建好的异步action，此处有三个取值是比较常用的
  // 1、fulfilled 成功之后需要做的操作
  // 2、pending 加载时需要做的操作
  // 3、rejected失败后需要做什么处理
  extraReducers(builder) {
    builder.addCase(getBannerData.fulfilled, (state, { payload }) => {
      state.bannerList = payload.banners
    })
    builder.addCase(getRecommendData.fulfilled, (state, { payload }) => {
      state.recommendList = payload.result
    })
  }
})

export default stuSlice.reducer
