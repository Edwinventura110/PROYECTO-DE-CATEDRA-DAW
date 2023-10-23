import React, { useState, useRef } from "react";
import "./registro.css";

function Registro() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const formRef = useRef(null);

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
