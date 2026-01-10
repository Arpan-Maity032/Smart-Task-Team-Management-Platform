import React from 'react';
import "../styles/register.css";

function Register() {
  return (
    <div className='parent-div'>
        <div className='register-form'>
            <p>Create An Account</p>
            <form>
                <input type="name" name = "name" placeholder='Enter Your Name' required/>
                <input className='input-group' type="email" name="email" placeholder='Enter your email'required/>
                <input className='input-group' type="password" name="password" placeholder='Enter your password'  required />
                <button className="btn" type="submit">Submit</button>
            </form>
        </div>
        <div className='show-analyze'>
            <h2>Register</h2>
        </div>
    </div>
  )
}

export default Register