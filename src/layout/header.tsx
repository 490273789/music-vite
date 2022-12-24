import styles from './home-layout.module.scss'
import SvgIcon from '@/components/svg-icon'

const Header = () => {
  return (
    <div className={styles.header}>
      <SvgIcon name="header-catalog" width="25" />
      <span>云音乐</span>
      <SvgIcon name="header-search" width="25" />
    </div>
  )
}
export default Header
