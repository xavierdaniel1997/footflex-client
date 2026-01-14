import React, {useState, useEffect} from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import {AiFillCloseCircle} from "react-icons/ai";
import api from "../../config/axiosConfig";
import toast from "react-hot-toast";

const OfferModal = ({open, handleClose, productOffers, categoryOffers, onOfferAdded}) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    offerType: "Category",
    selectedCategory: "",
    selectedProduct: "",
    discountPercentage: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  useEffect(() => {
    if (open) {
      fetchCategories();
      fetchProducts();
    }
  }, [open]);

  const fetchCategories = async () => {
    try {
      const response = await api.get("category/getCategorys");
      setCategories(response.data.categoryData);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get("product/getAllProducts");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOfferTypeChange = (event) => {
    setFormData({
      ...formData,
      offerType: event.target.value,
      selectedCategory: "",
      selectedProduct: "",
    });
  };

  const handleCategoryChange = (event) => {
    setFormData({
      ...formData,
      selectedCategory: event.target.value,
    });
  };

  const handleProductChange = (event) => {
    setFormData({
      ...formData,
      selectedProduct: event.target.value,
    });
  };

  const handleSubmit = async () => {
    const payload = {
      name:
        formData.offerType === "Category" ? "Category Offer" : "Product Offer",
      offerType: formData.offerType,
      discountPercentage: formData.discountPercentage,
      startDate: formData.startDate,
      endDate: formData.endDate,
      description: formData.description,
      targetOfferId:
        formData.offerType === "Category"
          ? formData.selectedCategory
          : formData.selectedProduct,
    };

    try {
      const response = await api.post("offers/add-offer", payload);
      toast.success(response?.data?.message);
      onOfferAdded(response.data.offer);
      setFormData({
        offerType: "Category",
        selectedCategory: "",
        selectedProduct: "",
        discountPercentage: "",
        startDate: "",
        endDate: "",
        description: "",
      });
      handleClose();
    } catch (error) {
      console.error("Failed to create offer", error);
      toast.error(error?.response?.data?.message);
    }

    console.log("this is frm the offer modal", payload);
  };

  const offeredProductIds = new Set(
    productOffers
      .filter((offer) => offer.offerType === "Products")
      .map((offer) => offer.targetOfferId._id)
  );
  
  const availableProducts = products.filter(
    (product) => !offeredProductIds.has(product._id)
  );

  const offerCategoryIds = new Set(
    categoryOffers
      .filter((offer) => offer.offerType === "Category")
      .map((offer) => offer.targetOfferId._id)
  );
  
  const availableCategorys = categories.filter(
    (category) => !offerCategoryIds.has(category._id)
  );


  const currentDate = new Date().toISOString().split("T")[0];
  console.log("this is frm the offer modal ", categories)
  console.log("this is also form the offer modal avail", categoryOffers) 
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="offer-modal-title"
    >
      <Box sx={modalStyle}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{position: "absolute", right: 8, top: 8, color: "grey.500"}}
        >
          <AiFillCloseCircle size={30} />
        </IconButton>

        <Typography variant="h6" component="h2" sx={{mb: 2}}>
          Add Offer
        </Typography>

        <Box component="form" noValidate autoComplete="off" sx={{mt: 3}}>
          <FormControl fullWidth sx={{mb: 2}}>
            <InputLabel id="offer-type-label">Offer Type</InputLabel>
            <Select
              labelId="offer-type-label"
              name="offerType"
              value={formData.offerType}
              onChange={handleOfferTypeChange}
              label="Offer Type"
            >
              <MenuItem value="Category">Category</MenuItem>
              <MenuItem value="Products">Product</MenuItem>
            </Select>
          </FormControl>

          {formData.offerType === "Category" && (
            <FormControl fullWidth sx={{mb: 2}}>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                label="Category"
                name="selectedCategory"
                value={formData.selectedCategory}
                onChange={handleCategoryChange}
              >
                {availableCategorys.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.categoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {formData.offerType === "Products" && (
            <FormControl fullWidth sx={{mb: 2}}>
              <InputLabel id="product-select-label">Product</InputLabel>
              <Select
                labelId="product-select-label"
                label="Product"
                name="selectedProduct"
                value={formData.selectedProduct}
                onChange={handleProductChange}
              >
                {availableProducts?.map((product) => (
                  <MenuItem key={product._id} value={product._id}>
                    <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                      {product.productName}
                      <img
                        src={product.thumbnail}
                        alt={product.productName}
                        width={40}
                        height={40}
                      />
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <TextField
            label="Discount Percentage"
            fullWidth
            sx={{mb: 2}}
            name="discountPercentage"
            value={formData.discountPercentage}
            onChange={handleInputChange}
          />
          <Box sx={{display: "flex", justifyContent: "space-between", mb: 2}}>
            <TextField
              label="Starting Date"
              type="date"
              InputLabelProps={{shrink: true}}
              sx={{width: "48%", cursor: "pointer"}}
              inputProps={{min: currentDate}}
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
            />
            <TextField
              label="Ending Date"
              type="date"
              InputLabelProps={{shrink: true}}
              sx={{width: "48%", cursor: "pointer"}}
              inputProps={{min: currentDate}}
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
            />
          </Box>
          <TextField
            label="Description"
            multiline
            rows={3}
            placeholder="Description"
            fullWidth
            sx={{mb: 4}}
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <Box sx={{display: "flex", justifyContent: "end", gap: "1rem"}}>
            <Button
              variant="contained"
              color="primary"
              sx={{bgcolor: "black"}}
              onClick={handleSubmit}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{color: "black", borderColor: "black"}}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

export default OfferModal;
