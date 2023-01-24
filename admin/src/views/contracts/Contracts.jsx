import React, { useState, useEffect } from 'react'
import {
  Menu, 
  MenuItem, 
  Fab,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TablePagination,
  Paper,
  Box, 
  Button,
  ListItemText,
  ListItemIcon
} from '@mui/material'
import { MoreVert, Edit, Delete, Add } from '@mui/icons-material'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { API } from './../../configs'

function Contracts() {

  const [contracts, setContracts] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    FetchAPI();
  }, [])

  const FetchAPI = async () => {
    await axios.get(`${API}/contrats/get`)
    .then((res) => {
      if(res.data.success) {
        setContracts(res.data.contrats);
      }
    })
  }

  const updateContrat = (id) => {
    navigate(`/admin/editcontract/${id}`)
  }

  const deleteContract= async (id) => {
    await axios.delete(`${API}/contrats/remove/${id}`)
    .then((res) => {
      if(res.success) {
        console.log(res.message)
      }else {
        console.log(res.message)
      }
    })
  }

  return (
    <div>
      <h2 className="page-header">Contrats</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__header">
                <h3>List Contrat</h3>
            </div>
            <div className="card__body">
              <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Id</TableCell>
                          <TableCell align="right">Aeroport</TableCell>
                          <TableCell align="right">Date Validation</TableCell>
                          <TableCell align="right">Redevance Stationnement</TableCell>
                          <TableCell align="right">Redevance Sécurité</TableCell>
                          <TableCell align="right">Redevance Balissage</TableCell>
                          <TableCell align="right">Redevance Passerelle</TableCell>
                          <TableCell align="right">Redevance d'empbarquement</TableCell>
                          <TableCell align="right">Date</TableCell>
                          <TableCell align="right">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {contracts
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row) => (
                            <TableRow
                              key={row._id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {row._id}
                              </TableCell>
                              <TableCell align="right">{row.aeroport}</TableCell>
                              <TableCell align="right">{row.dateValidationStart+' - '+ row.dateValidationEnd}</TableCell>
                              <TableCell align="right">{row.totalStationnement} $</TableCell>
                              <TableCell align="right">{row.totalBalisage} $</TableCell>
                              <TableCell align="right">{row.totalBalisage} $</TableCell>
                              <TableCell align="right">{row.totalPasserelle} $</TableCell>
                              <TableCell align="right">{row.totalEmbarquement} $</TableCell>
                              <TableCell align="right">
                                {
                                  new Date(row.createdAt).toLocaleDateString()+' '+new Date(row.createdAt).toLocaleTimeString()
                                }
                              </TableCell>
                              <TableCell align="right">
                                <Button
                                  id="basic-button"
                                  aria-controls={open ? 'basic-menu' : undefined}
                                  aria-haspopup="true"
                                  aria-expanded={open ? 'true' : undefined}
                                  onClick={handleClick}
                                >
                                  <MoreVert />
                                </Button>
                                <Menu
                                  id="basic-menu"
                                  anchorEl={anchorEl}
                                  open={open}
                                  onClose={handleClose}
                                  MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                  }}
                                >
                                  <MenuItem onClick={() => updateContrat(row._id)}>
                                    <ListItemIcon>
                                      <Edit />
                                    </ListItemIcon>
                                    <ListItemText>Edit</ListItemText>
                                  </MenuItem>
                                  <MenuItem onClick={() => deleteContract(row._id)}>
                                    <ListItemIcon>
                                      <Delete />
                                    </ListItemIcon>
                                    <ListItemText>Delete</ListItemText>
                                  </MenuItem>
                                </Menu>
                              </TableCell>
                            </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={contracts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
              </Box>
            </div>
          </div>
        </div>
      </div>
      <Link to="/admin/addcontract">
        <Fab 
          color="primary" 
          aria-label="add" 
          style={{
            position:'absolute', 
            right:0, 
            bottom:0, 
            margin:'30px'
          }}
        >
          <Add />
        </Fab>
      </Link>
    </div>
  )
}

export default Contracts