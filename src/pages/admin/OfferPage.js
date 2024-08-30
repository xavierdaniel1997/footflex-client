import React, {useEffect, useState} from "react";
import ReusableTable from "../../components/admin/ReusableTable";
import BreadCrumbWithButton from "../../components/admin/BreadCrumbWithButton";
import {useLocation} from "react-router-dom";
import OfferModal from "../../components/admin/OfferModal";
import api from "../../config/axiosConfig";
import {MdDeleteOutline, MdOutlineEdit} from "react-icons/md";

const OfferPage = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [productOffers, setProductOffers] = useState([]);
  const [categoryOffers, setCategoryOffers] = useState([]);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await api.get("/offers/all-offers");
      const {productOffers, categoryOffers} = response.data;
      setProductOffers(productOffers);
      setCategoryOffers(categoryOffers);
    } catch (error) {
      console.error("Failed to fetch offers", error);
    }
  };

  const columns = [
    {label: "Offer", field: "name"},
    {label: "Starting Date", field: "startDate"},
    {label: "Ending Date", field: "endDate"},
    {label: "Discount", field: "discount"},
    // {label: "Action", field: "action"},
  ];

  const prductOfferData = productOffers?.map((offer) => ({
    name: (
      <div className="flex items-center">
        <img
          src={offer?.targetOfferId?.thumbnail}
          className="w-12 h-12 object-cover"
        />
        <p>
          {offer?.targetOfferId?.productName.split(" ").slice(0, 1).join(" ")}
        </p>
      </div>
    ),
    startDate: new Date(offer?.startDate).toLocaleDateString(),
    endDate: new Date(offer?.endDate).toLocaleDateString(),
    discount: <div>{offer?.discountPercentage} %</div>,
    // action: (
    //   <div className="flex gap-2 items-center">
    //     <MdOutlineEdit className="text-green-500 cursor-pointer text-xl" />
    //     <MdDeleteOutline className="text-red-500 cursor-pointer text-xl" />
    //   </div>
    // ),
  }));

  const categoryOfferData = categoryOffers?.map((offer) => ({
    name: offer?.targetOfferId?.categoryName,
    startDate: new Date(offer?.startDate).toLocaleDateString(),
    endDate: new Date(offer?.endDate).toLocaleDateString(),
    discount: <div>{offer?.discountPercentage} %</div>,
    action: (
      <div>
        <MdDeleteOutline className="text-red-500 cursor-pointer text-xl" />
      </div>
    ),
  }));

  console.log("this is frm the offer page", productOffers, categoryOffers);
  return (
    <div className="flex flex-col">
      <BreadCrumbWithButton
        buttonName={"Add New Offers"}
        noButton={true}
        componentLocation={"All Offers"}
        location={location.pathname}
        onClick={() => setOpen(true)}
      />
      <div className="px-10">
        <div className="flex flex-row gap-7 w-full">
        <div className="w-full">
          <h1 className="font-bold text-xl text-gray-600">Product Offers</h1>
          <ReusableTable columns={columns} data={prductOfferData} />
        </div>
        <div className="w-full">
          <h1 className="font-bold text-xl text-gray-600">Category Offers</h1>
          <ReusableTable columns={columns} data={categoryOfferData} />
        </div>
        </div>
      </div>
      <OfferModal
        open={open}
        handleClose={() => setOpen(false)}
        productOffers={productOffers}
        categoryOffers={categoryOffers}
      />
    </div>
  );
};

export default OfferPage;
