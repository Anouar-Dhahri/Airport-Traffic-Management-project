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

function FactureForm() {

  const [action, setAction] = useState('')
  const [volId, setVolId] = useState('')
  const [montantHt, setMontantHt] = useState('')
  const [montantTtc, setMontantTtc] = useState('')

  const [vols, setVols] = useState([])

  const {id} = useParams();

  const navigate = useNavigate()

  useEffect(() => {
    FetchAPI();
    if(!id) {
      setAction('Ajouter Nouveau Facture')
    }else{
      setAction('Modifier Facture')
    }
  },[])

  const FetchAPI = async () => {
    await axios.get(`${API}/vols/get`)
    .then((res) => {
      if(res.data.success){
        setVols(res.data.vols)
      }
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    if( !volId || !montantHt || !montantTtc ) {
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
        await axios.post(`${API}/factures/create`, {
          volId:volId,
          montantHt:montantHt, 
          montantTtc:montantTtc
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
            navigate('/user/factures');
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
        await axios.put(`${API}/factures/update/${id}`, {
          volId:volId,
          montantHt:montantHt, 
          montantTtc:montantTtc
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
            navigate('/user/factures');
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
      <h2 className="page-header">Facture Form</h2>
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
                      <FormControl fullWidth variant="filled" required>
                        <InputLabel id="demo-simple-select-label">Vol</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Vol"
                          value={volId}
                          onChange={(e)=> setVolId(e.target.value)}
                        >
                          <MenuItem>Vol</MenuItem>
                          {
                            vols.map((v, index) => (
                              <MenuItem key={index} value={v._id}>{v._id}</MenuItem>
                            ))
                          }
                          
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        required
                        id="filled-basic"
                        label="MontantHt"
                        type="number"
                        variant="filled"
                        onChange={(e) =>setMontantHt(e.target.value) }
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        required
                        id="filled-basic"
                        label="MontantTtc"
                        type="number"
                        variant="filled"
                        onChange={(e) =>setMontantTtc(e.target.value) }
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

export default FactureForm