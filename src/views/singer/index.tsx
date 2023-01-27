import { memo, useEffect, useRef } from 'react'
import styles from './index.module.scss'
import Horizon from './components/horizon'
import SingerList from '@/views/singer/components/signer-list'
import Scroll from '@components/scroll'
import Loading from '@components/loading-v1'
import { forceCheck } from 'react-lazyload'
import { categoryTypes, areaTypes, alphaTypes } from '@/utils/map'
import { useAppDispatch, useAppSelector } from '@/hooks/react-redux'
import { changeParams, getSingerData, getHotSingerData } from './store'
import { SingerListParams } from './type'

const Singer = () => {
  const scrollRef = useRef(null)
  const dispatch = useAppDispatch()

  const params = useAppSelector((state) => state.singer.params)
  const singerList = useAppSelector((state) => state.singer.singerList)
  const enterLoading = useAppSelector((state) => state.singer.enterLoading)
  const pullDownLoading = useAppSelector(
    (state) => state.singer.pullDownLoading
  )
  const pullUpLoading = useAppSelector((state) => state.singer.pullUpLoading)

  // 初始化获取热门歌手列表
  useEffect(() => {
    dispatch(getHotSingerData())
  }, [dispatch])

  // 切换条件调用接口
  const requestSinger = (data: SingerListParams) => {
    dispatch(changeParams(data))
    dispatch(getSingerData(data))
  }

  // 更换分类
  const changeCategory = (val: string) => {
    requestSinger({ ...params, type: val, offset: 0 })
  }

  // 更换地区
  const changeArea = (val: string) => {
    requestSinger({ ...params, area: val, offset: 0 })
  }

  // 更换首字母
  const changeAlpha = (val: string) => {
    requestSinger({ ...params, initial: val, offset: 0 })
  }

  // // 下拉刷新
  const pullDownRefresh = () => {
    console.log('下拉刷新')
  }

  // // 上拉刷新
  const pullUpRefresh = () => {
    console.log('上拉刷新')
  }

  return (
    <div>
      <div className={styles['nav-wrap']}>
        <Horizon
          list={categoryTypes}
          currentVal={params.type}
          title="分类（默认热门）："
          handleClick={changeCategory}
        />
        <Horizon
          list={areaTypes}
          currentVal={params.area}
          title="地区："
          handleClick={changeArea}
        />
        <Horizon
          list={alphaTypes}
          currentVal={params.initial}
          title="首字母："
          handleClick={changeAlpha}
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
