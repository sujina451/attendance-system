import { get, post } from './request'



export const leave = (data,token) => {
    return new Promise(function (resolve, reject) {
        try {
            post('leave/add', token, data).then((response) => {
                resolve(response)
            })
        } catch ($e) {
            resolve(null)
        }
    })
}

export const leaveapprove = (data,token) => {
    return new Promise(function (resolve, reject) {
        try {
            post('leave/approve/id', token, data).then((response) => {
                resolve(response)
            })
        } catch ($e) {
            resolve(null)
        }
    })
}


