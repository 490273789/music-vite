import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InitSingerState } from '../type'
import { getSingerListRequest, getHotSingerListRequest } from '@/api'
import { createAppAsyncThunk } from '@/store/utils'

// 获取热门歌手列表
export const getHotSingerData = createAppAsyncThunk(
  'singer/getHotSinger',
  async (_, thunkAPI) => {
    const { offset } = thunkAPI.getState().singer
    return await getHotSingerListRequest(offset)
  }
)

// 获取热门歌手列表
export const refreshMoreHotSingerData = createAppAsyncThunk(
  'singer/refreshMoreHotSinger',
  async (_, thunkAPI) => {
    const { offset } = thunkAPI.getState().singer
    return await getHotSingerListRequest(offset)
  }
)

// 获取歌手列表
export const getSingerData = createAppAsyncThunk(
  'singer/getSinger',
  async (_, thunkAPI) => {
    const { type, area, initial, offset } = thunkAPI.getState().singer
    return await getSingerListRequest({ type, area, initial, offset })
  }
)

// 加载更多歌手列表
export const refreshMoreSingerData = createAppAsyncThunk(
  'singer/refreshMoreSinger',
  async (_, thunkAPI) => {
    const { type, area, initial, offset } = thunkAPI.getState().singer
    const result = await getSingerListRequest({ type, area, initial, offset })
    return result?.artists || []
  }
)

// 初始化状态
const initialState: InitSingerState = {
  singerList: [],
  enterLoading: false,
  pullDownLoading: false,
  pullUpLoading: false,
  type: '',
  area: '',
  initial: '',
  offset: 0
}

const singerSlice = createSlice({
  name: 'singer',
  initialState,
  reducers: {
    updateType: (state, { payload }: PayloadAction<string>) => {
      state.type = payload
    },

    updateArea: (state, { payload }: PayloadAction<string>) => {
      state.area = payload
    },

    updateInitial: (state, { payload }: PayloadAction<string>) => {
      state.initial = payload
    },

    updateOffset: (state, { payload }: PayloadAction<number>) => {
      state.offset = payload
      console.log('1', state.offset)
    },

    changeEnterLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.enterLoading = payload
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
      state.singerList = payload?.artists || []
      state.offset = state.singerList.length
      state.enterLoading = false
      state.pullDownLoading = false
    })

    builder.addCase(
      refreshMoreHotSingerData.fulfilled,
      (state, { payload }) => {
        const result = payload?.artists || []
        state.singerList = [...state.singerList, ...result]
        state.offset = state.singerList.length
        state.pullUpLoading = false
      }
    )

    builder.addCase(getSingerData.fulfilled, (state, { payload }) => {
      state.singerList = payload?.artists || []
      state.offset = state.singerList.length
      state.enterLoading = false
      state.pullDownLoading = false
    })

    builder.addCase(refreshMoreSingerData.fulfilled, (state, { payload }) => {
      state.singerList = [...state.singerList, ...payload]
      state.offset = state.singerList.length
      state.pullUpLoading = false
    })
  }
})
export const {
  updateType,
  updateArea,
  updateInitial,
  updateOffset,
  changeEnterLoading,
  changePullUpLoading,
  changePullDownLoading
} = singerSlice.actions

export default singerSlice.reducer
