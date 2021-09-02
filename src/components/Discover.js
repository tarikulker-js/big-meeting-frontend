import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config.json';

function Discover(){
   const [meetings, setMeetings] = useState(undefined);
	const [message, setMessage] = useState("");
	
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
        axios.get(`${API_URL}/getpublicmeetings`, {
            headers: {
               "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
		  .then((publicMeetings) => {
			  console.log(publicMeetings);
			  setMeetings(publicMeetings.data);

			  if(publicMeetings.data.length === 0){
				  setMessage("Big Meeting'de Herkese Açık bir meeting yok. ")
			  }
		  })
	
    }, [])

    return(
        <div className="discover">
		 	  <h4>{message}</h4>

            {
					meetings === undefined ? <h6>Yükleniyor...</h6>
						:
					meetings.map((meeting) => {
						console.log("maped meeting", meeting);

						return(
							<center>
								<div className="myJoinedMeetings">

									<img 
										src={meeting.picture}
										style= {{
											float: "left",
											width: "10vh",
											heigth: "10vh"
									}} />

									<h5 style={{float: "left", marginLeft: "5%", fontSize: "6vh"}}>{meeting.title}</h5>
									<p style={{float: "left", marginLeft: "3%", fotnSize: "4vh"}}>{meeting.desc}</p>
									
									<a><button className="btn cyan" style={{
										verticalAlign: "center", 
										float: "right",
										position: "relative",
										top: "30%"
									}}>Çok Yakında!</button></a>

									{/*<a href={"http://localhost:3000/meeting/" + meeting._id}><button className="btn cyan" style={{
										verticalAlign: "center", 
										float: "right",
										position: "relative",
										top: "30%"
									}}>Meeting Sayfasına Git</button></a>*/}

								</div>

								<br/ ><br/> 

							</center>
						)
					})
					
				}
        </div>
    )
}

export default Discover;