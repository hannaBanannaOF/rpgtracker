
export function authenticate(values: string, callbackSuccess: (data: any) => void, callbackError: (message: any) => void) {
    const rqParams = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(values)
    }
    
    fetch(`${process.env.REACT_APP_BACKEND_URL}v1/token/auth/`, rqParams).then((res) => {
        res.text().then(text => {
            let data = JSON.parse(text);
            if (!res.ok) {
                if (res.status === 401 || res.status === 403) {
                    callbackError(data.detail);
                }
            } else {
                callbackSuccess(data);    
            }
        });
    }).catch((err) => {
        callbackError(err);
    });
}

export function logout(callback: VoidFunction) {
    callback();
}