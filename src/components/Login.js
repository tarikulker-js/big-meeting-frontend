import React, { useState,  useEffect} from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css'

function Login() {
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

  const LoginPost = () => {
    toast.warning("Giriş yapılıyor... Lütfen bekleyiniz.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    const user = {
      username,
      password
  }
    
    axios.post(`${API_URL}/login`, user)
    .then((res) => {
      console.log(res);

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

          localStorage.setItem("jwt", res.data.token);
          localStorage.setItem("id", res.data.user)
          localStorage.setItem("name", res.data.name);
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("logined", "true");
          
          window.location="/";
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
    <div className="Login">
      {
      localStorage.getItem("logined") === "true" 
        ? <div>Zaten giriş yapıldı!</div>
        : <div>
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
        
      <div className="card auth-card" style={{ backgroundColor: "#181a1b" }}>
          <div className="card-content">

            <span style={{ color: 'white' }}>Username: <input type="text" value={username} onChange={(e) => setusername(e.target.value)} /></span>

            <span style={{ color: 'white' }}>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></span>
            
            <input type="submit" value="Giriş Yap" className="btn cyan" onClick={LoginPost} />

            <br /><br />
            <a href="/forgot-password"><h6>Şifremi Unuttum</h6></a>
            <h5>Halen hesabınız yok mu? <a href="/register">Kayıt Olun!</a></h5>
          </div>
        </div>
      
        </div>
      }
    </div>
  );
}

export default Login
