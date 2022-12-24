import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './home-layout.module.scss'
interface TabList {
  name: string
  path: string
}
const tabList = [
  { name: '推荐', path: '/' },
  { name: '歌手', path: '/singer' },
  { name: '排行榜', path: '/rank' }
]
const Tab = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(() => location.pathname)

  const clickTab = (item: TabList) => {
    setActiveTab(item.path)
    navigate(item.path)
  }
  return (
    <ul className={styles['tab-wrap']}>
      {tabList.map((ele) => (
        <li key={ele.name} onClick={() => clickTab(ele)}>
          <span
            className={`${styles['tab-name']} ${
              activeTab === ele.path && styles['active']
            }`}
          >
            {ele.name}
          </span>
        </li>
      ))}
    </ul>
  )
}

export default Tab
