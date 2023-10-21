import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";



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
			<div className="login-contenedor">
			<div className="login-encabezadoSignup d-flex">
		<button className="user"><i class="fa-solid fa-user"></i></button>
		
		
		  <button className="privada"><strong>AREA PRIVADA</strong></button>
		
			  </div> 
			  <p className="bienvenido">Bienvenido</p> 
	  
		<div>
		<button className="btnBorrar" onClick={borrar}>Borrar</button> 
			
		</div>
		
		
	</div>


		): (
			<div className="login-contenedor">
			<div className="login-encabezadoSignup d-flex">
		<button className="user"><i class="fa-solid fa-user"></i></button>
		
		
		  <button className="privada"><strong>AREA PRIVADA</strong></button>
		
			  </div> 
			  <p className="permiso">Necesitas ingresar tus datos para acceder a esta area</p> 
	  
		<div>
		<Link to={"/login"}>
                  <button className="ingresarPrivada"><strong>INGRESAR</strong></button>
				</Link>
		</div>
		</div>
		)}
	</div>
		
		
	)
};