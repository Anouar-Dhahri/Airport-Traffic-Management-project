import React from 'react'
import { BrowserRouter, Routes, Route }from 'react-router-dom'
import {
  Login, 
  Dashboard, 
  Avions, 
  AvionForm, 
  Vols, 
  VolForm, 
  Factures, 
  FactureForm, 
  Anomalies, 
  AnomalieForm,
  Validation,
  Controle,
  ControleForm,
  Profile,
  Trade,
  TradeForm,
  Reclamation,
  ReclamationForm,
} from '../views'
import MainLayout  from '../layouts/MainLayout'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route path='/user' element={<MainLayout />}>
          <Route path='dashboard' element={<Dashboard />}/>

          <Route path='avions' element={<Avions />}/>
          <Route path='addavion' element={<AvionForm />}/>
          <Route path='editavion/:id' element={<AvionForm />}/>

          <Route path='vols' element={<Vols />}/>
          <Route path='addvol' element={<VolForm />}/>
          <Route path='editvol/:id' element={<VolForm />}/>

          <Route path='trade' element={<Trade />}/>
          <Route path='addTrade' element={<TradeForm />}/>
          <Route path='editTrade/:id' element={<TradeForm />}/>

          <Route path='factures' element={<Factures />}/>
          <Route path='addfacture' element={<FactureForm />}/>
          <Route path='editfacture/:id' element={<FactureForm />}/>

          <Route path='anomalies' element={<Anomalies />}/>
          <Route path='addanomalie/:factureId' element={<AnomalieForm />}/>
          <Route path='editanomalie/:id' element={<AnomalieForm />}/>

          <Route path='reclamations' element={<Reclamation />}/>
          <Route path='addreclamation/:factureId' element={<ReclamationForm />}/>
          <Route path='editreclamation/:id' element={<ReclamationForm />}/>

          <Route path='controlefacture' element={<Controle />}/>
          <Route path='addcontrolefacture/:factureId' element={<ControleForm />}/>
          <Route path='editcontrolefacture/:id' element={<ControleForm />}/>

          <Route path='validation' element={<Validation />}/>

          <Route path='profile' element={<Profile />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter