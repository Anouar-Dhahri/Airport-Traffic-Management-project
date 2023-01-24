import React, { useState } from 'react'
import axios from 'axios'
import { 
  TextField, 
  Button,
  Grid
} from '@mui/material'
import { Send, Clear} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'
import { API } from './../../configs'
import { toast } from 'react-toastify';

function Profile() {

  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!nom || !prenom || !email || !password) {
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
      await axios.put(`${API}/admin/profile/${user._id}`, {
        nom: nom,
        prenom: prenom,
        email: email,
        password: password
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
          navigate('/');
          setNom('')
          setPrenom('')
          setEmail('')
          setPassword('')
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

  return (
    <div>
      <h2 className="page-header">Profile</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__header">
              <h3>Profile</h3>
            </div>
            <div className="card__body">
              <div className='col-10 mx' >
                <form>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        required
                        id="filled-basic"
                        label="Nom"
                        value={nom}
                        variant="filled"
                        onChange={(e) =>setNom(e.target.value) }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        required
                        id="filled-basic"
                        label="Prénom"
                        value={prenom}
                        variant="filled"
                        onChange={(e) =>setPrenom(e.target.value) }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        required
                        id="filled-basic"
                        label="Email"
                        type="email"
                        value={email}
                        variant="filled"
                        onChange={(e) =>setEmail(e.target.value) }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        required
                        id="filled-basic"
                        label="Password"
                        type="password"
                        value={password}
                        variant="filled"
                        onChange={(e) =>setPassword(e.target.value) }
                      />
                    </Grid>
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

export default Profile