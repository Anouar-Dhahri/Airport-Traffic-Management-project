import express from 'express';
const app = express()
import cors from 'cors'
import dotenv from'dotenv';
const port = process.env.PORT || 5000;

import dbConnect from './configs/dbConnection.js';

import { router as authRoute } from './routes/Auth.routes.js'
import { router as adminRoute } from './routes/Admin.routes.js'
import { router as dataRoute } from './routes/Data.routes.js'
import { router as userRoute } from './routes/User.routes.js'
import { router as aeroportRoute } from './routes/Aeroport.routes.js'
import { router as contratRoute } from './routes/Contrat.routes.js'

import { router as avionRoute } from './routes/Avion.routes.js'
import { router as volRoute } from './routes/Vol.routes.js'
import { router as tradeRoute } from './routes/Trade.routes.js'

import { router as factureRoute } from './routes/Facture.routes.js'
import { router as anomalieRoute } from './routes/Anomalie.routes.js'
import { router as controleRoute } from './routes/Controle.routes.js'
import { router as reclamationRoute } from './routes/Reclamation.routes.js'

dotenv.config();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cors());

app.use('/api/auth', authRoute);
app.use('/api/admin', adminRoute);
app.use('/api/data', dataRoute);
app.use('/api/users', userRoute);
app.use('/api/airports', aeroportRoute);
app.use('/api/contrats', contratRoute);

app.use('/api/avions', avionRoute);
app.use('/api/vols', volRoute);
app.use('/api/trades', tradeRoute);

app.use('/api/factures', factureRoute);

app.use('/api/anomalies', anomalieRoute);
app.use('/api/controles', controleRoute);
app.use('/api/reclamations', reclamationRoute);

dbConnect();

app.get('/', (req, res) => res.send('The server is working !'));
app.listen(port, () => console.log(`Server is running on port ${port}!`));