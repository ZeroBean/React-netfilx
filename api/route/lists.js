const router = require('express').Router()
const List = require('../models/List')
const verify = require('../verifyToken')

//创建列表
router.post('/',verify,async(req,res)=>{
    if(req.user.isAdmin){
        const newList = new List(req.body)
        try{
            const savedList = await newList.save()
            res.status(200).json(savedList)
        }catch(err){
            res.status(500).json(err)
        }
    }
    else{
        res.status(403).json("您没有权限")
    }
})

//删除列表
router.delete('/:id',verify,async(req,res)=>{
    console.log(req.params)
    if(req.user.isAdmin){
        try{
            await List.findByIdAndDelete(req.params.id)
            res.status(200).json("删除成功")
        }catch(err){
            res.status(500).json(err)
        }
    }
    else{
        res.status(403).json("您没有权限")
    }
})

//获取列表
router.get("/",async(req,res)=>{
    const typeQuery = req.query.type
    const genreQuery = req.query.genre
    let list = []
    try{
        if(typeQuery){
            if(genreQuery){
                list = await List.aggregate([
                    {$sample:{size:10}},
                    {$match:{type:typeQuery,genre:genreQuery}},
                ])
            }else{
                list  = await List.aggregate([
                    {$sample:{size:10}},
                    {$match:{type:typeQuery}},
                ]) 
            }
        }else{
            list = await List.aggregate([{$sample:{size:10}}])
        }
        res.status(200).json(list)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router