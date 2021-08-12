import { Add, PlayArrow, ThumbDownAltOutlined, ThumbUpAltOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './listItem.scss'

export default function ListItem({index,item}) {
    //控制鼠标悬浮时，浮窗的位置
    const [isHovered,setIsHovered] = useState(false)
    const [movie,setMovie] = useState({})
    const [isMounted,setIsMounted] = useState(true)
    const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL})
    useEffect(()=>{
        const getMovie = async ()=>{
            try{
                const res = await axiosInstance.get("/movies/find/"+ item ,{
                    headers:{
                        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMDY0OWUxNWI5NWU5NzE2MDI0ZjU0MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYyODc3MjIwMiwiZXhwIjoxNjQ2MDUyMjAyfQ.UCOu_DfNhqZs1Mj-4foqLvz63kXDC3y7-l21SMDEd1Y"
                    }
                })
                // console.log(res)
                if(isMounted){
                    setMovie(res.data)
                }
            }catch(err){
                console.log(err)
            }
        }
        getMovie()
        return ()=> setIsMounted(false)
    },[item,isMounted,axiosInstance])
    // console.log(movie)
    return (
        <Link to={{pathname:"/watch",movie:movie}}>
            <div 
                className="listItem"
                style={{left: isHovered && index * 225 - 50 + index*2.5}} 
                onMouseEnter={()=>setIsHovered(true)} 
                onMouseLeave={()=>setIsHovered(false)}
            >
                <img src={movie?.imgSm} alt=""/>
                {
                    isHovered && (
                        <>
                            <video src={movie.trailer} autoPlay={true} loop/>
                            <div className="itemInfo">
                                <div className="icons">
                                    <PlayArrow className="icon"/>
                                    <Add className="icon"/>
                                    <ThumbUpAltOutlined className="icon"/>
                                    <ThumbDownAltOutlined className="icon"/>
                                </div>
                                <div className="itemInfoTop">
                                    <span>{movie.duration}</span>
                                    <span className="limit">{movie.limit}</span>
                                    <span>{movie.year}</span>
                                </div>
                                <div className="desc">
                                    {movie.desc}
                                </div>
                                <div className="genre">{movie.genre}</div>
                            </div>
                        </>
                    )
                }
            </div>
        </Link>
    )
}
