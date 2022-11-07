export const checkin = (data) =>{
    return {
        type: "CHECKIN",
        data: data,

    }
}
export const checkout = () =>{
    return {
        type: "CHECKOUT",
        data: null
    }
}