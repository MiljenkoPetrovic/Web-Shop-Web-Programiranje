import React from "react";
import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../Context/ShoppingCartContext";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

type CartItemProps = {
    id: number;
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
    const item = storeItems.find((i) => i.id === id);
    if (item == null) return null;

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
