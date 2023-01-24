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

function ControleForm() {

  const [action, setAction] = useState('')
  const [nbreLigneFacture, setNbreLigneFacture] = useState('')
  const [nbreLigneVol, setNbreLigneVol] = useState('')

  const {id, factureId} = useParams();

  const navigate = useNavigate()

  useEffect(() => {
    if(!id && factureId) {
      setAction('Ajouter Nouveau Controle Facture')
    }else{
      setAction('Modifier Controle Facture')
    }
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if( !nbreLigneFacture || !nbreLigneVol ) {
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
        await axios.post(`${API}/controles/create`, {
          factureId:factureId,
          nbreLigneFacture:nbreLigneFacture, 
          nbreLigneVol:nbreLigneVol
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
            navigate('/user/controlefacture');
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
        await axios.put(`${API}/controles/update/${id}`, {
            nbreLigneFacture:nbreLigneFacture, 
            nbreLigneVol:nbreLigneVol
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
            navigate('/user/controlefacture');
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
      <h2 className="page-header">Controle Facture Form</h2>
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
                        label="Nombre Ligne Facture"
                        type="number"
                        variant="filled"
                        onChange={(e) =>setNbreLigneFacture(e.target.value) }
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        required
                        id="filled-basic"
                        label="Nombre Ligne Vol"
                        type="number"
                        variant="filled"
                        onChange={(e) =>setNbreLigneVol(e.target.value) }
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

export default ControleForm