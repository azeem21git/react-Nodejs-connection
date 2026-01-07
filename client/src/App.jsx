import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'



const App = () => {


  const [user,setUser]=useState([])
  const [filteruser ,setfilterUser] =useState([])
  const [formData, setFormData] = useState({ name: "", city: "", study: "", age: "" });

  const handleInput = (e) => {
    
    setFormData({ ...formData, [e.target.name]: e.target.value });
};


async function getAllData(){
   try{
     const res =await axios.get('http://localhost:3000/api/user');
     setUser(res.data)
     setfilterUser(res.data)
   }
   catch(err)
   {
    console.log(err)
   }
}

useEffect(()=>{
    getAllData()
},[])


function handleSearchChange(e){
    const searchText = e.target.value.toLowerCase();
    // //common people writing code 
    // const filteredUsers = user.filter((user)=>user.name.toLowerCase().includes(searchText));

    //Proffessional way code write
    const filteredUsers =user.filter((item)=>{
      if(!item.name) 
        return false;

       return item.name.toLowerCase().includes(searchText.toLowerCase())
    })


    setfilterUser(filteredUsers)
}


// async function handleDelete(id){
//       try{
//         await axios.delete(`http://localhost:3000/api/user/${id}`)
//         .then((res)=>{
//           setUser(res.data);
//           setfilterUser(res.data);
//         })
//       }
//       catch(err){
//             console.log(err)
//       }
// }



async function handleDelete(id)
{
  const isConfiremed =window.confirm("Are you sure you want to do delete")

  if(isConfiremed)
  {
    try{
      const res=await axios.delete(`http://localhost:3000/api/user/${id}`);
      setUser(res.data);
      setfilterUser(res.data);
      alert('delet sucess ')
    }
    catch(err){
         console.log(err)
         alert("failed deleet user")
    }
  }
}


const handleAddRecord = async () => {
    
    if (!formData.name || !formData.city) {
        alert("Please fill all fields!");
        return;
    }

    try {
        const res = await axios.post("http://localhost:3000/api/user", formData);
        setUser(res.data);       
        setfilterUser(res.data); 
        setFormData({ name: "", city: "", study: "", age: "" }); 
        alert("User added successfully!");
    } catch (err) {
        console.log(err);
    }
};



  return (
    <div className='container'>
      <h3>CRUD Application </h3>
      <input type="search" placeholder='search here' onChange={handleSearchChange}/>
      
      <div className='input-search'>
      
       <div className='add-user-sactio'>
        <input name='name' placeholder='Name' value={formData.name} onChange={handleInput}/>
        <input name='city' placeholder='City' value={formData.city} onChange={handleInput}/>
        <input name='study' placeholder='Study' value={formData.study} onChange={handleInput}/>
        <input name='age' placeholder='Age' value={formData.age} onChange={handleInput}/>
        <button onClick={handleAddRecord}>Add</button>
       </div>

      
      </div>

      <table>
        <thead>
         

          <tr>
            <td>ID</td>
            <td>NAME</td>
            <td>CITY</td>
            <td>Qualification</td>
            <td>AGE</td>
            <td>EDIT</td>
            <td>DELETE</td>
          </tr>
        </thead>

        <tbody>
          {
            filteruser.map((item)=>(
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.city}</td>
                <td>{item.study}</td>
                <td>{item.age}</td>
                <td><button >Edit</button></td>
                <td><button onClick={()=>handleDelete(item.id)}>Delete</button></td>
              </tr>
            ))
          }
        </tbody>

      </table>
      
    </div>
  )
}

export default App
