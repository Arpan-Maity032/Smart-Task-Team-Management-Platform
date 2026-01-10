import React,{useEffect} from 'react';
import flash from "../asserts/flask.png";
import "../styles/flash.css";
import { useNavigate } from 'react-router-dom';

function Flash() {
    const navigate = useNavigate();
    useEffect(()=>{
        const timer = setTimeout(()=>{
            navigate("/Dashboard");
        },3000);
        return ()=>clearTimeout(timer);
    },[navigate]);
  return (
    <div>
    <img src={flash} alt="flash page"/>
    </div>
  )
}

export default Flash;