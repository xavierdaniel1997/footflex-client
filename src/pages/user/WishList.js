import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchWishList} from "../../redux/wishListSlice";
import ShoeCard from "../../components/user/ShoeCard";

const WishList = ({inUserProfile}) => {
  const dispatch = useDispatch();
  const {items, loading, error} = useSelector((state) => state.wishList);

  useEffect(() => {
    dispatch(fetchWishList());
  }, [dispatch]);


  return (
    <>
      {items.length === 0 ? (
        "No Items in wishList"
      ) : (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items?.map((productData) => (
              <ShoeCard
                key={productData?._id}
                productData={productData}
                inUserProfile={inUserProfile}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default WishList;

