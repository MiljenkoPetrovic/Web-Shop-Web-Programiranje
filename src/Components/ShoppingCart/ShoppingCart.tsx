// ShoppingCart.tsx

import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../Context/ShoppingCartContext";
import { CartItem } from "../Cart/CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/items.json";
import './ShoppingCart.css';

type ShoppingCartProps = {
    isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();

  const handleCheckout = () => {
      // Implement your checkout logic here
      // For example, you can redirect the user to a checkout page or display a confirmation message.
  };

  return (
      <Offcanvas show={isOpen} onHide={closeCart} className={`shopping-cart-container ${isOpen ? 'open' : ''}`} placement="end" backdrop={true}>
          <Offcanvas.Header closeButton>
              <button type="button" className="offcanvas-close-button" aria-label="Close" onClick={closeCart}>
                  &times;
              </button>
              <Offcanvas.Title>Cart</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
              <Stack gap={3}>
                  {cartItems.map((item) => (
                      <CartItem key={item.id} {...item} />
                  ))}
                  <div className="ms-auto fw-bold fs-5">
                      Total{" "}
                      {formatCurrency(
                          cartItems.reduce((total, cartItem) => {
                              const item = storeItems.find((i) => i.id === cartItem.id);
                              return total + (item?.price || 0) * cartItem.quantity;
                          }, 0)
                      )}
                  </div>
                  <Button variant="primary" size="sm" onClick={handleCheckout}>
                      Checkout
                  </Button>
              </Stack>
          </Offcanvas.Body>
      </Offcanvas>
  );
}
