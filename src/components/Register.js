import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css'

function Register() {
  var [name, setName] = useState("");
  var [email, setEmail] = useState("");
  var [username, setusername] = useState("");
  var [password, setPassword] = useState("");

  useEffect(() => {
    if(localStorage.getItem("logined") === "true"){
      window.location='/';
    }else if(localStorage.getItem("logined") === "false"){

    }else{
      toast.warning("Bilinmeyen sonuç... Lütfen bekleyiniz." + localStorage.getItem("logined"), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  })

  const registerPost = () => {
    const user = {
      name,
      username,
      email,
      password
  }
    
    axios.post(`${API_URL}/register`, user)
    .then((res) => {
        if(res.data.error){
          toast.error(res.data.error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }else if(!res.data.error){
          toast.dark(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          window.location="/login";
        }
    })
    .catch((err) => {
      console.log(err);

      toast.dark(err, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    })
  }

  return (
    <div className="Register">
      {
        localStorage.getItem("logined") === "true"
          ? <div>Zaten kayıt olunmuş ve giriş yapılmış!</div>
          : 
          
            <div>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
        
      <div className="card auth-card">
          <div className="card-content">
            <span style={{ color: 'white' }}>Full Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} /></span>

            <span style={{ color: 'white' }}>Email: <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /></span>

            <span style={{ color: 'white' }}>Username: <input type="text" value={username} onChange={(e) => setusername(e.target.value)} /></span>

            <span style={{ color: 'white' }}>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></span>
            
            <input type="submit" value="Kayıt Ol" className="btn cyan" onClick={registerPost} />

          </div>
        </div>
      
            </div>
      }
    </div>
  );
}

export default Register