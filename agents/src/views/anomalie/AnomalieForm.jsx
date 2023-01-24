import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { 
  TextField, 
  Button,
  Grid
} from '@mui/material'
import { Send, Clear} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom'
import { API } from './../../configs'
import { toast } from 'react-toastify';

function AnomalieForm() {

  const [action, setAction] = useState('')
  const [observation, setObservation] = useState('')

  const {id, factureId} = useParams();

  const navigate = useNavigate()

  useEffect(() => {
    if(!id && factureId) {
      setAction('Ajouter Nouveau Anomalie')
    }else{
      setAction('Modifier Anomalie')
    }
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if( !observation ) {
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
        await axios.post(`${API}/anomalies/create`, {
          observation:observation,
          factureId:factureId
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
            navigate('/user/anomalies');
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
        await axios.put(`${API}/anomalies/update/${id}`, {
          observation:observation
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
            navigate('/user/anomalies');
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
      <h2 className="page-header">Anomalie Form</h2>
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
                        label="Observation"
                        variant="filled"
                        onChange={(e) =>setObservation(e.target.value) }
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

export default AnomalieForm