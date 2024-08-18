import React, {useEffect, useState} from "react";
import CartCheckout from "../../components/user/CartCheckout";
import AddressCard from "../../components/user/AddressCard";
import AddAddressDialog from "../../components/user/AddAddressDialog";
import api from "../../config/axiosConfig";
import {useDispatch, useSelector} from "react-redux";
import ProductPreview from "../../components/user/ProductPreview";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import { setSelectedAddress } from "../../redux/selectedAddressSlice";

const DeliveryDetails = ({inUserProfile}) => {
  const [open, setOpen] = useState(false);
  const [addressDetails, setAddressDetails] = useState([]);
  const [editAddressId, setEditAddressId] = useState(null);
  const [editAddressData, setEditAddressData] = useState(null);
  // const [selectedAddressId, setSelectedAddressId] = useState(null);
  // const [deliverAddress, setDeliverAddress] = useState(null)
  const [editMode, setEditMode] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch()
  const address = useSelector((state) => state.address.selectedAddress)

  const fetchUserAddresses = async () => {
    try {
      const response = await api.get("users/user-address");
      setAddressDetails(response?.data?.addresses);
      const defaultAddress = response?.data?.addresses?.find(address => address.isDefaultAddress)
      dispatch(setSelectedAddress(defaultAddress))
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserAddresses();
  }, [open]);

  const handleAddressDeleted = (addressId) => {
    setAddressDetails((prevAddress) =>
      prevAddress.filter((address) => address._id !== addressId)
    );
  };

  const totalPrice = cartItems?.items?.reduce((acc, item) => {
    const price = Number(item?.productId?.salePrice);
    const quantity = item?.quantity;
    return acc + price * quantity;
  }, 0);

  const totalQty = cartItems?.items?.reduce((acc, item) => {
    return acc + item?.quantity;
  }, 0);

  const handleDefaultAddressUpdate = () => {
    fetchUserAddresses();
  };
  const handleAddNewAddress = () => {
    setEditMode(false);
    setEditAddressData(null);
    setOpen(true);
  };

  const handleEditAddress = (addressId) => {
    setEditAddressId(addressId);
    const addressToEdit = addressDetails?.find(
      (address) => address._id === addressId
    );
    if (addressToEdit) {
      setEditAddressData(addressToEdit);
      setEditMode(true);
      setOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setEditMode(false);
    setEditAddressData(null);
  };

  const checkIfDefaultAddress = addressDetails?.some(
    (address) => address.isDefaultAddress
  );

  const navigate = useNavigate();
  const handleNavToPayment = () => {
    if (checkIfDefaultAddress && cartItems?.items.length > 0 && address) {
      navigate("/payment");
    } else {
      toast.error("Select an Address");
    }
  };

  console.log("this is form the deliver detials cart ", cartItems?.items)
  // console.log("this is form the deliver detials address", address)
  return (
    <div className={` ${inUserProfile ? "p-0" : "py-12 md:p-8 lg:px-36"}`}>
     
      <div className="flex flex-col lg:flex-row gap-8">
        <div className={` ${inUserProfile ? "w-full" : "flex-1"}`}>
          <div className="">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">{!inUserProfile? "Select Delivery Address" : "Address"}</h2>
              <button
                className="px-2 py-2 rounded text-xs font-semibold border border-black"
                onClick={handleAddNewAddress}
              >
                ADD NEW ADDRESS
              </button>
            </div>
            {addressDetails?.map((addressData) => (
              <AddressCard
                key={addressData?._id}
                addressData={addressData}
                onAddressDelete={handleAddressDeleted}
                onAddressUpdate={handleDefaultAddressUpdate}
                toggleEditModal={handleEditAddress}
                inUserProfile={inUserProfile}
              />
            ))}
          </div>
        </div>
        <div className={` ${inUserProfile ? "" :  "lg:w-1/3"}`}>
          <div className="mb-3">
            {!inUserProfile && (
              <CartCheckout
                cartCount={totalQty}
                totalPrice={totalPrice}
                buttonName={"NEXT"}
                navigateTo={handleNavToPayment}
              />
            )}
          </div>

          {!inUserProfile && (
            <div>
              <hr />
              <div className="mt-2">
                {cartItems?.items?.map((item) => (
                  <ProductPreview key={item._id} item={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <AddAddressDialog
        open={open}
        onClose={handleCloseDialog}
        addressData={editAddressData}
        editMode={editMode}
      />
    </div>
  );
};

export default DeliveryDetails;
