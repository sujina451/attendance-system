import { post } from './request'

export const login = (data) => {
    return new Promise(function (resolve, reject) {
        try {
            post('login', null, data).then((response) => {
                resolve(response)
            })
        } catch ($e) {
            resolve(null)
        }
    })
}

export const logout = (token) => {
    return new Promise(function (resolve, reject) {
        try {
            post('logout', token, null).then((response) => {
                resolve(response)
            })
        } catch ($e) {
            resolve(null)
        }
    })
}


