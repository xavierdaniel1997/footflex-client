import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// ... other imports ...

const ProductForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // ... existing state declarations ...

  useEffect(() => {
    dispatch(getCategoryItems());
    fetchBrands();

    if (productId) {
      setIsEditing(true);
      fetchProductDetails(productId);
    }
  }, [dispatch, productId]);

  const fetchProductDetails = async (id) => {
    try {
      const response = await api.get(`/product/getProduct/${id}`);
      const product = response.data.product;
      setFormData({
        productName: product.productName,
        description: product.description,
        category: product.category._id,
        brand: product.brand._id,
        gender: product.gender,
        stock: product.stock,
        regularPrice: product.regularPrice,
        salePrice: product.salePrice,
        sizes: product.sizes,
      });
      setImageData({
        thumbnail: product.thumbnail,
        galleryImages: product.galleryImages,
      });
    } catch (error) {
      console.error("Error fetching product details:", error);
      toast.error("Failed to load product details");
    }
  };

  const submitProductForm = async () => {
    const validateForm = validateProductForm(formData);
    setErrors(validateForm);
    if (Object.keys(validateForm).length === 0) {
      try {
        const data = { ...formData, ...imageData };
        let response;
        if (isEditing) {
          response = await api.put(`product/updateProduct/${productId}`, data);
        } else {
          response = await api.post("product/addProduct", data);
        }
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/dashboard/products");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };

  // ... rest of the component ...

  return (
    <div className="container mx-auto px-4">
      <BreadCrumbWithButton
        componentLocation={isEditing ? "Edit Product" : "Add Product"}
        // ... other props ...
      />
      {/* ... form fields ... */}
      <div className="mt-6 px-20">
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={submitProductForm}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900"
          >
            {isEditing ? "Update" : "Save"}
          </button>
          {isEditing && (
            <button
              type="button"
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              onClick={() => {/* Implement delete functionality */}}
            >
              Delete
            </button>
          )}
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            onClick={() => navigate("/dashboard/products")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;