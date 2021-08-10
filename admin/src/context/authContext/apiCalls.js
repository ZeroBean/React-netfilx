import axios from 'axios'
import { loginFailure, loginStart, loginSuccess } from './AuthActions'

export const login = async(user,dispatch)=>{
    dispatch(loginStart())
    try{
        const res = await axios.post("auth/login",user)
        //判断用户是否是管理员
        res.data.isAdmin && dispatch(loginSuccess(res.data))
    }catch(err){
        dispatch(loginFailure())
    }
}