import jwtDecode from 'jwt-decode'
import isEmpty from 'lodash/isEmpty'
const token = localStorage.authToken
let userState
if(token){
    const user = jwtDecode(token)
    userState = {
        user,
        isAuth : true
    }
}
    else{
        userState={}
    }


export const userReducer =(state=userState,action={})=>{
    switch(action.type){
        case 'SET_USER' :
            return {
                user : action.user,
                isAuth : !isEmpty(action.user)
            }
        default :
            return state
    }

}