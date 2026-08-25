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
    name: "Cincinnati 150th Anniversary",
    brand: "47 Brand",
    price: 60000,
    description:
      "Gorra oficial de los Cincinnati Reds de '47 Brand,inspirada en la celebración de su 150.º aniversario. Diseño clásico con logo bordado, detalles conmemorativos y visera en contraste.",
    category: "Nueva colección",
    stock: 3,
    active: true,
    images: [
      "/products/gorra-1/imagen-1.png",
      "/products/gorra-1/imagen-2.png",
      "/products/gorra-1/imagen-3.png",
      "/products/gorra-1/imagen-4.png",
    ],
  },
  {
    id: "gorra-2",
    name: "Detroit Tigers Classic",
    brand: "47 Brand",
    price: 60000,
    description:
      "Gorra de los Detroit Tigers de '47 Brand. Diseño clásico en tonos crema y azul marino con el icónico logo Old English D bordado y detalles laterales.",
    category: "Nueva colección",
    stock: 2,
    active: true,
    images: [
      "/products/gorra-2/imagen-1.png",
      "/products/gorra-2/imagen-2.png",
      "/products/gorra-2/imagen-3.png",
      "/products/gorra-2/imagen-4.png",
    ],
  },
  {
    id: "gorra-3",
    name: "Chicago Bulls 47 Brand Hitch",
    brand: "47 Brand",
    price: 60000,
    description:
      "Gorra de los Chicago Bulls de '47 Brand con diseño tipo Hitch. Cuenta con logo frontal bordado, visera en contraste y cierre ajustable.",
    category: "Nueva colección",
    stock: 2,
    active: true,
    images: [
      "/products/gorra-3/imagen-1.png",
      "/products/gorra-3/imagen-2.png",
      "/products/gorra-3/imagen-3.png",
      "/products/gorra-3/imagen-4.png",
    ],
  },
  {
    id: "gorra-4",
    name: "Atlanta Braves Pink",
    brand: "47 Brand",
    price: 60000,
    description:
      "Gorra de los Atlanta Braves de '47 Brand en color rosa con visera blanca. Cuenta con el icónico logo A bordado al frente y detalles laterales.",
    category: "Nueva colección",
    stock: 1,
    active: true,
    images: [
      "/products/gorra-4/imagen-1.png",
      "/products/gorra-4/imagen-2.png",
      "/products/gorra-4/imagen-3.png",
      "/products/gorra-4/imagen-4.png",
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
  id: "gorra-6",
  name: "Boston B Cream",
  brand: "47 Brand",
  price: 60000,
  description:
    "Gorra de estilo clásico con cuerpo en color crema y visera negra. Cuenta con un bordado frontal de la letra B en tono café, detalles laterales y logo de MLB en la parte posterior. Su diseño combina un estilo deportivo y urbano con un acabado sobrio.",
  category: "Catálogo",
  stock: 1,
  active: true,
  images: [
    "/products/gorra-6/imagen-1.png",
    "/products/gorra-6/imagen-2.png",
    "/products/gorra-6/imagen-3.png",
  ],
},
{
  id: "gorra-7",
  name: "Blue Jays Cream & Royal",
  brand: "47 Brand",
  price: 60000,
  description:
    "Gorra de estilo clásico inspirada en los Toronto Blue Jays, con cuerpo en color crema y visera azul royal. Cuenta con un bordado frontal del equipo acompañado de detalles florales y el nombre Blue Jays bordado en la parte posterior. Un diseño deportivo con una combinación de colores llamativa y urbana.",
  category: "Catálogo",
  stock: 1,
  active: true,
  images: [
    "/products/gorra-7/imagen-1.png",
    "/products/gorra-7/imagen-2.png",
    "/products/gorra-7/imagen-3.png",
  ],
},
{
  id: "gorra-8",
  name: "Bulldog Cream & Navy",
  brand: "47 Brand",
  price: 60000,
  description:
    "Gorra de estilo clásico con cuerpo en color crema y visera azul navy. Cuenta con un llamativo bordado frontal de un bulldog acompañado de detalles florales y la letra G en la parte posterior. Su diseño combina elementos deportivos y urbanos con un acabado distintivo.",
  category: "Catálogo",
  stock: 1,
  active: true,
  images: [
    "/products/gorra-8/imagen-1.png",
    "/products/gorra-8/imagen-2.png",
    "/products/gorra-8/imagen-3.png",
  ],
},
{
  id: "gorra-9",
  name: "White Sox Black World Series",
  brand: "47 Brand",
  price: 60000,
  description:
    "Gorra de los Chicago White Sox de '47 Brand en color negro, con el icónico logo del equipo bordado en blanco al frente. Incorpora un parche conmemorativo de World Series en el lateral y detalles del equipo en la parte posterior. Un diseño clásico, sobrio y de estilo urbano.",
  category: "Catálogo",
  stock: 1,
  active: true,
  images: [
    "/products/gorra-9/imagen-1.png",
    "/products/gorra-9/imagen-2.png",
    "/products/gorra-9/imagen-3.png",
  ],
},
{
  id: "gorra-10",
  name: "B Waves White & Blue",
  brand: "47 Brand",
  price: 60000,
  description:
    "Gorra de estilo urbano con cuerpo blanco y visera azul claro. Cuenta con un llamativo bordado frontal de la letra B en rojo, acompañado de detalles inspirados en olas y elementos gráficos en tonos azules. Incorpora el logo de MLB en la parte posterior y detalles bordados en los laterales.",
  category: "Catálogo",
  stock: 1,
  active: true,
  images: [
    "/products/gorra-10/imagen-1.png",
    "/products/gorra-10/imagen-2.png",
    "/products/gorra-10/imagen-3.png",
  ],
},
{
  id: "gorra-11",
  name: "White Sox Chicago Roses",
  brand: "47 Brand",
  price: 60000,
  description:
    "Gorra de los Chicago White Sox de '47 Brand, con cuerpo en color crema y visera negra. Presenta un bordado frontal de la letra S acompañado de rosas y detalles gráficos con la identidad de Chicago White Sox. Su diseño combina elementos clásicos del equipo con un estilo urbano y distintivo.",
  category: "Catálogo",
  stock: 1,
  active: true,
  images: [
    "/products/gorra-11/imagen-1.png",
    "/products/gorra-11/imagen-2.png",
    "/products/gorra-11/imagen-3.png",
  ],
},
];