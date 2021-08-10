import { ArrowBackIosOutlined } from '@material-ui/icons'
import React from 'react'
import { useLocation,Link } from 'react-router-dom'
import './watch.scss'
export default function Watch() {
    const location = useLocation()
    const movie = location.movie
    console.log(location)
    return (
        <div className="watch">
            <Link to="/">
                <div className="back">
                    <ArrowBackIosOutlined/>
                    Home
                </div>
            </Link>
            <video 
                className="video" 
                autoPlay 
                progress="true"
                controls 
                src={movie.video}
            />
        </div>
    )
}
