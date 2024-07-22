import React, {useEffect, useState} from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Grid,
  IconButton,
} from "@mui/material";
import {AiOutlineClose} from "react-icons/ai";
import {toast, Toaster} from "react-hot-toast";
import api from "../../config/axiosConfig";
import {useDispatch} from "react-redux";
import {addCategoryItem, addCategoryItems, updateCategoryItem} from "../../redux/categorySlice";

const CategoryForm = ({
  open,
  handleClose,
  onCategoryAdded,
  editingCategory,
}) => {
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState("");
  const [catDescription, setCatDescription] = useState("");

  useEffect(() => {
    if (editingCategory) {
      setCategoryName(editingCategory.categoryName);
      setCatDescription(editingCategory.description);
    } else {
      setCategoryName("");
      setCatDescription("");
    }
  }, [editingCategory]);

  const handleSaveCategory = async () => {
    try {
      if (editingCategory) {
        await dispatch(updateCategoryItem({
          _id: editingCategory._id,
          categoryName,
          description: catDescription
        })).unwrap();
        toast.success("Category updated successfully")
      } else {
        await dispatch(
          addCategoryItem({
            categoryName,
            description: catDescription,
          })
        ).unwrap();
        toast.success("Category added successfully");
      }
      handleClose();
      setCatDescription("");
      setCategoryName("");
      onCategoryAdded()
    } catch (error) {
      console.log(error);
      toast.error(error.message || "An error occered");
    }
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "8px",
        }}
      >
        {editingCategory ? "Edit Category" : "Add New Category"}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <AiOutlineClose />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          paddingTop: "10px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              id="categoryName"
              label="Category Name"
              type="text"
              fullWidth
              variant="outlined"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
              multiline
              rows={3}
              value={catDescription}
              onChange={(e) => setCatDescription(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "flex-end",
          paddingBottom: "20px",
          marginRight: "20px",
        }}
      >
        <Button
          onClick={handleSaveCategory}   
          sx={{
            backgroundColor: "black",
            color: "white",
            marginRight: "10px",
            "&:hover": {
              backgroundColor: "black",
            },
          }}
        >
          {editingCategory ? "Update" : "Save"}
        </Button>
        <Button
          onClick={handleClose}
          sx={{
            backgroundColor: "white",
            color: "black",
            border: "1px solid black",
            "&:hover": {
              backgroundColor: "white", 
            },
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryForm;
