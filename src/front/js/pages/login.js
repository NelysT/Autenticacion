import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const [body, setBody] = useState({
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const sendForm = (event) => {
		event.preventDefault()
		// Verifica si los campos obligatorios están llenos
		if (body.email.trim() === "" || body.password.trim() === "") {
			// Muestra una alerta o mensaje de error al usuario indicando que debe llenar todos los campos
			alert("Please fill out all required fields.");
			return; // Sale de la función sin continuar
		  }
		
		  // Si todos los campos están llenos, llama a actions.guardarInputs
		  actions.login(body);
		  setSubmitted(true);
		}
	// Si submitted es true, muestra un mensaje de confirmación y redirige después de un breve retraso
	if (submitted) {
    actions.loginPrivate(body)
		setTimeout(() => {
		navigate("/private"); 
		}, 1000);
		return (
			<div className="container">
			  <div className="alert alert-warning">
			  Your user has been login. Redirecting to private.
			  </div>
			</div>
		  );
		};
	  
  
    
  // const compararLogin = async (body) => {
  //   try {
  //     const resp = await fetch(process.env.BACKEND_URL + "/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(body),
  //     });

  //     if (!resp.ok) {
  //       throw Error("There was a problem in the login request");
  //     }

  //     if (resp.status === 401) {
  //       throw Error("Invalid credentials");
  //     } else if (resp.status === 400) {
  //       throw Error("Invalid email or password format");
  //     }

  //     const data = await resp.json();

  //     // Save your token in the sessionStorage
  //     sessionStorage.setItem("jwt-token", data.token);

  //     // Redirect to the private page
  //     navigate("/private");

  //     return true; // Return true if login is successful
  //   } catch (error) {
  //     console.error("Error during login:", error);
  //     throw error;
  //   }
  // };

  // const sendForm = async (event) => {
  //   event.preventDefault();

  //   // Verifica si los campos obligatorios están llenos
  //   if (body.email.trim() === "" || body.password.trim() === "") {
  //     // Muestra una alerta o mensaje de error al usuario indicando que debe llenar todos los campos
  //     alert("Please fill out all required fields.");
  //     return;
  //   }

  //   try {
  //     const loginSuccessful = await compararLogin(body);

  //     if (loginSuccessful) {
  //       // No necesitas ninguna lógica adicional aquí para la página privada.
  //       setTimeout(() => {
  //         navigate("/private"); 
  //         }, 1000);
    //       return (
    //         <div className="container">
    //           <div className="alert alert-warning">
    //           Your user has been login. Redirecting to private.
    //           </div>
    //         </div>
    //         );
    //   }
    // } catch (error) {
    //   // Handle errors here, e.g., display an error message to the user.
    //   console.error("Error during login:", error);
    // }
  

  return (
    <div className="container">
      <div className="lista col-12 col-md-6">
        <div className="formulario">
          <form onSubmit={sendForm}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label mb-2">
                Email
              </label>
              <input
                type="text"
                id="email"
                className="form-control"
                onChange={(e) => setBody({ ...body, email: e.target.value })}
                value={body.email}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={body.password}
                onChange={(e) => setBody({ ...body, password: e.target.value })}
              />
            </div>

            <button type="submit" className="btnSave">
              <i className="fa-solid fa-floppy-disk"></i> Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
