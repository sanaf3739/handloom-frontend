import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../store/slices/categorySlice";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import Form from "../../components/form/Form";
import InputField from "../../components/form/InputField";

axios.defaults.withCredentials = true;

export default function AdminCategories() {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSubmit = async (data) => {
    try {
      if (editingCategory) {
        await dispatch(updateCategory({ id: editingCategory._id, categoryData: data })).unwrap();
      } else {
        await dispatch(createCategory(data)).unwrap();
      }
      setOpenDialog(false);
      setEditingCategory(null);
    } catch (error) {
      console.error("Error submitting category:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory(id));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Categories</h2>

      <div className="flex gap-4 mb-4 items-center justify-end">
        <Button
          className="cursor-pointer"
          onClick={() => {
            setEditingCategory(null);
            setOpenDialog(true);
          }}
        >
          Add Category
        </Button>
      </div>

      {loading ? (
        <p>Loading categories...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category._id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.slug}</TableCell>
                <TableCell>
                  <Button
                    className="cursor-pointer me-2"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingCategory(category);
                      setOpenDialog(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    className="cursor-pointer"
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(category._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Category Form Modal */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-white p-6 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle>{editingCategory ? "Edit Category" : "Add Category"}</DialogTitle>
          </DialogHeader>
          <Form
            onSubmit={handleSubmit}
            defaultValues={editingCategory || { name: "" }}
          >
            <InputField
              label="Name"
              name="name"
              placeholder="Enter Category Name"
              validation={{ required: "Name is required" }}
            />
            <Button
              type="submit"
              variant="outline"
              disabled={loading}
              className="cursor-pointer mt-4 w-full p-2 text-black"
            >
              {editingCategory ? "Update" : "Create"} Category
            </Button>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
