import Scroll from '@/components/scroll'
import { useRef, useEffect } from 'react'
import styles from './horizon.module.scss'

export interface HorizonProps {
  list: categoryData[]
  currentVal: string
  title: string
  handleClick: (key: string, type: string) => any
}

export interface categoryData {
  name: string
  key: string
}

const Horizon = (props: HorizonProps) => {
  const { list, currentVal, title, handleClick } = props
  const category = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const categoryDom = category.current as HTMLDivElement
    const tagElements = categoryDom.querySelectorAll('span') || []

    const containerWidth = Array.from(tagElements).reduce(
      (pre, ele) => pre + ele.offsetWidth,
      0
    )
    categoryDom.style.width = `${containerWidth}px`
  }, [])

  // 点击每一项
  const handleClickItem = (ele: categoryData) => {
    handleClick(ele.key, title)
  }

  return (
    <Scroll direction={'horizontal'} refresh={true}>
      <div className={styles['horizontal-wrap']} ref={category}>
        <span>{title}</span>
        {list.map((ele) => {
          return (
            <span
              key={ele.key}
              className={ele.key === currentVal ? styles.selected : ''}
              onClick={() => handleClickItem(ele)}
            >
              {ele.name}
            </span>
          )
        })}
      </div>
    </Scroll>
  )
}

export default Horizon
