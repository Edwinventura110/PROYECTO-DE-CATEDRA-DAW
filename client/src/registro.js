import React, { useRef, useEffect } from "react";
import "./registro.css";
import { gapi } from "gapi-script";
import { GoogleLogin } from "react-google-login";
import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
 




function Registro() {
  const navigate = useNavigate();


  //para el titulo
  document.title ="Registrarse";
  // Constantes para gestionar los valores que se ingresan en los campos de texto
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("1"); // Valor por defecto
  const [ error, setError] = useState(false);


//mensaje de error
const handleSubmit = (e) =>{
  e.preventDefault()

  if(fullName =="" && userName =="" && email =="" && password =="" && selectedRole=="" )
  {
    setError(true) 
    return
  }

}


  // Constante para el botón de registro
  const handleRegistration = () => {
    // Validar los campos aquí si es necesario

    // Realizar la solicitud POST al servidor para el registro
    Axios.post("http://localhost:3001/create", {
      nombre: fullName,
      nombre_usuario: userName,
      email: email,
      contraseña: password,
      id_rol: selectedRole,
    })
      .then((response) => {
        alert(" registrado con éxito");
        // Realizar alguna acción adicional si es necesario
      })
      .catch((error) => {
        console.error("Error al registrar :", error);
        alert("Hubo un error al registrar ");
      });
  };

  // Constante para el botón de inicio de sesión
  const handleLogin = () => {
    Axios.post("http://localhost:3001/login", {
      nombre_usuario: userName,
      contraseña: password,
    })
      .then((response) => {
        if (response.data.authenticated) {
          
          navigate("/mainPage");
        } else {
          alert("Usuario no autenticado. Verifica tus credenciales.");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          alert("Credenciales incorrectas. Por favor, verifica tus datos.");
        } else {
          console.error("Error al iniciar sesión:", error);
          alert("Hubo un error al iniciar sesión.");
        }
      });
  }

  const [isLoginForm, setIsLoginForm] = useState(true);
  const formRef = useRef(null);
  const clientID = "903131067165-53rhu9cai9inmo9m6d31kkj44epkab42.apps.googleusercontent.com";
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientID,
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  const onSuccess = (response) => {
    setUser(response.profileObj);
    setLoggedIn(true);
  };

  const onFailure = (response) => {
    console.log("Something went wrong");
  };

  const handleLogout = () => {
    setUser({});
    setLoggedIn(false);
  };

  const toggleForm = () => {
    setIsLoginForm((prevIsLoginForm) => !prevIsLoginForm);

    if (formRef.current) {
      const form = formRef.current;
      form.style.height = form.style.height === "0px" ? "auto" : "0px";
      form.style.opacity = form.style.opacity === "0" ? "1" : "0";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="login-page">
        <div className="form">
          <form
            className={isLoginForm ? "login-form" : "register-form"}
            method="POST"
            onSubmit={handleSubmit}
          >
            <h2>{isLoginForm ? "Inicio de Sesión" : "Registro"}</h2>

            {!isLoginForm && (
                

              <select
                name="select"
                value={selectedRole}
                onChange={(event) => setSelectedRole(event.target.value)}
              >
                <option value="1" selected disabled>Rol * </option>
                <option value="1"> <b> Administrador</b></option>
                <option value="2"> <b> Usuario</b></option>
              </select>
            )}

            {!isLoginForm && (
              <input
                type="text"
                placeholder="Nombre Completo *"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                required
              />
            )}
            <input
              type="text"
              placeholder="Usuario*"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
              required
            />

            {!isLoginForm && (
              <input
                type="email"
                placeholder="Email *"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />

              
            )}

            <input
              type="password"
              placeholder="Contraseña *"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          
            {loggedIn ? (
              <div className={user ? "profile" : "hidden"}>
                <img src={user.imageUrl} />
                <h3>{user.name}</h3>
                <button onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <GoogleLogin
                clientId={clientID}
                onSuccess={onSuccess}
                onFailure={onFailure}
                buttonText="Continue with Google"
                cookiePolicy={"single_host_origin"}
              />
            )}

            <a  type="submit" className="btn" href="#" onClick={isLoginForm ? handleLogin : handleRegistration}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              {isLoginForm ? "Inicia Sesión" : "Crear cuenta"}
            </a>
            <p className="message">
              {isLoginForm ? "No te has registrado? " : "Ya estás registrado? "}  
              <a href="#" onClick={toggleForm}>
                {isLoginForm ? "Crea una cuenta" : "Inicia Sesión"}
              </a>
            </p>
            {error && <p>Todos los campos son obligatorios </p>}
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default Registro;
