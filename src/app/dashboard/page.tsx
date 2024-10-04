"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Card from "../../components/Card";
import { IProduct } from "../../types/productInterface";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin: 40px;
`;

const H2 = styled.h2`
  margin-top: 25px;
  text-align: center;
  color: black;
`;

const LoadingMessage = styled.p`
  text-align: center;
  margin-top: 50px;
  font-size: 18px;
  color: gray;
`;

const ProductsPage: React.FC = () => {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!session?.user?.token) return;

      try {
        const res = await fetch('/api/products', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Error al obtener los productos');
        }

        const data: IProduct[] = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingProducts(false);
      }
    };

    if (status === 'authenticated') {
      fetchProducts();
    }
  }, [session?.user?.token, status]);

  if (status === 'loading') {
    return <LoadingMessage>Verificando sesión...</LoadingMessage>;
  }

  return (
    <div>
      <H2>Productos</H2>
      <Div>
        {loadingProducts ? (
          <LoadingMessage>Cargando productos...</LoadingMessage>
        ) : products.length > 0 ? (
          products.map((product) => (
            <Card key={product.id} product={product} />
          ))
        ) : (
          <LoadingMessage>No hay productos disponibles</LoadingMessage>
        )}
      </Div>
    </div>
  );
};

export default ProductsPage;
