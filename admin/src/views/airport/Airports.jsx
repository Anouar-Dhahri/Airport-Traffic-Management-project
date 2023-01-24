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
import { toast } from 'react-toastify';

function Airports() {

  const [aeroports, setAeroports] = useState([]);

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
    await axios.get(`${API}/airports/get`)
    .then((res) => {
      if(res.data.success){
        setAeroports(res.data.aeroports)
      }
    })
  }

  const updateAeroport = (id) => {
    navigate(`/admin/editairport/${id}`)
  }

  const deleteAeroport = async (id) => {
    await axios.delete(`${API}/airports/remove/${id}`)
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
      <h2 className="page-header">Aeroports</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__header">
                <h3>List Aeroport</h3>
            </div>
            <div className="card__body">
              <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Id</TableCell>
                          <TableCell align="right">Nom</TableCell>
                          <TableCell align="right">Ville</TableCell>
                          <TableCell align="right">Pays</TableCell>
                          <TableCell align="right">Date</TableCell>
                          <TableCell align="right">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {aeroports
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row) => (
                            <TableRow
                              key={row._id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {row._id}
                              </TableCell>
                              <TableCell align="right">{row.nom}</TableCell>
                              <TableCell align="right">{row.ville}</TableCell>
                              <TableCell align="right">{row.pays}</TableCell>
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
                                  <MenuItem>
                                    <ListItemIcon onClick={()=>updateAeroport(row._id)}>
                                      <Edit />
                                    </ListItemIcon>
                                    <ListItemText>Edit</ListItemText>
                                  </MenuItem>
                                  <MenuItem onClick={()=>deleteAeroport(row._id)}>
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
                    count={aeroports.length}
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
      <Link to="/admin/addairport">
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

export default Airports