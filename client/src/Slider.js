import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import imagen1 from './assets/img/imagen1.jpg';
import imagen2 from './assets/img/imagen2.jpg';
import imagen3 from './assets/img/imagen3.jpg';
import imagen4 from './assets/img/imagen4.jpg';

const Slider = () => {
    return (
      <Carousel showArrows={false} showThumbs={false} autoPlay={true} infiniteLoop={true} interval={3000} showStatus={false} >
        <div>
          <img src={imagen1} alt="Imagen 1" style={{ width: '500px'}} />
        </div>
        <div>
          <img src={imagen2} alt="Imagen 2" style={{ width: '400px'}} />
        </div>
        <div>
          <img src={imagen3} alt="Imagen 3" style={{ width: '400px',}} />
        </div>
        <div>
          <img src={imagen4} alt="Imagen 4" style={{ width: '400px',}} />
        </div>
      </Carousel>
    );
  }

export default Slider;