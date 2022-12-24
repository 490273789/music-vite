import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { InitSingerState, SingerListParams } from '../type'
import { getSingerListRequest, getHotSingerListRequest } from '@/api'

// 获取热门歌手列表
export const getHotSingerData = createAsyncThunk(
  'singer/getHotSinger',
  async () => await getHotSingerListRequest(0)
)

// 获取歌手列表
export const getSingerData = createAsyncThunk(
  'singer/getSinger',
  async (params: SingerListParams) => await getSingerListRequest(params)
)

// 初始化状态
const initialState: InitSingerState = {
  singerList: [],
  enterLoading: true,
  pullDownLoading: false,
  pullUpLoading: false,
  params: {
    type: '',
    area: '',
    initial: '',
    offset: 0
  }
}

const singerSlice = createSlice({
  name: 'singer',
  initialState,
  reducers: {
    changeParams: (state, { payload }: PayloadAction<SingerListParams>) => {
      state.params = payload
    },

    changeEnterLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.pullUpLoading = payload
    },

    changePullUpLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.pullUpLoading = payload
    },

    changePullDownLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.pullDownLoading = payload
    }
  },
  extraReducers(builder) {
    builder.addCase(getHotSingerData.fulfilled, (state, { payload }) => {
      state.singerList = payload.artists
      if (state.enterLoading) state.enterLoading = false
    })
    builder.addCase(getSingerData.fulfilled, (state, { payload }) => {
      state.singerList = payload.artists
    })
  }
})
export const {
  changeEnterLoading,
  changePullUpLoading,
  changePullDownLoading,
  changeParams
} = singerSlice.actions
export default singerSlice.reducer
