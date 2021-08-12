import axios from 'axios'
import { loginFailure, loginStart, loginSuccess } from './AuthActions'

const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL})
export const login = async(user,dispatch)=>{
    
    dispatch(loginStart())
    try{
        const res = await axiosInstance.post("auth/login",user)
        //判断用户是否是管理员
        dispatch(loginSuccess(res.data))
    }catch(err){
        dispatch(loginFailure())
    }
}