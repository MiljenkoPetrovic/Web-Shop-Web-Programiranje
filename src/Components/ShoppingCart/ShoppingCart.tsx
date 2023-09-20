import React, { useEffect, useState } from "react";
import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../Context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { db } from "../../firebaseConfig"; // Assuming you have Firebase initialized
import './ShoppingCart.css';
import { CartItem } from "../Cart/CartItem"; // Import CartItem and CartItemProps

import { getFirestore, collection, query, getDocs } from 'firebase/firestore'; // Add these imports for Firestore v9

type ShoppingCartProps = {
    isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
    const { closeCart, cartItems } = useShoppingCart();
    const [storeItems, setStoreItems] = useState<any[]>([]); // Use 'any' for Firestore data
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStoreItems = async () => {
            try {
                const firestore = getFirestore(); // Get a reference to Firestore
                const q = query(collection(firestore, 'Products')); // Change 'Products' to your Firestore collection name
                const querySnapshot = await getDocs(q);

                const itemDocs = querySnapshot.docs.map((doc) => doc.data());
                setStoreItems(itemDocs);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching store items:", error);
                setIsLoading(false);
            }
        };

        if (cartItems.length > 0) {
            fetchStoreItems();
        } else {
            setIsLoading(false);
        }
    }, [cartItems]);

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
                    {isLoading ? (
                        <div>Loading...</div> // You can replace this with a loading indicator
                    ) : (
                        cartItems.map((cartItem, index) => {
                            const storeItem = storeItems[index];
                            if (!storeItem) {
                                return null; // Handle item not found
                            }
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
                            cartItems.reduce((total, cartItem, index) => {
                                const storeItem = storeItems[index];
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
