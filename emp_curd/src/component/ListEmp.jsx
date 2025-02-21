//router module
import {Link, useNavigate} from 'react-router-dom'
//state module
import { useState, useEffect } from 'react'
import axios from "axios"



export default function ListEmp() {

  const [employees, setEmployees]=useState([])
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  function handleDelete(id){
    axios.delete("http://localhost:3000/"+id).then((r)=>
      setStatus(!status)

    //navigate('/')
    )

  }

  function handleStatus(id,x){
    axios.patch("http://localhost:3000/status/"+id,{active:x}).then((r)=>{
      console.log(r);
      setStatus(!status)
      //window.location.reload(false);
    })
  }



  //useeffect
  useEffect(()=>{
    axios.get("http://localhost:3000")
    .then((r)=>{
      console.log(r.data);
      setEmployees(r.data)
    })
  },[status])

  return (
    <>

    <div className='text-bg-primary p-4'>
      <h2>Employees</h2> <hr /> 
    </div>


    <div className='container mt-3'>
      <div className='text-end mb-3'>
        <Link to="/create" className="btn btn-sm btn-success">Add New Employees</Link>
      </div>
    

    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Name</th><th>DOJ</th><th>Salary</th><th>Department</th><th>email</th><th>Phone</th><th>Action</th><th>Mark As</th>
        </tr>
      </thead>
      
      <tbody>
        {
          employees.map((e)=>{ 
            let date = new Date(e.doj);
            const formatter = new Intl.DateTimeFormat('en-US',{dateStyle:'long'});
            const formattedDate = formatter.format(date);
          return <tr key={e._id}>
          <td>{e.name}</td>
          <td>{formattedDate}</td>
          <td>{e.salary}</td>
          <td>{e.dept}</td>
          <td>{e.email}</td>
          <td>{e.phone}</td>
          <td>
          <Link to={"view/"+e._id} className="btn btn-success btn-sm">View</Link>
          &nbsp;
          <Link to={"update/"+e._id} className="btn btn-success btn-sm">Edit</Link>
          &nbsp;
          <button className="btn btn-danger btn-sm" onClick={()=>{handleDelete(e._id)}}>Del</button>
          &nbsp;
          </td>
          <td>
            {e.active ? <button className='btn btn-warning btn-sm' onClick={()=>{handleStatus(e._id,false)}}>Left</button>
            : <button className='btn btn-warning btn-sm' onClick={()=>{handleStatus(e._id,true)}}>Active</button>
            }
          </td>
        </tr>
          }

        )
        }
      </tbody>
    </table>
    </div>
    </>
  )
}
