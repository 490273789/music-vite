import React from 'react'
import styles from './index.module.scss'

function LoadingV2() {
  return (
    <div className={styles['loading-wrap']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <span>拼命加载中...</span>
    </div>
  )
}

export default React.memo(LoadingV2)
