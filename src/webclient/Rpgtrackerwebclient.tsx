import axios from "axios";

function getHeaders() {
    let headers : any = {
        'Content-Type': 'application/json',
    }
    let localStorageData = localStorage.getItem('tokens');
    if (localStorageData !== null) {
        headers = {
            ...headers,
            'Authorization': 'Bearer '+ JSON.parse(localStorageData).access_token
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

        const data = new URLSearchParams();
        data.append('refresh_token', tokens.refresh_token);
        data.append('grant_type', 'refresh_token');
        data.append('client_id', 'rpgtracker');

        return axios.post(process.env.REACT_APP_KEYCLOAK_TOKEN_ENDPOINT!, data).then((res) => {
            localStorage.setItem("tokens", JSON.stringify(res.data));
            originalRequest._retry = true;      
            originalRequest.headers['Authorization'] = 'Bearer ' + res.data.access_token;   
            Rpgtrackerwebclient.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.access_token;     
            return Rpgtrackerwebclient.request(originalRequest);
        }).catch(err => {
            if (err.response.status === 400) {
                localStorage.removeItem("tokens");
                localStorage.removeItem("permissions");
                window.location.href = '/';
            }
            return Promise.reject(err);
        });
    }
    if (originalRequest._retry) {
        localStorage.removeItem("tokens");
        localStorage.removeItem("permissions");
        window.location.href = '/';
    }
    return Promise.reject(error);
})