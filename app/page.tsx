// Importar secciones
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Benefits from "./components/Benefits";
import NewCollection from "./components/NewCollection";
import Novedades from "./components/Novedades";
import Instagram from "./components/Instagram";
import Footer from "./components/Footer";


// Página principal de DistritoCaps
export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/*
        NAVBAR
        z-50 garantiza que la navegación quede por encima
        del resto de la página, sticky para que quede fijo.
      */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/*
        CONTENIDO PRINCIPAL
        Se mantiene por debajo del Navbar.
      */}
      <main className="relative z-0">

        {/* Hero principal */}
        <Hero />

        {/* Beneficios de la tienda */}
        <Benefits />

        {/* Nueva colección */}
        <NewCollection />

        {/* Banner de novedades */}
        <Novedades />
        <Instagram />

      </main>

      <Footer />

    </div>
  );
}