import React, {useEffect, useState} from "react";
import {FaPlus} from "react-icons/fa";
import CategoryForm from "../../components/admin/CategoryForm";
import ReusableTable from "../../components/admin/ReusableTable";
import {FaRegEdit} from "react-icons/fa";
import {MdDeleteOutline} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {
  deleteCategoryItem,
  getCategoryItems,
  updateCategoryItem,
} from "../../redux/categorySlice";
import {BsThreeDotsVertical} from "react-icons/bs";
import ConfirmationModal from "../../components/admin/ConfirmationModal";

const Category = () => {
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);

  // when the table component it need to show the table data
  useEffect(() => {
    dispatch(getCategoryItems());
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
    setEditingCategory(null);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCategory(null);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setOpen(true);
  };

  const handleCategoryAdded = (newCategory) => {
    dispatch(getCategoryItems());
  };

  const columns = [
    {
      label: (
        <div>
          <BsThreeDotsVertical size={20} />
        </div>
      ),
      field: "clickbox",
    },
    {label: "Category Name", field: "categoryName"},
    {label: "Description", field: "description"},
    {label: "Created At", field: "createdAt"},
    {label: "Status", field: "status"},
    {label: "Action", field: "action"},
  ];

  const handleDeleteCategory = (id) => {
    setCategoryToDelete(id); 
    setConfirmDelete(true);
  };

  const confirmDeletion = () => {
    dispatch(deleteCategoryItem(categoryToDelete));
    setConfirmDelete(false);
    setCategoryToDelete(null);
    console.log("Category with _id", categoryToDelete, "deleted");
  };

  const handleToggleStatus = async (category) => {
    try {
      await dispatch(
        updateCategoryItem({
          ...category,
          status: !category.status, 
        })
      ).unwrap();
      dispatch(getCategoryItems());
    } catch (error) {
      console.error("Failed to update category status:", error);
    }
  };

  const formattedData =
    categories?.map((category) => ({
      clickbox: (
        <div>
          <input
            type="checkbox"
            checked={category.status}
            onChange={() => handleToggleStatus(category)}
            className="form-checkbox h-4 w-4 text-blue-600"
          />
        </div>
      ),
      categoryName: category.categoryName,
      description: category.description,
      createdAt: new Date(category.createdAt).toLocaleDateString(),
      status: (
        <div
          className={`text-center rounded-md py-1 font-semibold ${
            category.status
              ? "bg-green-100 text-green-500"
              : "bg-red-100 text-red-600"
          }`}
        >
          {category.status ? "Active" : "Inactive"}
        </div>
      ),
      action: (
        <div className="flex space-x-2">
          <FaRegEdit
            className="text-green-700 cursor-pointer text-xl"
            onClick={() => handleEditCategory(category)}
          />
          <MdDeleteOutline
            className="text-red-500 cursor-pointer text-xl"
            onClick={() => handleDeleteCategory(category._id)}
          />
        </div>
      ),
    })) || [];

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center px-10 py-5 mb-4">
        <div>
          <h1 className="text-2xl font-bold">Category</h1>
          <nav className="text-gray-600 text-sm">Home &gt; Category</nav>
        </div>
        <div className="flex items-center">
          <button
            className="bg-black text-white p-2 rounded-md flex items-center"
            onClick={handleClickOpen}
          >
            <span className="mr-2">Add New Category</span>
            <FaPlus />
          </button>
        </div>
      </div>
      <div className="px-10">
        <ReusableTable columns={columns} data={formattedData} />
      </div>

      <CategoryForm
        open={open}
        handleClose={handleClose}
        onCategoryAdded={handleCategoryAdded}
        editingCategory={editingCategory}
      />

      <ConfirmationModal
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        message="Are you sure you want to delete this category?"
        onConfirm={confirmDeletion}
      />
    </div>
  );
};

export default Category;
