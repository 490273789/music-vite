import { memo, useEffect } from 'react'
import Slider from '@/components/slider'
import { useAppDispatch, useAppSelector } from '@/hooks/react-redux'
import { getBannerData } from './store'
import List from './list'
import Scroll from '@/components/scroll'
import styles from './index.module.scss'

const Recommend = () => {
  const dispatch = useAppDispatch()

  const bannerList = useAppSelector((state) => state.recommend.bannerList)

  useEffect(() => {
    if (!bannerList.length) dispatch(getBannerData())
  }, [bannerList, dispatch])

  return (
    <div className={styles['recommend-wrap']}>
      <Scroll>
        <div>
          <Slider list={bannerList} />
          <List />
        </div>
      </Scroll>
    </div>
  )
}

export default memo(Recommend)
