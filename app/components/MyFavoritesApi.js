/**
 * this is a (very) simple example of an Post API
 *
 */

import axios from "axios";

export default {
  getMyFavorites: function(id) {
    console.log("getMyFavorites:" + id);
    return axios.post('http://localhost:3000/api/user', {user:{
        firstName: 'Xiaoying',
        lastName: 'Wen',
        emailAddress: 'xiaoying@a.com'}
    }).then(function (response) {
          console.log(JSON.stringify(response));
          var userId = response.data._id;
          return axios.get('http://localhost:3000/api/users/' + userId + '/pacs').then(function (response) {
            console.log(JSON.stringify(response));
            return response.data
          });
    }).catch(function (error) {
      console.log(error);
    });
  },

  addUser: function(user){
    return axios.post('http://localhost:3000/api/user', {
              user:{    firstName: "xiaoying",
                        lastName: "wen",
                        emailAddress: "xiaoyingwen@a.com"
              }
            }).then(function (response) {
                console.log(JSON.stringify(response));
                return axios.get('http://localhost:3000/api/users/'
                + response._id
                +'/pacs').then(function (response) {
                            console.log(JSON.stringify(response));
                            return response.data
                          }).catch(function (error) {
                              console.log(error);
                          });
              }).catch(function (error) {
                console.log(error);
              });
  },


  addMyFavoritePlace: function(id, place) {
    return axios.post('http://localhost:3000/api/pac', {
      pac:{
            title: "NY City",
            pictureURL:"http://www.nationalgeographic.com/content/dam/travel/photos/000/023/2358.ngsversion.1496844025740.adapt.352.1.jpg",
            category: "place",
            places: [
                      {
                          "name": "Central Park",
                          "lat": 48.873947,
                          "lng": 2.295038,
                          "address": "830 5th Avenue",
                          "city": "New York",
                          "state": "NY",
                          "zipcode": "10065",
                          "country": "USA",
                          "officialWebsite": "http://www.centralparknyc.org/",
                          "googlePlaceId": "ChIJ4zGFAZpYwokRGUGph3Mf37k"
                      },
                      {
                          "name": "Palmer Square",
                          "lat": 48.858608,
                          "lng": 2.294471,
                          "address": "40 Nassau Street",
                          "city": "Princeton",
                          "state": "NJ",
                          "zipcode": "08542",
                          "country": "USA",
                          "officialWebsite": "http://www.palmersquare.com/"
                      }
            ],
            createdBy:'59b4cd446b49a48dfc38eb1a'
      }
    }).then(function (response) {
          console.log(JSON.stringify(response));
          return axios.get('http://localhost:3000/api/users/' + response.createdBy
            +'/pacs').then(function (response) {
            console.log(JSON.stringify(response));
            return response.data
          });
    }).catch(function (error) {
      console.log(error);
    });
  },

    updateMyFavoritePlace: function(id, place) {
    return axios.put('http://localhost:3000/api/pac', {
      pac:{
            title: "City Zoo",
            pictureURL:"http://www.nationalgeographic.com/content/dam/travel/photos/000/023/2358.ngsversion.1496844025740.adapt.352.1.jpg",
            category: "weekend",
            places: [
                      {
                          "name": "Zo",
                          "lat": 48.873950,
                          "lng": 2.295038,
                          "address": "0Avenue",
                          "city": "New York",
                          "state": "NY",
                          "zipcode": "10065",
                          "country": "USA",
                          "officialWebsite": "http://b.org/",
                          "googlePlaceId": "ChIJ4zGFAZpYwokRGUGph3Mf37k"
                      },
                      {
                          "name": "Palmer Square",
                          "lat": 48.858608,
                          "lng": 2.294471,
                          "address": "40 Nassau Street",
                          "city": "Princeton",
                          "state": "NJ",
                          "zipcode": "08542",
                          "country": "USA",
                          "officialWebsite": "http://www.palmersquare.com/"
                      }
            ],
            createdBy:'59b4ced56b49a48dfc38eb1b'
      },
      id: "59b4cd446b49a48dfc38eb1a"
    }).then(function (response) {
          console.log(JSON.stringify(response));
          return axios.get('http://localhost:3000/api/users/' + response.createdBy
            +'/pacs').then(function (userpacs) {
                          console.log("userpacs");
            console.log(JSON.stringify(userpacs));
            return response.data
          });
    }).catch(function (error) {
      console.log(error);
    });
  }
}