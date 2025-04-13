import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, FormProvider, Controller } from "react-hook-form";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../store/slices/productSlice";
import { fetchCategories } from "../../store/slices/categorySlice";
import { fetchSizes } from "../../store/slices/sizeSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import InputField from "../../components/form/InputField";

axios.defaults.withCredentials = true;

export default function AdminProducts() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.category);
  const { sizes } = useSelector((state) => state.size);

  const [filters, setFilters] = useState({
    search: "",
    sort: "newest",
    page: 1,
    limit: 1000,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const methods = useForm();
  const { control, reset } = methods;

  // Function to refresh products
  const refreshProducts = () => {
    dispatch(fetchProducts(filters));
  };

  useEffect(() => {
    refreshProducts();
  }, [dispatch, filters]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSizes());
  }, [dispatch]);

  useEffect(() => {
    if (editingProduct) {
      reset({
        name: editingProduct.name || "",
        description: editingProduct.description || "",
        price: editingProduct.price?.toString() || "",
        originalPrice: editingProduct.originalPrice?.toString() || "",
        category: editingProduct.category?._id || "",
        size: editingProduct.size?._id || "",
        rating: editingProduct.rating?.toString() || "",
      });
      setImagePreviews(editingProduct?.images || []);
    } else {
      reset({
        name: "",
        description: "",
        price: "",
        originalPrice: "",
        category: "",
        size: "",
        rating: "",
      });
      setSelectedImages([]);
      setImagePreviews([]);
    }
  }, [editingProduct, reset]);

  const resetDialog = () => {
    setEditingProduct(null);
    setSelectedImages([]);
    setImagePreviews([]);
    reset();
    setOpenDialog(false);
  };

  const handleSubmit = async (data) => {
    const formData = new FormData();

    // Append form fields to FormData
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null && data[key] !== "") {
        formData.append(key, data[key]);
      }
    });

    // Append images if selected
    if (selectedImages.length > 0) {
      selectedImages.forEach((image) => {
        formData.append("images", image);
      });
    }

    try {
      if (editingProduct) {
        await dispatch(updateProduct({ id: editingProduct._id, productData: formData })).unwrap();
      } else {
        await dispatch(createProduct(formData)).unwrap();
      }
      // Refresh products list after successful operation
      refreshProducts();
      resetDialog();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setSelectedImages(files);
      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setOpenDialog(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await dispatch(deleteProduct(productId)).unwrap();
        // Refresh products list after successful deletion
        refreshProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleSearch = (e) => {
    setFilters({ ...filters, search: e.target.value, page: 1 });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Products</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <Input
          placeholder="Search..."
          value={filters.search}
          onChange={handleSearch}
          className="flex-1"
        />
        <Button
          className="cursor-pointer whitespace-nowrap"
          onClick={() => {
            resetDialog();
            setOpenDialog(true);
          }}
        >
          Add Product
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-4">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-2">Loading products...</p>
        </div>
      ) : error ? (
        <p className="text-red-500 p-4 bg-red-50 rounded-md">{error}</p>
      ) : products.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-md">
          <p className="text-gray-500">No products found. Add your first product!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    {product?.images && product.images[0] ? (
                      <img
                        src={product.images[0]?.url}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-md">
                        <span className="text-xs text-gray-500">No image</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium max-w-xs truncate">{product.name}</TableCell>
                  <TableCell>{product.category?.name || "N/A"}</TableCell>
                  <TableCell>{product.size?.name || "N/A"}</TableCell>
                  <TableCell>₹{product.price?.toLocaleString() || "0"}</TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditProduct(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={openDialog} onOpenChange={(open) => !open && resetDialog()}>
        <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto w-full max-w-xl">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add Product"}</DialogTitle>
          </DialogHeader>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)} className="p-4 space-y-4">
              <InputField
                label="Name"
                name="name"
                placeholder="Product name"
                validation={{
                  required: "Name is required",
                }}
              />
              <InputField
                label="Description"
                name="description"
                placeholder="Product description"
                textarea={true}
                validation={{
                  required: "Description is required",
                }}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Price (₹)"
                  name="price"
                  type="number"
                  placeholder="0.00"
                  validation={{
                    required: "Price is required",
                    min: { value: 0, message: "Price must be positive" },
                  }}
                />
                <InputField
                  label="Original Price (₹)"
                  name="originalPrice"
                  type="number"
                  placeholder="0.00"
                  validation={{
                    min: { value: 0, message: "Original price must be positive" },
                  }}
                />
              </div>
              <InputField
                label="Product Rating"
                name="rating"
                type="number"
                placeholder="0.00"
                validation={{
                  min: { value: 1, message: "Rating must be greater than 0" },
                  max: { value: 5, message: "Rating must be less than 6" },
                }}
              />

              {/* Category Selection */}
              <div className="mb-4">
                <label className="block font-medium mb-1">Category</label>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "Category is required" }}
                  render={({ field, fieldState }) => (
                    <>
                      <Select onValueChange={field.onChange} value={field.value || ""}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories?.length > 0 ? (
                            categories.map((category) => (
                              <SelectItem key={category._id} value={category._id}>
                                {category.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="loading" disabled>
                              No categories available
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      {fieldState.error && (
                        <p className="text-red-500 text-sm mt-1">
                          {fieldState.error.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>

              {/* Size Selection */}
              <div className="mb-4">
                <label className="block font-medium mb-1">Size</label>
                <Controller
                  name="size"
                  control={control}
                  rules={{ required: "Size is required" }}
                  render={({ field, fieldState }) => (
                    <>
                      <Select onValueChange={field.onChange} value={field.value || ""}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Size" />
                        </SelectTrigger>
                        <SelectContent>
                          {sizes?.length > 0 ? (
                            sizes.map((size) => (
                              <SelectItem key={size._id} value={size._id}>
                                {size.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="loading" disabled>
                              No sizes available
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      {fieldState.error && (
                        <p className="text-red-500 text-sm mt-1">
                          {fieldState.error.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium mb-1">Product Images</label>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-1"
                />
                {imagePreviews.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {imagePreviews.map((imagePreview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={imagePreview}
                          alt={`Product preview ${index + 1}`}
                          className="w-24 h-24 object-cover rounded-md border border-gray-200"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mt-2">
                    {editingProduct ? "No images to update" : "No images selected"}
                  </p>
                )}
                {editingProduct && !selectedImages.length && (
                  <p className="text-sm text-amber-600 mt-1">
                    Note: Leave empty to keep existing images
                  </p>
                )}
              </div>

              <div className="flex gap-2 justify-end pt-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={resetDialog}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingProduct ? "Update" : "Create"} Product
                </Button>
              </div>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
}