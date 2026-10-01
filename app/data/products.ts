export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  active: boolean;
  images: string[];
};

export const products: Product[] = [
  {
    id: "gorra-1",
    name: "Chicago Bulls 47 Brand Hitch",
    brand: "47 Brand",
    price: 60000,
    description:
      "Gorra de los Chicago Bulls de '47 Brand con diseño tipo Hitch. Cuenta con logo frontal bordado, visera en contraste y cierre ajustable.",
    category: "Nueva colección",
    stock: 2,
    active: true,
    images: [
      "/products/gorra-1/imagen-1.png",
      "/products/gorra-1/imagen-2.png",
      "/products/gorra-1/imagen-3.png",
      "/products/gorra-1/imagen-4.png",
    ],
  },
  {
    id: "gorra-5",
    name: "Vikings Purple & White",
    brand: "47 Brand",
    price: 60000,
    description:
      "Gorra de diseño Vikings de '47 Brand, con cuerpo en color crema, visera morada y bordado frontal con detalles inspirados en la identidad del equipo. Cuenta con detalles bordados en los laterales y parte posterior que complementan su estilo clásico y urbano.",
    category: "Catálogo",
    stock: 1,
    active: true,
    images: [
      "/products/gorra-5/imagen-1.png",
      "/products/gorra-5/imagen-2.png",
      "/products/gorra-5/imagen-3.png",
    ],
  },
{
  id: "gorra-2",
  name: "Blue Jays Cream & Royal",
  brand: "47 Brand",
  price: 60000,
  description:
    "Gorra de estilo clásico inspirada en los Toronto Blue Jays, con cuerpo en color crema y visera azul royal. Cuenta con un bordado frontal del equipo acompañado de detalles florales y el nombre Blue Jays bordado en la parte posterior. Un diseño deportivo con una combinación de colores llamativa y urbana.",
  category: "Catálogo",
  stock: 1,
  active: true,
  images: [
    "/products/gorra-2/imagen-1.png",
    "/products/gorra-2/imagen-2.png",
    "/products/gorra-2/imagen-3.png",
  ],
},
{
  id: "gorra-3",
  name: "Bulldog Cream & Navy",
  brand: "47 Brand",
  price: 60000,
  description:
    "Gorra de estilo clásico con cuerpo en color crema y visera azul navy. Cuenta con un llamativo bordado frontal de un bulldog acompañado de detalles florales y la letra G en la parte posterior. Su diseño combina elementos deportivos y urbanos con un acabado distintivo.",
  category: "Catálogo",
  stock: 1,
  active: true,
  images: [
    "/products/gorra-3/imagen-1.png",
    "/products/gorra-3/imagen-2.png",
    "/products/gorra-3/imagen-3.png",
  ],
},
{
  id: "gorra-4",
  name: "B Waves White & Blue",
  brand: "47 Brand",
  price: 60000,
  description:
    "Gorra de estilo urbano con cuerpo blanco y visera azul claro. Cuenta con un llamativo bordado frontal de la letra B en rojo, acompañado de detalles inspirados en olas y elementos gráficos en tonos azules. Incorpora el logo de MLB en la parte posterior y detalles bordados en los laterales.",
  category: "Catálogo",
  stock: 1,
  active: true,
  images: [
    "/products/gorra-4/imagen-1.png",
    "/products/gorra-4/imagen-2.png",
    "/products/gorra-4/imagen-3.png",
  ],
},
];