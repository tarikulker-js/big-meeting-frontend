import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
	const [user, setUser] = useState(undefined)
	const userId = localStorage.getItem("id");

	useEffect(() => {
		if (localStorage.getItem("logined") === false) {
			window.location = "/login";
		} else if (localStorage.getItem("logined") === true) {

		} else if (localStorage.getItem("logined") == "false") {
			//alert("string false :D");
			window.location = "/login";
		} else {
			//alert("bilinmeyen değer. value: " + typeof localStorage.getItem("logined"));
		}
	}, []) //Logined push

	useEffect(() => {
		fetch(`${API_URL}/profile`, {
			type: "POST",
			headers: {
				"Authorization": "Bearer " + localStorage.getItem("jwt")
			}
		}).then((res) => {
				console.log("api", res)
				setUser(res);

				toast.dark(res.message, {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});

				

			})
	}, [userId])

	return (
		<div style={{ maxWidth: '850px', margin: '0px auto' }}>

			<center>
				<h5>Çok Yakında!</h5>
			</center>

			{/*
				user !== undefined ?
				<div style={{
					display: 'flex',
					justifyContent: 'space-arround',
					margin: '18px 0px',
					borderBottom: '1px solid gray'
				}}>
					{console.log(user)}

					<div>
						{
							<img
								className="profileImg"
								style={{ width: "160px", height: "160px", borderRadius: "80px" }}
								src={user.picture}
							/>
						}
					</div>

					<div>
						<h5 style={{ fontSize: "3vh", margin: "0.4vh" }}>{user.name ? user.name :
							<div className='loading'>
								<center>
									<img
										src="https://res.cloudinary.com/doaf7ybhd/image/upload/v1619649099/6EE61733-6F43-40B6-B49E-63A9C737E251_a1b5fz.gif"
										height="100px"
										width="150px"
									/>
									<h5 style={{ fontSize: "2vh" }}>Yükleniyor...</h5>

								</center>
							</div>

						}</h5>


						<h6 style={{ fontSize: "2vh", margin: "2vh" }}>{user.email ? user.email :

							<div className='loading'>
								<center>

									<img

										src="https://res.cloudinary.com/doaf7ybhd/image/upload/v1619649099/6EE61733-6F43-40B6-B49E-63A9C737E251_a1b5fz.gif"
										height="100px"
										width="150px"
									/>


									<h5 style={{ fontSize: "2vh" }}>Yükleniyor...</h5>



								</center>


							</div>

						}</h6>

						<br />

						<p style={{ margin: "2vh" }}>{user.bio ? user.bio :

							<div className='loading'>
								<center>
									<img
										src="https://res.cloudinary.com/doaf7ybhd/image/upload/v1619649099/6EE61733-6F43-40B6-B49E-63A9C737E251_a1b5fz.gif"
										height="100px"
										width="150px"
									/>
									<h5 style={{ fontSize: "2vh" }}>Yükleniyor...</h5>
								</center>
							</div>
						}</p>

						<h5 style={{ margin: "2vh", fontSize: "2vh" }}><a href={user.site}>{user.site}</a></h5>
						<br />

						<div style={{
							display: 'flex',
							justifyContent: 'space-between',
							width: '100%'
						}}>

							<h5 style={{ margin: "10px" }}> {user.myJoinedMeetings} Meeting</h5>

						</div>

						<br />

						<div className='upload_photo' style={{ float: "left" }}>
							<a href="/profile/edit"><button
								className="btn input waves-effect waves-dark"
							>Profilinizi Güncelleyin</button></a>
						</div>
					</div>
				</div>
				:
				<h6>Loading...</h6>
					*/}
		</div>
	)

}


export default Profile;

