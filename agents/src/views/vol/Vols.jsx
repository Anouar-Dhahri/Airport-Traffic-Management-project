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
import { API } from '../../configs'
import { toast } from 'react-toastify';

function Vols() {

  const [vols, setVols] = useState([]);

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
    await axios.get(`${API}/vols/get`)
    .then((res) => {
      if(res.data.success){
        setVols(res.data.vols)
      }
    })
  }

  const updateFlight = (id) => {
    navigate(`/user/editvol/${id}`)
  }

  const deleteFlight = async (id) => {
    await axios.delete(`${API}/vols/remove/${id}`)
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
      <h2 className="page-header">Vols</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__header">
                <h3>List Vol</h3>
            </div>
            <div className="card__body">
              <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="right">Date Vol</TableCell>
                          <TableCell align="right">Companie</TableCell>
                          <TableCell align="right">Date Depart</TableCell>
                          <TableCell align="right">Date Arrivee</TableCell>
                          <TableCell align="right">Heure Atterissage</TableCell>
                          <TableCell align="right">Heure Decollage</TableCell>
                          <TableCell align="right">Type Vol</TableCell>
                          <TableCell align="right">Prix Service</TableCell>
                          <TableCell align="right">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {vols
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row) => (
                            <TableRow
                              key={row._id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell align="right">{row.dateVol}</TableCell>
                              <TableCell align="right">{row.companie}</TableCell>
                              <TableCell align="right">{row.dateDepart}</TableCell>
                              <TableCell align="right">{row.dateArrivee}</TableCell>
                              <TableCell align="right">{row.heureAtterissage}</TableCell>
                              <TableCell align="right">{row.heureDecollage}</TableCell>
                              <TableCell align="right">{row.typeVol} </TableCell>
                              <TableCell align="right">{row.prixService} $</TableCell>
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
                                    <ListItemIcon onClick={()=>updateFlight(row._id)}>
                                      <Edit />
                                    </ListItemIcon>
                                    <ListItemText>Edit</ListItemText>
                                  </MenuItem>
                                  <MenuItem onClick={()=>deleteFlight(row._id)}>
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
                    count={vols.length}
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
      <Link to="/user/addvol">
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

export default Vols