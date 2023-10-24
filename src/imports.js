import React, { useState } from "react";
import "./registro.css";

function Registro() {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const toggleForm = () => {
    setIsLoginForm((prevIsLoginForm) => !prevIsLoginForm);
  };

  return (
    <div className="formBg">
      <div className="login-page">
        <div className="form">
          <fieldset>
            <legend>Formulario</legend>
            <form
              className={isLoginForm ? "login-form" : "register-form"}
              method="POST"
            >
              <h2>{isLoginForm ? "Inicio de Sesión" : "Registro"}</h2>
              {!isLoginForm && (
                <div>
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre Completo*"
                    required
                  />
                  
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email @"
                    required
                  />
                </div>
              )}
              <label className="form-label">Usuario</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre de usuario"
                required
              />
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña *"
                required
              />
              <button className="boton" href="#">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                {isLoginForm ? "Iniciar Sesión" : "Crear cuenta"}
              </button>
              <p className="message">
                {isLoginForm
                  ? "Aun no te has registrado? "
                  : "Ya tienes una cuenta? entonces ve a "}
                <a href="#" onClick={toggleForm}>
                  {isLoginForm ? "Crea una cuenta" : "Iniciar Sesión"}
                </a>

              
              </p>
            </form>
          </fieldset>
        </div>
      </div>
    </div>
  );
}

export default Registro;
