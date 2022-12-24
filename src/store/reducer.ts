import { combineReducers } from '@reduxjs/toolkit'
import recommendReducer from '@/views/recommend/store'
import singer from '@/views/singer/store'
const reducers = {
  recommend: recommendReducer,
  singer: singer
}

const rootReducer = combineReducers(reducers)

export default rootReducer
