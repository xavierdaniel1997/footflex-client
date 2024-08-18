const handleConfirmCOD = async () => {
  if (!cartItems || cartItems.length === 0) {
    toast.error("Your cart is empty");
    return;
  }

  if (!address) {
    toast.error("Please select an address");
    return;
  }

  try {
    const response = await api.post("/cart/check-items", {
      cartItems: cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    });

    if (response?.data?.allItemsInStock) {
      // Proceed with order creation
      const orderResponse = await api.post("/create-order", {
        userId: /* User ID */,
        cartItems: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.productId.salePrice,
        })),
        addressId: address._id,
        paymentMethod: "Cash on Delivery",
        totalAmount: totalPrice,
      });

      if (orderResponse.status === 201) {
        toast.success("Order placed successfully");
        // Navigate to order confirmation page or show order details
      } else {
        toast.error("Failed to place order");
      }
    } else {
      toast.error("Some items in your cart are out of stock or unavailable.");
    }
  } catch (error) {
    console.error("Error checking cart items:", error);
    toast.error("Failed to verify cart items. Please try again.");
  }
};




















******************************************


import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import api from "../../config/axiosConfig";
import { clearCart } from "../../redux/actions/cartActions"; // Assuming you have this action

const PaymentOptions = ({ totalPrice }) => {
  // ... (keep your existing state and other functions)

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const address = useSelector(state => state.address.selectedAddress);
  const user = useSelector(state => state.auth.user); // Assuming you have user info in Redux

  const handleConfirmCOD = async () => {
    if(cartItems && address){
      try {
        const response = await api.get("cart/check-items");
        if(response?.data?.allItemsInStock){
          const orderData = {
            items: cartItems.map(item => ({
              product: item.productId._id,
              productName: item.productId.productName,
              description: item.productId.description,
              price: item.productId.salePrice,
              regularPrice: item.productId.regularPrice,
              quantity: item.quantity,
              size: item.size,
              totalPrice: item.quantity * item.productId.salePrice,
              thumbnail: item.productId.thumbnail
            })),
            address: address,
            totalPrice: totalPrice,
            payment: {
              method: "Cash on Delivery",
              status: "Pending"
            }
          };

          const createOrderResponse = await api.post("orders/create", orderData);
          if (createOrderResponse.status === 201) {
            toast.success("Order placed successfully!");
            dispatch(clearCart());
            // Redirect to order confirmation page or show order details
          } else {
            toast.error("Failed to place order. Please try again.");
          }
        } else {
          toast.error("Some items in your cart are out of stock or unavailable.");
        }
      } catch (error) {
        console.error("Order placement error:", error);
        toast.error("An error occurred while placing the order. Please try again.");
      }
    } else {
      toast.error("Please select an address and ensure your cart is not empty.");
    }
  };

  // ... (keep the rest of your component code)
};

export default PaymentOptions;