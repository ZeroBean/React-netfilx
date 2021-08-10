const router = require('express').Router()
const Movie = require('../models/Movie')
const verify = require('../verifyToken')

//新建电影
router.post('/',verify,async(req,res)=>{
    if(req.user.isAdmin){
        const newMovie = new Movie(req.body)
        try{
            const savedMovie = await newMovie.save()
            res.status(201).json(savedMovie)
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("您没有权限")
    }
})
//删除电影
router.delete('/:id',verify,async(req,res)=>{
    if(req.user.isAdmin){
        try{
            await Movie.findByIdAndDelete(req.params.id)
            res.status(200).json("删除成功")
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("您没有权限")
    }
})

//更新电影
router.put('/:id',verify,async(req,res)=>{
    if(req.user.isAdmin){
        try{
            const updateMovie = await Movie.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
            res.status(200).json(updateMovie)
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("您没有权限")
    }
})


//获取电影
router.get('/find/:id',verify,async(req,res)=>{
    try{
        const movie = await Movie.findById(req.params.id)
        res.status(200).json(movie)
    }catch(err){
        res.status(500).json(err)
    }
})


//获取首页电影（随机）
router.get('/random',verify,async(req,res)=>{
    //获取页面类型
    const type = req.query.type
    let movie
    try{
        if(type==="series"){
            movie = await Movie.aggregate([
                {$match: {isSeries:true}},
                {$sample:{size:1}}
            ])
        }else{
            movie = await Movie.aggregate([
                {$match: {isSeries:false}},//多电影进行过滤
                {$sample:{size:1}}//$sample 是取随机
            ])
        }
        res.status(200).json(movie)
    }catch(err){
        res.status(500).json(err)
    }
})

//获取所有电影
router.get('/',verify,async(req,res)=>{
    if(req.user.isAdmin){
        try{
            const movies = await Movie.find()
            res.status(200).json(movies.reverse())
        }catch(err){
            res.status(500).json(err)
        }
    }
    else{
        res.status(403).json("您没有权限")
    }
})

module.exports = router