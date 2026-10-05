import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactHero from "../components/ContactHero";

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* Navbar */}

      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Contacto */}

      <main className="relative z-0">
        <ContactHero />
      </main>

      {/* Footer */}

      <Footer />

    </div>
  );
}