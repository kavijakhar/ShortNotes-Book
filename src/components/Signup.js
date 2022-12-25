import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [cordentials, setCordentials] = useState({name:"",email:"",password:"",cpassword:"",})
  const history=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();     
    const {name,email,password} = cordentials;     
    const response = await fetch("http://localhost:5000/api/auth/createuser", {     
      method: "POST",     
      headers: {     
        "Content-Type": "application/json",      
      },               
      body: JSON.stringify({ name,email,password }),               
    });          
    const json = await response.json();               
    console.log(json)               
    if (json.success) {               
      localStorage.setItem('token',json.authtoken)               
     history("/")                 
     props.showAlert("Account Created Successfully","success")
    }               
    else{          
      props.showAlert("Invalid Details","danger")       
    }          
  }          
  const onChange = (e) => {
    setCordentials({ ...cordentials, [e.target.name]: e.target.value });

  }; 
  return (
    <div className="mt-3">
          <h1>Creat A Account to use INoteBook</h1>
      <form  onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input  onChange={onChange}  type="text" name="name" className="form-control" id="name" placeholder="Enter Name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input  onChange={onChange}  type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input  onChange={onChange} minLength={5} required  type="password" className="form-control" name="password" id="password" placeholder="Password" />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input onChange={onChange}  minLength={5} required type="password" className="form-control" name="cpassword"  id="cpassword" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup