import React from "react";
import { Button, Card } from 'react-bootstrap';
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../Context/ShoppingCartContext";

type StoreItemProps = {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
};

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  console.log(id); // Log the id to the console
  const { getItemQuantity, addToCart, removeFromCart } = useShoppingCart();
  const quantity = getItemQuantity(id);

  const handleAddToCart = () => {
    addToCart(id); // Pass the item ID to addToCart
  };

  const handleRemoveFromCart = () => {
    removeFromCart(id); // Pass the item ID to removeFromCart
  };

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        style={{ width: '300px', height: '150px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button
              className="w-100"
              onClick={handleAddToCart} // Use the correct handler
            >
              + Add To Cart
            </Button>
          ) : (
            <div className="d-flex align-items-center flex-column" style={{ gap: ".5rem" }}>
              <span className="fs-3">{quantity}</span> in cart
              <Button
                onClick={handleRemoveFromCart} // Use the correct handler
                variant="danger"
                size="sm"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
