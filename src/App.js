import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import { API_URL } from './config'
import { QuntuTheme, Header, HeaderCenter, HeaderLeft, HeaderRight, Content, Footer, FooterBottom, FooterMiddle, FooterTop, GraphicCardItem, RegisterPanel } from './lib/quntu-ui-v1/quntu-ui-v1';


//Pages
import HomePage from './components/Home';
import LoginPage from './components/Login';
import RegisterPage from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import NewPassword from './components/NewPassword';
import LogoutPage from './components/Logout';
import CreateInvitePage from './components/CreateMeeting';
import MeetingPage from './components/Meeting';
import JoinMeeting from './components/JoinMeeting';
import Discover from './components/Discover';
import Profile from './components/Profile';


//Menu
import Navbar from './components/menu/Navbar';

export default function App() {
  var [logined, setLogined] = useState(false)
  var [index, setIndex] = useState(0);
  let history = useHistory();

  return (
    <Router>
      <div>
		<QuntuTheme mode="dark" color1="#70a2fb" color2="#cf46fe"></QuntuTheme>
        
		<Header>
        <HeaderLeft>
          <img src={logo} style={{ objectFit: 'contain', backgroundColor: "#8a8a8a" }} onClick={() => window.location="/"} />
        </HeaderLeft>
        <HeaderCenter>
          {
            localStorage.getItem("logined") === "true"
              ?

              <center>
                <button style={{ width: "100%" }}  onClick={() => window.location="/"}><a href="/">Ana Sayfa</a></button>
                  <br />
                <button style={{ width: "100%" }}  onClick={() => window.location="/discover"}><a href="/">Keşfet</a></button>
                 <br />
				        <button style={{ width: "100%" }} onClick={() => window.location="/profile"}><a href="/subscribervideos">Profil</a></button>
                 <br />
                <button style={{ width: "100%" }}  onClick={() => window.location="/create-meeting"}><a href="/">Meeting Oluştur</a></button>
                  <br />
                <button style={{ width: "100%" }}  onClick={() => window.location="/logout"}><a href="/">Çıkış Yap</a></button>

              </center>
              :
              <div>
                <button style={{ width: "100%" }} onClick={() => window.location="/login"}><a href="/login">Giriş Yap</a></button>
                <br />
                <button style={{ width: "100%" }} onClick={() => window.location="/register"}><a href="/register">Kayıt Ol</a></button>
                <br />

              </div>

          }
        </HeaderCenter>
        <HeaderRight>

        </HeaderRight>
      </Header>
	  	
		<Content verticalAlignContent>
			<Switch>
				<Route path="/profile">
					<Profile />
				</Route>
				<Route path="/discover">
					<Discover />
				</Route>
				<Route path="/join-meeting/:joinToken">
					<JoinMeeting />
				</Route>
				<Route path="/join-meeting/:joinToken/:mobileAppJwt">
					<JoinMeeting />
				</Route>
				<Route path="/meeting/:meetingId">
					<MeetingPage />
				</Route>
				<Route path="/login">
					<LoginPage />
				</Route>
				<Route path="/logout">
					<LogoutPage />
				</Route>
				<Route path="/register">
					<RegisterPage />
				</Route>
				<Route path="/forgot-password">
					<ForgotPassword />
				</Route>
				<Route path="/reset/:token">
					<NewPassword />
				</Route>
				<Route path="/create-meeting">
					<CreateInvitePage />
				</Route>
				<Route path="/">
					<HomePage />
				</Route>
			</Switch>
		</Content>
		
		<Footer>
			<FooterTop>
			
			</FooterTop>
			<FooterMiddle><h5>Developed by Tarik Ulker. </h5></FooterMiddle>
			<FooterBottom></FooterBottom>
		</Footer>

      </div>
    </Router>
  );
}
