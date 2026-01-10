import React ,{useState} from 'react';
import "../styles/login.css";


function Login() {
  const [formData,setFormData] = useState({email:"",password:""});
  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value});
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const isRemembered = document.getElementById('remember').checked;
    try{
      const response = await fetch(`${process.env.REACT_APP_API}/auth/login`,{
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify(formData),
      });
      const data = await response.json();

      console.log("Response status:", response.status);
      console.log("respose:",data);
      if(response.ok){
        if(isRemembered){
          localStorage.setItem('token',data.token);//say after browser close
        }
        else{
          sessionStorage.setItem("token",data.token);//Deleted when tab close
        }
        alert('Login Successfull!');
      }else{
        alert(data.message || 'Login fauled');
      }
    }catch(error){
      console.log('Error',error);
      alert('Something went wrong. Please try again.');
    }
  }


  return (
    <div className="login-page">
        <h2>Hi! <br/> Welcome</h2>
        <p>I'm waiting for you.Please enter your detail.</p>
        <form className="form" onSubmit={handleSubmit}>
            <input className='input-group' type="email" name="email" placeholder='Enter your email' required onChange={handleChange}/>
            <input className='input-group' type="password" name="password" placeholder='Enter your password'  required onChange={handleChange}/>
            <p className='checkbox'><input type="checkbox" id="remember"/>
            <label htmlFor="remember">Remember me</label></p>
            <button className="btn" type="submit">Submit</button>
            <a className="forget-password" href="https://www.google.com">Forgot Password?</a>
        </form>
        <div className='hr-line'>
          <hr/><p>or</p><hr/>
        </div>
        <div className='sign-up'>
            <p>Don't have an account?</p>
            <a href="https://www.google.com">Sign Up</a>
        </div>
    </div>
  )
}

export default Login;