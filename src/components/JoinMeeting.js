import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function JoinMeeting(){
    var [count, setCount] = useState(0);
    var [ jwt, setJwt ] = useState("");
    var [isFined, setFined] = useState(false);

    const { joinToken, mobileAppJwt } = useParams();

    useEffect(() => {
        if(!mobileAppJwt || mobileAppJwt == ""){
            setJwt(localStorage.getItem("jwt"));
            //alert("web site user", localStorage.getItem("jwt"));
            
        }else{
            setJwt(mobileAppJwt);
            //alert("mobile app user");

        }

    });

    useEffect(() => {
        if(!jwt || jwt == ""){

        }else{
            setTimeout(() => {
                axios.post(`${API_URL}/join-invite`, {
                    token: joinToken
                }, {
                    headers: {
                        "Authorization": "Bearer " + jwt
                    }
                })
                .then((res) => {
                    //alert(jwt);
    
                    setFined(true);
    
                    console.log(res.data);
    
                    toast.dark(res.data.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,                
                    });
    
                    setTimeout(function(){
                        if(res.data.auth == false){
                            window.location="/login";
                            //alert("unhorization");
                        }                    
    
                    }, 2000)
                })
    
            }, 2500)
            
        }
    })

    return(
        <div className="JoinMeeting">
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

            { isFined == false ? <h4>Lütfen bekleyin...</h4> : <></>}

        </div>
    )
}

export default JoinMeeting;
