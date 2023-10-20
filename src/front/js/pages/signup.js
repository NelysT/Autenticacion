import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";



export const Signup = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const [contact, setContact] = useState({
		email: "",
		password: ""

	})
	const [submitted, setSubmitted] = useState(false);
	const enviarFormulario = (event) => {
		event.preventDefault()
		// Verifica si los campos obligatorios están llenos
		if (contact.email.trim() === "" || contact.password.trim() === "") {
			// Muestra una alerta o mensaje de error al usuario indicando que debe llenar todos los campos
			alert("Please fill out all required fields.");
			return; // Sale de la función sin continuar
		  }
		
		  // Si todos los campos están llenos, llama a actions.guardarInputs
		  actions.guardarInputsSignup(contact);
		  setSubmitted(true);
		}
	// Si submitted es true, muestra un mensaje de confirmación y redirige después de un breve retraso
	if (submitted) {
		setTimeout(() => {
		navigate("/"); 
		}, 1000);
		return (
			<div className="container">
			  <div className="alert alert-warning">
			  Your user has been created. Redirecting to login.
			  </div>
			</div>
		  );
		};
	  
	
	return (
		<div className="container">
            <div className="lista col-12 col-md-6">
            <div className="formulario">
                <form onSubmit={enviarFormulario}>
                
                <div className="mb-3">
                    <label htmlFor="email" className="form-label mb-2">
                    Email
                    </label>
                    <input
                    type="text"
                    id="email"
                    className="form-control"
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    value={contact.email}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label mb-2">
                    password
                    </label>
                    <input
                    type="text"
                    id="phone"
                    className="form-control"
                    value={contact.password}
                    onChange={(e) => setContact({ ...contact, password: e.target.value })}
                    />
                </div>
                
                <button type="submit" className="btnSave">
                    <i className="fa-solid fa-floppy-disk"></i> Register
                </button>
                </form>
            </div>
            </div>
        </div>
   

	)
}