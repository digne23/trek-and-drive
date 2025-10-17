
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import BookingPopup from "./BookingPopup";

interface VehicleProps {
  name: string;
  category: string;
  passengers: number;
  price: number;
  image: string;
}

const VehicleCard = ({ name, category, passengers, price, image }: VehicleProps) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBookNow = () => {
    setIsBookingOpen(true);
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <span className="inline-block bg-trekGreen-100 text-trekGreen-600 px-2 py-1 text-xs font-semibold rounded-full mb-2">
              {category}
            </span>
            <h3 className="text-xl font-bold text-trekGray-900">{name}</h3>
          </div>
          <div className="text-right">
            <p className="text-trekGreen-600 font-bold text-xl">{price} RWF</p>
            <p className="text-trekGray-500 text-sm">per day</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-trekGray-200">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-sm text-trekGray-600">Passengers</p>
              <p className="font-semibold">{passengers}</p>
            </div>
          </div>
          <Button 
            className="bg-trekGreen-500 hover:bg-trekGreen-600 text-white flex items-center gap-2"
            onClick={handleBookNow}
          >
            <MessageSquare size={16} />
            Book Now
          </Button>
        </div>
      </div>
      
      <BookingPopup
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        vehicleName={name}
        vehiclePrice={price}
      />
    </Card>
  );
};

export default VehicleCard;
