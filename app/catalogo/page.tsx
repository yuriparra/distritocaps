import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CatalogHero from "../components/CatalogHero";
import CatalogProductCard from "../components/CatalogProductCard";
import { products } from "../data/products";

export default function CatalogoPage() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* Navbar */}

      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Catálogo */}

      <main>

        <CatalogHero />

        {/* Productos */}

        <section className="px-6 pb-12 md:px-10">

          <div className="mx-auto max-w-7xl">

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">

              {products.map((product) => (
                <CatalogProductCard
                  key={product.id}
                  product={product}
                />
              ))}

            </div>

          </div>

        </section>

      </main>

      {/* Footer */}

      <Footer />

    </div>
  );
}