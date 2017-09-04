// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");
// Key for Google Place API
const googleApi = {
    key: 'AIzaSyC_L5AFV1LmvaRSd8k5bsCD_T0Y2h2Dvf0',
    url: 'https://maps.googleapis.com/maps/api/place/textsearch/xml?query='
};


// Helper functions for making API Calls
var helper = {
    // This function serves our purpose of running the query to geolocate.
    runQuery: function(name, place) {
        // Calling API Places
        //const queryURL = googleApi.url + place + "&key=" + googleApi.key;
        const queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/xml?query=restaurants+in+Sydney&key=AIzaSyC_L5AFV1LmvaRSd8k5bsCD_T0Y2h2Dvf0";


        //const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=8db9304cb24d4d8a8c65851752d38ae5&q=new%20jersey&page=3&begin_date=20170509&end_date=20170809";

        var config = {
            headers: { 'crossDomain': true }
        };
        return axios.get(queryURL).then(function(response) {
            // If get get a result, return that result's formatted address property
            console.log(response.data);
            return response.data;
        });
    }
};

// We export the API helper
module.exports = helper;