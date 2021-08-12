import {getMoviesFailure, 
        getMoviesStart,
        getMoviesSuccess,
        deleteMovieFailure,
        deleteMovieStart,
        deleteMovieSuccess,
        createMovieStart,
        createMovieSuccess,
        createMovieFailure,
} from "./MovieActions"
import axios from 'axios'

const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL})
export const getMovies = async(dispatch)=>{
    dispatch(getMoviesStart())
    try{
        const res = await axiosInstance.get('/movies',{
            headers:{
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            }
        })
        dispatch(getMoviesSuccess(res.data))
    }catch(err){
        dispatch(getMoviesFailure())
    }
}


export const createMovie = async(movie,dispatch)=>{
    dispatch(createMovieStart())
    try{
        const res = await axiosInstance.post('/movies', movie,{
            headers:{
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            }
        })
        dispatch(createMovieSuccess(res.data))
    }catch(err){
        dispatch(createMovieFailure())
    }
}

export const deleteMovie = async(id,dispatch)=>{
    dispatch(deleteMovieStart())
    try{
        await axiosInstance.delete('/movies/' + id,{
            headers:{
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            }
        })
        dispatch(deleteMovieSuccess(id))
    }catch(err){
        dispatch(deleteMovieFailure())
    }
}


