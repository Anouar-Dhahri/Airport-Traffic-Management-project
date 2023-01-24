import React from 'react'
import { BrowserRouter, Routes, Route }from 'react-router-dom'
import {
  Login, 
  Dashboard, 
  Users, 
  UserForm, 
  Airports, 
  AirportForm, 
  Contracts, 
  ContractForm, 
  Profile
} from '../views'
import  AdminLayout  from '../layouts/AdminLayout'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route path='/admin' element={<AdminLayout />}>
          <Route path='dashboard' element={<Dashboard />}/>
          
          <Route path='users' element={<Users />}/>
          <Route path='adduser' element={<UserForm />}/>
          <Route path='edituser/:id' element={<UserForm />}/>

          <Route path='airports' element={<Airports />}/>
          <Route path='addairport' element={<AirportForm />}/>
          <Route path='editairport/:id' element={<AirportForm />}/>

          <Route path='contracts' element={<Contracts />}/>
          <Route path='addcontract' element={<ContractForm />}/>
          <Route path='editcontract/:id' element={<ContractForm />}/>

          <Route path='profile' element={<Profile />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter