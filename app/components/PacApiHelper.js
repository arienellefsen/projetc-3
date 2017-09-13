/**
 * this is a (very) simple example of an Post API
 *
 */

import axios from "axios";

const BASE_URL = "http://localhost:3000/api";
const LOGPRE = "PacApiHelper.";

export default {
/*  getMyFavorites: function(id) {
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
  },*/



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

//used in ProcEditor
  getPocById: function(id) {
    console.log("getPocById:" + id);
    return axios.get('http://localhost:3000/pacs/'+id)
      .then(function (response) {
          console.log("-------------------get getPocById return: ");
          console.log(JSON.stringify(response));
          return response.data;
      })
      .catch(function (error) {
        console.log(LOGPRE + "getPocById " + error);
      });
  },

//used in ProcEditor
  addPac: function(pac) {
    return axios.post('http://localhost:3000/api/pac', {
      pac: pac
    }).then(function (response) {
           console.log(JSON.stringify(response));
          return response.data;
    }).catch(function (error) {
        console.log(LOGPRE + "addPac " + error);
    });
  },

  //used in ProcEditor
  updatePac: function(pac) {
    return axios.put('http://localhost:3000/pac', {
      pac: pac
    }).then(function (response) {
        console.log("-------------------put existing pac return: ");
        console.log(JSON.stringify(response));
        return response.data;
    }).catch(function (error) {
        console.log(LOGPRE + "updatePac " + error);
    });
  }
}