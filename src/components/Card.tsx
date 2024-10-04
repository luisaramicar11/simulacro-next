import { useDispatch } from 'react-redux';
import { addItem } from '../app/redux/slices/cartSlice';
import { CardProps } from '../types/productInterface';
import styled from 'styled-components';
import { AppDispatch } from '../app/redux/store';

const CardContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 15px;
  padding: 15px;
  width: 20%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  margin: 5px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 250px;
  border-radius: 15px;
  object-fit: cover;
`;

const ProductTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0;
  text-align: center;
`;

const ProductDescription = styled.p`
  font-size: 17px;
`;

const ProductPrice = styled.p`
  font-size: 12px;
  font-weight: bold;
  text-align: right;
`;

const AddToCartButton = styled.button`
  margin-top: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const Card: React.FC<CardProps> = ({ product }) => {
  const dispatch: AppDispatch = useDispatch();

  const handleAddToCart = () => {
    // Agregar producto al carrito
    dispatch(addItem(product)); // Cambiar a addItem
  };

  return (
    <CardContainer>
      <ProductImage src={product.image} alt={product.title} />
      <ProductTitle>{product.title}</ProductTitle>
      <ProductDescription>{product.description}</ProductDescription>
      <ProductPrice>${product.price}</ProductPrice>
      <AddToCartButton onClick={handleAddToCart}>Agregar al carrito</AddToCartButton>
    </CardContainer>
  );
};

export default Card;

