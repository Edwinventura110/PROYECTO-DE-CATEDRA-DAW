import React, { useRef, useEffect } from "react";
import "./app.css";
import { gapi } from "gapi-script";
import { GoogleLogin } from "react-google-login";
import { useState } from "react";
import Axios from "axios";

function Registro() {
  // Constantes para gestionar los valores que se ingresan en los campos de texto
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("1"); // Valor por defecto

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
    // Lógica para iniciar sesión
    Axios.post("http://localhost:3001/login", {
      nombre_usuario: userName,
      contraseña: password,
    }).then((response) => {
      if (response.data.authenticated) {
        window.location.href = "/acceso"; // Redirigir al usuario a la página de acceso
      } else {
        alert("Usuario no autenticado. Verifica tus credenciales.");
      }
    });
  };

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
          >
            <h2>{isLoginForm ? "Inicio de Sesión" : "Registro"}</h2>

            {!isLoginForm && (
              <select
                name="select"
                value={selectedRole}
                onChange={(event) => setSelectedRole(event.target.value)}
              >
                <option value="1">Administrador</option>
                <option value="2">Usuario</option>
              </select>
            )}

            {!isLoginForm && (
              <input
                type="text"
                placeholder="Nombre Completo*"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
              />
            )}

            <input
              type="text"
              placeholder="Usuario*"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />

            {!isLoginForm && (
              <input
                type="email"
                placeholder="Email *"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            )}

            <input
              type="password"
              placeholder="Contraseña *"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
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

            <a className="btn" href="#" onClick={isLoginForm ? handleLogin : handleRegistration}>
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registro;
