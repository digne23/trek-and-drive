import { useState } from "react";
import { useVehicles } from "@/contexts/VehicleContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Trash2, Edit, Plus, LogOut, Upload, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VehicleFormData {
  name: string;
  category: string;
  passengers: number;
  price: number;
  plateNo?: string;
  image: string;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const { vehicles, addVehicle, updateVehicle, deleteVehicle } = useVehicles();
  const { toast } = useToast();

  const [formData, setFormData] = useState<VehicleFormData>({
    name: "",
    category: "",
    passengers: 5,
    price: 0,
    plateNo: "",
    image: ""
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "steve123") {
      setIsAuthenticated(true);
      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard!",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Incorrect password. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      passengers: 5,
      price: 0,
      plateNo: "",
      image: ""
    });
    setEditingId(null);
    setImagePreview("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.category || !formData.image) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (editingId !== null) {
      updateVehicle(editingId, formData);
      toast({
        title: "Vehicle Updated",
        description: `${formData.name} has been updated successfully.`,
      });
    } else {
      addVehicle(formData);
      toast({
        title: "Vehicle Added",
        description: `${formData.name} has been added to the fleet.`,
      });
    }

    resetForm();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File",
          description: "Please select an image file.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData({ ...formData, image: base64String });
        setImagePreview(base64String);
        toast({
          title: "Image Uploaded",
          description: "Image has been uploaded successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (id: number) => {
    const vehicle = vehicles.find(v => v.id === id);
    if (vehicle) {
      setFormData({
        name: vehicle.name,
        category: vehicle.category,
        passengers: vehicle.passengers,
        price: vehicle.price,
        plateNo: vehicle.plateNo || "",
        image: vehicle.image
      });
      setEditingId(id);
      setImagePreview(vehicle.image);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDelete = (id: number) => {
    const vehicle = vehicles.find(v => v.id === id);
    if (vehicle && window.confirm(`Are you sure you want to delete ${vehicle.name}?`)) {
      deleteVehicle(id);
      toast({
        title: "Vehicle Deleted",
        description: `${vehicle.name} has been removed from the fleet.`,
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-trekGreen-100 via-trekGreen-200 to-trekGreen-300">
        <Card className="w-full max-w-md p-8 shadow-xl">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-trekGray-900 mb-2">Admin Login</h1>
            <p className="text-trekGray-600">Enter password to access the dashboard</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="mt-1"
                />
              </div>
              <Button type="submit" className="w-full bg-trekGreen-500 hover:bg-trekGreen-600">
                Login
              </Button>
            </div>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-trekGreen-600 text-white p-3 sm:p-4 shadow-lg">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-center sm:text-left">
            Trek&Drive Admin Dashboard
          </h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="bg-white text-trekGreen-600 hover:bg-gray-100 w-full sm:w-auto"
            size="sm"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Form Section */}
          <div>
            <Card className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                {editingId !== null ? <Edit className="h-5 w-5 sm:h-6 sm:w-6" /> : <Plus className="h-5 w-5 sm:h-6 sm:w-6" />}
                {editingId !== null ? "Edit Vehicle" : "Add New Vehicle"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <Label htmlFor="name">Vehicle Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Toyota Prius 2013"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Economy, SUV, Luxury"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="passengers">Passengers *</Label>
                  <Input
                    id="passengers"
                    type="number"
                    value={formData.passengers}
                    onChange={(e) => setFormData({ ...formData, passengers: parseInt(e.target.value) || 0 })}
                    min="1"
                    max="15"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="price">Price per Day (RWF) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                    min="0"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="plateNo">Plate Number (Optional)</Label>
                  <Input
                    id="plateNo"
                    value={formData.plateNo}
                    onChange={(e) => setFormData({ ...formData, plateNo: e.target.value })}
                    placeholder="e.g., RAG 239 G"
                  />
                </div>

                <div>
                  <Label htmlFor="image">Image Path *</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="e.g., /car_image.jpg"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the path to the image file in the public folder or upload an image below
                  </p>

                  {/* Image Upload Section */}
                  <div className="mt-3 sm:mt-4 p-3 sm:p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                      <div className="flex-1 w-full">
                        <Label htmlFor="imageUpload" className="cursor-pointer">
                          <div className="flex items-center justify-center gap-2 p-2 sm:p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <Upload className="h-4 w-4 sm:h-5 sm:w-5 text-trekGreen-600" />
                            <span className="text-xs sm:text-sm font-medium text-gray-700">
                              Upload Image
                            </span>
                          </div>
                          <Input
                            id="imageUpload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </Label>
                        <p className="text-xs text-gray-500 mt-2 text-center sm:text-left">
                          Supports: JPG, PNG, GIF, WebP
                        </p>
                      </div>

                      {imagePreview && (
                        <div className="flex flex-col items-center gap-2">
                          <div className="relative w-20 h-20 sm:w-24 sm:h-24 border-2 border-trekGreen-500 rounded-lg overflow-hidden">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-xs text-trekGreen-600 font-medium flex items-center gap-1">
                            <ImageIcon className="h-3 w-3" />
                            Preview
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-trekGreen-500 hover:bg-trekGreen-600 text-sm sm:text-base"
                  >
                    {editingId !== null ? "Update Vehicle" : "Add Vehicle"}
                  </Button>
                  {editingId !== null && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetForm}
                      className="flex-1 text-sm sm:text-base"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </Card>
          </div>

          {/* Vehicle List Section */}
          <div>
            <Card className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                Current Fleet ({vehicles.length})
              </h2>
              <div className="space-y-3 sm:space-y-4 max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] overflow-y-auto">
                {vehicles.map((vehicle) => (
                  <Card key={vehicle.id} className="p-3 sm:p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="w-full sm:w-20 md:w-24 h-32 sm:h-20 md:h-24 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-base sm:text-lg">{vehicle.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">{vehicle.category}</p>
                        <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 text-xs sm:text-sm">
                          <span>👥 {vehicle.passengers}</span>
                          <span className="font-semibold text-trekGreen-600">
                            {vehicle.price} RWF/day
                          </span>
                        </div>
                        {vehicle.plateNo && (
                          <p className="text-xs text-gray-500 mt-1">Plate: {vehicle.plateNo}</p>
                        )}
                      </div>
                      <div className="flex sm:flex-col gap-2 justify-end sm:justify-start">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(vehicle.id)}
                          className="text-blue-600 hover:text-blue-700 flex-1 sm:flex-none"
                        >
                          <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(vehicle.id)}
                          className="text-red-600 hover:text-red-700 flex-1 sm:flex-none"
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
