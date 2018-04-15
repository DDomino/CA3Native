import React, {Component} from 'react';
const URL = require('../package.json').config.url;


function handleHttpErrors(res) {
  if (!res.ok) {
    throw {message:res.statusText,status:res.status};
  }
  return res.json();
}


class ApiFacade {

    setToken = (token) => {
        localStorage.setItem('jwtToken', token)
     }
    getToken = () => {
        return localStorage.getItem('jwtToken')
    }
    loggedIn = () => {
        const loggedIn = this.getToken() != null;
        return loggedIn;
    }
    logout = () => {
        localStorage.removeItem("jwtToken");
     }
     
     login = (user, pass) => {
        const options = this.makeFetchOptions("POST",{ username: user, password: pass });
        return fetch(URL+"/api/login",options,true)
        .then(handleHttpErrors)
        .then(res=>{this.setToken(res.token)})
    }


      fetchAllSpaceships = () => {
        const options = this.makeFetchOptions("GET");
        return fetch(URL+"/api/info/spaceships",options,true)
        .then(handleHttpErrors)
      }
      fetchAllPersons = () => {
        const options = this.makeFetchOptions("GET");
        return fetch(URL+"/api/info/people",options,true)
        .then(handleHttpErrors)
      }
      fetchAllPlanets = () => {
        const options = this.makeFetchOptions("GET");
        return fetch(URL+"/api/info/planets",options,true)
        .then(handleHttpErrors)
      }


      fetchFromGivenAPI (api) {
        const options = this.makeFetchOptions("GET");
        return fetch(api,options,true)
        .then(handleHttpErrors)
      }

  


  makeFetchOptions = (type, b) => {
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    if(this.loggedIn()){
      headers["x-access-token"] = this.getToken();
    }
    return {
      method: type,
      headers,
      body: JSON.stringify(b)
    }
  }
}
const facade = new ApiFacade();
export default facade;
