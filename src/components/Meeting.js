import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Switch from "react-switch";
import { useParams } from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { API_URL } from '../config';
import { ToastContainer, toast } from 'react-toastify';
import '../App.css';

function Meeting() {
  const { meetingId } = useParams();
  const [meetingInfos, setMeeting] = useState(undefined);
  const [guestsInfos, setGuests] = useState(undefined);
  const [myGuestInfos, setMyGuest] = useState(undefined);
  const [myJoinedMeeting, setJoinedMeeting] = useState(); //sunucudan gelen joined bilgisi.
  const [undefinedMeeting, setUndefinedMeeting] = useState(true)
  const [message, setMessage] = useState(null);
  const [editedJoined, setEditedJoined] = useState(); //frontend'de değiştirilmiş/görüntülenmiş joined bilgisi.
  
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
    if(undefinedMeeting == true){
      fetch(`${API_URL}/meeting/${meetingId}`, {
        method: "GET",
        headers: {
          "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
      }).then((res) => res.json())
      .then((meeting) => {
        //console.log(meeting);
        //console.log(meeting.fined);

        if(meeting.fined == "false"){
          setMessage("Meeting Bulunamadı! Meeting'in var olduğundan emin olunuz, eğer eminseniz meeting'e katılmış olduğunuzdan emin olunuz.");
        }else if(meeting.fined == "true"){
          setMeeting(meeting.findedGuests[0].meetingId);

          setEditedJoined(meeting.myGuest.joined);
          setJoinedMeeting(meeting.myGuest.joined);

          setMyGuest(meeting.myGuest);
          setGuests(meeting.findedGuests);
          setUndefinedMeeting(false);

        }
      })
      .catch((err) => {
        console.log("request error: ", err);
      })

      
    }else{
      return false;
    }

  }, [meetingId])

  useEffect(() => {
    if(editedJoined !== myJoinedMeeting && myGuestInfos !== undefined){ 
        console.log(myGuestInfos);

        axios.post(`${API_URL}/edit-joined`, {guestId: myGuestInfos._id, newJoined: editedJoined}, {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
          }
        })
        .then((newGuest) => {
          window.location="/meeting/" + meetingId;

          if(newGuest.data.joined === true || newGuest.data._id === false){
           
          }

        })
        
      }else{
        console.log("not send api");
      }      
  })

  const createInvite = () => {
    //console.log("meetingId", guestsInfos._id);

    axios.post(`${API_URL}/create-invite`, {meetingId: meetingInfos._id}, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    })
    .then((result) => {
      //console.log(result);

      toast.dark(result.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined, 
      });



    })
    .catch((err) => console.log(err))
  }

  const copyInvite = () => {
    var text = "http://localhost:3000/join-meeting/" + meetingInfos.resetToken;

    console.log('text', text) 
    var textField = document.createElement('textarea')
    textField.innerText = text 
    document.body.appendChild(textField) 
    textField.select() 
    document.execCommand('copy') 
    textField.remove()

    //basarılı
    
  }
  return (
    <center>
      <h4>Width: {window.innerWidth * 2}</h4>
      <copyInvite />

      <h4>{message}</h4>
      
      <div className="meeting-infos">
        <h4 style={{fontSize: "3vh"}}>Meeting Ayrınıtları: </h4>

        <h4>{message}</h4>


        {guestsInfos === undefined ? <h4>Yükleniyor...</h4> : 

          <div>

            <center>

              <h6>{meetingInfos.title}</h6>


              {meetingInfos.desc ? meetingInfos.desc : ""}

              {meetingInfos.postedBy === localStorage.getItem("id") ? <div><br/><input type="button" value="Yeni Davet Linki Gönder" className="btn cyan" onClick={createInvite} /><br/><br/></div> : ""}

              {meetingInfos.postedBy === localStorage.getItem("id") ? <div style={{width: "100%", float: "right"}} onClick={copyInvite}><button className="btn cyan small" onClick={() => copyInvite()}>Mevcut Davet Linkini Kopyalayın</button><br /><br/></div> : ""}

              <img src={meetingInfos.picture} />

              <br/>
              <p>
                Adres Bilgileri: 
                  <br/>
                {meetingInfos.location}
                  <br />
                Ülke: {meetingInfos.country}
                <br />
                Şehir: {meetingInfos.city}
                <br />
                İlçe/Bölge/Semt: {meetingInfos.district}
                  <br />
                Köy/Mahalle: {meetingInfos.village}
                  <br />
                Tam Adres: {meetingInfos.fullLocation}
            </p>

            </center>

          </div>

        }

      </div>

      <div className="meeting-joined-users-infos">

        <h4 style={{fontSize: "3vh"}}>Meeting Katılımcılarının Ayrınıtları: </h4>
        
        {guestsInfos === undefined || guestsInfos === null ? <h4>Yükleniyor...</h4> : 
        
          <div>
            {guestsInfos.map((guest) => {

              return(
                <div style={{
                  backgroundColor: "#6b8bff",
                  width: "100%",
                  opacity: "100%",
                  borderRadius: 12.5
                }}>
                  <h4 style={{fontSize: "4vh", marginRight: "35vh", position: "relative", top: "2vh"}}>{guest.user.username}</h4>

                  { window.innerWidth >= 1023 ? 
                      guest.joined === true ? <h6 style={{fontSize: "2vh", marginLeft: "42.5vh", position: "relative", bottom: "2.75vh"}}>Geliyor</h6> : <h6 style={{fontSize: "2vh", marginLeft: "42.5vh", position: "relative", bottom: "2.75vh"}}>Gelmiyor</h6>
                    :
                      guest.joined === true ? <h6 style={{fontSize: "2vh", marginLeft: "22.25vh", position: "relative", bottom: "2.75vh"}}>Geliyor</h6> : <h6 style={{fontSize: "2vh", marginLeft: "22.25vh", position: "relative", bottom: "2.75vh"}}>Gelmiyor</h6>


                  }

                  {guest.note !== "" ? <p>NOT: {guest.note}</p> : ""}
                  {guest.excute !== "" ? <p>Mazaret: {guest.excute}</p> : ""}
                  
                </div>
              )
            })}
          </div>
        }
      </div>
      
      <div className="meeting-user-infos">
        <h4 style={{fontSize: "3vh"}}>Bu Meeting'de ki sizin ile ilgili ayrıntılar: </h4>
        {console.log("myGuestInfos", myGuestInfos)}

        Gelmiyorum <Switch onChange={(value) => setEditedJoined(value)} checked={editedJoined} /> Geliyorum

        {myGuestInfos === undefined 
        ?
        <h4>Yükleniyor...</h4>
        :
          <div>
            
            <img src={myGuestInfos.user.pic} style={{width: "60px", height: "", float: "left", marginLeft: "15%"}}/> <h5 style={{float: "left", marginLeft: "5%"}}>{myGuestInfos.user.username}</h5>
            
            <br /><br /><br />
            <h6>{myGuestInfos.user.name}</h6>
            <h7>{myGuestInfos.user.email}</h7>
            <p>{myGuestInfos.user.bio}</p>
            {myGuestInfos.user.site ? "http://" + myGuestInfos.user.site : ""}


          </div>
        }
      </div>

    </center>
  );
}

export default Meeting;
