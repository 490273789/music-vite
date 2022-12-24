import { memo } from 'react'
import styles from './index.module.scss'

const Loading = () => {
  return (
    <div className={styles['loading-wrap']}>
      <div></div>
      <div></div>
    </div>
  )
}

export default memo(Loading)
