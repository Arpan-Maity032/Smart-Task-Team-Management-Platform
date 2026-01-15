import React,{useState} from 'react';
import "../styles/register.css";
import task_img from "../asserts/task_manage1.png";
import { useNavigate } from 'react-router-dom';

function Register() {
    const [getData,setGetData] = useState({name:"",email:"",password:"",confirmPassword:""});
    const[error,setError] = useState("");
    const navigate = useNavigate();
    const handleChange = (e) =>{
        const {name,value} = e.target;
        const updatedData = {...getData,[name]:value};
        setGetData(updatedData);


        //inline error if password not equal to confirmPassword

            if ((name === "password" || name === "confirmPassword")) {
                if (updatedData.password !== updatedData.confirmPassword && updatedData.confirmPassword !== "") {
                    setError("Passwords do not match");
                } else {
                    setError("");
                }
            }
        };
    const handleSubmit = async (e) =>{
        e.preventDefault();//restric refresh
        if(error)return;

        try{
            const { confirmPassword, ...dataToSend } = getData;
            const response = await fetch(`${process.env.REACT_APP_API}/auth/register`,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(dataToSend),
            });
            const data = await response.json();

            if(response.ok){
                navigate("/");
            }
            else{
                alert(data.message || "Registration failed")
            }
        }
        catch(error){
            console.log("Error",error);
            alert('Something went wrong. Please try again.');
        }
        setGetData({name:"",email:"",Password:"",confirmPassword:""});
    }
  return (
    <div className='parent-div'>
        <div className='register-form'>
            <p className='header'>Create An Account</p>
            <form className='input-form' onSubmit={handleSubmit}>
                <p>User Name</p>
                <input type="text" name = "name" placeholder='Enter Your Name' required onChange={handleChange}/>
                <p>Email Id</p>
                <input type="email" name="email" placeholder='Enter your email'required onChange={handleChange}/>
                <p>Password</p>
                <input type="password" name="password" placeholder='Enter your password'  required onChange={handleChange}/>
                <p>Re-Enter Password</p>
                <input type="password" name="confirmPassword" placeholder='Enter your password'  required onChange={handleChange} className={error ? "error" : ""}/>
                {error && <span className='error-text'>{error}</span>}
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