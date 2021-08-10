import { InfoOutlined, PlayArrow } from '@material-ui/icons'
import React,{useState} from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import './featured.scss'

export default function Featured({type,setGenre}) {
    const [content,setContent] = useState({})

    useEffect(()=>{
        const getRandomContent = async ()=>{
            try{
                const res = await axios.get(`/movies/random?type=${type}`,{
                    headers:{
                        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMDY0OWUxNWI5NWU5NzE2MDI0ZjU0MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYyNzgyNTU3NywiZXhwIjoxNjI4MjU3NTc3fQ.6ir3ufJCmM4B2jRw7_2_IJdZ9OW2xzc8Z_MoVKyuMN8"
                    }
                })
                // console.log(res.data[0])
                setContent(res.data[0])
            }catch(err){
                console.log(err)
            }
        }
        getRandomContent()
    },[type])
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
