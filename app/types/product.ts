// ======================================================
// TIPO DE PRODUCTO - DISTRITOCAPS
// ======================================================
//
// Esta estructura representa exactamente un producto
// guardado en la tabla "products" de Supabase.
//
// A partir de V3 utilizaremos este tipo en la tienda
// pública y en los componentes que muestran productos.
// ======================================================

export type Product = {
  // Identificador generado automáticamente por Supabase.
  id: number;

  // Fecha en la que se creó el producto.
  // La utilizaremos para mostrar las 4 gorras
  // más recientes en "Nueva colección".
  created_at: string;

  // Información principal.
  name: string;
  brand: string;
  price: number;
  description: string;

  // Estado del producto.
  // true  = disponible
  // false = no disponible
  available: boolean;

  // Las tres fotografías almacenadas en Supabase Storage.
  image_1: string;
  image_2: string;
  image_3: string;
};