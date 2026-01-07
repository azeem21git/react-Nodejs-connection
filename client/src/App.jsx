import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'



const App = () => {


  const [user,setUser]=useState([])

async function getAllData(){
   try{
     const res =await axios.get('http://localhost:3000/api/user');
     setUser(res.data)
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
    const filteredUsers = user.filter((user)=>user.name.toLowerCase().includes(searchText))
}

  return (
    <div className='container'>
      <h3>CRUD Application </h3>
      <div className='input-search'>
      <input type="search" placeholder='search here' onChange={handleSearchChange}/>
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
            user.map((item)=>(
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.city}</td>
                <td>{item.study}</td>
                <td>{item.age}</td>
                <td><button>Edit</button></td>
                <td><button>Delete</button></td>
              </tr>
            ))
          }
        </tbody>

      </table>
      
    </div>
  )
}

export default App
