import React, { useState, useEffect } from 'react'
import './TopNav.css'
import { Link,useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Dropdown from '../Dropdown/Dropdown'

import user_image from '../../assets/images/user.png'

import user_menu from '../../assets/jsons/user_menus.json'

function TopNav() {
  const [user, setUser] = useState({})
  const navigate = useNavigate();

  useEffect(() => {
    userData();
  }, [])

  const userData = async () => {
    const token = localStorage.getItem('token')
    if(token == null || token == undefined){
      navigate('')
      toast.error('Not Authorized, Please Login', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }else {
      const user = JSON.parse(localStorage.getItem('user'))
      setUser(user)
    }
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  }

  const curr_user = {
    display_name: user.nom + ' '+ user.prenom,
    image: user_image
  }
  
  const renderUserToggle = (user) => (
      <div className="topnav__right-user">
        <div className="topnav__right-user__image">
            <img src={user.image} alt="" />
        </div>
        <div className="topnav__right-user__name">
            {user.display_name}
        </div>
      </div>
  )
  
  const renderUserMenu =(item, index) => (
    <Link to={item.route} key={index}>
      <div className="notification-item" >
          <i className={item.icon}></i>
          <span>{item.content}</span>
      </div>
    </Link>
  )

  return (
    <div className='topnav'>
      <div className="topnav__search">
      
        <span><i className='bx bx-menu-alt-left' ></i> Espace {user.type}</span>
      </div>
        <div className="topnav__right">
            <div className="topnav__right-item">
              <Dropdown
                customToggle={() => renderUserToggle(curr_user)}
                contentData={user_menu}
                renderItems={(item, index) => renderUserMenu(item, index)}
              />
            </div>
            <div className="topnav__right-item">

            </div>
        </div>
    </div>
  )
}

export default TopNav