import styles from './index.module.scss'

export interface SvgIconProps {
  name: string
  prefix?: string
  color?: string
  width?: string
  height?: string
}

const SvgIcon = ({
  name,
  prefix = 'icon',
  color = '',
  ...props
}: SvgIconProps) => {
  const symbolId = `#${prefix}-${name}`

  return (
    <svg {...props} aria-hidden="true" className={styles['svg-icon']}>
      <use href={symbolId} fill={color} />
    </svg>
  )
}

export default SvgIcon
