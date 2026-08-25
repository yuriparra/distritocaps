import {
  Award,
  ShieldCheck,
  Truck,
  HandCoins,
} from "lucide-react";

export default function Benefits() {
  const benefits = [
    {
      icon: Award,
      title: "ESTILO AUTENTICO",
      description: "Diseños con personalidad",
    },
    {
      icon: ShieldCheck,
      title: "COMPRA SEGURA",
      description: "Tus datos protegidos",
    },
    {
      icon: Truck,
      title: "ENVÍOS A TODO COLOMBIA",
      description: "Rápidos y seguros",
    },
    {
      icon: HandCoins,
      title: "PAGA AL RECIBIR",
      description: "Mayor comodidad",
    },
  ];

  return (
    <section className="w-full bg-black text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 border-y border-white/10 md:grid-cols-4">

        {benefits.map((benefit) => {
          const Icon = benefit.icon;

          return (
            <div
              key={benefit.title}
              className="
                flex
                items-center
                gap-3
                px-4
                py-5
                sm:px-6
                md:border-r
                md:border-white/10
                md:px-6
                md:py-6
                last:border-r-0
              "
            >

              {/* ICONO */}
              <Icon
                className="
                  h-6
                  w-6
                  shrink-0
                  text-yellow-400
                  sm:h-7
                  sm:w-7
                "
                strokeWidth={1.5}
              />

              {/* TEXTO */}
              <div className="min-w-0">

                <h3 className="text-[9px] font-semibold tracking-wide sm:text-[10px] md:text-xs">
                  {benefit.title}
                </h3>

                <p className="mt-1 text-[8px] text-gray-400 sm:text-[9px] md:text-[10px]">
                  {benefit.description}
                </p>

              </div>

            </div>
          );
        })}

      </div>
    </section>
  );
}