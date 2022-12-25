import React,{useState} from "react";
import { useNavigate } from "react-router-dom";



const Login = (props) => {
  const [cordentials, setCordentials] = useState({email:"",password:""})
  const history=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email:cordentials.email,password:cordentials.password }),
    });
    const json = await response.json();
    console.log(json)
    if (json.success) {
      //redirect
      localStorage.setItem('token',json.authtoken)
      props.showAlert("Account Logged in Successfully","success")
     history("/")  
    }
    else{
      props.showAlert("Invalid Credentials","danger")
    }
  }
  const onChange = (e) => {
    setCordentials({ ...cordentials, [e.target.name]: e.target.value });

  }; 
  return (
    <div className="mt-3">
      <form  onSubmit={handleSubmit}>
      <h1>Login for get All Your Notes</h1>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={cordentials.email} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="current-password">Password</label>
          <input type="password" className="form-control" id="password"  onChange={onChange}  value={cordentials.password} name="password" placeholder="Password" />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
};
  export default Login
