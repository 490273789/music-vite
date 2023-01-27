import React, { Suspense, lazy, ReactNode } from 'react'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import Loading from '@/components/loading-v1'
import HomeLayout from '@/layout/home-layout'
import { isString } from '../utils/index'

export interface MetaProps {
  keepAlive?: boolean
  requiresAuth?: boolean
  title: string
  key?: string
}

interface RouteObject {
  caseSensitive?: boolean
  children?: RouteObject[]
  element?: React.ReactNode | string
  index?: false
  path?: string
  meta?: MetaProps
  isLink?: string
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomeLayout />,
    meta: { title: '首页' },
    children: [
      {
        path: '/',
        element: 'recommend',
        meta: {
          title: '推荐'
        }
      },
      {
        path: '/singer',
        element: 'singer',
        meta: { title: '歌手' }
      },
      {
        path: '/rank',
        element: 'rank',
        meta: {
          title: '排行榜'
        }
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
]

// 返回懒加载元素
const LazyElement = (path: string): ReactNode => {
  const ImportComponent = lazy(() => import(`@/views/${path}/index.tsx`))
  return (
    <Suspense fallback={<Loading />}>
      <ImportComponent />
    </Suspense>
  )
}

// 将懒加载元素安装到routes中
const handleFilterElement = (routes: RouteObject[]) => {
  const res: RouteObject[] = []
  routes.forEach((ele) => {
    const temp: RouteObject = { ...ele }
    if (ele.children?.length) temp.children = handleFilterElement(ele.children)
    if (isString(ele.element)) temp.element = LazyElement(ele.element as string)
    res.push(temp)
  })
  return res
}

const finalRoutes = createBrowserRouter(handleFilterElement(routes))

export default finalRoutes
