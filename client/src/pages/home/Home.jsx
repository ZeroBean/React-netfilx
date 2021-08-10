import './home.scss'
import React,{useEffect, useState} from 'react'
import Navbar from '../../components/navbar/Navbar'
import Featured from '../../components/featured/Featured'
import List from '../../components/list/List'
import axios from 'axios'


export default function Home({type}) {

    const[lists,setLists] = useState([])
    const [genre,setGenre] = useState(null)
    useEffect(()=>{
        const getRandomLists = async ()=>{
            try{
                const res = await axios.get(
                    `lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`,
                    {
                        headers:{
                            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMDY0OWUxNWI5NWU5NzE2MDI0ZjU0MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYyNzgyNTU3NywiZXhwIjoxNjI4MjU3NTc3fQ.6ir3ufJCmM4B2jRw7_2_IJdZ9OW2xzc8Z_MoVKyuMN8"
                        }
                    }
                )
                // console.log(res.data)
                setLists(res.data)
            }catch(err){
                console.log(err)
            }
        }
        getRandomLists()
    },[genre,type])
    return (
        <div className="home">
            <Navbar/>
            <Featured type={type} setGenre={setGenre}/>
            {
                lists.map((list)=>(
                    <List list={list} key={list._id}/>
                ))
            }
        </div>
    )
}
