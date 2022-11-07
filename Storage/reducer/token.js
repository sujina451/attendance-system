function tokenReducer (state=null,action) {
    switch(action.type){
        case'LOGIN':
           return action.data.token
        case'LOGOUT':
           return null;
        default:
            return state
    }
}


export default tokenReducer
