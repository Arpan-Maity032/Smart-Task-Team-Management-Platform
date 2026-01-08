import React from 'react'

function Login() {
  return (
    <div>
        <h2>Hi! <br/> Welcome</h2>
        <p>I'm waiting for you.Please enter your detail.</p>
        <form action="/login" method = "Post">
            <input type="email" name="email" placeholder='Enter your email' required/>
            <input type="password" name="password" placeholder='Enter your password' required/>
            <input type="checkbox" id="remember"/>
            <label for="remember">Remember me</label>
            <a href="www.google.com">Forgot Password?</a>
            <button type="submit">Submit</button>
        </form>
        <div>
            <p>Don't have an account?</p>
            <a href="www.google.com">Sign Up</a>
        </div>
    </div>
  )
}

export default Login