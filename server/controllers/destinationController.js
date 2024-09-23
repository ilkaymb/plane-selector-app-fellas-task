const axios = require('axios');

const getDestinations = async (req, res) => {
    const appId = process.env.APP_ID;
    const appKey = process.env.APP_KEY;
    const resourceVersion = 'v4';
    const page = req.query.page || 0; // Dışarıdan alınabilir
    const sort = req.query.sort || '+iata'; // Dışarıdan alınabilir

    try {
        const response = await axios.get('https://api.schiphol.nl/public-flights/destinations', {
            headers: {
                'app_id': appId,
                'app_key': appKey,
                'ResourceVersion': resourceVersion
            },
            params: {
                page: page,
                sort: sort
            }
        });

        // Eğer yanıt 204 ise, boş içerik döndür
        if (response.status === 204) {
            return res.status(204).send();
        }

        // Yanıt verisini gönder
        res.set('Link', response.headers.link); // Link header'ı ayarlama
        res.status(response.status).json(response.data); // Doğru durumu ayarla ve veriyi gönder
    } catch (error) {
        console.error('Error fetching destinations:', error);

        // Hata durumunda detaylı bilgi
        const statusCode = error.response ? error.response.status : 500;
        const errorMessage = error.response ? error.response.data : 'Internal Server Error';
        
        res.status(statusCode).json({ message: errorMessage });
    }
};

module.exports = {
    getDestinations
};
