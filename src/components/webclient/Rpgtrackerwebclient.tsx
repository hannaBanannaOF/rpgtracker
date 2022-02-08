import axios from "axios";

function getHeaders() {
    let headers : any = {
        'Content-Type': 'application/json',
    }
    let localStorageData = localStorage.getItem('tokens');
    if (localStorageData !== null) {
        headers = {
            ...headers,
            'Authorization': 'Bearer '+ JSON.parse(localStorageData).access
        }
    }
    return headers;
    
}

export const Rpgtrackerwebclient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: getHeaders()
});

Rpgtrackerwebclient.interceptors.response.use(response => {
    return response;
}, error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        let localStorageData = localStorage.getItem("tokens");
        let tokens = localStorageData !== null ? JSON.parse(localStorageData) : null;
        if (tokens === null) {
            return Promise.reject(error);
        }
        console.warn("Refreshing token...");
        let data = {
            refresh: tokens.refresh
        }
        return axios.post(`${process.env.REACT_APP_BACKEND_URL}v1/token/refresh/`, data).then((res) => {
            let newTokens = {
                access: res.data.access,
                refresh: tokens.refresh
            }
            localStorage.setItem("tokens", JSON.stringify(newTokens));
            originalRequest._retry = true;      
            originalRequest.headers['Authorization'] = 'Bearer ' + newTokens.access;   
            Rpgtrackerwebclient.defaults.headers.common['Authorization'] = 'Bearer ' + newTokens.access;     
            return Rpgtrackerwebclient.request(originalRequest);
        }).catch(err => {
            if (err.response.status === 401) {
                localStorage.removeItem("tokens");
                window.location.href = '/';
            }
            return Promise.reject(err);
        });
    }
    return Promise.reject(error);
})