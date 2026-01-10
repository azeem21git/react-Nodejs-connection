import axios from 'axios'
import React, { useEffect, useState } from 'react'



const App = () => {

const [user,setUser]=useState([])

async function showUser(){
    try {
      const res=await axios.get('http://localhost:3000/api/user')
      setUser(res.data)
      
    } catch (error) {
      console.log("error is " + error)
    }
}


async function deleteUser(id){
   try {
     await axios.delete(`http://localhost:3000/api/user/id`)

   } catch (error) {
    
   }
}

useEffect(()=>{
  showUser()
},[])

  return (
    <div className='Container'>
      <h1>Todo App (CRUD)</h1>
      
      <table>
      <thead>
      <tr>
        <td>ID</td>
        <td>Name</td>
        <td>City</td>
        <td>Study</td>
        <td>Age</td>
        <td>Delete</td>
      </tr>
      </thead>

      <tbody>
      {
        user.map((item)=>{
          return(
            <tr key={item.id}>
             <td>{item.id}</td>
             <td>{item.name}</td>
             <td>{item.city}</td>
             <td>{item.study}</td>
             <td>{item.age}</td>
             <td><button onClick={deleteUser(item.id)}>Delete</button></td>
          </tr>
          )
          
        })
      }
      </tbody>
      </table>

    </div>
  )
}

export default App






























































































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// // API URL-ஐ ஒரு மாறிலியாக (Constant) வைப்பது நல்லது
// const API_URL = "http://localhost:3000/api/user";

// const App = () => {
//   // 1. States
//   const [users, setUsers] = useState([]);         // மெயின் டேட்டா
//   const [filteredUsers, setFilteredUsers] = useState([]); // தேடலுக்குப் பின் வரும் டேட்டா
//   const [formData, setFormData] = useState({ name: "", city: "", study: "", age: "" });
//   const [isEdit, setIsEdit] = useState(false);    // Edit செய்கிறோமா இல்லையா?

//   // 2. Fetch All Data
//   const getAllData = async () => {
//     try {
//       const res = await axios.get(API_URL);
//       setUsers(res.data);
//       setFilteredUsers(res.data);
//     } catch (err) {
//       console.error("Error fetching data:", err);
//     }
//   };

//   useEffect(() => {
//     getAllData();
//   }, []);

//   // 3. Handle Input Changes
//   const handleInput = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // 4. Search Logic (Professional)
//   const handleSearchChange = (e) => {
//     const searchText = e.target.value.toLowerCase();
//     const filtered = users.filter((item) => {
//       return (
//         item.name?.toLowerCase().includes(searchText) ||
//         item.city?.toLowerCase().includes(searchText)
//       );
//     });
//     setFilteredUsers(filtered);
//   };

//   // 5. Add or Update Record (Unified Function)
//   const handleSubmit = async () => {
//     if (!formData.name || !formData.city) {
//       alert("Please fill all required fields!");
//       return;
//     }

//     try {
//       let res;
//       if (isEdit) {
//         // Update Logic
//         res = await axios.put(`${API_URL}/${formData.id}`, formData);
//         alert("User updated successfully!");
//       } else {
//         // Add Logic
//         res = await axios.post(API_URL, formData);
//         alert("User added successfully!");
//       }

//       setUsers(res.data);
//       setFilteredUsers(res.data);
//       resetForm();
//     } catch (err) {
//       console.error("Operation failed:", err);
//       alert("Something went wrong!");
//     }
//   };

//   // 6. Delete Record
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       try {
//         const res = await axios.delete(`${API_URL}/${id}`);
//         setUsers(res.data);
//         setFilteredUsers(res.data);
//       } catch (err) {
//         console.error("Delete failed:", err);
//       }
//     }
//   };

//   // 7. Prepare Form for Edit
//   const handleEdit = (user) => {
//     setFormData(user);
//     setIsEdit(true);
//   };

//   // 8. Reset Form
//   const resetForm = () => {
//     setFormData({ name: "", city: "", study: "", age: "" });
//     setIsEdit(false);
//   };

//   return (
//     <div className='container' style={{ padding: '20px' }}>
//       <h2>User Management (CRUD)</h2>

//       {/* Input Section */}
//       <div className='form-section' style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '15px' }}>
//         <h4>{isEdit ? "Edit User" : "Add New User"}</h4>
//         <input name='name' placeholder='Name' value={formData.name} onChange={handleInput} />
//         <input name='city' placeholder='City' value={formData.city} onChange={handleInput} />
//         <input name='study' placeholder='Study' value={formData.study} onChange={handleInput} />
//         <input name='age' placeholder='Age' value={formData.age} onChange={handleInput} />
        
//         <button onClick={handleSubmit} style={{ marginLeft: '10px', backgroundColor: isEdit ? 'orange' : 'green', color: 'white' }}>
//           {isEdit ? "Update User" : "Add User"}
//         </button>
        
//         {isEdit && <button onClick={resetForm} style={{ marginLeft: '10px' }}>Cancel</button>}
//       </div>

//       <hr />

//       {/* Search Section */}
//       <div style={{ margin: '20px 0' }}>
//         <input type="search" placeholder='Search by name or city...' onChange={handleSearchChange} style={{ width: '100%', padding: '8px' }} />
//       </div>

//       {/* Data Table */}
//       <table border="1" width="100%" style={{ borderCollapse: 'collapse', textAlign: 'left' }}>
//         <thead>
//           <tr style={{ backgroundColor: '#f2f2f2' }}>
//             <th>ID</th>
//             <th>NAME</th>
//             <th>CITY</th>
//             <th>QUALIFICATION</th>
//             <th>AGE</th>
//             <th>ACTIONS</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredUsers.length > 0 ? (
//             filteredUsers.map((item) => (
//               <tr key={item.id}>
//                 <td>{item.id}</td>
//                 <td>{item.name}</td>
//                 <td>{item.city}</td>
//                 <td>{item.study}</td>
//                 <td>{item.age}</td>
//                 <td>
//                   <button onClick={() => handleEdit(item)} style={{ marginRight: '5px' }}>Edit</button>
//                   <button onClick={() => handleDelete(item.id)} style={{ color: 'red' }}>Delete</button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr><td colSpan="6" style={{ textAlign: 'center' }}>No users found</td></tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default App;