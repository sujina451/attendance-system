import { post } from './request'


export const check_in = (data,token) => {
    return new Promise(function (resolve, reject) {
        try {
            post('check-in', token, data).then((response) => {
                resolve(response)
            })
        } catch ($e) {
            resolve(null)
        }
    })
}

