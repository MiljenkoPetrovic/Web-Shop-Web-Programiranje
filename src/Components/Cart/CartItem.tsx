import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useShoppingCart } from "../Context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { getFirestore, doc, getDoc, query, collection, where, getDocs } from 'firebase/firestore';

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
  const [item, setItem] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const imageSize = "75px";

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
        const firestore = getFirestore();
        const q = query(collection(firestore, "Products"), where("id", "==", id));
        const querySnapshot = await getDocs(q);
    
        if (!querySnapshot.empty) {
          // If there are matching documents, there should be only one.
          const itemData = querySnapshot.docs[0].data();
          console.log("Item data:", itemData);
          setItem(itemData);
        } else {
          // Handle item not found
          console.warn(`Item not found for cart item with ID: ${id}`);
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
    return <div>Loading...</div>;
  }

  if (!item) {
    return <div>Item not found</div>;
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
