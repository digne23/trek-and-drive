import { useState, useEffect } from "react";
import { X, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface BookingPopupProps {
  isOpen: boolean;
  onClose: () => void;
  vehicleName: string;
  vehiclePrice: number;
}

const BookingPopup = ({ isOpen, onClose, vehicleName, vehiclePrice }: BookingPopupProps) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate number of days and total price whenever dates change
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      // Calculate the difference in days
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 0) {
        setNumberOfDays(diffDays);
        setTotalPrice(diffDays * vehiclePrice);
      } else {
        setNumberOfDays(0);
        setTotalPrice(0);
      }
    } else {
      setNumberOfDays(0);
      setTotalPrice(0);
    }
  }, [startDate, endDate, vehiclePrice]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your booking logic here
    console.log({
      vehicleName,
      startDate,
      endDate,
      numberOfDays,
      totalPrice,
    });
    // You can add API call or further processing here
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white rounded-lg shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-trekGray-500 hover:text-trekGray-700 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-trekGray-900 mb-2">Book {vehicleName}</h2>
          <p className="text-trekGray-600 mb-6">
            Rate: <span className="font-semibold text-trekGreen-600">{vehiclePrice} RWF</span> per day
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Start Date */}
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-trekGray-700 mb-2">
                <Calendar size={16} className="inline mr-2" />
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
                className="w-full px-4 py-2 border border-trekGray-300 rounded-lg focus:ring-2 focus:ring-trekGreen-500 focus:border-transparent"
              />
            </div>

            {/* End Date */}
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-trekGray-700 mb-2">
                <Calendar size={16} className="inline mr-2" />
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate || new Date().toISOString().split('T')[0]}
                required
                className="w-full px-4 py-2 border border-trekGray-300 rounded-lg focus:ring-2 focus:ring-trekGreen-500 focus:border-transparent"
              />
            </div>

            {/* Price Summary - Shows immediately after dates are selected */}
            {numberOfDays > 0 && (
              <div className="bg-trekGreen-50 border-2 border-trekGreen-200 rounded-lg p-4 mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-trekGray-700 font-medium">Duration:</span>
                  <span className="text-trekGray-900 font-semibold">
                    {numberOfDays} {numberOfDays === 1 ? 'day' : 'days'}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-trekGray-700 font-medium">Daily Rate:</span>
                  <span className="text-trekGray-900 font-semibold">{vehiclePrice} RWF</span>
                </div>
                <div className="border-t border-trekGreen-300 pt-2 mt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-trekGray-900">
                      <DollarSign size={20} className="inline mr-1" />
                      Total Price:
                    </span>
                    <span className="text-2xl font-bold text-trekGreen-600">
                      {totalPrice.toLocaleString()} RWF
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Additional fields can be added here */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-trekGray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-4 py-2 border border-trekGray-300 rounded-lg focus:ring-2 focus:ring-trekGreen-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-trekGray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                required
                className="w-full px-4 py-2 border border-trekGray-300 rounded-lg focus:ring-2 focus:ring-trekGreen-500 focus:border-transparent"
                placeholder="+250 XXX XXX XXX"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-trekGreen-500 hover:bg-trekGreen-600 text-white"
              >
                Confirm Booking
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default BookingPopup;