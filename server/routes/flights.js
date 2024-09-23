const express = require('express');
const router = express.Router();
const { getFlightById, getFlightsByDate } = require('../controllers/flightController');
const Flight = require('../models/Flight'); // Modeli içe aktar

// Uçuşları tarih ile almak için rota
router.get('/', async (req, res) => {
    const appId = process.env.APP_ID;
    const appKey = process.env.APP_KEY;
    const scheduleDate = req.query.scheduleDate || new Date().toISOString().split('T')[0]; // Bugünün tarihi
    const apiURL = process.env.API_BASE_URL;

    if (!appId || !appKey) {
        return res.status(400).json({ message: 'app_id and app_key are required' });
    }

    try {
        const flights = await getFlightsByDate(scheduleDate, appId, appKey,apiURL);
        
          await Flight.insertMany(flights); // flights verisini MongoDB'ye kaydet
        res.json({ flights });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

// Uçuş detaylarını almak için rota
router.get('/flights/:id', async (req, res) => {
    const flightId = req.params.id;
    const appId = req.headers.app_id;
    const appKey = req.headers.app_key;
    const apiURL = process.env.API_BASE_URL;

    if (!appId || !appKey) {
        return res.status(400).json({ message: 'app_id and app_key are required' });
    }

    try {
        const flight = await getFlightById(flightId, appId, appKey,apiURL);
        if (!flight) {
            return res.status(404).json({ message: 'Flight not found' });
        }
        res.json(flight);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

module.exports = router;
