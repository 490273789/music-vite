import { memo } from 'react'
import LazyLoad from 'react-lazyload'
import { SingerListProps } from '../type'
import styles from './singer-list.module.scss'
import img from './singer.png'

const SingerList = ({ singerList }: SingerListProps) => {
  return (
    <div className={styles['list']}>
      {singerList.map((singer) => {
        return (
          <div key={singer.id} className={styles['singer-item']}>
            <div className={styles['singer-pic']}>
              <LazyLoad
                placeholder={<img width="100%" height="100%" src={img} />}
              >
                <img
                  width="100%"
                  height="100%"
                  src={`${singer.picUrl}?param=300x300`}
                />
              </LazyLoad>
            </div>

            <span className={styles['singer-name']}>{singer.name}</span>
          </div>
        )
      })}
    </div>
  )
}

export default memo(SingerList)
