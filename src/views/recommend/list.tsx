import styles from './index.module.scss'
import { useAppDispatch, useAppSelector } from '@/hooks/react-redux'
import { getRecommendData } from './store'
import { useEffect } from 'react'
import SvgIcon from '@/components/svg-icon'
const List = () => {
  const dispatch = useAppDispatch()

  const recommendList = useAppSelector((state) => state.recommend.recommendList)

  useEffect(() => {
    if (!recommendList.length) dispatch(getRecommendData())
  }, [recommendList, dispatch])

  return (
    <div>
      <h1 className={styles['list-title']}>推荐歌单</h1>
      <div className={styles['list-list']}>
        {recommendList.map((item) => {
          return (
            <div key={item.id} className={styles['list-item']}>
              <img src={item.picUrl + '?param=300x300'} width="100%" alt="" />
              <div className={styles['item-title']}>
                <SvgIcon name="list-earphone" width="12" height="12" />
                <span>{Math.floor(item.playCount / 10000)}万</span>
              </div>
              <div className={styles['item-name']}>{item.name}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
