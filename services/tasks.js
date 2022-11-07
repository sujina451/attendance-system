import { get } from './request'


export const tasks = (data,token) => {
    return new Promise(function (resolve, reject) {
        try {
            get('tasks', token, data).then((response) => {
                resolve(response)
            })
        } catch ($e) {
            resolve(null)
        }
    })
}
export const taskstoggle = (id,data,token) => {
    return new Promise(function (resolve, reject) {
        try {
            get('task/update/'+id, token, data).then((response) => {
                resolve(response)
            })
        } catch ($e) {
            resolve(null)
        }
    })
}