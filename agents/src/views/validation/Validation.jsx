import React, { useState, useEffect } from 'react'
import {
  Menu, 
  MenuItem, 
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
import { MoreVert, VerifiedUser, RemoveDone, SentimentDissatisfied } from '@mui/icons-material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API } from '../../configs'
import { toast } from 'react-toastify';

function Validation() {

  const [factures, setFactures] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate()

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
    await axios.get(`${API}/factures/get`)
    .then((res) => {
      if(res.data.success){
        setFactures(res.data.factures)
      }
    })
  }

  const addReclamation = (id) => {
    navigate(`/user/addreclamation/${id}`)
  }

  const valideFacture = async (id, valide) => {
    await axios.put(`${API}/factures/validate/${id}`,  { valide: valide})
    .then((res) => {
      if(res.data.success) {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        FetchAPI()
      }else {
        toast.error(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    })
  }

  return (
    <div>
      <h2 className="page-header">Factures</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__header">
                <h3>List Facture</h3>
            </div>
            <div className="card__body">
              <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Référence</TableCell>
                          <TableCell align="right">id Vol</TableCell>
                          <TableCell align="right">montantHt</TableCell>
                          <TableCell align="right">montantTtc</TableCell>
                          <TableCell align="right">Valide</TableCell>
                          <TableCell align="right">Type</TableCell>
                          <TableCell align="right">Date</TableCell>
                          <TableCell align="right">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {factures
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row) => (
                            <TableRow
                              key={row._id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell align="left">{row._id}</TableCell>
                              <TableCell align="right">{row.volId}</TableCell>
                              <TableCell align="right">{row.montantHt} $</TableCell>
                              <TableCell align="right">{row.montantTtc} $</TableCell>
                              <TableCell align="right">{row.valide === false ? 'false': 'true'}</TableCell>
                              <TableCell align="right">{row.type}</TableCell>
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
                                  <MenuItem onClick={()=>valideFacture(row._id, true)}>
                                    <ListItemIcon >
                                      <VerifiedUser />
                                    </ListItemIcon>
                                    <ListItemText>Valide</ListItemText>
                                  </MenuItem>
                                  <MenuItem onClick={()=>valideFacture(row._id, false)}>
                                    <ListItemIcon>
                                      <RemoveDone />
                                    </ListItemIcon>
                                    <ListItemText>Non Valide</ListItemText>
                                  </MenuItem>
                                  <MenuItem onClick={()=>addReclamation(row._id)}>
                                    <ListItemIcon >
                                      <SentimentDissatisfied />
                                    </ListItemIcon>
                                    <ListItemText>Reclamation</ListItemText>
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
                    count={factures.length}
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
    </div>
  )
}

export default Validation