import {
  createHashRouter,
  RouterProvider,
  Navigate,
  useLocation,
} from 'react-router-dom'

import { ErrorPage, NotFoundPage } from '@components/Error'
import paths from '@constants/paths'
import { useStores } from '@stores'

import load from './load'
import Main from './containers/main'

import 'antd/dist/reset.css'
import './less/app.less'

const containerMap = {
  [paths.login]: 'user/login',
  [paths.register]: 'user/register',
}
const container = containerMap[location.pathname]

function RequireAuth({ children }) {
  const { userStore } = useStores()
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
