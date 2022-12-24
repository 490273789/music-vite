import SwiperCore, { Autoplay, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import styles from './index.module.scss'

SwiperCore.use([Autoplay])

export interface SliderProps {
  list: SliderList[]
}

export interface SliderList {
  imageUrl: string
}

const Slider = ({ list = [] }: SliderProps) => {
  return (
    <div className={styles['slider-wrap']}>
      <div className={styles.before}></div>
      <Swiper
        className={styles['swiper-wrap']}
        modules={[Pagination]}
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination
      >
        {list.map((slider) => {
          return (
            <SwiperSlide key={slider.imageUrl}>
              <img
                src={slider.imageUrl}
                width="100%"
                height="100%"
                alt="推荐"
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default Slider
