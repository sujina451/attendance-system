const API_URL = "https://attendance.dotappnepal.com/api/"

export const get = (path, token = null) => {
    let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
    if (token) {
        headers['Authorization'] = 'Bearer ' + token
    }
    const config = {
        method: 'GET',
        headers: headers,
    }
    return fetch(API_URL + path, config)
        .then((response) => response.json())
        .then((data) => {
            if ('code' in data) {
               return data;
            } else {
                const result = {
                    code : '002',
                    status : 'Failure',
                    message: 'Service Down. Please try again later.'
                }
                return result
            }
        })
        .catch((error) => {
            const result = {
                code : '002',
                status : 'Failure',
                message: 'Service Down. Please try again later.'
            }
            return result
        })
}
export const post = (path, token = null, body = null) => {
    let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
    if (token) {
        headers['Authorization'] = 'Bearer ' + token
    }
    const config = {
        method: 'POST',
        headers: headers,
    }
    if (body) {
        config['body'] = JSON.stringify(body)
    }
    return fetch(API_URL + path, config)
        .then((response) => response.json())
        .then((data) => {
            if ('code' in data) {
                return data
            } else {
               
                const result = {
                    code : '002',
                    status : 'Failure',
                    message: 'Service Down. Please try again later.'
                }
                return result
            }
        })
        .catch((error) => {
            const result = {
                code : '002',
                status : 'Failure',
                message: 'Service Down. Please try again later.'
            }
            return result
        })
}
