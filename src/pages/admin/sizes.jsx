import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSizes,
  createSize,
  updateSize,
  deleteSize,
} from "../../store/slices/sizeSlice";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Form from "../../components/form/Form";
import InputField from "../../components/form/InputField";
import { Checkbox } from "../../components/ui/checkbox";

export default function AdminSizes() {
  const dispatch = useDispatch();
  const { sizes, loading, error } = useSelector((state) => state.size);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingSize, setEditingSize] = useState(null);
  const [isRound, setIsRound] = useState(false);

  useEffect(() => {
    dispatch(fetchSizes());
  }, [dispatch]);

  const handleSubmit = async (data) => {
    try {
      data.widthCm = (data.widthFeet * 30.48).toFixed(2);
      data.heightCm = data.isRound ? null : (data.heightFeet * 30.48).toFixed(2);

      if (editingSize) {
        await dispatch(updateSize({ id: editingSize._id, sizeData: data })).unwrap();
      } else {
        await dispatch(createSize(data)).unwrap();
      }

      setOpenDialog(false);
      setEditingSize(null);
    } catch (error) {
      console.error("Error submitting size:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this size?")) {
      dispatch(deleteSize(id));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Sizes</h2>

      <div className="flex gap-4 mb-4 items-center justify-end">
        <Button
          onClick={() => {
            setEditingSize(null);
            setOpenDialog(true);
            setIsRound(false);
          }}
        >
          Add Size
        </Button>
      </div>

      {loading ? (
        <p>Loading sizes...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Width (Feet)</TableHead>
              <TableHead>Height (Feet)</TableHead>
              <TableHead>Round</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sizes.map((size) => (
              <TableRow key={size._id}>
                <TableCell>{size.name}</TableCell>
                <TableCell>
                  {size.widthFeet} ft / {size.widthCm} cm
                </TableCell>
                <TableCell>
                  {size.isRound ? "N/A" : `${size.heightFeet} ft / ${size.heightCm} cm`}
                </TableCell>
                <TableCell>{size.isRound ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Button
                    className="me-2"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingSize(size);
                      setIsRound(size.isRound);
                      setOpenDialog(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(size._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Size Form Modal */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-white p-6 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle>{editingSize ? "Edit Size" : "Add Size"}</DialogTitle>
          </DialogHeader>
          <Form
            onSubmit={handleSubmit}
            defaultValues={
              editingSize || {
                name: "",
                widthFeet: "",
                heightFeet: "",
                isRound: false,
              }
            }
          >
            <InputField
              label="Size Name"
              name="name"
              placeholder="Enter Size Name"
              validation={{ required: "Size name is required" }}
            />
            <InputField
              label="Width (Feet)"
              name="widthFeet"
              type="number"
              placeholder="Enter width in feet"
              validation={{ required: "Width is required" }}
            />
            {!isRound && (
              <InputField
                label="Height (Feet)"
                name="heightFeet"
                type="number"
                placeholder="Enter height in feet"
              />
            )}
            <div className="flex items-center gap-2 mt-2">
              <Checkbox
                checked={isRound}
                onCheckedChange={(checked) => setIsRound(checked)}
              />
              <label>Round Size</label>
            </div>

            <Button type="submit" variant="outline" className="mt-4 w-full">
              {editingSize ? "Update" : "Create"} Size
            </Button>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
