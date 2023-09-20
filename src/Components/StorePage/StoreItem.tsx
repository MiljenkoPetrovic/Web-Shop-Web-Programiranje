import React from "react";
import { Button, Card } from 'react-bootstrap';
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../Context/ShoppingCartContext";

type StoreItemProps = {
  id: string; // Keep the 'id' field in the prop type
  name: string;
  price: number;
  imgUrl: string;
};

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const { getItemQuantity, increaseCartQuantity, removeFromCart } = useShoppingCart();
  const quantity = getItemQuantity(id);

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
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
              onClick={() => increaseCartQuantity(id)}
            >
              + Add To Cart
            </Button>
          ) : (
            <div className="d-flex align-items-center flex-column" style={{ gap: ".5rem" }}>
              <span className="fs-3">{quantity}</span> in cart
              <Button
                onClick={() => removeFromCart(id)}
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
