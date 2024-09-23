// models/Flight.js
const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    flightNumber: String,
    estimatedLandingTime: Date,
    actualLandingTime: Date,
    aircraftType: {
        iataMain: String,
        iataSub: String,
    },
    route: {
        destinations: [String],
    },
    baggageClaim: {
      belts: [String], // Eğer belt bilgileri dizi olarak geliyorsa
    },
    flightDirection: String,
    prefixIATA: String,
    prefixICAO: String,
    isOperationalFlight: Boolean,
    scheduleDateTime: Date,
    expectedTimeOnBelt: Date,
    price: Number,
}, { timestamps: true });

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;
