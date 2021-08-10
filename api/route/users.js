const router = require('express').Router()
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const verify = require('../verifyToken')

//更新
router.put('/:id',verify,async(req,res)=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
        if(req.body.password){
            req.body.password = CryptoJS.AES.decrypt(
                user.password, 
                process.env.SECRET_KEY
            ).toString()
        }
        try{
            const updateUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})

            res.status(200).json(updateUser)
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("你无权更新别人的账号")
    }
})
//删除
router.delete('/:id',verify,async(req,res)=>{
    // 判断是不是本用户，或者是管理员
    if(req.user.id === req.params.id || req.user.isAdmin){
        try{
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("用户已删除")
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("你无权删除别人的账号")
    }
})
//获取所有用户
router.get('/',verify,async(req,res)=>{
    const query = req.query.new
    console.log(query)
    // 判断是不是本用户，或者是管理员
    if(req.user.isAdmin){
        try{
            const users = query ? await User.find().sort({_id:-1}).limit(5) : await User.find()
            res.status(200).json(users)
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("你无权获取所有用户信息")
    }
})
//获取单个用户
router.get('/find/:id',async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        const {password,...info} = user._doc
        res.status(200).json(info)
    }catch(err){
        res.status(500).json(err)
    }
})

//获取用户状态
router.get('/stats',async(req,res)=>{
    const today = new Date()
    const lastYear = today.setFullYear(today.setFullYear() - 1)

    const monthsArray = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]

    try{
        //数据的聚合，$project 修改输入文档的结构
        const data = await User.aggregate([
            {
                $project:{
                    //按照创建事件临时加上月份字段
                    month: {$month: "$createdAt"}
                }
            },{
                //统计相同月份创建用户的数量
                $group:{
                    _id: "$month",
                    total:{$sum:1}
                }
            }
        ])
        res.status(200).json(data)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router