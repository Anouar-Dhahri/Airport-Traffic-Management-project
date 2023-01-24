import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select, 
  TextField, 
  Button,
  Grid,
} from '@mui/material'
import { Send, Clear} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom'
import { API } from './../../configs'
import { toast } from 'react-toastify';

function VolForm() {

  const [action, setAction] = useState('')

  const [allPlanes, setAllPlanes] = useState([]);

  const [dateVol, setDateVol] = useState('')
  const [companie, setCompanie] = useState('')

  const [dateDepart, setDateDepart] = useState('')
  const [dateArrivee, setDateArrivee] = useState('')

  const [heureAtterissage, setHeureAtterissage] = useState('')
  const [heureDecollage, setHeureDecollage] = useState('')

  const [escaleDepart, setEscaleDepart] = useState('')
  const [escaleArrivee, setEscaleArrivee] = useState('')

  const [typeEscale, setTypeEscale] = useState('')

  const [typeVol, setTypeVol] = useState('')

  const [prixService, setPrixService] = useState('')

  const [avions, setAvions] = useState([])


  const {id} = useParams();

  const navigate = useNavigate()

  useEffect(() => {
    FetchAPI()
    if(!id) {
      setAction('Ajouter Nouveau Vol')
    }else{
      setAction('Modifier Vol')
    }
  },[])

  const FetchAPI = async () => {
    await axios.get(`${API}/avions/get`)
    .then((res) => {
      if(res.data.success){
        setAllPlanes(res.data.avions)
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if( !dateVol || !companie || !dateDepart || !dateArrivee || !heureAtterissage || !heureDecollage || !escaleDepart || !escaleArrivee || !typeEscale || !typeVol || !prixService || !avions ) {
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
        await axios.post(`${API}/vols/create`, {
          dateVol:dateVol,
          companie:companie,
          dateDepart:dateDepart,
          dateArrivee:dateArrivee,
          heureAtterissage: heureAtterissage,
          heureDecollage:heureDecollage,
          escaleDepart:escaleDepart,
          escaleArrivee:escaleArrivee,
          typeEscale:typeEscale,
          typeVol:typeVol,
          prixService:prixService,
          avions:avions
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
            navigate('/user/vols');
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
        await axios.put(`${API}/vols/update/${id}`, {
          dateVol:dateVol,
          companie:companie,
          dateDepart:dateDepart,
          dateArrivee:dateArrivee,
          heureAtterissage: heureAtterissage,
          heureDecollage:heureDecollage,
          escaleDepart:escaleDepart,
          escaleArrivee:escaleArrivee,
          typeEscale:typeEscale,
          typeVol:typeVol,
          prixService:prixService,
          avions:avions
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
            navigate('/user/vols');
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
      <h2 className="page-header">Vol Form</h2>
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
                        label="Date Vol"
                        type="date"
                        variant="filled"
                        onChange={(e) =>setDateVol(e.target.value) }
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        required
                        id="filled-basic"
                        label="Compagnie"
                        defaultValue=""
                        variant="filled"
                        onChange={(e) =>setCompanie(e.target.value) }
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        required
                        id="filled-basic"
                        label="Date Départ"
                        type="date"
                        variant="filled"
                        onChange={(e) =>setDateDepart(e.target.value) }
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        required
                        id="filled-basic"
                        label="Date Arrivé"
                        type="date"
                        variant="filled"
                        onChange={(e) =>setDateArrivee(e.target.value) }
                      />
                    </Grid>


                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        required
                        id="filled-basic"
                        label="Heure atterissage"
                        type="time"
                        defaultValue=""
                        variant="filled"
                        onChange={(e) =>setHeureAtterissage(e.target.value) }
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        required
                        id="filled-basic"
                        label="Heure decollage"
                        type="time"
                        defaultValue=""
                        variant="filled"
                        onChange={(e) =>setHeureDecollage(e.target.value) }
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        required
                        id="filled-basic"
                        label="Escale depart"
                        defaultValue=""
                        variant="filled"
                        onChange={(e) =>setEscaleDepart(e.target.value) }
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        required
                        id="filled-basic"
                        label="Escale arrivée"
                        defaultValue=""
                        variant="filled"
                        onChange={(e) =>setEscaleArrivee(e.target.value) }
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        required
                        id="filled-basic"
                        label="Type escale"
                        defaultValue=""
                        variant="filled"
                        onChange={(e) =>setTypeEscale(e.target.value) }
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        required
                        id="filled-basic"
                        label="Type vol"
                        defaultValue=""
                        variant="filled"
                        onChange={(e) =>setTypeVol(e.target.value) }
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        required
                        id="filled-basic"
                        label="Prix service"
                        type="number"
                        defaultValue=""
                        variant="filled"
                        onChange={(e) =>setPrixService(e.target.value) }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth variant="filled" required>
                        <InputLabel id="demo-simple-select-label">Avions</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Type"
                          multiple
                          value={avions}
                          onChange={(e)=> setAvions(e.target.value)}
                        >
                          <MenuItem value="">Select un Avion</MenuItem>
                          {
                            allPlanes.map((p) => (
                              <MenuItem key={p._id} value={p}>{p.nom}</MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
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

export default VolForm