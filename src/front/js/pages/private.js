import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";



export const Private = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
    const borrar = () =>{
		actions.borrarToken()
		navigate ('/login')
	}
	const token = sessionStorage.getItem('token')

	return (
		<div>
		{token && token != null && token != undefined ? (
			<div className="text-center mt-5">
			<h1>Private</h1>
			<button className="btn btn-danger" onClick={borrar}>Borrar</button> 
				
		</div>

		): (
			<div>
				<h1>No estas logueado en la pagina</h1>
			</div>
		)} 
	</div>
		
	)
};