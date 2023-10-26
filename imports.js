import React, { useState, useRef, useEffect } from "react";
import "./registro.css";
import { gapi } from "gapi-script";
import { GoogleLogin } from "react-google-login";

function Registro() {
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
      form.style.height = form.style.height === '0px' ? 'auto' : '0px';
      form.style.opacity = form.style.opacity === '0' ? '1' : '0';
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="login-page">
        <div className="form">
          <form className={isLoginForm ? "login-form" : "register-form"} method="POST">
            <h2>{isLoginForm ? "Inicio de Sesión" : "Registro"}</h2>
            {isLoginForm ? null : <input type="text" placeholder="Nombre Completo*" required />}
            <input type="text" placeholder="Usuario*" required />
            {isLoginForm ? null : <input type="email" placeholder="Email *" required />}
            <input type="password" placeholder="Contraseña *" required />

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

            <a className="btn" href="#">
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
