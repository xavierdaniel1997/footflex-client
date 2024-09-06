const handleRazorpayPayment = async () => {
    if (cartItems && address) {
      try {
        // Step 1: Create order on the backend
        const orderData = {
          items: cartItems?.items.map((item) => ({
            product: item.productId._id,
            productName: item.productId.productName,
            productBrand: item.productId.brand.brandName,
            description: item.productId.description,
            price: item.productId.salePrice,
            regularPrice: item.productId.regularPrice,
            quantity: item.quantity,
            size: item.size,
            totalPrice: item.quantity * item.productId.salePrice,
            thumbnail: item.productId.thumbnail,
          })),
          address: address,
          totalPrice: totalPrice,
          originalTotalPrice: pricingDetails.originalTotalPrice,          
          totalPriceAfterDiscount: pricingDetails.totalPriceAfterDiscount, 
          savedTotal: pricingDetails.savedTotal,                        
          couponDiscount: pricingDetails.couponDiscount,                
          finalPrice: pricingDetails.finalPrice,
          payment: {
            method: "Razorpay",
            status: "Pending",
          },
        };

        const response = await api.post("order/create-razorpay-order", orderData);
        const { order, key_id } = response.data;

        const options = {
          key: key_id,
          amount: order.amount,
          currency: order.currency,
          name: "Your Company Name",
          description: "Order Payment",
          order_id: order.id,
          handler: async function (response) {
            try {
              const verifyResponse = await api.post("order/verify-razorpay-payment", {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });

              if (verifyResponse.data.success) {
                toast.success("Payment successful!");
                dispatch(clearCart());
              } else {
                toast.error("Payment verification failed. Please contact support.");
              }
            } catch (error) {
              console.error("Payment verification error:", error);
              toast.error("An error occurred during payment verification.");
            }
          },
          prefill: {
            name: "Customer Name",
            email: "customer@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } catch (error) {
        console.error("Razorpay order creation error:", error);
        toast.error("Failed to create Razorpay order. Please try again.");
      }
    } else {
      toast.error("Please select an address and ensure your cart is not empty.");
    }
  };