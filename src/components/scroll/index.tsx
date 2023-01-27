import {
  forwardRef,
  memo,
  ReactElement,
  useRef,
  useState,
  useEffect,
  useImperativeHandle
} from 'react'
import BScroll, { BScrollInstance } from '@better-scroll/core'
import PullUp from '@better-scroll/pull-up'
import PullDown from '@better-scroll/pull-down'
import { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll'
import styles from './index.module.scss'
import Loading from '@components/loading-v1'
import LoadingV2 from '@components/loading-v2'

export interface ScrollProps {
  // 横向或竖向滚动
  direction?: 'vertical' | 'horizontal'
  // 默认会禁用掉原生的click事件
  click?: boolean
  // 是否刷新
  refresh?: boolean
  // scroll的事件回调函数
  onScroll?: () => void
  pullUp?: () => void
  pullDown?: () => void
  pullUpLoading?: boolean
  pullDownLoading?: boolean
  // 当滚动超过边缘的时候会有一小段回弹动画。设置为 true 则开启动画。
  bounceTop?: boolean
  bounceBottom?: boolean
  children?: ReactElement
}

BScroll.use(PullUp)
BScroll.use(PullDown)

const Scroll = forwardRef(
  (
    {
      direction = 'vertical',
      click = true,
      refresh = true,
      onScroll,
      pullUp,
      pullDown,
      pullUpLoading = false,
      pullDownLoading = false,
      bounceTop = true,
      bounceBottom = true,
      children
    }: ScrollProps,
    ref
  ) => {
    const [bScroll, setBScroll] = useState<BScrollConstructor>()
    // 滚动的元素
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    // 创建实例
    useEffect(() => {
      const scroll = new BScroll(scrollContainerRef.current as HTMLDivElement, {
        scrollX: direction === 'horizontal',
        scrollY: direction === 'vertical',
        probeType: 3, //probeType 为 3，任何时候都派发 scroll 事件，包括调用 scrollTo 或者触发 momentum 滚动动画
        click: click,
        bounce: {
          top: bounceTop,
          bottom: bounceBottom
        }
      })
      setBScroll(scroll)
      return () => setBScroll(undefined)
    }, [bounceTop, bounceBottom, click, direction])

    // 滚动时触发
    useEffect(() => {
      if (!bScroll || !onScroll) return
      bScroll.on('scroll', onScroll)
      return () => {
        bScroll.off('scroll', onScroll)
      }
    }, [onScroll, bScroll])

    // 上拉刷新
    useEffect(() => {
      if (!bScroll || !pullUp) return
      const handlePullUp = () => {
        // bScroll.y和bScroll.maxScrollY都为负数
        if (bScroll.y <= bScroll.maxScrollY + 100) pullUp()
      }
      // 监听滚动停止事件
      bScroll.on('scrollEnd', handlePullUp)
      return () => {
        bScroll.off('scrollEnd', handlePullUp)
      }
    }, [bScroll, pullUp])

    // 下拉刷新
    useEffect(() => {
      if (!bScroll || !pullDown) return
      const handlePullDown = (event: BScrollInstance) => {
        if (event.y > 50) pullDown()
      }
      bScroll.on('touchEnd', handlePullDown)
      return () => {
        bScroll.off('touchEnd', handlePullDown)
      }
    }, [bScroll, pullDown])

    // 刷新scroll
    useEffect(() => {
      if (refresh && bScroll) {
        bScroll.refresh()
      }
    })

    // 给ref添加不同的方法
    useImperativeHandle(ref, () => ({
      refresh() {
        if (bScroll) {
          bScroll.refresh()
          bScroll.scrollTo(0, 0)
        }
      },
      getBScroll() {
        if (bScroll) {
          return bScroll
        }
      }
    }))

    return (
      <div className={styles['scroll-container']} ref={scrollContainerRef}>
        {children}
        {pullDownLoading && (
          <div className={styles['pull-up']}>
            <Loading />
          </div>
        )}
        {pullUpLoading && (
          <div className={styles['pull-down']}>
            <LoadingV2 />
          </div>
        )}
      </div>
    )
  }
)
Scroll.displayName = 'Scroll'

export default memo(Scroll)
