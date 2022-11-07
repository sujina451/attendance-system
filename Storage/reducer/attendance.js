function AttendanceReducer (state=null,action) {
    switch(action.type){
        case'CHECKIN':
           return action.data.attendance;
           case'CHECKOUT':
           return null;
        default:
            return state
    }
}


export default AttendanceReducer
