import { memo, useEffect, useRef } from 'react'
import Horizon from './components/horizon'
import SingerList from '@/views/singer/components/signer-list'
import Scroll from '@components/scroll'
import Loading from '@components/loading-v1'
import { forceCheck } from 'react-lazyload'
import { categoryTypes, areaTypes, alphaTypes } from '@/utils/map'
import { useAppDispatch, useAppSelector } from '@/hooks/react-redux'
import {
  getSingerData,
  refreshMoreHotSingerData,
  refreshMoreSingerData,
  getHotSingerData,
  updateType,
  updateArea,
  updateInitial,
  updateOffset,
  changeEnterLoading,
  changePullUpLoading,
  changePullDownLoading
} from './store'
import styles from './index.module.scss'

enum selectClass {
  'TYPE' = '分类（默认热门）：',
  'AREA' = '地区：',
  'INITIAL' = '首字母：'
}

const Singer = () => {
  const scrollRef = useRef(null)
  const dispatch = useAppDispatch()

  const type = useAppSelector((state) => state.singer.type)
  const area = useAppSelector((state) => state.singer.area)
  const initial = useAppSelector((state) => state.singer.initial)
  const singerList = useAppSelector((state) => state.singer.singerList)
  const enterLoading = useAppSelector((state) => state.singer.enterLoading)
  const pullDownLoading = useAppSelector(
    (state) => state.singer.pullDownLoading
  )
  const pullUpLoading = useAppSelector((state) => state.singer.pullUpLoading)

  const isHot = () => type === '' && area === '' && initial === ''

  // 初始化获取热门歌手列表
  useEffect(() => {
    if (!singerList.length) {
      dispatch(changeEnterLoading(true))
      dispatch(getHotSingerData())
    }
  }, [dispatch])

  // // 下拉刷新
  const pullDownRefresh = () => {
    dispatch(changePullDownLoading(true))
    dispatch(updateOffset(0))
    isHot() ? dispatch(getHotSingerData()) : dispatch(getSingerData())
  }

  // // 上拉刷新
  const pullUpRefresh = () => {
    dispatch(changePullUpLoading(true))
    isHot()
      ? dispatch(refreshMoreHotSingerData())
      : dispatch(refreshMoreSingerData())
  }

  /**
   * 切换分类
   * @param val 选择的值
   * @param filter 哪个分类
   */
  const exchangeClass = (val: string, filter: string) => {
    switch (filter) {
      case selectClass.AREA:
        dispatch(updateArea(val))
        break
      case selectClass.TYPE:
        dispatch(updateType(val))
        break
      case selectClass.INITIAL:
        dispatch(updateInitial(val))
        break
      default:
        return
    }
    dispatch(updateOffset(0))
    dispatch(getSingerData())
  }

  return (
    <div>
      <div className={styles['nav-wrap']}>
        <Horizon
          list={categoryTypes}
          currentVal={type}
          title={selectClass.TYPE}
          handleClick={exchangeClass}
        />
        <Horizon
          list={areaTypes}
          currentVal={area}
          title={selectClass.AREA}
          handleClick={exchangeClass}
        />
        <Horizon
          list={alphaTypes}
          currentVal={initial}
          title={selectClass.INITIAL}
          handleClick={exchangeClass}
        />
      </div>
      <div className={styles['list-container']}>
        <Scroll
          ref={scrollRef}
          onScroll={forceCheck}
          pullUp={pullUpRefresh}
          pullDown={pullDownRefresh}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
        >
          <SingerList singerList={singerList} />
        </Scroll>
      </div>
      {enterLoading && <Loading />}
    </div>
  )
}

export default memo(Singer)
