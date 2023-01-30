// 歌手列表参数
export interface SingerListParams {
  type: string
  area: string
  initial: string
  offset: number
}

// 初始化状态
export interface InitSingerState extends SingerListParams {
  /** 歌手列表 */
  singerList: SingerObject[]
  // 第一次进入页面的加载动画
  enterLoading: boolean
  pullDownLoading: boolean
  pullUpLoading: boolean
}

// 歌手信息系
export interface SingerObject {
  name: string
  picUrl: string
  id: number
}

// 歌手接口返回些信息
export interface SingerDataResponse {
  artists: SingerObject[]
}

// 歌手列表组件的props
export interface SingerListProps {
  singerList: SingerObject[]
}
