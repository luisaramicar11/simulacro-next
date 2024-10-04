// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { IProduct } from '../../../types/productInterface';

// Simulando una base de datos o llamando a un backend externo
// Esta función puede reemplazarse con la lógica que llame a tu base de datos o servicio
async function fetchProductsFromBackend(token: string): Promise<IProduct[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Error al obtener los productos');
  }

  return res.json();
}

// Función para manejar la petición GET
export async function GET(request: Request) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const products = await fetchProductsFromBackend(token);
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener los productos' }, { status: 500 });
  }
}
