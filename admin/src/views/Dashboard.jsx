import React, { useState, useEffect } from 'react'
import { StatusCard } from './../components'
import {
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Box, 
} from '@mui/material'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API } from './../configs'
import { toast } from 'react-toastify';

function Dashboard() {

  const [data, setData] = useState([])
  const [users, setUsers] = useState(0)
  const [airports, setAirports] = useState(0)
  const [contracts, setContracts] = useState(0)

  useEffect(() => {
    fetchAPI();
    FetchAirport()
  }, [])

  const fetchAPI = async () => {
    await axios.get(`${API}/data/counter`)
    .then((result) => {
      if(result.data.success){
        setUsers(result.data.users);
        setAirports(result.data.aeroport);
        setContracts(result.data.contrats);
      }
    }).catch((err) => {
      toast.error(err, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    })
  }

  const FetchAirport = async () => {
    await axios.get(`${API}/airports/get`)
    .then((res) => {
      if(res.data.success) {
        setData(res.data.aeroports)
      }
    })
  }

  return (
    <div>
      <h2 className="page-header">Dashboard</h2>
      <div className="row">
        <div className="col-6">
          <div className="row">
            <div className="col-12">
              <StatusCard
                icon="bx bx-user-pin"
                count={users}
                title="Users"
              />
              <StatusCard
                icon="bx bxs-factory"
                count={airports}
                title="Airport"
              />
              <StatusCard
                icon="bx bx-spreadsheet"
                count={contracts}
                title="Contracts"
              />
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card">
              <div className="card__header">
                  <h3>Latest Airports</h3>
              </div>
              <div className="card__body">
                <Box sx={{ width: '100%' }}>
                  <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer component={Paper}>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">Nom</TableCell>
                            <TableCell align="center">Ville</TableCell>
                            <TableCell align="center">Pays</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {data
                            .slice(0,5)
                            .map((row) => (
                              <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell align="center">{row.nom}</TableCell>
                                <TableCell align="center">{row.ville}</TableCell>
                                <TableCell align="center">{row.pays}</TableCell>
                              </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Box>
              </div>
              <div className="card__footer">
                  <Link to='/admin/airports'>view all</Link>
              </div>
          </div>
      </div>
      </div>
    </div>
  )
}

export default Dashboard