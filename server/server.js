const express = require('express')
const cors=require('cors')
const fs =require('fs')
let users =require('./data.json')


const app =express()  
app.use(express.json())
app.use(cors())

app.get('/api/user',(req,res)=>{
    res.json(users)
})

app.delete('/api/user/:id',(req,res)=>{
    let id =Number(req.params.id)
    let filteredUsers = users.filter((item)=>{
       return item.id !== id
    })
users=filteredUsers;

    fs.writeFile("./data.json",JSON.stringify(filteredUsers),(err,data)=>{
        return res.json(filteredUsers)
    })

})



app.post('/api/user', (req, res) => {
    // 1. புதிய ID உருவாக்குதல்: கடைசி ஐடியுடன் 1-ஐக் கூட்டுகிறோம்
    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    
    // 2. புதிய யூசர் ஆப்ஜெக்ட்: ஐடியையும் பயனர் அனுப்பிய டேட்டாவையும் இணைக்கிறோம்
    const newUser = { id: newId, ...req.body };

    // 3. லிஸ்டில் சேர்த்தல்
    users.push(newUser);

    // 4. ஃபைலில் நிரந்தரமாகப் பதிவிடுதல்
    fs.writeFile("./data.json", JSON.stringify(users, null, 2), (err) => {
        if (err) return res.status(500).send("Error saving data");
        res.status(201).json(users); // 201 என்பது "Created" என்பதற்கான கோட்
    });
});



app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})