import React, { useEffect } from 'react'
import './MainLayout.css'
import { SideBar, TopNav } from '../components'
import { Outlet } from 'react-router-dom';

function MainLayout() {

  return (
    <div className='layout'>
      <SideBar/>
      <div className="layout__content">
          <TopNav/>
          <div className="layout__content-main">
            <Outlet />
          </div>
      </div>
    </div>
  )
}

export default MainLayout