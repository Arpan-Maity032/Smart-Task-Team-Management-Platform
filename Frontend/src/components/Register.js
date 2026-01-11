import React from 'react';
import "../styles/register.css";
import task_img from "../asserts/task_manage1.png";

function Register() {
  return (
    <div className='parent-div'>
        <div className='register-form'>
            <p className='header'>Create An Account</p>
            <form className='input-form'>
                <p>User Name</p>
                <input type="name" name = "name" placeholder='Enter Your Name' required/>
                <p>Email Id</p>
                <input type="email" name="email" placeholder='Enter your email'required/>
                <p>Password</p>
                <input type="password" name="password" placeholder='Enter your password'  required />
                <p>Re-Enter Password</p>
                <input type="password" name="password" placeholder='Enter your password'  required />
                <button className="btn-register" type="submit">Sign Up</button>
            </form>
        </div>
        <div className='show-analyze'>
            <img src={task_img} alt='Task management defination'/>
        </div>
    </div>
  )
}

export default Register