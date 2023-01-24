import React from 'react'
import { Link } from 'react-router-dom'
import SideBarItem from './SideBarItem'
import './SideBar.css'
import logo from './../../assets/images/logo.png'
import sidebar_items from '../../assets/jsons/sidebar_routes.json'

function SideBar(props) {

  //const activeItem = sidebar_items.findIndex(item => item.route === props.location.pathname)
  const user = JSON.parse(localStorage.getItem('user'))
  return (
    <div className='sidebar'>
      <div className="sidebar__logo">
          <img src={logo} alt="company logo" />
          <span>BLUE AIRLINE</span>
      </div>
      {
        sidebar_items.map((item, index) => (
          <Link to={item.route} key={index}>
          {
            user.type === item.user &&
              <SideBarItem
                title={item.display_name}
                icon={item.icon}
                //active={index === activeItem}
              />
          }

          </Link>
        ))
      }
    </div>
  )
}

export default SideBar