import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../config';

function Home() {
  const [guests, setGuests] = useState(null);
 
  
  useEffect(() => {
      if(localStorage.getItem("logined") === false){
        window.location="/login";
      }else if(localStorage.getItem("logined") === true){
    
      }else if(localStorage.getItem("logined") == "false") {
        //alert("string false :D");
        window.location="/login";

      }else {
        //alert("bilinmeyen değer. value: " + typeof localStorage.getItem("logined"));
      }
	  }, []) //Logined push
  
  useEffect(() => {
    axios.get(`${API_URL}/getmymeetings`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    })
    .then((guestsReq) => {
      console.log(guestsReq.data);
      setGuests(guestsReq.data);

    })
  }, [])

  return (
    <div className="Home">
      
      <h4 style={{fontSize: "5vh"}}>Katıldığınız Meeting'ler: </h4>

      {!guests ? <h4>Loading...</h4> : 
        guests.length == 0 ? <h4>Katıldığınız Meeting yok. </h4> :

        guests.map((guest) => {
          console.log("guests in render(map) ", guests);

          return(
            <center>
              <div className="myJoinedMeetings">
                  <img 
                    src={guest.meetingId.picture}
                    style= {{
                      float: "left",
                      width: "10vh",
                      heigth: "10vh"
                    }} />
                  <h5 style={{float: "left", marginLeft: "5%", fontSize: "6vh"}}>{guest.meetingId.title}</h5>
                  <p style={{float: "left", marginLeft: "3%", fotnSize: "4vh"}}>{guest.meetingId.desc}</p>

                  <a href={"http://localhost:3000/meeting/" + guest.meetingId._id}><button className="btn cyan" style={{
                      verticalAlign: "center", 
                      float: "right",
                      position: "relative",
                      top: "30%"
                    }}>Meeting Sayfasına Git</button></a>
              </div>
              <br/ ><br/> 
            </center>
          )
        })
      }
    </div>
  );
}

export default Home;