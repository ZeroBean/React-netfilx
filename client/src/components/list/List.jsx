import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons'
import React, { useRef, useState } from 'react'
import ListItem from '../listItem/ListItem'
import './list.scss'
export default function List({list}) {
    //控制按键是否显示
    const [isMoved,setIsMoved] = useState(false)
    //记录滑动了多个item，到末位不让点击,暂时设置10个，移动5个后，剩下5个不允许再移动
    const [slideNumber,setSlideNumber] = useState(0)
    //控制响应式图片滑动,230为ListItem的长度
    const [clickLimit,setClickLimit] = useState(window.innerWidth / 230)
    const listRef = useRef()

    const handleClick = (direction)=>{
        setIsMoved(true)
        //getBoundingClientRect返回元素的大小即相对于视口的位置
        let distance = listRef.current.getBoundingClientRect().x - 50
        if(direction ==="left" && slideNumber>0){
            listRef.current.style.transform = `translateX(${distance + 230}px)`
            setSlideNumber(slideNumber - 1)
        }
        if(direction ==="right" && slideNumber < 10 - clickLimit){
            listRef.current.style.transform = `translateX(${-230 + distance}px)`
            setSlideNumber(slideNumber + 1)
        }
    }

    return (
        <div className="list">
            <span className="listTitle">{list.title}</span>
            <div className="wrapper">
                <ArrowBackIosOutlined 
                    className="sliderArrow left" 
                    onClick={()=>handleClick("left")}
                    style={{display: !isMoved && "none"}}
                />
                    <div className="container" ref={listRef}>
                        {
                            list.content.map((item,index)=>(
                                <ListItem index={index} key={index} item={item}/>
                            ))
                        }
                        
                    </div>
                <ArrowForwardIosOutlined className="sliderArrow right" onClick={()=>handleClick("right")}/>
            </div>
        </div>
    )
}
