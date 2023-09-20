import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useShoppingCart } from "../Context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { db } from '../../firebaseConfig';

import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Import Firestore functions for v9

type CartItemProps = {
  id: string;
  name: string; 
  price: number;
  imgUrl: string;
  quantity: number;
  containerClassName?: string;
  imageClassName?: string;
  detailsClassName?: string;
  quantityClassName?: string;
  priceClassName?: string;
  removeButtonClassName?: string;
};

export function CartItem({
  id,
  quantity,
  containerClassName,
  imageClassName,
  detailsClassName,
  quantityClassName,
  priceClassName,
  removeButtonClassName,
}: CartItemProps) {
  const { removeFromCart, increaseCartQuantity, decreaseCartQuantity } = useShoppingCart();
  const [item, setItem] = useState<any | null>(null); // Use 'any' for Firestore data
  const [isLoading, setIsLoading] = useState(true);

  const imageSize = "75px"; // Image size

  const handleRemoveClick = () => {
    removeFromCart(id);
  };

  const handleIncreaseClick = () => {
    increaseCartQuantity(id);
  };

  const handleDecreaseClick = () => {
    decreaseCartQuantity(id);
  };

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const firestore = getFirestore(); // Get a reference to Firestore
        const itemDocRef = doc(firestore, "Products", id); // Change 'Products' to your Firestore collection name
        const itemDocSnapshot = await getDoc(itemDocRef);

        if (itemDocSnapshot.exists()) {
          setItem(itemDocSnapshot.data());
        } else {
          // Handle item not found
          setItem(null);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching item:", error);
        setIsLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a loading indicator
  }

  if (!item) {
    return <div>Item not found</div>; // Handle item not found
  }

  return (
    <div className={`cart-item-container ${containerClassName}`}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img
            src={item.imgUrl}
            className={`cart-item ${imageClassName}`}
            alt={item.name}
            style={{ width: imageSize, height: imageSize, objectFit: "cover" }}
          />
          <div className={`item-details ${detailsClassName}`}>
            <div>
              <strong>{item.name}</strong>
              {quantity > 1 && (
                <span className={`quantity-text ${quantityClassName}`}>
                  {" x" + quantity}
                </span>
              )}
            </div>
            <div className={`text-muted ${priceClassName}`}>
              {formatCurrency(item.price * quantity)}
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <Button
            variant="outline-danger"
            size="sm"
            onClick={handleRemoveClick}
            className={`remove-button ${removeButtonClassName}`}
          >
            Remove
          </Button>
          <div className={`d-flex align-items-center justify-content-between`}>
            <Button
              variant="primary"
              size="sm"
              onClick={handleIncreaseClick}
              className="mx-2"
            >
              +1
            </Button>
            {quantity > 1 && (
              <Button
                variant="danger"
                size="sm"
                onClick={handleDecreaseClick}
              >
                -1
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
