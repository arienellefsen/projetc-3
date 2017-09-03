// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");
// Key for Google Place API
var googlePlaceApiKey = "AIzaSyC_L5AFV1LmvaRSd8k5bsCD_T0Y2h2Dvf0";
// Helper functions for making API Calls
var helper = {
    // This function serves our purpose of running the query to geolocate.
    runQuery: function(name, place) {

        // Calling API Places
        const queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/xml?query=" + place + "&key=" + googlePlaceApiKey;
        return axios.get(queryURL).then(function(response) {
            // If get get a result, return that result's formatted address property
            console.log(response.data);
            //return response.data;
        });
    }
};

// We export the API helper
module.exports = helper;