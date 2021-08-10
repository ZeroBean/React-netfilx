import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from 'axios'

export default function WidgetSm() {

  const [newUsers,setNewUsers] = useState([])

  useEffect(()=>{
    const getNewUsers = async ()=>{
      try{
        const res = await axios.get("/users?new=true",{
          headers:{
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMDY0OWUxNWI5NWU5NzE2MDI0ZjU0MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYyNzgyNTU3NywiZXhwIjoxNjI4MjU3NTc3fQ.6ir3ufJCmM4B2jRw7_2_IJdZ9OW2xzc8Z_MoVKyuMN8"
          }
        })
        setNewUsers(res.data)
      }catch(err){
        console.log(err)
      }
    }
    getNewUsers()
  },[])
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {
          newUsers.map((user,index)=>(
            <li className="widgetSmListItem" key={index}>
              <img
                src={user.profilePic || "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"}
                alt=""
                className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{user.username}</span>
                <span className="widgetSmUserTitle">Software Engineer</span>
              </div>
              <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
