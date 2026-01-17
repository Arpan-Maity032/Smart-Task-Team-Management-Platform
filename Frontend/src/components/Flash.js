import React,{useEffect} from 'react';
import "../styles/flash.css";
import { useNavigate } from 'react-router-dom';
import LogoAnimation from "../utils/LogoAnimation";

function Flash() {
    const navigate = useNavigate();
    useEffect(()=>{
        const timer = setTimeout(()=>{
            navigate("/Dashboard");
        },3000);
        return ()=>clearTimeout(timer);
    },[navigate]);
  return (
    <div className='flash'>
      <LogoAnimation />
    </div>
  )
}

export default Flash;