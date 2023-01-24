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
  ListItemIcon,
  Tabs,
  Tab,
  Typography
} from '@mui/material'
import PropTypes from 'prop-types';
import { MoreVert, Edit, Delete, Add } from '@mui/icons-material'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { API } from '../../configs'
import { toast } from 'react-toastify';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Trade() {

  const [value, setValue] = useState(0);
  const [imports, setImports] = useState([])
  const [exports, setExports] = useState([])

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    FetchAPI();
  }, [])

  const FetchAPI = async () => {
    await axios.get(`${API}/trades/get`)
    .then((res) => {
      if(res.data.success){
        setImports(res.data.imports)
        setExports(res.data.exports)
      }
    })
  }

  const updateTrade = (id) => {
    navigate(`/user/editTrade/${id}`)
  }

  const deleteTrade = async (id) => {
    await axios.delete(`${API}/trades/remove/${id}`)
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
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Imports" {...a11yProps(0)} />
            <Tab label="Exports" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Client</TableCell>
                      <TableCell align="right">Escale</TableCell>
                      <TableCell align="right">Designation</TableCell>
                      <TableCell align="right">Tonnage</TableCell>
                      <TableCell align="right">Pays Depart</TableCell>
                      <TableCell align="right">Pays Arrivee</TableCell>
                      <TableCell align="right">Prix Service</TableCell>
                      <TableCell align="right">Avions</TableCell>
                      <TableCell align="right">Date</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {imports
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <TableRow
                          key={row._id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="right">{row.client}</TableCell>
                          <TableCell align="right">{row.escale}</TableCell>
                          <TableCell align="right">{row.designation} </TableCell>
                          <TableCell align="right">{row.tonnageTotal} Tonne</TableCell>
                          <TableCell align="right">{row.paysDepart}</TableCell>
                          <TableCell align="right">{row.paysArrivee}</TableCell>
                          <TableCell align="right">{row.prixService} $</TableCell>
                          <TableCell align="right">
                            {
                              row.avions.map((item, index) => (
                                <span key={index}>{item.nom}, </span>
                              ))
                            }
                          </TableCell>
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
                                <ListItemIcon onClick={()=>updateTrade(row._id)}>
                                  <Edit />
                                </ListItemIcon>
                                <ListItemText>Edit</ListItemText>
                              </MenuItem>
                              <MenuItem onClick={()=>deleteTrade(row._id)}>
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
                count={imports.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Client</TableCell>
                      <TableCell align="right">Escale</TableCell>
                      <TableCell align="right">Designation</TableCell>
                      <TableCell align="right">Tonnage</TableCell>
                      <TableCell align="right">Pays Depart</TableCell>
                      <TableCell align="right">Pays Arrivee</TableCell>
                      <TableCell align="right">Prix Service</TableCell>
                      <TableCell align="right">Avions</TableCell>
                      <TableCell align="right">Date</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {exports
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <TableRow
                          key={row._id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="right">{row.client}</TableCell>
                          <TableCell align="right">{row.escale}</TableCell>
                          <TableCell align="right">{row.designation} </TableCell>
                          <TableCell align="right">{row.tonnageTotal} Tonne</TableCell>
                          <TableCell align="right">{row.paysDepart}</TableCell>
                          <TableCell align="right">{row.paysArrivee}</TableCell>
                          <TableCell align="right">{row.prixService} $</TableCell>
                          <TableCell align="right">
                            {
                              row.avions.map((item, index) => (
                                <span key={index}>{item.nom}, </span>
                              ))
                            }
                          </TableCell>
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
                                <ListItemIcon onClick={()=>updateTrade(row._id)}>
                                  <Edit />
                                </ListItemIcon>
                                <ListItemText>Edit</ListItemText>
                              </MenuItem>
                              <MenuItem onClick={()=>deleteTrade(row._id)}>
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
                count={exports.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Box>
        </TabPanel>
      </Box>
      <Link to="/user/addTrade">
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

export default Trade