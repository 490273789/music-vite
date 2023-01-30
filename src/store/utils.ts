import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState, AppDispatch } from './index'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  rejectValue: string
  // extra: { s: string; n: number } // This is extra data prop, can leave it out if you are not passing extra data
}>()
