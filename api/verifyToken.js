const jwt = require('jsonwebtoken')


//JWT鉴别中间件
function verify(req,res,next){
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
            if(err){
                res.status(403).json("Token 不合法")
            }
            req.user = user;
            next()
        })
    }else{
        return res.status(401).json("你没有得到授权")
    }
}

module.exports = verify