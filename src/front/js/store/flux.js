const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			contact: "",
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			guardarInputsSignup: (newContact) => {
				
				fetch(process.env.BACKEND_URL + "/signup", {
				method: "POST",
				body: JSON.stringify(newContact),
				headers: {
				"Content-Type": "application/json",
				},
			})
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('Network response was not ok');
				}
			})
			.then(result => console.log(result))
			.catch(error => console.log('error', error));
			
			},

			login: async (body) => {
				const resp = await fetch(process.env.BACKEND_URL + "/login", { 
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(body) 
			   })
		   
			   if(!resp.ok) throw Error("There was a problem in the login request")
		   
			   if(resp.status === 401){
					throw("Invalid credentials")
			   }
			   else if(resp.status === 400){
					throw ("Invalid email or password format")
			   }
			   const data = await resp.json()
			   // save your token in the localStorage
			  //also you should set your user into the store using the setStore function
			   sessionStorage.setItem("token", data.token);
			   console.log("token", data.token)
		   
			   return data
		   }, 
		
		loginPrivate: async (body) => {
			const token = sessionStorage.getItem('jwt-token');
	   
			const resp = await fetch(process.env.BACKEND_URL + "/private", {
			   method: 'GET',
			   headers: { 
				 "Content-Type": "application/json",
				 "Authorization": 'Bearer '+token // ⬅⬅⬅ authorization token
			   } 
			})
			if (resp.status === 403) {
				throw Error("Missing or invalid token");
			} else if (resp.status !== 200) {
				throw Error("Unknown error");
			}
			
	   
			const data = await resp.json();
			console.log("This is the data you requested", data);
			return data
	   
	   },
	   borrarToken: () =>{
		   sessionStorage.removeItem('token');
		   alert('Te has desconectado de la aplicacion')
	   },
			

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
