// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");
// Key for Google Place API
const googleApi = {
    key: 'AIzaSyD7ZhwbUi-N6KzufXETDFGoIgoP4spZplA',
    url: 'https://maps.googleapis.com/maps/api/place/textsearch/xml?query=restaurants+in+Sydney&key=AIzaSyD7ZhwbUi-N6KzufXETDFGoIgoP4spZplA&libraries=places'
};

// Helper functions for making API Calls
var helper = {
    // This function posts new articles to our database.
    savePac: function(placeName, address, placeId, lat, long) {
        console.log('Save pac here');
        var placesData = {
            name: placeName,
            address: address,
            placeId: placeId,
            lat: lat,
            long: long
        }
        console.log('places data:' + placesData);
        return axios.post('api/savePac', placesData)
            .then(function(response) {
                console.log(response);
                return response;
            })
            .catch(function(error) {
                console.log(error);
                return error;
            });
    }
};

// We export the API helper
module.exports = helper;