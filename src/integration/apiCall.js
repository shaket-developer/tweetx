import React, {useState, useEffect} from 'react';
import baseUrl from './baseUrl';
import qs from 'qs';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

const ApiCall = (url, data, requestMethod, callback) => {
    const header = {
        headers: {Authorization:"Bearer "+window.localStorage.getItem('access_token')}
    }
    
    return new Promise((resolve, reject) => {
        if(requestMethod == 'POST') {
        baseUrl.post(url, qs.stringify(data), header).then((response) => {
            if(response.data.access_token) {
                localStorage.setItem('access_token', response.data.access_token)
            }
            resolve(response);
        }, error => {
            
            if(error.response.data.error) {
                let errorData = {
                    msg: error.response.data.error,
                    code: error.response.status
                }
                reject(errorData)
            } else if(!error.response || !error.response.data) {
                reject("Unable to connect to server");
            } else {
                reject("Internal Server Error")
            }
            
        })
        }
        if(requestMethod == 'GET') {

            baseUrl.get(url, header).then((response) => {
                resolve(response);
            }, error => {
                if(error.response.data.error) {
                    let errorData = {
                        msg: error.response.data.error,
                        code: error.response.status
                    }
                    reject(errorData)
                } else if(!error.status || !error.response || !error.response.data) {
                    reject("Unable to connect to server");
                } else {
                    reject("Internal Server Error")
                }
            })
        }
        if(requestMethod == 'PUT') {
            baseUrl.put(url, data, header).then((response) => {
                resolve(response);
            }, error => {
                if(!error.status == 'failed' || !error.response || !error.response.data) {
                    reject("Unable to connect to server");
                } else if(error.response.data.error) {
                    reject(error.response.data.error)
                } else {
                    reject("Internal Server Error")
                }
            })
        } 
        if(requestMethod == 'DELETE') {
            baseUrl.delete(url, header, {}).then((response) => {
                resolve(response);
            }, error => {
                if(!error.status == 'failed' || !error.response || !error.response.data) {
                    reject("Unable to connect to server");
                } else if(error.response.data.error) {
                    reject(error.response.data.error)
                } else {
                    reject("Internal Server Error")
                }
            })
        } 
    })
    
}

export default ApiCall;