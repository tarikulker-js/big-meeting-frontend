import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../config';
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';


function CreateMeeing() {
  var [meetingName, setMeetingName] = useState();
  var [meetingDesc, setMeetingDesc] = useState();
  var [meetingLocation, setMeetingLocation] = useState();
  var [meetingCountry, setMeetingCountry] = useState();
  var [meetingCity, setMeetingCity] = useState();
  var [meetingDistrict, setMeetingDistrict] = useState();
  var [meetingVillage, setMeetingVillage] = useState();
  var [meetingFullLocation, setMeetingFullLocation] = useState();
  var [meetingPublic, setMeetingPublic] = useState("false");
  
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

  const publicOptions = [
    { value: "false", label: 'Hayır, herkese açık olmayan gizli bir meeting.' },
    { value: "true", label: 'Evet, herkese açık bir meeting.' }
  ]

  const CreateMeeingPost = () => {
    const Meeting = {
      title: meetingName,
      body: meetingDesc,
      location: meetingLocation,
      country: meetingCountry,
      city: meetingCity,
      district: meetingDistrict,
      village: meetingVillage,
      public: meetingPublic

    }

    axios.post(`${API_URL}/createmeetings`, Meeting, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      }
    })
    .then((meeting) => {
      console.log("meeting", meeting.data.successfully);

      if(meeting.data.successfully === true){
        //alert("meeting.meeting._id");
        
        toast.dark("sea-aes", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });

        //alert(meeting.data.meeting._id);
        window.location="/meeting/" + meeting.data.meeting._id
 
      }else if(meeting.data.successfully === false){
          toast.error(meeting.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          });


      }else{
        toast.error("Bilinmeyen değer. Değer: " + meeting.data.successfully, {
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
    .catch((err) => {
      console.log("error", err);
    });

    /*
    fetch(`${API_URL}/createmeetings`, {
      method: "POST",
      body: Meeting
    })
    .then((meeting) => {
      console.log(meeting);

      if(meeting.data.successfully === true){
        toast.dark(meeting.data.data.message, {
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
    */

  }

  return (
    <div className="CreateMeeing">
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
      
      <div className="card">
        <div className="card-content auth-card">
          <input type="text" placeholder="Meeting Adı" value={meetingName} onChange={(e) => setMeetingName(e.target.value)} />
          <input type="text" placeholder="Meeting Açıklaması" value={meetingDesc} onChange={(e) => setMeetingDesc(e.target.value)} />
          <input type="text" placeholder="Meeting Lokasyonu" value={meetingLocation} onChange={(e) => setMeetingLocation(e.target.value)} />
          <input type="text" placeholder="Meeting Ülkesi" value={meetingCountry} onChange={(e) => setMeetingCountry(e.target.value)} />
          <input type="text" placeholder="Meeting Şehir" value={meetingCity} onChange={(e) => setMeetingCity(e.target.value)} />
          <input type="text" placeholder="Meeting İlçe/Bölge" value={meetingDistrict} onChange={(e) => setMeetingDistrict(e.target.value)} />
          <input type="text" placeholder="Meeting Mahalle/Köy" value={meetingVillage} onChange={(e) => setMeetingVillage(e.target.value)} />
          
          <label>
              Meeting Gizliliği
              
              <Select
                options={publicOptions}
                onChange={(value) => setMeetingPublic(value.value)}

              />

          </label>

          <input type="submit" className="btn cyan" onClick={CreateMeeingPost} value="Meeting Oluştur" />

          {/*<h4>
            
              Name {meetingName}
              <br/>
              Desc {meetingDesc}
              <br/>
              location {meetingLocation}
              <br/>
              Country {meetingCountry}
              <br/>
              City {meetingCity}
              <br/>
              District {meetingDistrict}
              <br/>
              Village {meetingVillage}
              <br/>
              {meetingPublic}

            </h4>*/}
        </div>
      </div>
    </div>
  );
}

export default CreateMeeing