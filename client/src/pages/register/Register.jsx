import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './register.scss'
import axios from 'axios'
export default function Register() {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [username,setUsername] = useState("")
    const history = useHistory()

    const emailRef = useRef()
    const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL})

    const handleStart = ()=>{
        setEmail(emailRef.current.value)
    }

    const handleFinish = async(e)=>{
        e.preventDefault()
        
        try{
            console.log(email)
            console.log(username)
            console.log(password)
            await axiosInstance.post("/auth/register",{email,username,password})
            history.push("/login")
        }catch(err){
            console.log(err)
        }
        
    }

    console.log(password)
    console.log(username)

    return (
        <div className="register">
            <div className="top">
                <div className="wrapper">
                    <img 
                        className="logo"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                        alt=""
                    />
                    <button className="loginButton" onClick={()=>{history.push('/login')}}>Sign In</button>
                </div>
            </div>
            <div className="container">
                <h1>Unlimted movies, TV shows, and more</h1>
                <h2>Watch anywhere. Cancel anytime</h2>
                <p>
                    Ready to watch? Enter your email to create or restart your membership.
                </p>
                {
                    !email ? (
                        <div className="input">
                            <input type="email" placeholder="email address" ref={emailRef}/>
                            <button className="registerButton" onClick={handleStart}>Get Started</button>
                        </div>
                    ) : (
                        <form className="input">
                            <input type="username" placeholder="username" onChange={(e)=>setUsername(e.target.value)}/>
                            <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
                            <button className="registerButton" onClick={handleFinish}>Get Started</button>
                        </form>
                    )
                }
                
            </div>
        </div>
    )
}
