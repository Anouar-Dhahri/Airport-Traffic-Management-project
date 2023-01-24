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
import { Send, Clear, Calculate} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom'
import { API } from './../../configs'
import { toast } from 'react-toastify';

function ContractForm() {

  const [action, setAction] = useState('')

  const [airports, setAirports] = useState([])

  const [aeroport, setAeroport] = useState('')

  const [dateValidationStart, setDateValidationStart] = useState('')
  const [dateValidationEnd, setDateValidationEnd] = useState('')

  const [stationInfMor, setStationInfMor] = useState(0)
  const [stationInfNig, setStationInfNig] = useState(0)
  const [stationSupMor, setStationSupMor] = useState(0)
  const [stationSupNig, setStationSupNig] = useState(0)
  const [stationInAirHerbe, setStationInAirHerbe] = useState(0)

  const [securite, setSecurite] = useState(0)

  const [passInter, setPassInter] = useState(0)
  const [passNat, setPassNat] = useState(0)

  const [balisage, setBalisage] = useState(0)

  const [embInter, setEmbInter] = useState(0)
  const [embNat, setEmbNat] = useState(0)

  const [totalStationnement, setTotalStationnement] = useState(0)
  const [totalEmbarquement, setTotalEmbarquement] = useState(0)
  const [totalPasserelle, setTotalPasserelle] = useState(0)
  const [totalBalisage, setTotalBalisage] = useState(0)
  const [totalSecurite, setTotalSecurite] = useState(0)

  const {id} = useParams();

  const navigate = useNavigate()

  useEffect(() => {
    FetchAPI()

    if(!id) {
      setAction('Ajouter Nouveau Contrat')
    }else{
      setAction('Modifier Contrat')
    }
  },[])

  const FetchAPI = async () => {
    await axios.get(`${API}/airports/get`)
    .then((res) => {
      if(res.data.success){
        setAirports(res.data.aeroports)
      }
    })
  }

  const calcul = (e) => {
    e.preventDefault()
    const totalStat = parseFloat(stationInfMor) + parseFloat(stationInfNig) + parseFloat(stationSupMor) + parseFloat(stationSupNig) + parseFloat(stationInAirHerbe);
    const totalEmb = parseFloat(embInter) + parseFloat(embNat);
    const totalPass =  parseFloat(passInter) + parseFloat(passNat)  ;

    setTotalBalisage(balisage)
    setTotalStationnement(totalStat.toString())
    setTotalSecurite(securite) 
    setTotalEmbarquement(totalEmb.toString())
    setTotalPasserelle(totalPass.toString())
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if( 
      !aeroport ||
      !dateValidationStart ||
      !dateValidationEnd ||
      !stationInfMor ||
      !stationInfNig ||
      !stationSupMor || 
      !stationSupNig || 
      !stationInAirHerbe || 
      !securite || 
      !passInter ||
      !passNat || 
      !balisage || 
      !embInter || 
      !embNat || 
      !totalStationnement || 
      !totalEmbarquement || 
      !totalPasserelle || 
      !totalBalisage || 
      !totalSecurite
     ) {
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
        await axios.post(`${API}/contrats/create`, {
          aeroport: aeroport,
          dateValidationStart : dateValidationStart,
          dateValidationEnd :dateValidationEnd ,
          stationInfMor : stationInfMor,
          stationInfNig : stationInfNig,
          stationSupMor : stationSupMor, 
          stationSupNig : stationSupNig , 
          stationInAirHerbe : stationInAirHerbe, 
          securite : securite, 
          passInter : passInter,
          passNat : passNat, 
          balisage : balisage, 
          embInter : embInter, 
          embNat : embNat, 
          totalStationnement : totalStationnement, 
          totalEmbarquement : totalEmbarquement, 
          totalPasserelle : totalPasserelle , 
          totalBalisage : totalBalisage, 
          totalSecurite : totalSecurite
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
            navigate('/admin/contracts');
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
        await axios.put(`${API}/contrats/update/${id}`, {
          aeroport: aeroport,
          dateValidationStart : dateValidationStart,
          dateValidationEnd :dateValidationEnd ,        
          stationInfMor : stationInfMor,
          stationInfNig : stationInfNig,
          stationSupMor : stationSupMor, 
          stationSupNig : stationSupNig , 
          stationInAirHerbe : stationInAirHerbe, 
          securite : securite, 
          passInter : passInter,
          passNat : passNat, 
          balisage : balisage, 
          embInter : embInter, 
          embNat : embNat, 
          totalStationnement : totalStationnement, 
          totalEmbarquement : totalEmbarquement, 
          totalPasserelle : totalPasserelle , 
          totalBalisage : totalBalisage, 
          totalSecurite : totalSecurite
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
            navigate('/admin/contracts');
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
      <h2 className="page-header">Contrat Form</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__header">
              <h3>{action}</h3>
            </div>
            <div className="card__body">
              <form>
                <Grid container spacing={2} sx={{marginBottom:4}}>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="filled" required>
                      <InputLabel id="demo-simple-select-label">Aéroport</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Aeroport"
                        value={aeroport}
                        onChange={(e)=> setAeroport(e.target.value)}
                      >
                        <MenuItem value="">Choisir un Aéroport</MenuItem>
                        {
                          airports.map((item, index) => (
                            <MenuItem key={index} value={item.nom}>{item.nom}</MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sx={{marginBottom:1}}><h4>Date de validité </h4></Grid>
                  <Grid item xs={6}>
                    <h5>Date de depart</h5>
                      <TextField
                        fullWidth
                        required
                        type="date"
                        sx={{marginBottom:1, marginTop:1}}
                        id="filled-basic"
                        variant="filled"
                        onChange={(e) =>setDateValidationStart(e.target.value) }
                      />
                  </Grid>

                  <Grid item xs={6}>
                    <h5>Date de find</h5>
                      <TextField
                        fullWidth
                        required
                        type="date"
                        sx={{marginBottom:1, marginTop:1}}
                        id="filled-basic"
                        variant="filled"
                        onChange={(e) =>setDateValidationEnd(e.target.value) }
                      />
                  </Grid>
                </Grid>


                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Grid item xs={12} sx={{marginBottom:1}}><h4>Revedence de stationnement</h4></Grid>
                    <Grid item xs={12} sx={{marginBottom:1}}><p>Distance / Heure</p></Grid>
                    <Grid item xs={12} sx={{marginBottom:1}}><p> Sur les aires de trafic : </p></Grid>
                    <Grid item xs={12} sx={{marginBottom:1}}><p>* Distance inférieur a 300 mètres del'aérogare</p></Grid>
                    <Grid item xs={12} sx={{marginBottom:1}}>
                      <h5>De 8h00 - 19h00</h5>
                      <TextField
                        fullWidth
                        required
                        sx={{marginBottom:1, marginTop:1}}
                        id="filled-basic"
                        label="Prix"
                        type='number'
                        defaultValue=""
                        variant="filled"
                        onChange={(e) =>setStationInfMor(e.target.value) }
                      />
                    </Grid>
                    <Grid item xs={12} sx={{marginBottom:1}}>
                      <h5>De 20h00 - 7h00</h5>
                      <TextField
                        fullWidth
                        required
                        sx={{marginBottom:1, marginTop:1}}
                        id="filled-basic"
                        label="Prix"
                        type='number'
                        defaultValue=""
                        variant="filled"
                        onChange={(e) =>setStationInfNig(e.target.value) }
                      />
                    </Grid>
                    <Grid item xs={12} sx={{marginBottom:1}}><p>* Distance supérieur a 300 mètres del'aérogare</p></Grid>
                    <Grid item xs={12} sx={{marginBottom:1}}>
                      <h5>De 8h00 - 19h00</h5>
                      <TextField
                        fullWidth
                        required
                        sx={{marginBottom:1, marginTop:1}}
                        id="filled-basic"
                        label="Prix"
                        type='number'
                        defaultValue=""
                        variant="filled"
                        onChange={(e) =>setStationSupMor(e.target.value) }
                      />
                    </Grid>
                    <Grid item xs={12} sx={{marginBottom:1}}>
                      <h5>De 20h00 - 7h00</h5>
                      <TextField
                        fullWidth
                        required
                        sx={{marginBottom:1, marginTop:1}}
                        id="filled-basic"
                        label="Prix"
                        type='number'
                        defaultValue=""
                        variant="filled"
                        onChange={(e) =>setStationSupNig(e.target.value) }
                      />
                    </Grid>
                    <Grid item xs={12} sx={{marginBottom:1}}><p> Sur les aires de herbe : </p></Grid>
                    <Grid item xs={12} sx={{marginBottom:1}}>
                      <TextField
                        fullWidth
                        required
                        sx={{marginBottom:1, marginTop:1}}
                        id="filled-basic"
                        label="Prix"
                        type='number'
                        defaultValue=""
                        variant="filled"
                        onChange={(e) =>setStationInAirHerbe(e.target.value) }
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={4}>
                    <Grid item xs={12} sx={{marginBottom:1}}><h4>Revedence de sureté</h4></Grid>
                    <Grid item xs={12} sx={{marginBottom:1 }}>
                      <h5>Une Révedence de surité, fixée à</h5>
                      <TextField
                        fullWidth
                        required
                        sx={{marginBottom:1, marginTop:1}}
                        id="filled-basic"
                        label="Prix"
                        type='number'
                        defaultValue=""
                        variant="filled"
                        onChange={(e) =>setSecurite(e.target.value) }
                      />
                      <h5>est due par tout passanger à l'embarquement sur tout vol national ou international </h5>
                    </Grid>

                    <Grid item xs={12} sx={{marginBottom:1, marginTop:6}}><h4>Revedence de passerelle</h4></Grid>
                    <Grid item xs={12} sx={{marginBottom:1}}>
                      <p>Tout passager a l'embarquement sur un aéroport doit payer un redevance d'embarquement</p>
                    </Grid>
                    <Grid item xs={12} sx={{marginBottom:1}} >
                      <h5>Passager international (regulier et non régulier)</h5>
                      <TextField
                        fullWidth
                        required
                        sx={{marginBottom:1, marginTop:1}}
                        id="filled-basic"
                        label="Prix"
                        type='number'
                        defaultValue=""
                        variant="filled"
                        onChange={(e) =>setPassInter(e.target.value) }
                      />
                    </Grid>
                    <Grid item xs={12} sx={{marginBottom:1}}>
                      <h5>Passager national</h5>
                      <TextField
                        fullWidth
                        required
                        sx={{marginBottom:1, marginTop:1}}
                        id="filled-basic"
                        label="Prix"
                        type='number'
                        defaultValue=""
                        variant="filled"
                        onChange={(e) =>setPassNat(e.target.value) }
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={4}>
                    <Grid item xs={12} sx={{marginBottom:1}}><h4>Revedence de balisage</h4></Grid>
                    <Grid item xs={12} sx={{marginBottom:1}}><p>L'atterrisage ou le décollage effectué de nuit done lieu au paiement d'une redevance fixée à</p></Grid>
                    <Grid item xs={12} sx={{marginBottom:1}}>
                      <TextField
                        fullWidth
                        required
                        sx={{marginBottom:1, marginTop:1}}
                        id="filled-basic"
                        label="Prix"
                        type='number'
                        defaultValue=""
                        variant="filled"
                        onChange={(e) =>setBalisage(e.target.value) }
                      />
                    </Grid>
                    <Grid item xs={12} sx={{marginBottom:1}}><p>quel que soit le poids de l'aéronef </p></Grid>


                    <Grid item xs={12} sx={{marginBottom:1, marginTop:5}}><h4>Revedence d'embarquement</h4></Grid>
                    <Grid item xs={12} sx={{marginBottom:1}}><p>Tout passager à l'embarquement sur un aéroport doit payer une redevance d'embarquement</p></Grid>
                    <Grid item xs={12} sx={{marginBottom:1}}>
                      <h5>Passager international (regulier et non régulier)</h5>
                      <TextField
                        fullWidth
                        required
                        sx={{marginBottom:1, marginTop:1}}
                        id="filled-basic"
                        label="Prix"
                        type='number'
                        defaultValue=""
                        variant="filled"
                        onChange={(e) =>setEmbInter(e.target.value) }
                      />
                    </Grid>
                    <Grid item xs={12} sx={{marginBottom:1}}>
                      <h5>Passager National</h5>
                      <TextField
                        fullWidth
                        required
                        sx={{marginBottom:1, marginTop:1}}
                        id="filled-basic"
                        label="Prix"
                        type='number'
                        defaultValue=""
                        variant="filled"
                        onChange={(e) =>setEmbNat(e.target.value) }
                      />
                    </Grid>

                  </Grid>

                </Grid>

                <Grid container spacing={2} sx={{marginTop:6}}>
                  <Grid item xs={3} sx={{marginBottom:1 }}>
                      <h5>Totale Stationnement</h5>
                      <TextField
                        fullWidth
                        required
                        disabled
                        sx={{marginBottom:1, marginTop:1}}
                        id="filled-basic"
                        value={totalStationnement}
                        variant="filled"
                        onChange={(e) =>setTotalStationnement(e.target.value) }
                      />
                    </Grid>

                    <Grid item xs={3} sx={{marginBottom:1 }}>
                      <h5>Totale Embarquement</h5>
                      <TextField
                        fullWidth
                        required
                        disabled
                        sx={{marginBottom:1, marginTop:1}}
                        id="filled-basic"
                        value={totalEmbarquement}
                        variant="filled"
                        onChange={(e) =>setTotalEmbarquement(e.target.value) }
                      />
                    </Grid>

                    <Grid item xs={3} sx={{marginBottom:1 }}>
                      <h5>Totale Passerelle</h5>
                      <TextField
                        fullWidth
                        required
                        disabled
                        sx={{marginBottom:1, marginTop:1}}
                        id="filled-basic"
                        value={totalPasserelle}
                        variant="filled"
                        onChange={(e) =>setTotalPasserelle(e.target.value) }
                      />
                    </Grid>

                    <Grid item xs={3} sx={{marginBottom:1 }}>
                      <h5>Totale Balisage</h5>
                      <TextField
                        fullWidth
                        required
                        disabled
                        sx={{marginBottom:1, marginTop:1}}
                        id="filled-basic"
                        value={totalBalisage}
                        variant="filled"
                        onChange={(e) =>setTotalBalisage(e.target.value) }
                      />
                    </Grid>


                    <Grid item xs={3} sx={{marginBottom:1 }}>
                      <h5>Totale Sécurité</h5>
                      <TextField
                        fullWidth
                        required
                        disabled
                        sx={{marginBottom:1, marginTop:1}}
                        id="filled-basic"
                        value={totalSecurite}
                        variant="filled"
                        onChange={(e) =>setTotalSecurite(e.target.value) }
                      />
                    </Grid>
                </Grid>  
                <Grid item xs={6}>
                  <Button 
                    type="submit" 
                    variant="outlined" 
                    startIcon={<Calculate />} 
                    size="large"
                    sx={{
                      marginRight:'20px'
                    }}
                    onClick={calcul}
                  >
                    Calculer
                  </Button>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContractForm