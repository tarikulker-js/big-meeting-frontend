import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

function Route(){
	const user = JSON.parse(localStorage.getItem("logined"))
	
	if(user === true){
		return(
			<div className=''>
				<ul id="nav-mobile" class="right hide-on-med-and-down navbar-ul">
					<h4 style={{
							padding: "5px",
							cursor: "pointer"
						}} class="brand-logo navbar-logo"><Link to="/" class="brand-logo navbar-logo" >Big Meeting !</Link></h4>
					<li class='navbar-li'><Link to="/discover" class='navbar-li'><h6 class='navbar-h6'>Keşfet</h6></Link></li>
					<li class='navbar-li'><Link to="/profile" class='navbar-li'><h6 class='navbar-h6'>Profil</h6></Link></li>
					<li class='navbar-li'><Link to="/create-meeting" class='navbar-li'><h6 class='navbar-h6'>Meeting Oluştur</h6></Link></li>
					<li class='navbar-li red'><Link to="/logout" class='navbar-li'><h6 class='navbar-h6 signout-h6'>Çıkış Yap</h6></Link></li>

				 </ul>
			</div>
		)
	}else{
		return(
			<div>
				<ul id="nav-mobile" class="right hide-on-med-and-down navbar-ul">
					<h4 class="brand-logo navbar-logo"><Link to="/login" class="brand-logo navbar-logo" >Big Meeting !</Link></h4>
					<li class='navbar-li'><Link to="/login" class='navbar-li'><h6 class='navbar-h6'>Giriş Yap</h6></Link></li>
					<li class='navbar-li'><Link to="/register" class='navbar-li'><h6 class='navbar-h6'>Kayıt Ol</h6></Link></li>
				 </ul>
			</div>
		)
	}
	
}

export default function NavBar(){
	return(
		<div>
			<nav>
				<div class="nav-wrapper white">
					<Route />
				</div>
			</nav>

		</div>
	)
}
