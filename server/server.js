const express= require('express')
const cors =require('cors')
const mongoose=require('mongoose')
const fs =require('fs')
//let users =require('./data.json')
let  User =require('./Model/User')


const app=express()
app.use(express.json())
app.use(cors())


app.get('/api/user',async(req,res)=>{
    const users =await User.find()
    res.json(users)
})



app.delete('/api/user/:id',async(req,res)=>{
   try {
    await User.findByIdAndDelete(req.params.id)
    const allUsers = await User.find()
    res.json(allUsers)
   } catch (error) {
    
   }
})


// app.post('/api/user',(req,res)=>{
//     const newId=users.length>0 ? users[users.length-1].id+1 :1
//     const newUser ={id : newId ,...req.body};
//     users.push(newUser)
//     res.json(users)
// })



app.post('/api/user',async(req,res)=>{
  try {
    const newUser = new User(req.body)
    await newUser.save()
    const allUsers  =await User.save()
    res.json(allUsers)
  } catch (error) {
    
  }
})



app.put('/api/user/:id',async(req,res)=>{
     try {
        await User.findByIdAndUpdate(req.params.id , req.body,{new :true})
        const allUsers=await User.find()
        res.json(allUsers)
     } catch (error) {
        
     }
})


mongoose.connect('mongodb://127.0.0.1:27017/userDB')
     .then(()=>console.log("MongoDB connected successfully ..."))
     .catch((err)=>console.log("MongoDb Connection Error:",err))



app.listen(3000,()=>{
    console.log(`server running on port ${3000}`)
})





























































// const express = require('express')
// const cors=require('cors')
// const fs =require('fs')
// let users =require('./data.json')


// const app =express()  
// app.use(express.json())
// app.use(cors())

// app.get('/api/user',(req,res)=>{
//     res.json(users)
// })

// app.delete('/api/user/:id',(req,res)=>{
//     let id =Number(req.params.id)
//     let filteredUsers = users.filter((item)=>{
//        return item.id !== id
//     })
// users=filteredUsers;

//     fs.writeFile("./data.json",JSON.stringify(filteredUsers),(err,data)=>{
//         return res.json(filteredUsers)
//     })

// })



// app.post('/api/user', (req, res) => {
    
//     const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    
    
//     const newUser = { id: newId, ...req.body };

    
//     users.push(newUser);

    
//     fs.writeFile("./data.json", JSON.stringify(users, null, 2), (err) => {
//         if (err) return res.status(500).send("Error saving data");
//         res.status(201).json(users); 
//     });
// });


// app.put('/api/user/:id',(req,res)=>{
//     const id=Number(req.params.id)

//     const index=users.findIndex((item)=>item.id===id)

//     if(index !== -1)
//     {
//         users[index]={id,...req.body}
    

//     fs.writeFile("./data.json",JSON.stringify(users,null,2),(err)=>{
//         if(err)return res.status(500).send("Error updating data");
//         return res.json(users);
//     });
//     }
//     else{
//         res.status(404).json({message:"User not found"})
//     }
// })


// app.listen(3000,()=>{
//     console.log('Server is running on port 3000')
// })