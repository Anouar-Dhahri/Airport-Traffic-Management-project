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
import { MoreVert, Edit, Delete, Add, WarningAmber } from '@mui/icons-material'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { API } from '../../configs'
import { toast } from 'react-toastify';

function Reclamation() {

  const [reclamations, setReclamations] = useState([]);

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
    await axios.get(`${API}/reclamations/get`)
    .then((res) => {
      if(res.data.success){
        setReclamations(res.data.reclamations)
      }
    })
  }

  const updateReclamation = (id) => {
    navigate(`/user/editreclamation/${id}`)
  }

  const deleteReclamation = async (id) => {
    await axios.delete(`${API}/reclamations/remove/${id}`)
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
      <h2 className="page-header">R??clamations</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__header">
                <h3>List R??clamation</h3>
            </div>
            <div className="card__body">
              <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">R??f??rence</TableCell>
                          <TableCell align="right">Facture Id</TableCell>
                          <TableCell align="right">D??scription</TableCell>
                          <TableCell align="right">Date</TableCell>
                          <TableCell align="right">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {reclamations
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row) => (
                            <TableRow
                              key={row._id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell align="left">{row._id}</TableCell>
                              <TableCell align="right">{row.factureId}</TableCell>
                              <TableCell align="right">{row.description}</TableCell>
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
                                  <MenuItem onClick={()=>updateReclamation(row._id)}>
                                    <ListItemIcon>
                                      <Edit />
                                    </ListItemIcon>
                                    <ListItemText>Edit</ListItemText>
                                  </MenuItem>
                                  <MenuItem onClick={()=>deleteReclamation(row._id)}>
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
                    count={reclamations.length}
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

export default Reclamation