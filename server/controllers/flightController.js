const axios = require('axios');


async function getFlightById(flightId, appId, appKey,apiURL) {
    const response = await axios.get(`${apiURL}/flights/${flightId}`, {
        headers: {
            app_id: appId,
            app_key: appKey,
            ResourceVersion: 'v4'
        }
    });
    return response.data;
}

async function getFlightsByDate(scheduleDate, appId, appKey,apiURL) {
    const response = await axios.get(`${apiURL}/flights`, {
        headers: {
            app_id: appId,
            app_key: appKey,
            ResourceVersion: 'v4'
        },
        params: {
            scheduleDate
        }
    });
    return response.data.flights;
}

module.exports = {
    getFlightById,
    getFlightsByDate
};
