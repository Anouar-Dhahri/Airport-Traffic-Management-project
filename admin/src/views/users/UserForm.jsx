import React, { useState, useEffect } from 'react'
import { 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select, 
  TextField, 
  Button,
  Grid
} from '@mui/material'
import { Send, Clear} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API } from './../../configs'
import { toast } from 'react-toastify';

function UserForm() {

  const [action, setAction] = useState('')
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [type, setType] = useState('')

  const {id} = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    if(!id) {
      setAction('Ajouter Nouveau Utilisateur')
    }else{
      setAction('Modifier Utilisateur')
    }
  },[id])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!nom || !prenom || !email || !password || !type) {
      toast.error('All inputs are required',{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }else {
      if(!id){
        await axios.post(`${API}/users/create`, {
          nom:nom,
          prenom:prenom,
          email:email,
          password:password,
          type:type,
        }).then((res) => {
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
            navigate('/admin/users');
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
      }else {
        await axios.put(`${API}/users/update/${id}`, {
          nom:nom,
          prenom:prenom,
          email:email,
          password:password,
          type:type,
        }).then((res) => {
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
            navigate('/admin/users');
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

    }
  }

  return (
    <div>
      <h2 className="page-header">User Form</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__header">
              <h3>{action}</h3>
            </div>
            <div className="card__body">
              <div className='col-10 mx' >
                <form>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        required
                        id="filled-basic nom"
                        label="Nom"
                        defaultValue=""
                        variant="filled"
                        onChange={(e) =>setNom(e.target.value) }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        required
                        id="filled-basic prenom"
                        label="Prénom"
                        defaultValue=""
                        variant="filled"
                        onChange={(e) =>setPrenom(e.target.value) }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        required
                        id="filled-basic email"
                        label="Email"
                        type="email"
                        defaultValue=""
                        variant="filled"
                        onChange={(e) =>setEmail(e.target.value) }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        required
                        id="filled-basic password"
                        label="Password"
                        type="password"
                        defaultValue=""
                        variant="filled"
                        onChange={(e) =>setPassword(e.target.value) }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth variant="filled" required>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select type"
                          label="Type"
                          onChange={(e)=> setType(e.target.value)}
                        >
                          <MenuItem value="Agent">Agent</MenuItem>
                          <MenuItem value="Controlleur">Controlleur</MenuItem>
                          <MenuItem value="Approbateur">Approbateur</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}></Grid>
                    <Grid item xs={6}>
                      <Button 
                        type="submit" 
                        variant="outlined" 
                        startIcon={<Send />} 
                        size="large"
                        sx={{
                          marginRight:'20px'
                        }}
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                      <Button 
                        type="reset" 
                        variant="outlined"  
                        startIcon={<Clear />}
                        size="large"
                      >
                        Annuler
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserForm