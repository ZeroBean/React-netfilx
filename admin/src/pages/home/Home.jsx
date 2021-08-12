import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
// import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import {useEffect, useState,useMemo} from 'react'
import axios from 'axios'


export default function Home() {
  
  const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL})
  const MONTHS = useMemo(()=>
  [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],[]) 


  const [userStats,setUserStats] = useState([])
  useEffect(()=>{
    const getStats = async ()=>{
      try{
        const res = await axiosInstance.get('/users/stats',{
          headers:{
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMDY0OWUxNWI5NWU5NzE2MDI0ZjU0MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYyNzgyNTU3NywiZXhwIjoxNjI4MjU3NTc3fQ.6ir3ufJCmM4B2jRw7_2_IJdZ9OW2xzc8Z_MoVKyuMN8"
          }
        })
        //对数据进行排序
        const statsList = res.data.sort((a,b)=>a._id-b._id)
        statsList.map((item)=>
          setUserStats((prev)=>[
            ...prev,

            //推入新字段，name：月份，New User作为表格的字段，显示新增用户数量
            {name:MONTHS[item._id-1],"New User": item.total}
          ])
        )
      }catch(err){
        console.log(err)
      }
    }
    getStats()
  },[MONTHS,axiosInstance])
  console.log(userStats)
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="New User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
