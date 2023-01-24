import React, { useState, useEffect } from 'react'
import { Table, StatusCard } from './../components'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API } from './../configs'
import { toast } from 'react-toastify';

function Dashboard() {

  const [avions, setAvions] = useState(0)
  const [vols, setVols] = useState(0)
  const [imports, setImports] = useState(0)
  const [exports, setExports] = useState(0)

  const [factures, setFactures] = useState(0)
  const [controles, setControles] = useState(0)
  const [validations, setValidations] = useState(0)
  const [reclamations, setReclamations] = useState(0)
  const [anomalies, setAnomalies] = useState(0)

  const [body, setBody] = useState([]);

  useEffect(() => {
    fetchAPI();
  }, [])

  const fetchAPI = async () => {
    await axios.get(`${API}/data/counter`)
    .then((res) => {
      if(res.data.success) {
        setAvions(res.data.avions)
        setVols(res.data.vols)
        setImports(res.data.imports)
        setExports(res.data.exports)
        setFactures(res.data.factures)
        setReclamations(res.data.reclamations)
        setControles(res.data.controles)
        setValidations(res.data.valides)
        setAnomalies(res.data.anomalies)
      }
    })
  }

  const Head = ['Id', "Nom", "Pays", "Ville"]

  const renderHead = (item, index) => (
    <th key={index}>{item}</th>
  )

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.id}</td>
      <td>{item.user}</td>
      <td>{item.price}</td>
      <td>{item.date}</td>
    </tr>
  )
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <div>
      <h2 className="page-header">Dashboard</h2>

      {
        user.type === 'Agent' &&
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-12">
                  <StatusCard
                    icon="bx bxs-plane-alt"
                    count={avions}
                    title="Avions"
                  />
                  <StatusCard
                    icon="bx bxs-plane-take-off"
                    count={vols}
                    title="Vols"
                  />

                  <StatusCard
                    icon="bx bxs-chevrons-left"
                    count={imports}
                    title="Imports"
                  />

                  <StatusCard
                    icon="bx bxs-chevrons-right"
                    count={exports}
                    title="Exports"
                  />
                </div>
              </div>
            </div>


          </div>
      }

      {
        user.type === 'Controlleur' &&
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-12">
                  <StatusCard
                    icon="bx bx-calculator"
                    count={factures}
                    title="Factures"
                  />

                  <StatusCard
                    icon="bx bx-brain"
                    count={controles}
                    title="Factures Controlé"
                  />

                  {
                    /*<StatusCard
                    icon="bx bx-error"
                    count={anomalies}
                    title="Anomalies"
                  />*/}
                </div>
              </div>
            </div>
          </div>
      }


      {
        user.type === 'Approbateur' &&
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-12">

                  <StatusCard
                    icon="bx bxs-check-shield"
                    count={validations}
                    title="Factures Validé"
                  />

                  <StatusCard
                    icon="bx bx-angry"
                    count={reclamations}
                    title="Reclamations"
                  />

                </div>
              </div>
            </div>
          </div>
      }
    </div>
  )
}

export default Dashboard