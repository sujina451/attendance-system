import { get, post } from './request'



export const task = (data,token) => {
    return new Promise(function (resolve, reject) {
        try {
            post('task/add', token, data).then((response) => {
                resolve(response)
            })
        } catch ($e) {
            resolve(null)
        }
    })
}


