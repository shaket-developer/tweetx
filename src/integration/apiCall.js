import baseUrl from './baseUrl';
import qs from 'qs';


const apiCall = (url, data, requestMethod, callback) => {
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
            console.log(error.status)
            console.log(error.response)
            if(!error.response || !error.response.data) {
                reject("Unable to connect to server");
            } else if(error.response.data.error) {
                reject(error.response.data.error)
            } else {
                reject("Internal Server Error")
            }
            
        })
        }
        if(requestMethod == 'GET') {
            baseUrl.get(url, header).then((response) => {
                resolve(response);
            }, error => {
                if(!error.status || !error.response || !error.response.data) {
                    reject("Unable to connect to server");
                } else if(error.response.data.error) {
                    reject(error.response.data.error)
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

export default apiCall;