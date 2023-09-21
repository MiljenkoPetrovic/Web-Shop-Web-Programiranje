import React, { useEffect, useState } from "react";
import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../Context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import './ShoppingCart.css';
import { CartItem } from "../Cart/CartItem";

import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'; 

type ShoppingCartProps = {
    isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  const [storeItems, setStoreItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStoreItems = async () => {
      try {
        const firestore = getFirestore();
        const q = query(collection(firestore, 'Products'));
        const querySnapshot = await getDocs(q);

        const itemDocs = querySnapshot.docs.map((doc) => doc.data());
        setStoreItems(itemDocs);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching store items:", error);
        setError("Error fetching store items");
        setIsLoading(false);
      }
    };

    if (cartItems.length > 0) {
      fetchStoreItems();
    } else {
      setIsLoading(false);
    }
  }, [cartItems]);

  // Fetch items that were added to the cart
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const firestore = getFirestore();
        const cartItemIds = cartItems.map((cartItem) => cartItem.id);
        const q = query(collection(firestore, 'Products'), where('id', 'in', cartItemIds));
        const querySnapshot = await getDocs(q);

        const cartItemsData = querySnapshot.docs.map((doc) => doc.data());
        setStoreItems((prevStoreItems) => [...prevStoreItems, ...cartItemsData]); // Merge with existing store items
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError("Error fetching cart items");
      }
    };

    if (cartItems.length > 0) {
      fetchCartItems();
    }
  }, [cartItems]);

  const handleCheckout = () => {
    // Implement your checkout logic here
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
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            cartItems.map((cartItem) => {
                const storeItem = storeItems.find((item) => item.id === cartItem.id);
                if (!storeItem) {
                  console.warn(`Item not found for cart item with ID: ${cartItem.id}`);
                  return null;
                }
                console.log(`cartItem.id: ${cartItem.id}, storeItem.id: ${storeItem.id}`);
              return (
                <CartItem
                  key={cartItem.id}
                  id={cartItem.id}
                  name={storeItem.name || ''}
                  price={storeItem.price || 0}
                  imgUrl={storeItem.imgUrl || ''}
                  quantity={cartItem.quantity}
                />
              );
            })
          )}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const storeItem = storeItems.find((item) => item.id === cartItem.id);
                return total + (storeItem?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
          <div className="d-flex justify-between align-items-center">
            <Button variant="primary" size="sm" onClick={handleCheckout}>
              Checkout
            </Button>
            <Button variant="danger" size="sm" onClick={closeCart}>
              Close Cart
            </Button>
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
