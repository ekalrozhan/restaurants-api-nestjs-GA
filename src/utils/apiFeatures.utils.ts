const nodeGeocoder = require('node-geocoder')

export default class ApiFeatures{
    static async getRestaurantLocation(address){
        try{

            const options = {
                provider: process.env.GEOCODER_PROVIDER,
                httpAdapter: 'https',
                apiKey: process.env.GEOCODER_API_KEY,
                formatter: null
            }

            const geocoder = nodeGeocoder(options)

            const loc = await geocoder.geocode(address)

            const location = {
                type: 'Point',
                coordinates: [loc[0].longitude, loc[0].latitude],
                formattedAddress: loc[0].formattedAddress,
                city: loc[0].city,
                state: loc[0].stateCode,
                zipcode: loc[0].zipcode,
                country: loc[0].countryCode,
            }
            return location

        }catch(error){
            console.log(error.message)
        }
    }
}