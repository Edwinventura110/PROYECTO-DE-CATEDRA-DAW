import Slider from './Slider'
import logo from './assets/img/logo.png'
import "./mainPage.css";

function MainPage() {
  return (
    
    <div className="MainPage">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <a class="navbar-brand" href="#">Behealthy</a>
        </div>
      </nav>
      <div className="container mt-5">
        <div className="jumbotron">
          <h1 className="display-4">¡Bienvenido a Behealthy!</h1>
          <p className="lead">Tu destino para una vida más saludable.</p>
          <hr className="my-4"></hr>
          <p>En Behealthy, estamos firmemente comprometidos en ser tu compañero constante en tu viaje hacia un estilo de vida más saludable y equilibrado. Nuestra aplicación está diseñada para ayudarte a alcanzar tus metas de bienestar y salud, personalizadas de acuerdo a tu peso y tus necesidades únicas.
          Entendemos que cada individuo es único, y por eso, te ofrecemos recomendaciones y rutinas de ejercicio que se adaptan específicamente a tu peso, nivel de actividad y objetivos de acondicionamiento físico. Además, no solo nos preocupamos por tu actividad física, sino también por tu nutrición y bienestar en general.
          En Behealthy, no solo encontrarás rutinas de ejercicio diseñadas por profesionales, sino también sugerencias de comidas saludables y opciones de bebidas que se ajustan a tu estilo de vida. Nuestro objetivo es proporcionarte una experiencia completa y personalizada que te ayude a tomar decisiones más informadas para tu salud y bienestar.
          Estamos aquí para inspirarte, apoyarte y guiarte en tu camino hacia una vida más saludable. Juntos, trabajaremos para que alcances tus metas de bienestar y te sientas mejor que nunca. ¡Bienvenido a Behealthy, donde tu salud y felicidad son nuestra prioridad!</p>
          <a className="btn btn-primary btn-lg" href="#" role="button">Empieza YA</a>
        </div>
      </div>
      <Slider></Slider>
      <footer className="bg-dark text-white text-left footer py-2" style={{ display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <img src={logo}/>
          <div>
            <p>&copy; 2023 Behealthy. Todos los derechos reservados.</p>
            <p>Técnico en Ingeniería en Computación</p>
            <p>Universidad Don Bosco</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainPage;