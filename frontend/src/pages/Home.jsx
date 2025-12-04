import { useState, useEffect } from "react";
import Header from "/src/components/Header";
import Footer from "/src/components/Footer";
import Card from  "/src/pages/Card";
import '/src/styles/Home.css';
import '/src/styles/global.css';

function Home() {
  const [filtro, setFiltro] = useState(""); // cria estado do filtro

  const images = [
    '/src/assets/img-principal.jpg',
    '/src/assets/img-principal2.jpg',
    '/src/assets/img-principal3.jpg'
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000); 
    return () => clearInterval(interval); 
  }, []);

  return (
    <div>
      <div className="container-home">
        <div className="slideshow">
          <img src={images[currentImage]} alt="Slideshow" className="slideshow-img" />
        </div>
        <div className="home-text">
          <h2>Bem-vindo ao Melhor Site de Moda Jovem!</h2>
          <p>Descubra as últimas tendências.</p>
        </div>
      </div>

      <Card filtro={filtro} /> {/* passa o filtro para os cards */}
      <Footer />
    </div>
  );
}

export default Home;
