import {
  forwardRef,
  memo,
  ReactElement,
  useRef,
  useState,
  useImperativeHandle
} from 'react'
import BScroll, { BScrollInstance } from '@better-scroll/core'
import styles from './index.module.scss'
import { useEffect } from 'react'
import { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll'

export interface ScrollProps {
  direction?: 'vertical' | 'horizontal'
  click?: boolean
  refresh?: boolean
  onScroll?: () => undefined
  pullUp?: () => undefined
  pullDown?: () => undefined
  pullUpLoading?: false
  pullDownLoading?: false
  bounceTop?: true
  bounceBottom?: true
  children?: ReactElement
}

const Scroll = forwardRef(
  (
    {
      direction = 'vertical',
      click = true,
      refresh = true,
      onScroll,
      pullUp,
      pullDown,
      bounceTop = true,
      bounceBottom = true,
      children
    }: ScrollProps,
    ref
  ) => {
    const [bScroll, setBScroll] = useState<BScrollConstructor>()

    const scrollContainerRef = useRef<HTMLDivElement>(null)

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
        if (bScroll.y <= bScroll.maxScrollY + 100) pullUp()
      }
      bScroll.on('scrollEnd', handlePullUp)
      return () => {
        bScroll.off('scrollEnd', handlePullUp)
      }
    }, [bScroll, pullUp])

    // 下拉刷新
    useEffect(() => {
      if (!bScroll || !pullDown) return

      const handlePullDown = (event: BScrollInstance) => {
        console.log(event)
        if (event.y > 50) pullDown()
      }

      bScroll.on('touchEnd', handlePullDown)

      return () => {
        bScroll.off('touchEnd', handlePullDown)
      }
    }, [bScroll, pullDown])

    useEffect(() => {
      if (refresh && bScroll) {
        bScroll.refresh()
      }
    }, [refresh, bScroll])

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
        <div></div>
      </div>
    )
  }
)
Scroll.displayName = 'Scroll'

export default memo(Scroll)
