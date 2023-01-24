import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
import { API } from './../../configs'
import { toast } from 'react-toastify';

function AvionForm() {

  const [action, setAction] = useState('')
  const [nom, setNom] = useState('')
  const [type, setType] = useState('')
  const [tonnage, setTonnage] = useState('')
  const [nbrPassInter, setNbrPassInter] = useState('')
  const [nbrPassNatio, setNbrPassNatio] = useState('')

  const {id} = useParams();

  const navigate = useNavigate()

  useEffect(() => {
    if(!id) {
      setAction('Ajouter Nouveau Avion')
    }else{
      setAction('Modifier Avion')
    }
  },[])


  const handleSubmit = async (e) => {
    e.preventDefault();

    if( !nom || !type || !tonnage || !nbrPassInter || !nbrPassNatio ) {
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
        await axios.post(`${API}/avions/create`, {
          nom:nom,
          type:type,
          tonnage:tonnage,
          nbrPassInter:nbrPassInter,
          nbrPassNatio: nbrPassNatio
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
            navigate('/user/avions');
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
        await axios.put(`${API}/avions/update/${id}`, {
          nom:nom,
          type:type,
          tonnage:tonnage,
          nbrPassInter:nbrPassInter,
          nbrPassNatio: nbrPassNatio
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
            navigate('/user/avions');
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
      <h2 className="page-header">Avion Form</h2>
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
                        id="filled-basic"
                        label="Nom Avion"
                        defaultValue=""
                        variant="filled"
                        onChange={(e) =>setNom(e.target.value) }
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        required
                        id="filled-basic"
                        label="Type Avion"
                        defaultValue=""
                        variant="filled"
                        onChange={(e) =>setType(e.target.value) }
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        required
                        id="filled-basic"
                        label="Tonnage"
                        variant="filled"
                        type="number"
                        onChange={(e) =>setTonnage(e.target.value) }
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        required
                        id="filled-basic"
                        label="Nombre de passager Internationnal"
                        type="number"
                        variant="filled"
                        onChange={(e) =>setNbrPassInter(e.target.value) }
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        required
                        id="filled-basic"
                        label="Nombre de passager Nationnal"
                        type="number"
                        variant="filled"
                        onChange={(e) =>setNbrPassNatio(e.target.value) }
                      />
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

export default AvionForm