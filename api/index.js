const express = require('express')
const app  = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const authRoute = require("./route/auth")
const usersRoute = require("./route/users")
const movieRoute = require("./route/movies")
const listRoute = require('./route/lists')


dotenv.config()

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
}).then(()=>{
    console.log("数据库连接成功")
}).catch(err=>{
    console.log(err)
})

app.use(cors())
app.use(express.json())

app.use('/api/auth',authRoute)
app.use('/api/users',usersRoute)
app.use('/api/movies',movieRoute)
app.use('/api/lists',listRoute)

app.listen(8800,()=>{
    console.log("Backend server is running")
})