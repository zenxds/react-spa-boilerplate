import {
  createHashRouter,
  RouterProvider,
  Navigate,
  useLocation,
} from 'react-router-dom'
import loadable from '@loadable/component'
import { Spin } from 'antd'

import { ErrorPage, NotFoundPage } from '@/components/Error'
import { paths } from '@/constants'
import { useGlobalStores } from '@/stores'

import Home from './containers/home'
import Login from './containers/user/login'
import Register from './containers/user/register'

import Main from './containers/main'

function load(page: string) {
  const map: Record<string, any> = {
    home: Home,
    'user/login': Login,
    'user/register': Register,
  }

  // const Com = loadable(() => import(`./containers/${page}`), {
  //   fallback: (
  //     <div className="page-loading">
  //       <Spin />
  //     </div>
  //   ),
  // })

  const Com = map[page]
  return <Com />
}

import './styles/global.less'

const containerMap = {
  [paths.login]: 'user/login',
  [paths.register]: 'user/register',
}
const container = containerMap[location.pathname]

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { userStore } = useGlobalStores()
  const location = useLocation()

  if (!userStore.isLogin) {
    return <Navigate to={paths.login} state={{ from: location }} replace />
  }

  return children
}

/**
 * loader 获取数据，然后在组件里用useLoaderData访问数据
 */
const router = createHashRouter([
  {
    path: paths.login,
    element: load('user/login'),
  },
  {
    path: paths.register,
    element: load('user/register'),
  },
  {
    path: '/',
    element: container ? (
      load(container)
    ) : (
      <RequireAuth>
        <Main />
      </RequireAuth>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: load('home'),
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
