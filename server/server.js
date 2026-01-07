const express = require('express')
const cors=require('cors')
const data =require('./data.json')


const app =express()
app.use(express.json())
app.use(cors())

app.get('/api/user',(req,res)=>{
    res.json(data)
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})