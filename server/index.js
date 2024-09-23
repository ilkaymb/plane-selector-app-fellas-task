const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const flightsRouter = require('./routes/flights'); 
const destinations = require('./routes/destinations');

require('dotenv').config();

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/planeSelector'; 

app.use(cors({
  origin: 'http://localhost:3000', 
}));

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB bağlantısı başarılı!'))
  .catch(err => console.error('MongoDB bağlantı hatası:', err));

app.use('/flights', flightsRouter); 
app.use('/destinations', destinations); 

app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda başlatıldı`);
    }
);




