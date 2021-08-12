const router = require("express").Router()
const User = require("../models/User")
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

//注册
router.post("/register",async(req,res)=>{
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
    })
    try{
        const user = await newUser.save()
        res.status(201).json(user)
    }catch(err){
        res.status(500).json(err)
    }

})

//登录
router.post("/login",async(req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email})
        !user && res.status(401).json("用户名错误")

        //根据邮箱获取该用户的密码进行比对
        const bytes  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8)

        originalPassword !== req.body.password && res.status(402).json("密码错误")

        const accessToken = jwt.sign(
                {id:user._id,isAdmin:user.isAdmin},
                process.env.SECRET_KEY,
                {expiresIn:"200d"}
        )
        //隐藏密码
        const {password,...info} = user._doc
        res.status(200).json({...info,accessToken})
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router