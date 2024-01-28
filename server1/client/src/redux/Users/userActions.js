import { FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS} from "./userType"
import axios from 'axios'

export const fetchUsersRequest=()=>{
    return{
        type:FETCH_USERS_REQUEST
    }
}
export const fetchUsersSuccess=(users)=>{
    return{
        type:FETCH_USERS_SUCCESS,
        payload:users
    }
}
export const fetchUsersFailure=(error)=>{
    return{
        type:FETCH_USERS_FAILURE,
        payload:error
    }
}
export const fetchUsers = ()=>{
    return function(dispatch){
        dispatch(fetchUsersRequest())
        axios.get('http://localhost:5000/MusicCds/all')
        .then(response=>{
            const users=response.data.map(user=>user)
            dispatch(fetchUsersSuccess(users))
        })
        .catch(error=>{
            dispatch(fetchUsersFailure(error.message))
        })
    }
}