export const signin = (data) =>{
    return {
        type: "LOGIN",
        data: data,

    }
}

export const signout = (token) =>{
    return {
        type: "LOGOUT",
        token: token,

    }
}