import { Outlet } from 'react-router-dom'

export default function Main() {
  return (
    <div className="app-layout">
      <div className="app-header">Header</div>
      <div className="app-content">
        <Outlet />
      </div>

      <div className="app-footer">Footer</div>
    </div>
  )
}
