import { memo } from 'react'
import { SingerListProps } from '../type'
import styles from './singer-list.module.scss'
const SingerList = ({ singerList }: SingerListProps) => {
  return (
    <div className={styles['list']}>
      {singerList.map((singer) => {
        return <div key={singer.id}>{singer.name}</div>
      })}
    </div>
  )
}

export default memo(SingerList)
