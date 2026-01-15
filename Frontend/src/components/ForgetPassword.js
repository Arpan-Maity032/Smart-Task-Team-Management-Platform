import React,{useState} from 'react';
import "../styles/forgetPassword.css";
import {useNavigate,Link} from 'react-router-dom';

function ForgetPassword() {
    const [getData, setData] = useState({email:""});
    const navigate = useNavigate();

    const handleChange =(e)=>{
        setData({...getData,[e.target.name]:e.target.value});
    }

    const handleSubmit =async (e)=>{
        e.preventDefault();
        try{
            const response = await fetch(`${process.env.REACT_APP_API}/auth/forget-password`,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(getData),
            });
            if(response.ok){
                navigate("/");
            }
        }
        catch(error){
            console.log('Error',error);
            alert('Something went wrong. Please try again.');
        }
    }
  return (
    <div className='forgotP'>
        <h2>Forgot your Password?</h2>
        <p>Enter your email so that we can send you pssword reset link</p>
        <form className='gmail-form' onSubmit={handleSubmit}>
            <input type='email' name ='email' placeholder='Enter your registered Email'  required onChange={handleChange}/>
            <button className="btn-forgot">Submit</button>
        </form>
        <Link className='login-back' to="/">Back To Login</Link>
    </div>
  )
}

export default ForgetPassword