import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../config.json';

export default function NewPassword(){
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const {token} = useParams();
	
	function signinFunc(){
		toast.warning("Şifre değiştiriliyor... Lütfen bekleyiniz.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

		fetch(`${API_URL}/new-password`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				password,
				token
			})
		})
		.then(res => res.json())
		.then(data => {
			//axios.post("${API_URL}/", data)
			
			console.log(data)
			
			if(data.error){
				toast.error(data.error, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
			}else{
				toast.dark(data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

				setTimeout(function(){
					window.location='/signout';
				}, 2000)
				
			}
		})
		.catch(err => toast.error("Sunucuya bağlanılamadı.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }));

	}
	
	return(
		<div>
			<center>
				<div className="card">
					<div className="card-content auth-card input-field">
						<center>
							
							<h2 style={{fontSize: '30px'}}>Ulker Social</h2>
							<input 
								type='password'
								placeholder='Yeni Şifreniz'
								value={ password }
								onChange={(e) => setPassword(e.target.value)}
							/>

							<button 
								className="btn waves-effect waves-dark"
								type="submit"
								name="action"
								onClick={ (e) => signinFunc(e) }
							>
									Şifreyi Yenile
							</button>

						</center>
					</div>
				</div>
			</center>

		</div>
	)
}