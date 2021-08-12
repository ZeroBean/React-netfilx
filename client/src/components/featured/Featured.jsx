import { InfoOutlined, PlayArrow } from '@material-ui/icons'
import React,{useState} from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import './featured.scss'

export default function Featured({type,setGenre}) {
    const [content,setContent] = useState({})
    const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL})

    useEffect(()=>{
        const getRandomContent = async ()=>{
            try{
                const res = await axiosInstance.get(`/movies/random?type=${type}`,{
                    headers:{
                        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMDY0OWUxNWI5NWU5NzE2MDI0ZjU0MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYyODc3MjIwMiwiZXhwIjoxNjQ2MDUyMjAyfQ.UCOu_DfNhqZs1Mj-4foqLvz63kXDC3y7-l21SMDEd1Y"
                    }
                })
                // console.log(res.data[0])
                setContent(res.data[0])
            }catch(err){
                console.log(err)
            }
        }
        getRandomContent()
    },[type,axiosInstance])
    return (
        <div className="featured">
            {
                type && (
                    <div className="category">
                        <span>{type==='movie' ? "Movies" : "Series"}</span>
                        <select name="genre" id="genre" onChange={e=>setGenre(e.target.value)}>
                            <option value="">Genre</option>
                            <option value="action">Action</option>
                            <option value="comedy">Comedy</option>
                            <option value="crime">Crime</option>
                            <option value="fantasy">Fantasy</option>
                            <option value="historical">Historical</option>
                            <option value="horror">Horror</option>
                            <option value="romance">Romance</option>
                            <option value="TV Show">TV Show</option>
                            <option value="thriller">Thriller</option>
                            <option value="western">Western</option>
                            <option value="animation">Animation</option>
                            <option value="drama">Drama</option>
                            <option value="documentary">Documentary</option>
                        </select>
                    </div>
                )
            }

            <img 
                src={content.img} 
                alt=""
            />
            <div className="info">
                <img src={content.imgTitle} alt=""/>
                <span className="desc">
                    {content.desc}
                </span>
                <div className="buttons">
                    <button className="play">
                        <PlayArrow/>
                        <span>Play</span>
                    </button>
                    <button className="more">
                        <InfoOutlined/>
                        <span>Info</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
