import { memo } from 'react'
import { Outlet } from 'react-router-dom'
// import styles from './home-layout.module.scss'
import Header from './header'
import Tab from './tab'
const HomeLayout = () => {
  return (
    <div>
      <Header />
      <Tab />
      <Outlet />
    </div>
  )
}

export default memo(HomeLayout)
